"""
DRF serializers for API models.
"""

import collections
import datetime
import itertools
import logging

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.reverse import reverse
import rest_auth.serializers as rest_auth_serializers
from rest_auth.registration.serializers import (
    RegisterSerializer as RestAuthRegisterSerializer,
)
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import get_connection
from api import models
User = get_user_model()  # pylint: disable=invalid-name

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


class CustomPasswordResetForm(PasswordResetForm):
    def send_mail(self, subject_template_name, email_template_name, 
                  context, from_email, to_email, html_email_template_name=None):
        # Force custom backend
        connection = get_connection(backend='api.email_backends.CustomSMTPBackend')
        email_message = self.construct_email(
            subject_template_name, email_template_name, context, from_email, to_email,
            html_email_template_name
        )
        connection.send_messages([email_message])

class PasswordResetSerializer(rest_auth_serializers.PasswordResetSerializer):
    password_reset_form = CustomPasswordResetForm
    
    def get_email_options(self):
        return {
            "domain_override": settings.FRONTEND_ROOT_DOMAIN,
            "email_template_name": "password_reset_email_custom_url.html",
        }


class MoneySerializerField(serializers.DecimalField):
    """Serializer field corresponding to models.MoneyField."""

    def __init__(self, **kwargs):
        super().__init__(
            max_digits=models.MoneyField.MAX_DIGITS,
            decimal_places=models.MoneyField.DECIMAL_PLACES,
            **kwargs
        )


class UserProfileWebsiteUrlField(serializers.URLField):
    """
    Like a ``URLField``, but also:
    - automatically adds "http://" to schemeless URLs during deserialization
    - allows blank by default
    """

    def __init__(self, **kwargs):
        kwargs.setdefault("allow_blank", True)
        super().__init__(**kwargs)

    def to_internal_value(self, data):
        if isinstance(data, str) and (data != "") and ("://" not in data):
            data = "http://{}".format(data)
        return super().to_internal_value(data)


class AdminUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    """
    This serializer exposes all fields of a `UserProfile`, and also the email
    address for convenience.
    """

    website = UserProfileWebsiteUrlField(required=False)
    add_profile_pic_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="userprofile-add-profile-pic"
    )

    class Meta:
        model = models.UserProfile
        fields = (
            "url",
            "honorific",
            "first_name",
            "last_name",
            "affiliation",
            "website",
            "profile_pic",
            "is_student",
            "affiliation_title",
            "formal_name",
            "full_name",
            # Private fields
            "phone_number",
            "shirt_type",
            "shirt_size",
            "add_profile_pic_url",
            # Admin-only fields
            "nickname",
            "presenting_default",
            "first_name_original",
            "last_name_original",
            "email_original",
            # Convenience
            "email",
        )
        read_only_fields = (
            "first_name_original",
            "last_name_original",
            "email_original",
            "profile_pic",
            "email",
        )


class PrivateUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    """
    This serializer exposes user-editable fields of a `UserProfile`.
    """

    website = UserProfileWebsiteUrlField(required=False)
    add_profile_pic_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="userprofile-add-profile-pic"
    )

    class Meta:
        model = models.UserProfile
        fields = (
            "url",
            "honorific",
            "first_name",
            "last_name",
            "affiliation",
            "website",
            "profile_pic",
            "is_student",
            "affiliation_title",
            "formal_name",
            "full_name",
            # Private fields
            "phone_number",
            "shirt_type",
            "shirt_size",
            "add_profile_pic_url",
        )
        read_only_fields = ("profile_pic",)


class PublicUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for public UserProfile fields. Intended for read-only use cases.
    """

    website = UserProfileWebsiteUrlField(required=False)

    class Meta:
        model = models.UserProfile
        fields = (
            "url",
            "first_name",
            "last_name",
            "website",
            "profile_pic",
            "is_student",
            "affiliation_title",
            "full_name",
        )
        read_only_fields = ("profile_pic",)


class AdminUserSerializer(serializers.HyperlinkedModelSerializer):
    """
    This serializer should only be visible to admins.
    """

    admin = serializers.BooleanField(source="is_staff", read_only=True)
    user_profile = AdminUserProfileSerializer(read_only=True)
    mark_email_verified_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="user-mark-email-verified"
    )

    class Meta:
        model = User
        fields = (
            "url",
            "email",
            "groups",
            "user_profile",
            "admin",
            "email_is_verified",
            "mark_email_verified_url",
        )
        read_only_fields = ("groups",)


class PrivateUserSerializer(serializers.HyperlinkedModelSerializer):
    """
    This serializer should only be visible to the user themself, and to
    admins.
    """

    admin = serializers.BooleanField(source="is_staff", read_only=True)
    user_profile = PrivateUserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("url", "email", "groups", "user_profile", "admin")
        read_only_fields = ("groups",)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializes `Group` instances.

    Should only be visible to administrative users.
    """

    class Meta:
        model = Group
        fields = ("url", "name")


class WorkshopSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializes `Workshop` instances, intended for unauthenticated consumption.
    """

    participants_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="workshop-participants", lookup_field="slug"
    )

    class Meta:
        model = models.Workshop
        fields = (
            "url",
            "title",
            "slug",
            "start_date",
            "end_date",
            "reg_open",
            "participants_url",
        )
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class RegistrationOptionSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializes `RegistrationOption` instances.
    """

    class Meta:
        model = models.RegistrationOption
        fields = ("url", "workshop", "date", "title", "slug", "description")
        extra_kwargs = {
            "url": {"view_name": "registration_option-detail"},
            "workshop": {"lookup_field": "slug"},
        }
        read_only_fields = ("workshop", "slug")


class DateRelatedField(serializers.RelatedField):
    """
    Serializer-field wrapper for `models.Date` instances.
    """

    def to_representation(self, value):
        return str(value.date_value)

    def to_internal_value(self, data):
        date = datetime.datetime.strptime(data, "%Y-%m-%d").date()
        return models.Date.objects.get_or_create(date_value=date)[0].id


class BaseTalkSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `Talk` instances, containing only fundamental, read-only
    fields.
    """

    class Meta:
        model = models.Talk
        fields = ("url",)


class SchedulerTalkSerializer(BaseTalkSerializer):
    """
    Serializer for `Talk` instances, for schedulers.
    """

    url = serializers.HyperlinkedIdentityField(
        view_name="schedulabletalk-detail"
    )
    first_name = serializers.CharField(
        source="registration.user_profile.first_name", read_only=True
    )
    last_name = serializers.CharField(
        source="registration.user_profile.last_name", read_only=True
    )
    attending_dates = DateRelatedField(
        source="registration.attending_dates", many=True, read_only=True
    )

    class Meta:
        model = models.Talk
        fields = (
            *BaseTalkSerializer.Meta.fields,
            "title",
            "abstract",
            "paper_url",
            "topic_comment",
            "scheduling_comment",
            "authors_comment",
            "first_name",
            "last_name",
            "attending_dates",
            "admin_comment"
        )
        read_only_fields = (
            "title",
            "abstract",
            "paper_url",
            "topic_comment",
            "scheduling_comment",
            "authors_comment",
        )


class PresenterTalkSerializer(BaseTalkSerializer):
    """
    Serializer for `Talk` instances, for presenters themselves.
    """

    add_paper_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="talk-add-paper"
    )

    add_video_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="talk-add-video"
    )

    class Meta:
        model = models.Talk
        fields = (
            *BaseTalkSerializer.Meta.fields,
            "add_paper_url",
            "add_video_url",
            "registration",
            "title",
            "abstract",
            "paper_url",
            "video_url",
            "topic_comment",
            "scheduling_comment",
            "authors_comment",
            "admin_comment"
        )
        read_only_fields = ("registration", "paper_url")


class RegistrationUrlSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for just a `Registration` URL.
    """

    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="registration-detail"
    )

    class Meta:
        model = models.Registration
        fields = ("url",)


class BaseRegistrationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Base serializer for `Registration` instances, exposing only the URL and key
    relationships.
    """

    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="registration-detail"
    )
    workshop = serializers.HyperlinkedRelatedField(
        read_only=True, view_name="workshop-detail", lookup_field="slug"
    )
    user = serializers.HyperlinkedRelatedField(
        read_only=True, view_name="user-detail"
    )
    user_profile = PrivateUserProfileSerializer(read_only=True)

    class Meta:
        model = models.Registration
        fields = ("url", "workshop", "user", "user_profile")


class FullRegistrationSerializer(BaseRegistrationSerializer):
    """
    Serializer for `Registration` instances, exposing all fields.
    """

    # Override user_profile to use AdminUserProfileSerializer
    user_profile = AdminUserProfileSerializer(read_only=True)

    attending_dates = DateRelatedField(
        many=True, queryset=models.Date.objects.all()
    )
    options = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=models.RegistrationOption.objects.all(),
        view_name="registration_option-detail",
    )
    approved_payments_total_amount = MoneySerializerField(read_only=True)
    initiate_payment_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="registration-initiate-payment"
    )

    talks = PresenterTalkSerializer(many=True, read_only=True)

    # Restrict choices to members of the Inviter group
    inviter_url = serializers.HyperlinkedRelatedField(
        queryset=User.objects.filter(groups__name=models.INVITER_GROUP_NAME),
        view_name="user-detail",
        source="inviter",
        allow_null=True,
    )

    class Meta:
        model = models.Registration
        fields = (
            *BaseRegistrationSerializer.Meta.fields,
            # Participation
            "attending_dates",
            "attending_italt",
            "banquet_options",
            "participation_status",
            "options",
            # Fees
            "fee_type",
            "total_fee_amount",
            "approved_payments_total_amount",
            "has_approved_payment",
            "initiate_payment_url",
            # Presentation
            "presenting",
            "plenary",
            "poster",
            "graduation_talk",
            "graduation_presentation",
            "talks",
            # Misc
            "registrant_type",
            "inviter_url",
            "registrant_number",
        )
        read_only_fields = ("registrant_number",)


class RegistrantRegistrationSerializer(BaseRegistrationSerializer):
    """
    Serializer for `Registration` instances, as should be accessible by each
    registrant.
    """

    attending_dates = DateRelatedField(
        many=True, queryset=models.Date.objects.all()
    )
    options = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=models.RegistrationOption.objects.all(),
        view_name="registration_option-detail",
    )
    approved_payments_total_amount = MoneySerializerField(read_only=True)
    initiate_payment_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="registration-initiate-payment"
    )

    talks = PresenterTalkSerializer(many=True, read_only=True)

    class Meta:
        model = models.Registration
        fields = (
            *BaseRegistrationSerializer.Meta.fields,
            # Participation
            "attending_dates",
            "attending_italt",
            "banquet_options",
            "participation_status",
            "options",
            # Fees
            "fee_type",
            "total_fee_amount",
            "approved_payments_total_amount",
            "has_approved_payment",
            "initiate_payment_url",
            # Presentation
            "presenting",
            "plenary",
            "poster",
            "graduation_talk",
            "graduation_presentation",
            "talks",
        )
        read_only_fields = ["fee_type"]


class RegistrationNonUniqueSerializer(serializers.HyperlinkedModelSerializer):
    """
    Like `BaseRegistrationSerializer`, but ignores uniqueness checks. Written
    for the get-or-create use case.
    """

    workshop = serializers.HyperlinkedRelatedField(
        queryset=models.Workshop.objects.all(),
        view_name="workshop-detail",
        lookup_field="slug",
    )
    user = serializers.HyperlinkedRelatedField(
        queryset=User.objects.all(), view_name="user-detail"
    )

    class Meta:
        model = models.Registration
        fields = ("workshop", "user")

    def get_unique_together_validators(self):
        return []


class RegistrationFeesSerializer(serializers.BaseSerializer):
    """
    Serializes all registration fees for a particular `Workshop` by `FeeType`.

    When instantiating this serializer, you must pass the request in the
    `context` argument dictionary. This is necessary in order to generate URLs
    for `RegistrationOption` instances.
    """

    def regn_option_fee_to_repr(self, regn_option, fee_type):
        """
        Serializes a `RegistrationOption` and its fee.
        """
        return {
            "url": reverse(
                "registration_option-detail",
                args=[regn_option.id],
                request=self.context["request"],
            ),
            "title": regn_option.title,
            "slug": regn_option.slug,
            "fee": regn_option.get_fee(fee_type),
        }

    def fees_to_repr(self, workshop, fee_type):
        """
        Serializes all fees of a `Workshop` and its
        `RegistrationOption`s.
        """
        fees_repr = {
            "base": workshop.get_base_fee(fee_type),
            "daily": workshop.get_daily_fee(fee_type),
            "registration_options": [
                self.regn_option_fee_to_repr(regn_option, fee_type)
                for regn_option in workshop.registration_options.all()
            ],
        }
        return (fee_type.name, fees_repr)

    def to_representation(self, workshop):  # pylint: disable=arguments-differ
        url = reverse(
            "registration_fee-detail",
            args=[workshop.slug],
            request=self.context["request"],
        )
        workshop_url = reverse(
            "workshop-detail",
            args=[workshop.slug],
            request=self.context["request"],
        )
        fees_by_fee_type = dict(
            self.fees_to_repr(workshop, fee_type)
            for fee_type in models.FeeType
        )
        return {
            "url": url,
            "workshop_url": workshop_url,
            "fees_by_fee_type": fees_by_fee_type,
        }


class RegistrationPaymentSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `RegistrationPayment` instances.
    """

    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="registration_payment-detail"
    )

    class Meta:
        model = models.RegistrationPayment
        fields = ("url", "registration", "status")


