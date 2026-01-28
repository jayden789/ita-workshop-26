"""
API views for the mail system.
"""

import logging
import ssl
import smtplib

from django.contrib.auth import get_user_model
from django.core import mail as django_mail
from rest_framework import (
    decorators,
    permissions,
    response,
    viewsets,
    exceptions as drf_exceptions,
)

from api.mail import (
    lists as mail_lists,
    serializers as mail_serializers,
    templating,
)
from django.conf import settings

EMAIL_HOST = settings.EMAIL_HOST
EMAIL_PORT = settings.EMAIL_PORT
EMAIL_HOST_USER = settings.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = settings.EMAIL_HOST_PASSWORD

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name

User = get_user_model()  # pylint: disable=invalid-name


def generate_messages_for_mailing_list(
    subject, body_template, mailing_list, max_messages=None
):
    contexts = list(mailing_list.get_contexts())
    messages = list(
        templating.generate_messages(
            subject, body_template, contexts, max_messages=max_messages
        )
    )
    return contexts, messages


def generate_messages_for_users(
    subject, body_template, user_list, max_messages=None
):
    contexts = list(mail_lists.UserMailingList(user_list).get_contexts())
    messages = list(
        templating.generate_messages(
            subject, body_template, contexts, max_messages=max_messages
        )
    )
    return contexts, messages


def generate_contexts_and_messages(
    subject,
    body_template,
    mailing_list_name,
    user_list,
    current_user,
    max_messages=None,
):
    list_init_args = {
        "current_user": current_user
    }

    try:
        mailing_list = mail_lists.get_mailing_list(
            mailing_list_name, list_init_args
        )
        if mailing_list_name is not None:
            contexts, messages = generate_messages_for_mailing_list(
                subject, body_template, mailing_list, max_messages=max_messages
            )
        else:
            contexts, messages = generate_messages_for_users(
                subject, body_template, user_list, max_messages=max_messages
            )
    except templating.UnsupportedTagsError as err:
        tags = ", ".join("${}".format(tag) for tag in err.tags)
        raise drf_exceptions.ValidationError(
            {"body": "These tags are not supported: {}".format(tags)}
        )
    return contexts, messages


def send_messages(messages):
    """
    Sends Django EmailMessages using custom SMTP with DH key fix.
    """
    num_sent = 0
    context = ssl.create_default_context()
    context.set_ciphers('HIGH:!DH:!aNULL')
    
    for msg in messages:
        try:
            raw_msg = msg.message()
            
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=60) as server:
                server.starttls(context=context)
                server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
                raw_msg.add_header('Bcc', settings.DEFAULT_BCC_EMAIL)
                server.send_message(raw_msg)
            num_sent += 1
            
        except Exception as e:
            logger.error(f"Failed to send to {msg.to()}: {type(e).__name__}: {str(e)}")
    
    logger.info(f"Successfully sent {num_sent}/{len(messages)} emails")
    return num_sent


class MailViewSet(viewsets.GenericViewSet):
    """Mail system views."""

    class Perm(permissions.BasePermission):
        """Permits staff only."""

        def has_permission(self, request, view):
            return request.user.is_staff

    permission_classes = (Perm,)

    def get_serializer_class(self):
        if self.action in ["verify_message", "send_message"]:
            return mail_serializers.VerifyMessageRequestSerializer
        raise ValueError("Unsupported action")

    @decorators.action(methods=["POST"], detail=False)
    def verify_message(self, request):  # pylint: disable=no-self-use
        """
        Verify that a message can be sent to the specified recipients, and
        return the full list of recipients, along with previews of some
        rendered messages.
        """
        serializer = self.get_serializer_class()(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        subject = serializer.validated_data["subject"]
        body_template = serializer.validated_data["body"]
        mailing_list_name = serializer.validated_data["recipient_mailing_list"]
        user_list = serializer.validated_data["recipient_user_urls"]

        contexts, messages = generate_contexts_and_messages(
            subject,
            body_template,
            mailing_list_name,
            user_list,
            request.user,
            max_messages=3,
        )

        recipient_serializer = mail_serializers.RecipientSerializer(
            contexts, many=True
        )
        preview_serializer = mail_serializers.MessagePreviewSerializer(
            [message for (user, message) in messages], many=True
        )

        return response.Response(
            {
                "recipients": recipient_serializer.data,
                "previews": preview_serializer.data,
            }
        )

    @decorators.action(methods=["POST"], detail=False)
    def send_message(self, request):  # pylint: disable=no-self-use
        """
        Sends a message to the specified recipients, and return the number of
        successfully-sent email messages.
        """
        serializer = self.get_serializer_class()(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        subject = serializer.validated_data["subject"]
        body_template = serializer.validated_data["body"]
        mailing_list_name = serializer.validated_data["recipient_mailing_list"]
        user_list = serializer.validated_data["recipient_user_urls"]

        _, user_messages = generate_contexts_and_messages(
            subject, body_template, mailing_list_name, user_list, request.user
        )
        messages = [message for (user, message) in user_messages]
        num_sent = send_messages(messages)
        return response.Response({"num_sent": num_sent})
