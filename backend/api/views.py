"""
API views.
"""

# pylint: disable=missing-docstring
# pylint: disable=too-many-ancestors

import datetime
from email.policy import default
import itertools
import logging
import secrets
from django.conf import settings
import traceback
from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.core import exceptions as django_exceptions
from django.db import transaction, models as django_models
from django.forms.fields import (
    ImageField as ImageFormField,
    FileField as FileFormField,
)
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import FileResponse
from django_filters import rest_framework as filters
import os
import json
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pdfrw.pdfreader import PdfReader
from pdfrw.errors import PdfParseError
from rest_auth.registration.views import RegisterView as RestAuthRegisterView
from rest_framework import (
    decorators,
    exceptions as drf_exceptions,
    filters as drf_filters,
    generics,
    mixins,
    pagination,
    parsers,
    permissions,
    response,
    reverse,
    status,
    viewsets,
)

from api import models, payment, serializers
from api.mail.payment import call_post_payment_hooks

from api.schedule import Schedule

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name

User = get_user_model()  # pylint: disable=invalid-name

year = 2025

class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = [
            "list",
            "retrieve",
            "update",
            "mark_email_verified",
        ]
        ALLOWED_ACTIONS_MATCHING_USER = ["retrieve", "update"]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN
            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER
            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            user = obj
            if request.user == user:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return serializers.AdminUserSerializer
        return serializers.PrivateUserSerializer

    def get_queryset(self):
        queryset = User.objects.all().order_by("-date_joined")
        if self.request.user.is_staff:
            # Prefetch EmailAddress objects for email_is_verified property
            queryset = queryset.prefetch_related("emailaddress_set")
        return queryset

    @decorators.action(methods=["POST"], detail=True)
    def mark_email_verified(self, request, pk=None):
        target_user = self.get_object()
        verified_email = target_user.mark_email_verified(
            requester=request.user
        )
        return response.Response(
            {"success": "Email {} marked as verified.".format(verified_email)}
        )

    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination


MAX_IMAGE_SIZE = 2 * (2 ** 20)
MAX_IMAGE_SIZE_TEXT = "2 MiB"


def check_valid_image(image_file):
    image_field = ImageFormField()
    try:
        validated_image_file = image_field.to_python(image_file)
    except django_exceptions.ValidationError as exc:
        raise drf_exceptions.ValidationError(exc.message)
    if validated_image_file is None:
        raise drf_exceptions.ValidationError(
            "The image you uploaded appears to be corrupt."
        )
    if validated_image_file.size > MAX_IMAGE_SIZE:
        raise drf_exceptions.ValidationError(
            "The image you uploaded is too large."
            " The maximum allowed file size is {}.".format(MAX_IMAGE_SIZE_TEXT)
        )


class UserProfileViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = [
            "list",
            "retrieve",
            "update",
            "partial_update",
            "add_profile_pic",
        ]
        ALLOWED_ACTIONS_MATCHING_USER = [
            "retrieve",
            "update",
            "partial_update",
            "add_profile_pic",
        ]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            user_profile = obj
            if request.user == user_profile.related_user:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return serializers.AdminUserProfileSerializer
        return serializers.PrivateUserProfileSerializer

    @decorators.action(detail=True, methods=["post"])
    @decorators.parser_classes((parsers.MultiPartParser,))
    # pylint: disable=invalid-name
    def add_profile_pic(self, request, pk=None):
        pic_file = request.data["file"]
        try:
            check_valid_image(pic_file)
        except drf_exceptions.ValidationError as exc:
            raise drf_exceptions.ValidationError({"file": exc.detail})

        with transaction.atomic():
            user_profile = self.get_object()
            profile_pic = models.ProfilePicture.objects.create(
                picture=pic_file
            )
            user_profile.new_profile_pic = profile_pic
            user_profile.save()
        serializer = self.get_serializer(
            user_profile, context={"request": request}
        )
        return response.Response(serializer.data)

    queryset = models.UserProfile.objects.all()
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination


class GroupViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = (permissions.IsAdminUser,)


class WorkshopViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            if request.user.is_staff:
                return True
            return view.action in ["list", "retrieve", "participants"]

    queryset = models.Workshop.objects.all()
    serializer_class = serializers.WorkshopSerializer
    permission_classes = (Perm,)
    lookup_field = "slug"

    @decorators.action(detail=True)
    def participants(self, request, slug):
        """
        UserProfiles of all "participating" registrations, i.e. those with
        ParticipationStatus values of either ALMOST_CERTAINLY or PROBABLY.
        """
        workshop = self.get_object()
        user_profiles = models.UserProfile.objects.filter(
            registration__workshop=workshop,
            registration__participation_status__in=(
                models.PARTICIPATING_STATUSES
            ),
        ).order_by("last_name", "first_name")
        serializer = serializers.PublicUserProfileSerializer(
            user_profiles, many=True, context={"request": request}
        )
        return response.Response(serializer.data)


class RegistrationOptionViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            if request.user.is_staff:
                return True
            return view.action in ["list", "retrieve"]

    class Filter(filters.FilterSet):
        workshop_slug = filters.CharFilter(
            field_name="workshop__slug", lookup_expr="exact"
        )

        class Meta:
            model = models.RegistrationOption
            fields = ("workshop_slug",)

    queryset = models.RegistrationOption.objects.all()
    serializer_class = serializers.RegistrationOptionSerializer
    permission_classes = (Perm,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = Filter


class RegistrationViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    The following actions are available for `Registration` instances:
    -   list all (for admins)
    -   get-or-create by user-and-workshop
    -   update by pk
    -   initiate payment
    """

    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in [
                    "list",
                    "create",
                    "retrieve",
                    "update",
                    "partial_update",
                    "get_or_create",
                    "initiate_payment",
                ]

            if request.user.is_registration_viewer:
                return view.action in ["list", "retrieve", "get_or_create"]

            if request.user.is_authenticated:
                return view.action in [
                    "retrieve",
                    "update",
                    "partial_update",
                    "get_or_create",
                    "initiate_payment",
                ]

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in [
                    "create",
                    "retrieve",
                    "update",
                    "partial_update",
                    "get_or_create",
                    "initiate_payment",
                ]

            registration = obj
            if request.user != registration.user:
                return False

            if view.action in ["retrieve", "get_or_create"]:
                return True

            # Disallow users updating and initiating new payments on their
            # registration, if the registration already has approved payment
            if view.action in ["update", "partial_update", "initiate_payment"]:
                return not registration.has_approved_payment

            return False

    class Filter(filters.FilterSet):
        workshop_slug = filters.CharFilter(
            field_name="workshop__slug", lookup_expr="exact"
        )
        probably_participating = filters.BooleanFilter(
            field_name="participation_status",
            method="filter_probably_participating",
        )

        # pylint: disable=no-self-use
        def filter_probably_participating(self, queryset, name, value):
            if value:
                return queryset.filter(
                    participation_status__in=models.PARTICIPATING_STATUSES
                )
            return queryset

        class Meta:
            model = models.Registration
            fields = ("workshop_slug",)

    class Pagination(pagination.PageNumberPagination):
        page_size = 20
        page_size_query_param = "page_size"
        page_query_param = "page"
        max_page_size = 5000

    def get_queryset(self):
        queryset = models.Registration.objects.all()
        if self.action == "list":
            prefetch_exprs = ("talks", "options", "attending_dates")
            select_exprs = (
                "user",
                "inviter",
                "user_profile",
                "user_profile__affiliation",
            )
            queryset = queryset.prefetch_related(
                *prefetch_exprs
            ).select_related(*select_exprs)
        return queryset

    permission_classes = (Perm,)
    pagination_class = Pagination
    filter_backends = (filters.DjangoFilterBackend, drf_filters.OrderingFilter)
    filterset_class = Filter
    ordering_fields = ("pk", "user_profile__last_name")
    ordering = ("user_profile__last_name",)

    def get_serializer_class(self):
        if can_access_regn_stats(self.request.user):
            return serializers.FullRegistrationSerializer
        return serializers.RegistrantRegistrationSerializer

    @decorators.action(detail=False, methods=["post"])
    def get_or_create(self, request):
        """
        Given a User ID and Workshop ID, retrieve the corresponding
        Registration instance, creating it if it does not exist.
        """
        # Take only the workshop and user fields
        data = {
            key: request.data[key]
            for key in request.data
            if key in ["workshop", "user"]
        }
        serializer = serializers.RegistrationNonUniqueSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        valid_data = serializer.validated_data

        # Verify that, if such a Registration were to exist, then the request
        # user has appropriate permissions
        registration_stub = models.Registration(
            workshop=valid_data["workshop"], user=valid_data["user"]
        )
        self.check_object_permissions(request, registration_stub)

        # Get or create, and respond appropriately
        registration, created = models.Registration.objects.get_or_create(
            workshop=registration_stub.workshop, user=registration_stub.user
        )
        
        # Enable presentation tab for every professor or doctor
        # registration.enable_presentation()
        # Enable poster tabs for every student
        # registration.enable_poster()
        
        # Get all previous user profiles, and then fill profile_pic with existing profile_pic
        # This is a temporary fix for profile picture issue
        if registration.user_profile.profile_pic == "":
            registration.user_profile.new_profile_pic = registration.user.user_profile.new_profile_pic
            registration.user_profile.old_profile_pic = registration.user.user_profile.old_profile_pic
            registrations = models.Registration.objects.filter( user=registration_stub.user ).order_by('-created_on')
            for r in registrations:
                if r.user_profile.new_profile_pic is not None:
                    registration.user_profile.new_profile_pic = r.user_profile.new_profile_pic
                    break
                if r.user_profile.old_profile_pic != "":
                    registration.user_profile.old_profile_pic = r.user_profile.old_profile_pic
                    break
            registration.user_profile.save()
        
        serialized_registration = self.get_serializer(registration).data
        response_status = (
            status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
        return response.Response(serialized_registration, response_status)

    @decorators.action(detail=True, methods=["post"])
    def initiate_payment(  # pylint: disable=invalid-name
        self, request, pk=None
    ):
        """
        Initiate a payment flow for this Registration.
        """
        logger.error("INITIATED PAYMENT:::::::::::::")
        registration = self.get_object()

        # Don't allow initiating payment on a paid registration
        if registration.has_approved_payment:
            return response.Response(
                {
                    "error": (
                        "This registration already has an approved payment."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create RegistrationPayment instance
        amount = registration.compute_total_fee()

        # Authorize.net supports invoiceNumber up to 20 chars, and 10 bytes is
        # 20 hex chars
        print("INVOICE NUMBER IS:::",request.data.get("invoice_number", None))
        if(request.data.get("invoice_number", None) is None):
            invoice_number = secrets.token_hex(10)
        else:
            invoice_number = request.data.get("invoice_number", None)
        regn_payment, created = models.RegistrationPayment.objects.get_or_create(
            registration=registration,
            amount=amount,
            invoice_number=invoice_number,
        )

        # Get token
        description = "Registration for {}".format(registration.workshop.title)
        token = payment.get_payment_page_token(
            regn_payment=regn_payment, description=description
        )
        if token is None:
            data = {"error": "Payment provider failed to create transaction."}
            return response.Response(
                data, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Provide check_status URL
        check_status_url = reverse.reverse(
            "registration_payment-check-status",
            args=[regn_payment.pk],
            request=request,
        )

        response_data = {
            "token": token,
            "form_url": payment.get_hosted_payment_page_url(),
            "check_status_url": check_status_url,
            "invoice_number": invoice_number
        }
        return response.Response(response_data, status=status.HTTP_201_CREATED)


class RegistrationFeesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Workshop.objects.filter(slug='ita25')
    serializer_class = serializers.RegistrationFeesSerializer
    permission_classes = (permissions.AllowAny,)


# TODO disable "destroy", since we don't want this to be allowable by default
class RegistrationPaymentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = ["list", "retrieve", "destroy", "check_status"]
        ALLOWED_ACTIONS_MATCHING_USER = ["check_status"]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            regn_payment = obj
            if request.user == regn_payment.registration.user:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

    queryset = models.RegistrationPayment.objects.all()
    serializer_class = serializers.RegistrationPaymentSerializer
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination

    @decorators.action(detail=True, methods=["post"])
    def check_status(self, request, pk=None):  # pylint: disable=invalid-name
        """
        Check the status of this payment, asserting that it is associated to
        the transaction identified by the `transaction_id` parameter.
        """

        transaction_id = request.data.get("transaction_id", None)
        if transaction_id is None:
            raise drf_exceptions.ValidationError(
                "You must provide a 'transaction_id' parameter."
            )

        regn_payment = self.get_object()
        current_status = models.RegistrationPaymentStatus[regn_payment.status]
        if current_status.is_terminal:
            raise drf_exceptions.ValidationError(
                "Payment already has terminal status."
            )

        # transaction_details = payment.get_transaction_details(transaction_id)
        # assert transaction_details.transaction_id == transaction_id
        
        transaction_match = str(regn_payment.continue_uuid) == transaction_id and transaction_id!=''
        print("IN CHECK STATUS:::",transaction_match,transaction_id,regn_payment.continue_uuid)
        # payment.validate_transaction_matches_payment(
        #     transaction_details, regn_payment
        # )
        if not transaction_match:
            logger.warning(
                "Transaction mismatch between transaction_id={!s}"
                " and regn_payment.pk={!s}".format(
                    transaction_id, regn_payment.pk
                )
            )
            raise drf_exceptions.ValidationError(
                "Registration payment does not match specified transaction."
            )

        # regn_payment.transaction_id = transaction_details.transaction_id
        regn_payment.status = models.RegistrationPaymentStatus.APPROVED.name
        regn_payment.save()

        if (
            regn_payment.status
            == models.RegistrationPaymentStatus.APPROVED.name
        ):
            call_post_payment_hooks(regn_payment)

        serializer = self.get_serializer(regn_payment)
        return response.Response(serializer.data)


class OneTimeChargeViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = [
            "list",
            "create",
            "retrieve",
            "update",
            "partial_update",
            "initiate_payment",
        ]
        ALLOWED_ACTIONS_RECIPIENT = ["retrieve", "initiate_payment"]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_RECIPIENT

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            charge = obj
            if request.user == charge.recipient:
                return view.action in self.ALLOWED_ACTIONS_RECIPIENT

            return False

    @decorators.action(detail=True, methods=["post"])
    def initiate_payment(  # pylint: disable=invalid-name
        self, request, pk=None
    ):
        """
        Initiate a payment flow for this Registration.
        """
        charge = self.get_object()

        # Don't allow initiating payment on a paid charge
        if charge.is_paid:
            return response.Response(
                {"error": ("This charge is already paid.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authorize.net supports invoiceNumber up to 20 chars, so we use a
        # 4-char prefix and a 16-char (8-byte) random value
        invoice_number = "OTC-" + secrets.token_hex(8)
        charge_payment = models.OneTimeChargePayment.objects.create(
            charge=charge, invoice_number=invoice_number
        )

        # Get token
        description = "ITA One-Time Charge"
        token = payment.get_payment_page_token_for_one_time_charge_payment(
            charge_payment=charge_payment, description=description
        )
        if token is None:
            data = {"error": "Payment provider failed to create transaction."}
            return response.Response(
                data, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Provide check_status URL
        check_status_url = reverse.reverse(
            "onetimechargepayment-check-status",
            args=[charge_payment.pk],
            request=request,
        )

        response_data = {
            "token": token,
            "form_url": payment.get_hosted_payment_page_url(),
            "check_status_url": check_status_url,
        }
        return response.Response(response_data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return serializers.OneTimeChargeFullSerializer
        return serializers.OneTimeChargeRecipientSerializer

    queryset = models.OneTimeCharge.objects.all()
    permission_classes = (Perm,)
    filter_backends = (drf_filters.OrderingFilter,)
    ordering_fields = ("created_on",)
    ordering = ("-created_on",)


class OneTimeChargePaymentViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = ["list", "retrieve", "check_status"]
        ALLOWED_ACTIONS_RECIPIENT = ["check_status"]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_RECIPIENT

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            charge_payment = obj
            if request.user == charge_payment.charge.recipient:
                return view.action in self.ALLOWED_ACTIONS_RECIPIENT

            return False

    def get_serializer_class(self):
        if self.action == "check_status":
            return serializers.OneTimeChargePaymentCheckStatusSerializer
        return serializers.OneTimeChargePaymentSerializer

    @decorators.action(detail=True, methods=["post"])
    def check_status(self, request, pk=None):  # pylint: disable=invalid-name
        """
        Check the status of this payment, asserting that it is associated to
        the transaction identified by the `transaction_id` parameter.
        """

        charge_payment = self.get_object()
        logger.info(
            "Checking status of charge_payment pk=%s", charge_payment.pk
        )

        request_serializer = serializers.OneTimeChargePaymentCheckStatusSerializer(
            data=request.data
        )
        request_serializer.is_valid(raise_exception=True)
        valid_request_data = request_serializer.validated_data
        transaction_id = valid_request_data.get("transaction_id", None)
        logger.info(
            "Checking charge_payment pk=%s against transaction_id %s",
            charge_payment.pk,
            transaction_id,
        )

        # Can't reconcile transaction for already-completed payment
        current_status = models.OneTimeChargePaymentStatus[
            charge_payment.status
        ]
        if current_status.is_terminal:
            logger.info(
                "charge_payment pk=%s already had terminal status",
                charge_payment.pk,
            )
            raise drf_exceptions.ValidationError(
                "Payment already has terminal status."
            )

        # Don't reject payment (since we want to save the transaction ID), but
        # warn that the charge was already terminal
        current_charge_status = models.OneTimeChargeStatus[
            charge_payment.charge.status
        ]
        if current_charge_status.is_terminal:
            logger.warn(
                "charge pk=%s of charge_payment pk=%s charge already had"
                " terminal status!",
                charge_payment.charge.pk,
                charge_payment.pk,
            )

        transaction_details = payment.get_transaction_details(transaction_id)
        assert transaction_details.transaction_id == transaction_id

        transaction_match = payment.validate_transaction_matches_one_time_charge_payment(
            transaction_details, charge_payment
        )
        if not transaction_match:
            logger.warning(
                "Transaction mismatch between transaction_id=%s"
                " and charge_payment pk=%s",
                transaction_id,
                charge_payment.pk,
            )
            raise drf_exceptions.ValidationError(
                "Registration payment does not match specified transaction."
            )

        logger.info(
            "Found transaction match between transaction_id=%s"
            " and charge_payment pk=%s",
            transaction_id,
            charge_payment.pk,
        )
        charge_payment.transaction_id = transaction_details.transaction_id
        charge_payment.status = (
            payment.transaction_details_to_one_time_charge_payment_status(
                transaction_details
            )
        ).name
        charge_payment.save()

        charge_payment_serializer = serializers.OneTimeChargePaymentSerializer(
            charge_payment, context={"request": request}
        )
        charge_serializer = serializers.OneTimeChargeRecipientSerializer(
            charge_payment.charge, context={"request": request}
        )
        response_data = {
            "charge_payment": charge_payment_serializer.data,
            "charge": charge_serializer.data,
        }
        return response.Response(response_data)

    queryset = models.OneTimeChargePayment.objects.all()
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination


def can_access_regn_stats(user):
    return user.is_staff or user.is_registration_viewer


class InviterViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            return can_access_regn_stats(request.user)

    queryset = User.objects.filter(groups__name=models.INVITER_GROUP_NAME)
    serializer_class = serializers.InviterSerializer
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination


class InvitationViewSet(viewsets.ReadOnlyModelViewSet):
    """Not in use; marked as read-only and admin-only."""

    queryset = models.Invitation.objects.all()
    serializer_class = serializers.InvitationSerializer
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = pagination.LimitOffsetPagination


class AffiliationViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = models.Affiliation.objects.all()
    serializer_class = serializers.AffiliationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


MAX_PDF_SIZE = 5 * (2 ** 20)
MAX_VIDEO_SIZE = 100 * (2 ** 20)
MAX_PDF_SIZE_TEXT = "5 MiB"
MAX_VIDEO_SIZE_TEXT = "100 MiB"


def check_valid_pdf(pdf_file):
    file_field = FileFormField()
    try:
        validated_file = file_field.to_python(pdf_file)
    except django_exceptions.ValidationError as exc:
        raise drf_exceptions.ValidationError(exc.message)
    if validated_file is None:
        raise drf_exceptions.ValidationError(
            "The file you uploaded appears to be corrupt."
        )
    if validated_file.size > MAX_PDF_SIZE:
        raise drf_exceptions.ValidationError(
            "The file you uploaded is too large."
            " The maximum allowed file size is {}.".format(MAX_PDF_SIZE_TEXT)
        )
    try:
        PdfReader(validated_file)
    except PdfParseError:
        raise drf_exceptions.ValidationError(
            "The file you uploaded is not a valid PDF file."
        )
    except:  # noqa pylint: disable=bare-except
        logger.error(
            "Unknown error when reading PDF file:\n%s", traceback.format_exc()
        )

# def check_valid_video(video_file):
#     file_field = FileFormField()
#     try:
#         validated_file = file_field.to_python(video_file)
#     except django_exceptions.ValidationError as exc:
#         raise drf_exceptions.ValidationError(exc.message)
#     if validated_file is None:
#         raise drf_exceptions.ValidationError(
#             "The file you uploaded appears to be corrupt."
#         )
#     if validated_file.size > MAX_VIDEO_SIZE:
#         raise drf_exceptions.ValidationError(
#             "The file you uploaded is too large."
#             " The maximum allowed file size is {}.".format(MAX_VIDEO_SIZE_TEXT)
#         )
#     try:
#         tmp_path = video_file.name[2:]
#         default_storage.save(tmp_path, ContentFile(video_file.file.read()))
#         full_tmp_path = os.path.join(settings.SFTP_STORAGE_ROOT, tmp_path)
#         file_type = magic.from_file(full_tmp_path, mime=True)
#         default_storage.delete(tmp_path)
#         print("File type in check video", file_type)
#         VIDEO_TYPES = ['WEBM','MPG', 'MP2', 'MPEG', 'MPE', 'MPV','OGG','AVCHD','MP4','M4P','M4V','AVI','WMV','MOV','QT','FLV','SWF']
#         if file_type not in VIDEO_TYPES:
#             raise drf_exceptions.ValidationError('File type not supported. JPEG, MOV, or MP4 recommended.')
#     except:  # noqa pylint: disable=bare-except
#         logger.error(
#             "Unknown error when reading Video file:\n%s", traceback.format_exc()
#         )


class TalkViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    class Perm(permissions.BasePermission):
        ALLOWED_ACTIONS_ADMIN = [
            "list",
            "retrieve",
            "update",
            "partial_update",
            "add_paper",
            "add_video"
        ]
        ALLOWED_ACTIONS_MATCHING_USER = [
            "retrieve",
            "update",
            "partial_update",
            "add_paper",
            "add_video"
        ]

        def has_permission(self, request, view):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            if request.user.is_authenticated:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

        def has_object_permission(self, request, view, obj):
            if request.user.is_staff:
                return view.action in self.ALLOWED_ACTIONS_ADMIN

            talk = obj
            if request.user == talk.registration.user:
                return view.action in self.ALLOWED_ACTIONS_MATCHING_USER

            return False

    @decorators.action(detail=True, methods=["post"])
    @decorators.parser_classes((parsers.MultiPartParser,))
    # pylint: disable=invalid-name
    def add_paper(self, request, pk=None):
        request_file = request.data["file"]
        try:
            check_valid_pdf(request_file)
        except drf_exceptions.ValidationError as exc:
            raise drf_exceptions.ValidationError({"file": exc.detail})

        with transaction.atomic():
            talk = self.get_object()
            if not talk.registration.presenting:
                message = (
                    "You are not currently registering as a presenter."
                    " Please contact us if you believe this is an error."
                )
                raise drf_exceptions.ValidationError({"file": [message]})
            talk_paper = models.TalkPaper.objects.create(file=request_file)
            talk.paper = talk_paper
            talk.save()
        serializer = self.get_serializer(talk, context={"request": request})
        return response.Response(serializer.data)
    
    @decorators.action(detail=True, methods=["post"])
    @decorators.parser_classes((parsers.MultiPartParser,))
    # pylint: disable=invalid-name
    def add_video(self, request, pk=None):
        request_file = request.data["file"]
        # try:
        #     check_valid_pdf(request_file)#tawny to dooooo
        # except drf_exceptions.ValidationError as exc:
        #     raise drf_exceptions.ValidationError({"file": exc.detail})

        with transaction.atomic():
            talk = self.get_object()
            if not talk.registration.presenting:
                message = (
                    "You are not currently registering as a presenter."
                    " Please contact us if you believe this is an error."
                )
                raise drf_exceptions.ValidationError({"file": [message]})
            talk_video = models.TalkVideo.objects.create(file=request_file)
            talk.video = talk_video
            talk.save()
        serializer = self.get_serializer(talk, context={"request": request})
        return response.Response(serializer.data)

    queryset = models.Talk.objects.all()
    serializer_class = serializers.PresenterTalkSerializer
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination


class SchedulableTalksViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    """Talks which should be scheduled."""

    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            if not request.user.is_authenticated:
                return False
            return request.user.is_staff or request.user.is_scheduler

    class Filter(filters.FilterSet):
        workshop_slug = filters.CharFilter(
            field_name="registration__workshop__slug", lookup_expr="exact"
        )

        class Meta:
            model = models.Talk
            fields = ("workshop_slug",)

    queryset = models.Talk.objects.filter(
        registration__participation_status__in=models.PARTICIPATING_STATUSES,
        registration__presenting=True,
    ).select_related(
        "registration", "registration__workshop", "registration__user_profile"
    )
    serializer_class = serializers.SchedulerTalkSerializer
    permission_classes = (Perm,)
    pagination_class = pagination.LimitOffsetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = Filter


class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    """Not in use; marked as read-only and admin-only."""

    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = pagination.LimitOffsetPagination


class TalkScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    """Not in use; marked as read-only and admin-only."""

    queryset = models.TalkSchedule.objects.all()
    serializer_class = serializers.TalkScheduleSerializer
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = pagination.LimitOffsetPagination
    """Not in use; marked as read-only and admin-only."""

    queryset = models.TalkSchedule.objects.all()
    serializer_class = serializers.TalkScheduleSerializer
    permission_classes = (permissions.IsAdminUser,)
    pagination_class = pagination.LimitOffsetPagination


@decorators.api_view()
def null_view(request):
    return response.Response(status=status.HTTP_200_OK)


class CustomRegisterView(RestAuthRegisterView):
    serializer_class = serializers.CustomRegisterSerializer


def any_q(q_objects):
    """
    Returns the OR of all given Q objects. The given list must be nonempty.
    """
    assert bool(q_objects)
    result = q_objects[0]
    for q_object in q_objects[1:]:
        result = result | q_object
    return result


def all_q(q_objects):
    """
    Returns the AND of all given Q objects. The given list must be nonempty.
    """
    assert bool(q_objects)
    result = q_objects[0]
    for q_object in q_objects[1:]:
        result = result & q_object
    return result


def token_matches_any_lookup_q(token, lookups):
    return any_q([django_models.Q(**{lookup: token}) for lookup in lookups])


def each_token_matches_any_lookup_q(tokens, lookups):
    return all_q(
        [token_matches_any_lookup_q(token, lookups) for token in tokens]
    )


def map_dict_keys(d, f):
    """Maps function ``f`` over the keys of dictionary ``d``."""
    return {f(key): val for key, val in d.items()}


class UsersWithRegnDataView(generics.ListAPIView):
    # pylint: disable=too-many-locals
    def get_queryset(self):
        workshop_slug = self.request.query_params.get("workshop_slug", None)
        if workshop_slug is None:
            raise drf_exceptions.ValidationError("workshop_slug is required")

        current_regn = models.Registration.objects.filter(
            user__pk=django_models.OuterRef("pk"), workshop__slug=workshop_slug
        )
        current_presenting = django_models.Exists(
            current_regn.filter(presenting=True).only("pk")
        )
        current_invited = django_models.Exists(
            current_regn.filter(
                registrant_type=models.RegistrantType.INVITED.name
            ).only("pk")
        )

        current_inviter_pk = django_models.Subquery(
            current_regn.values("inviter")[:1]
        )
        current_inviter = models.User.objects.filter(
            pk=django_models.OuterRef("current_inviter_pk")
        )
        current_inviter_email = django_models.Subquery(
            current_inviter.values("email")[:1]
        )
        current_inviter_first_name = django_models.Subquery(
            current_inviter.values("user_profile__first_name")[:1]
        )
        current_inviter_last_name = django_models.Subquery(
            current_inviter.values("user_profile__last_name")[:1]
        )

        regn_user_profile_pk = django_models.Subquery(
            models.UserProfile.objects.filter(
                user__pk=django_models.OuterRef("pk"),
                registration__isnull=False,
            ).values("pk")[:1]
        )
        current_user_profile_pk = django_models.functions.Coalesce(
            django_models.F("regn_user_profile_pk"),
            django_models.F("user_profile"),
        )
        current_user_profile = models.UserProfile.objects.filter(
            pk=django_models.OuterRef("current_user_profile_pk")
        )
        current_first_name = django_models.Subquery(
            current_user_profile.values("first_name")[:1]
        )
        current_last_name = django_models.Subquery(
            current_user_profile.values("last_name")[:1]
        )
        current_honorific = django_models.Subquery(
            current_user_profile.values("honorific")[:1]
        )
        current_presenting_default = django_models.Subquery(
            current_user_profile.values("presenting_default")[:1]
        )
        current_affiliation_title = django_models.Subquery(
            current_user_profile.values("affiliation__title")[:1]
        )

        queryset = models.User.objects
        queryset = queryset.annotate(
            regn_user_profile_pk=regn_user_profile_pk,
            current_presenting=current_presenting,
            current_invited=current_invited,
            current_inviter_pk=current_inviter_pk,
            current_inviter_email=current_inviter_email,
            current_inviter_first_name=current_inviter_first_name,
            current_inviter_last_name=current_inviter_last_name,
            current_user_profile_pk=current_user_profile_pk,
            current_first_name=current_first_name,
            current_last_name=current_last_name,
            current_honorific=current_honorific,
            current_presenting_default=current_presenting_default,
            current_affiliation_title=current_affiliation_title,
        )
        return queryset

    class Pagination(pagination.PageNumberPagination):
        page_size = 20
        page_size_query_param = "page_size"
        page_query_param = "page"
        max_page_size = 5000

    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            return request.user.is_staff

    class Filter(filters.FilterSet):
        inviter = filters.CharFilter(method="filter_inviter")
        first_name = filters.CharFilter(
            field_name="current_first_name", lookup_expr="icontains"
        )
        last_name = filters.CharFilter(
            field_name="current_last_name", lookup_expr="icontains"
        )
        email = filters.CharFilter(field_name="email", lookup_expr="icontains")

        # pylint: disable=no-self-use, unused-argument
        def filter_inviter(self, queryset, name, value):
            tokens = value.split()
            if not tokens:
                return queryset
            lookups = [
                "current_inviter_first_name__icontains",
                "current_inviter_last_name__icontains",
                "current_inviter_email__icontains",
            ]
            all_tokens_match = each_token_matches_any_lookup_q(tokens, lookups)
            return queryset.filter(all_tokens_match)

        class Meta:
            model = User
            fields = ["first_name"]

    serializer_class = serializers.UserWithRegnDataSerializer
    permission_classes = (Perm,)
    pagination_class = Pagination
    filter_backends = (filters.DjangoFilterBackend, drf_filters.OrderingFilter)
    filterset_class = Filter
    ordering_fields = ("pk", "current_last_name")
    ordering = ("current_last_name",)


def participation_status_count(participation_status):
    name = "participation_status_{}".format(participation_status.name)
    count = django_models.Count(
        "pk",
        filter=django_models.Q(participation_status=participation_status.name),
        distinct=True,
    )
    return name, count


def attending_date_counts(date):
    """
    Counts Registrations which include ``date`` in its ``attending_dates`` set,
    and which have a "participating" ``participation_status``.

    ``date`` must be a ``datetime.date`` object.
    """
    timestamp = date.strftime("%Y-%m-%d")
    name_participating = "attending_date_{}_participating".format(timestamp)
    name_paid = "attending_date_{}_paid".format(timestamp)
    count_participating = django_models.Count(
        "pk",
        filter=django_models.Q(
            attending_dates__date_value=date,
            participation_status__in=models.PARTICIPATING_STATUSES,
        ),
        default=0,
        distinct=True,
    )
    count_paid = django_models.Count(
        "pk",
        filter=django_models.Q(
            attending_dates__date_value=date, has_approved_payment=True
        ),
        default=0,
        distinct=True,
    )
    return [(name_participating, count_participating), (name_paid, count_paid)]


def count_regns_with_option(slug, extra_filters=None):
    if extra_filters is None:
        extra_filters = {}
    return django_models.Count(
        "pk",
        filter=django_models.Q(options__slug=slug, **extra_filters),
        distinct=True,
    )


REGN_PARTICIPATING_FILTER = {
    "participation_status__in": models.PARTICIPATING_STATUSES
}
REGN_PAID_FILTER = {"has_approved_payment": True}
PRESENTING_FILTER = {"presenting": True}
NOTPRESENTING_FILTER = {"presenting": False}
REGN_UNPAID_FILTER = {"has_approved_payment": False}


class RegistrationAggregateStatsViewSet(viewsets.GenericViewSet):
    class Perm(permissions.BasePermission):
        def has_permission(self, request, view):
            return can_access_regn_stats(request.user)

    permission_classes = (Perm,)

    def ita23_sunday_reception_counts(self):
        slugs = [
            "ita25_sundayReception_notAttending",
            "ita25_sundayReception_selfOnly",
            "ita25_sundayReception_selfPlus1",
            "ita25_sundayReception_selfPlus2",
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        participating_counts["ita25_sundayReception_total"] = (
            participating_counts["ita25_sundayReception_selfOnly"]
            + 2 * participating_counts["ita25_sundayReception_selfPlus1"]
            + 3 * participating_counts["ita25_sundayReception_selfPlus2"]
        )
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        paid_counts["ita25_sundayReception_total"] = (
            paid_counts["ita25_sundayReception_selfOnly"]
            + 2 * paid_counts["ita25_sundayReception_selfPlus1"]
            + 3 * paid_counts["ita25_sundayReception_selfPlus2"]
        )
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }

    def ita23_monday_lunch_counts(self):
        slugs = [
            "ita25_mondayLunch_notAttending",
            "ita25_mondayLunch_attending",
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }

    def ita23_wednesday_banquet_counts(self):
        slugs = [
            "ita25_banquetSelf_notAttending",
            "ita25_banquetSelf_selfOnly",
            "ita25_banquetSelf_selfPlus1",
            "ita25_banquetSelf_selfPlus2",
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        participating_counts["ita25_banquetSelf_total"] = (
            participating_counts["ita25_banquetSelf_selfOnly"]
            + 2 * participating_counts["ita25_banquetSelf_selfPlus1"]
            + 3 * participating_counts["ita25_banquetSelf_selfPlus2"]
        )
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        paid_counts["ita25_banquetSelf_total"] = (
            paid_counts["ita25_banquetSelf_selfOnly"]
            + 2 * paid_counts["ita25_banquetSelf_selfPlus1"]
            + 3 * paid_counts["ita25_banquetSelf_selfPlus2"]
        )
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }
    
    def ita23_saturday_workshop_counts(self):
        slugs = [
            "ita25_saturdaySelf_notAttending",
            "ita25_saturdaySelf_attending"
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        participating_counts["ita25_saturdayWorkshop_total"] = (
            participating_counts["ita25_saturdayWorkshop_attending"]
        )
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        paid_counts["ita25_saturdayWorkshop_total"] = (
            paid_counts["ita25_saturdayWorkshop_attending"]
        )
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }

    def ita23_valentines_event_counts(self):
        slugs = [
            "ita25_valentinesEvent_notAttending",
            "ita25_valentinesEvent_selfOnly",
            "ita25_valentinesEvent_selfPlus1",
            "ita25_valentinesEvent_selfPlus2",
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        participating_counts["ita25_valentinesEvent_total"] = (
            participating_counts["ita25_valentinesEvent_selfOnly"]
            + 2 * participating_counts["ita25_valentinesEvent_selfPlus1"]
            + 3 * participating_counts["ita25_valentinesEvent_selfPlus2"]
        )
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        paid_counts["ita25_valentinesEvent_total"] = (
            paid_counts["ita25_valentinesEvent_selfOnly"]
            + 2 * paid_counts["ita25_valentinesEvent_selfPlus1"]
            + 3 * paid_counts["ita25_valentinesEvent_selfPlus2"]
        )
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }

    def ita23_attending_dates(self):
        dates = [datetime.date(year, 2, day) for day in range(9, 15)]
        items = itertools.chain.from_iterable(
            attending_date_counts(date) for date in dates
        )
        return dict(items)

    
    def ita24_italt_counts(self):
        slugs = [
            "ita25_italt_attending",
            "ita25_italt_notAttending",
        ]
        participating_counts = {
            slug: count_regns_with_option(slug, REGN_PARTICIPATING_FILTER)
            for slug in slugs
        }
        paid_counts = {
            slug: count_regns_with_option(slug, REGN_PAID_FILTER)
            for slug in slugs
        }
        return {
            **map_dict_keys(participating_counts, "{}_participating".format),
            **map_dict_keys(paid_counts, "{}_paid".format),
        }


    @decorators.action(detail=False)
    def ita24(self, request):
        workshop = models.Workshop.objects.get(slug="ita25")
        regns = models.Registration.objects.filter(workshop=workshop)
        nonEmptyBanquet = regns.filter(banquet_options__isnull=False)
        banquet_options = {
            "Vegetarian": 0,
            "Chicken": 0,
            "Fish": 0
        }
        for reg in nonEmptyBanquet.all():
            opt = reg.banquet_options
            for ch in opt:
                if (ch == 'V'):
                    banquet_options["Vegetarian"] += 1
                elif (ch == 'F'):
                    banquet_options["Fish"] += 1
                elif (ch == 'C'):
                    banquet_options["Chicken"] += 1
        
        participation_counts = dict(
            participation_status_count(status)
            for status in models.ParticipationStatus
        )
        participation_counts["participating"] = django_models.Count(
            "pk",
            filter=django_models.Q(**REGN_PARTICIPATING_FILTER),
            default = 0,
            distinct=True,
        )
        participation_counts["participating_and_paid"] = django_models.Count(
            "pk",
            filter=django_models.Q(
                **REGN_PARTICIPATING_FILTER, **REGN_PAID_FILTER
            ),
            distinct=True,
        )
        participation_counts["participating_and_unpaid"] = django_models.Count(
            "pk",
            filter=django_models.Q(
                **REGN_PARTICIPATING_FILTER, **REGN_UNPAID_FILTER
            ),
            distinct=True,
        )

        attending_date_counts = self.ita23_attending_dates()
        sunday_reception_counts = self.ita23_sunday_reception_counts()
        monday_lunch_counts = self.ita23_monday_lunch_counts()
        wednesday_banquet_counts = self.ita23_wednesday_banquet_counts()
        valentines_event_counts = self.ita23_valentines_event_counts()
        italt_counts = self.ita24_italt_counts()

        aggregates = regns.aggregate(
            **participation_counts,
            **attending_date_counts,
            **sunday_reception_counts,
            **monday_lunch_counts,
            **wednesday_banquet_counts,
            **valentines_event_counts,
            **italt_counts,
        )
        aggregates["total_amount_paid"] = (
            models.Registration.objects.filter(workshop=workshop)
            .aggregate(
                total=django_models.Sum("approved_payments_total_amount")
            )
            .get("total")
        )
        aggregates["banquet_options"] = banquet_options
        serializer = serializers.RegistrationAggregateStatsIta23Serializer(
            aggregates
        )

        return response.Response(serializer.data)

@api_view()
def notifications(request, slug):
    with open("./static_json/notification_api_data.json") as file:
        json_object = json.load(file)
        for key, value in json_object.items():
            if key == slug:
                filtered_data = value
    return Response(filtered_data)

@api_view()
def page_not_available(request):
    return render(request,'404_mobile.html')

@api_view()
def schedule(request, slug):
    file= Schedule().get_schedule()
    print(file)
    return Response(file)

@api_view()
def participants(request, slug):
    response_API = requests.get(f'https://itaws.ucsd.edu/api/v0/workshops/{slug}/participants/')
    resp = json.loads(response_API.text)
    retList = [] 
    for res in resp:
        obj = {
        "name" : res['full_name'],
        "desc" : res['affiliation_title'],
        "pic" : res['profile_pic'] if res['profile_pic']!= ""  else  "https://ita.ucsd.edu/workshop/23/images/images/empty_profile.png" ,
        "website" : res['website'] if res['website']!= ""  else  "https://itaws.ucsd.edu/api/v0/mobile/page_not_available" ,
        "email" : "https://itaws.ucsd.edu/api/v0/mobile/page_not_available"
        }
        retList.append(obj)
    ret ={
        "participants" : retList 
        }
    return Response(ret)

@api_view()
def gallery_mobile(request, slug):
    with open("./static_json/gallery_api_data.json") as file:
        json_object = json.load(file)
        for key, value in json_object.items():
            if key == slug:
                filtered_data = {"gallery": value}
    return Response(filtered_data)


@api_view()
def trivia(request, slug):
    filtered_data= {}
    with open("./static_json/trivia_api_data.json") as file:
        json_object = json.load(file)
        for key, value in json_object.items():
            print("Anish is here", key, slug)
            if key == slug:
                filtered_data = {"trivia": value}
    return Response(filtered_data)

@api_view()
def map_image(request, slug):
    image_path = "./static/assets/ita_24_landscape.png"  # Path to the image file
    return FileResponse(open(image_path, 'rb'), content_type='image/png')
    # if os.path.exists(image_path):
    #     return FileResponse(open(image_path, 'rb'), content_type='image/png')
    # else:
    #     return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)