def one_time_charge_pay_url(charge):
    """
    Returns the URL at which the recipient pay the given charge.

    WARNING: this is tightly coupled to the frontend.
    """
    return "https://{}/pay-one-time-charge/{}".format(
        settings.FRONTEND_ROOT_DOMAIN, charge.pk
    )


class RecipientSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="user-detail")
    first_name = serializers.CharField(
        source="user_profile.first_name", read_only=True
    )
    last_name = serializers.CharField(
        source="user_profile.last_name", read_only=True
    )

    class Meta:
        model = User
        fields = ("url", "email", "first_name", "last_name")
        read_only_fields = ("email",)


class OneTimeChargeFullSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `OneTimeCharge` instances, as a privileged user should see
    it.
    """

    def validate_recipient(self, value):
        """Prevents updating the recipient field."""
        if self.instance and value != self.instance.recipient:
            raise serializers.ValidationError("Cannot modify recipient")
        return value

    def validate_amount(self, value):
        """Prevents updating the amount field."""
        if self.instance and value != self.instance.amount:
            raise serializers.ValidationError("Cannot modify amount")
        return value

    def get_pay_url(self, charge):
        """Proxy for one_time_charge_pay_url."""
        return one_time_charge_pay_url(charge)

    recipient = RecipientSerializer(read_only=True)
    recipient_url = serializers.HyperlinkedRelatedField(
        view_name="user-detail", source="recipient", queryset=User.objects
    )
    pay_url = serializers.SerializerMethodField()
    initiate_payment_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="onetimecharge-initiate-payment"
    )

    class Meta:
        model = models.OneTimeCharge
        fields = (
            "url",
            "recipient",
            "recipient_url",
            "amount",
            "status",
            "message",
            "comment",
            "pay_url",
            "initiate_payment_url",
            "created_on",
        )
        read_only_fields = ("status", "created_on")


class OneTimeChargeRecipientSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `OneTimeCharge` instances, as the recipient should see it.
    """

    def get_pay_url(self, charge):
        """Proxy for one_time_charge_pay_url."""
        return one_time_charge_pay_url(charge)

    recipient = RecipientSerializer()
    recipient_url = serializers.HyperlinkedRelatedField(
        view_name="user-detail", source="recipient", queryset=User.objects
    )
    pay_url = serializers.SerializerMethodField()
    initiate_payment_url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="onetimecharge-initiate-payment"
    )

    class Meta:
        model = models.OneTimeCharge
        fields = (
            "url",
            "recipient",
            "recipient_url",
            "amount",
            "status",
            "message",
            "pay_url",
            "initiate_payment_url",
            "created_on",
        )
        read_only_fields = (
            "recipient",
            "amount",
            "status",
            "message",
            "created_on",
        )


class OneTimeChargePaymentCheckStatusSerializer(serializers.Serializer):
    """
    Serializer for the check_status action of a OneTimeChargePayment view
    set.
    """

    transaction_id = serializers.CharField(
        write_only=True, min_length=2, max_length=20
    )


class OneTimeChargePaymentSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `OneTimeChargePayment` instances.
    """

    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name="onetimechargepayment-detail"
    )
    charge_url = serializers.HyperlinkedRelatedField(
        view_name="onetimecharge-detail", source="charge", read_only=True
    )

    class Meta:
        model = models.OneTimeChargePayment
        fields = ("url", "charge_url", "status")


class InviterSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `User`s who are members of the Inviters group.
    """

    first_name = serializers.CharField(
        source="user_profile.first_name", read_only=True
    )
    last_name = serializers.CharField(
        source="user_profile.last_name", read_only=True
    )
    affiliation_title = serializers.CharField(
        source="user_profile.affiliation_title", read_only=True
    )

    class Meta:
        model = User
        fields = (
            "url",
            "first_name",
            "last_name",
            "email",
            "affiliation_title",
        )
        read_only_fields = ("email",)


class InvitationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `Invitation` instances.
    """

    class Meta:
        model = models.Invitation
        fields = ("url", "workshop", "sender", "recipient")


class AffiliationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `Affiliation` instances.

    As of this writing, the representation contains only a single string, but
    we choose to serialize it as an object so that it is easy for clients to
    accept additional fields if we choose to add fields.
    """

    class Meta:
        model = models.Affiliation
        fields = ("url", "title")


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `Room` instances.
    """

    class Meta:
        model = models.Room
        fields = ("url", "workshop", "title")


class TalkScheduleSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for `TalkSchedule` instances.
    """

    class Meta:
        model = models.TalkSchedule
        fields = ("url", "title", "owner", "talk_structure")


# class PasswordResetSerializer(rest_auth_serializers.PasswordResetSerializer):
#     """
#     Extends rest_auth's password reset serializer in order to override the URL
#     in the password-reset email.
#     """

#     def get_email_options(self):
#         return {
#             "domain_override": settings.FRONTEND_ROOT_DOMAIN,
#             "email_template_name": "password_reset_email_custom_url.html",
#         }


class CustomRegisterSerializer(RestAuthRegisterSerializer):
    first_name = serializers.CharField(
        min_length=1,
        max_length=models.UserProfile._meta.get_field("first_name").max_length,
        required=True,
    )
    last_name = serializers.CharField(
        min_length=1,
        max_length=models.UserProfile._meta.get_field("last_name").max_length,
        required=True,
    )

    def save(self, request):
        user = super().save(request)
        first_name = self.validated_data.get("first_name", None)
        last_name = self.validated_data.get("last_name", None)
        if first_name is None or last_name is None:
            logger.warning("CustomRegisterSerializer got empty name!")
        else:
            user_profile = user.user_profile
            user_profile.first_name = first_name
            user_profile.last_name = last_name
            user_profile.save()
        logger.info("Created new user with email {}".format(user.email))
        return user


class UserWithRegnDataSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for UsersWithRegnDataView."""

    user_url = serializers.HyperlinkedIdentityField(view_name="user-detail")
    current_presenting = serializers.BooleanField(read_only=True)
    current_invited = serializers.BooleanField(read_only=True)
    current_inviter_url = serializers.HyperlinkedRelatedField(
        view_name="user-detail", source="current_inviter_pk", read_only=True
    )
    current_first_name = serializers.CharField(read_only=True)
    current_last_name = serializers.CharField(read_only=True)
    current_honorific = serializers.CharField(read_only=True)
    current_presenting_default = serializers.BooleanField(read_only=True)
    current_affiliation_title = serializers.CharField(read_only=True)

    class Meta:
        model = models.User
        fields = (
            "user_url",
            "email",
            "current_presenting",
            "current_invited",
            "current_inviter_url",
            "current_first_name",
            "current_last_name",
            "current_honorific",
            "current_presenting_default",
            "current_affiliation_title",
        )
        read_only_fields = ("url", "email")


class RegistrationAggregateStatsIta19Serializer(serializers.BaseSerializer):
    """Serializer for ita19 regn aggregate stats."""

    def to_representation(self, instance):
        participation_counts = dict(
            (
                status.name,
                instance.get("participation_status_{}".format(status.name)),
            )
            for status in models.ParticipationStatus
        )
        for key in [
            "participating",
            "participating_and_paid",
            "participating_and_unpaid",
        ]:
            participation_counts[key] = instance.get(key)

        sunday_reception_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            sunday_reception_counts[choice][condition] = instance.get(
                "ita19_sundayReception_{}_{}".format(choice, condition)
            )

        date_strs = [
            "2019-02-11",
            "2019-02-12",
            "2019-02-13",
            "2019-02-14",
            "2019-02-15",
        ]
        attending_date_counts = dict(
            (
                date_str,
                {
                    "participating": instance.get(
                        "attending_date_{}_participating".format(date_str)
                    ),
                    "paid": instance.get(
                        "attending_date_{}_paid".format(date_str)
                    ),
                },
            )
            for date_str in date_strs
        )

        monday_lunch_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            monday_lunch_counts[choice][condition] = instance.get(
                "ita25_mondayLunch_{}_{}".format(choice, condition)
            )

        wednesday_banquet_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            wednesday_banquet_counts[choice][condition] = instance.get(
                "ita25_banquetSelf_{}_{}".format(choice, condition)
            )

        valentines_event_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            valentines_event_counts[choice][condition] = instance.get(
                "ita25_valentinesEvent_{}_{}".format(choice, condition)
            )
        
        saturday_workshop_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            saturday_workshop_counts[choice][condition] = instance.get(
                "ita25_saturdayWorkshop_{}_{}".format(choice, condition)
            )

        return {
            "participation_counts": participation_counts,
            "attending_date_counts": attending_date_counts,
            "sunday_reception_counts": sunday_reception_counts,
            "monday_lunch_counts": monday_lunch_counts,
            "wednesday_banquet_counts": wednesday_banquet_counts,
            "valentines_event_counts": valentines_event_counts,
            "saturday_workshop_counts": saturday_workshop_counts,
            "total_amount_paid": instance.get("total_amount_paid"),
        }

class RegistrationAggregateStatsIta22Serializer(serializers.BaseSerializer):
    """Serializer for ita22 regn aggregate stats."""

    def to_representation(self, instance):
        participation_counts = dict(
            (
                status.name,
                instance.get("participation_status_{}".format(status.name)),
            )
            for status in models.ParticipationStatus
        )
        for key in [
            "participating",
            "participating_and_paid",
            "participating_and_unpaid",
        ]:
            participation_counts[key] = instance.get(key)

        sunday_reception_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            sunday_reception_counts[choice][condition] = instance.get(
                "ita22_sundayReception_{}_{}".format(choice, condition)
            )

        date_strs = [
            "2022-05-22",
            "2022-05-23",
            "2022-05-24",
            "2022-05-25",
            "2022-05-26",
            "2022-05-27",
        ]
        attending_date_counts = dict(
            (
                date_str,
                {
                    "participating": instance.get(
                        "attending_date_{}_participating".format(date_str)
                    ),
                    "paid": instance.get(
                        "attending_date_{}_paid".format(date_str)
                    ),
                },
            )
            for date_str in date_strs
        )

        monday_lunch_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            monday_lunch_counts[choice][condition] = instance.get(
                "ita22_mondayLunch_{}_{}".format(choice, condition)
            )

        wednesday_banquet_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            wednesday_banquet_counts[choice][condition] = instance.get(
                "ita22_banquetSelf_{}_{}".format(choice, condition)
            )

        valentines_event_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            valentines_event_counts[choice][condition] = instance.get(
                "ita22_valentinesEvent_{}_{}".format(choice, condition)
            )

        return {
            "participation_counts": participation_counts,
            "attending_date_counts": attending_date_counts,
            "sunday_reception_counts": sunday_reception_counts,
            "monday_lunch_counts": monday_lunch_counts,
            "wednesday_banquet_counts": wednesday_banquet_counts,
            "valentines_event_counts": valentines_event_counts,
            "total_amount_paid": instance.get("total_amount_paid"),
        }

class RegistrationAggregateStatsIta23Serializer(serializers.BaseSerializer):
    """Serializer for ita23 regn aggregate stats."""

    def to_representation(self, instance):
        participation_counts = dict(
            (
                status.name,
                instance.get("participation_status_{}".format(status.name)),
            )
            for status in models.ParticipationStatus
        )
        for key in [
            "participating",
            "participating_and_paid",
            "participating_and_unpaid",
        ]:
            participation_counts[key] = instance.get(key)

        sunday_reception_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            sunday_reception_counts[choice][condition] = instance.get(
                "ita25_sundayReception_{}_{}".format(choice, condition)
            )

        date_strs = [
            "2025-02-09",
            "2025-02-10",
            "2025-02-11",
            "2025-02-12",
            "2025-02-13",
            "2025-02-14",
        ]
        attending_date_counts = dict(
            (
                date_str,
                {
                    "participating": instance.get(
                        "attending_date_{}_participating".format(date_str)
                    ),
                    "paid": instance.get(
                        "attending_date_{}_paid".format(date_str)
                    ),
                },
            )
            for date_str in date_strs
        )

        monday_lunch_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            monday_lunch_counts[choice][condition] = instance.get(
                "ita25_mondayLunch_{}_{}".format(choice, condition)
            )

        italt_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            italt_counts[choice][condition] = instance.get(
                "ita25_italt_{}_{}".format(choice, condition)
            )

        wednesday_banquet_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            wednesday_banquet_counts[choice][condition] = instance.get(
                "ita25_banquetSelf_{}_{}".format(choice, condition)
            )

        valentines_event_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            valentines_event_counts[choice][condition] = instance.get(
                "ita25_valentinesEvent_{}_{}".format(choice, condition)
            )

        return {
            "participation_counts": participation_counts,
            "attending_date_counts": attending_date_counts,
            "sunday_reception_counts": sunday_reception_counts,
            "monday_lunch_counts": monday_lunch_counts,
            "wednesday_banquet_counts": wednesday_banquet_counts,
            "valentines_event_counts": valentines_event_counts,
            "italt_counts": italt_counts,
            "total_amount_paid": instance.get("total_amount_paid"),
            "total_amount_unpaid": instance.get("total_amount_unpaid"),
            "banquet_options": instance.get("banquet_options")
        }
        
class RegistrationAggregateStatsIta26Serializer(serializers.BaseSerializer):
    """Serializer for ita26 regn aggregate stats."""

    def to_representation(self, instance):
        participation_counts = dict(
            (
                status.name,
                instance.get("participation_status_{}".format(status.name)),
            )
            for status in models.ParticipationStatus
        )
        for key in [
            "participating",
            "participating_and_paid",
            "participating_and_unpaid",
        ]:
            participation_counts[key] = instance.get(key)

        sunday_reception_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            sunday_reception_counts[choice][condition] = instance.get(
                "ita26_sundayReception_{}_{}".format(choice, condition)
            )

        date_strs = [
            "2026-02-09",
            "2026-02-10",
            "2026-02-11",
            "2026-02-12",
            "2026-02-13",
        ]
        attending_date_counts = dict(
            (
                date_str,
                {
                    "participating": instance.get(
                        "attending_date_{}_participating".format(date_str)
                    ),
                    "paid": instance.get(
                        "attending_date_{}_paid".format(date_str)
                    ),
                },
            )
            for date_str in date_strs
        )

        monday_lunch_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            monday_lunch_counts[choice][condition] = instance.get(
                "ita26_mondayLunch_{}_{}".format(choice, condition)
            )

        italt_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "attending"], ["participating", "paid"]
        ):
            italt_counts[choice][condition] = instance.get(
                "ita26_italt_{}_{}".format(choice, condition)
            )

        wednesday_banquet_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            wednesday_banquet_counts[choice][condition] = instance.get(
                "ita26_banquetSelf_{}_{}".format(choice, condition)
            )

        valentines_event_counts = collections.defaultdict(dict)
        for choice, condition in itertools.product(
            ["notAttending", "selfOnly", "selfPlus1", "selfPlus2", "total"],
            ["participating", "paid"],
        ):
            valentines_event_counts[choice][condition] = instance.get(
                "ita26_valentinesEvent_{}_{}".format(choice, condition)
            )

        return {
            "participation_counts": participation_counts,
            "attending_date_counts": attending_date_counts,
            "sunday_reception_counts": sunday_reception_counts,
            "monday_lunch_counts": monday_lunch_counts,
            "wednesday_banquet_counts": wednesday_banquet_counts,
            "valentines_event_counts": valentines_event_counts,
            "italt_counts": italt_counts,
            "total_amount_paid": instance.get("total_amount_paid"),
            "total_amount_unpaid": instance.get("total_amount_unpaid"),
            "banquet_options": instance.get("banquet_options")
        }

