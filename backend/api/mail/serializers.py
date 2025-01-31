"""
DRF serializers for mail system views.
"""

import logging

from django.contrib.auth import get_user_model
from rest_framework import serializers as drf_serializers

User = get_user_model()  # pylint: disable=invalid-name

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


class VerifyMessageRequestSerializer(drf_serializers.Serializer):
    """Serializer for verify_message requests."""

    subject = drf_serializers.CharField(max_length=200, write_only=True)
    body = drf_serializers.CharField(max_length=10000, write_only=True)
    recipient_mailing_list = drf_serializers.CharField(
        max_length=100, default=None, write_only=True
    )
    recipient_user_urls = drf_serializers.HyperlinkedRelatedField(
        default=list,
        many=True,
        queryset=User.objects.select_related(
            "user_profile", "affiliation"
        ),
        view_name="user-detail",
        write_only=True,
    )

    def validate(self, data):
        has_mailing_list = data["recipient_mailing_list"] is not None
        has_user_urls = bool(data["recipient_user_urls"])
        if has_mailing_list ^ has_user_urls:
            return data
        raise drf_serializers.ValidationError(
            "Either recipient_mailing_list or recipient_user_urls must be"
            " provided, but not both."
        )


class MessagePreviewSerializer(drf_serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
            "from": obj.from_email,
            "to": obj.to,
            "subject": obj.subject,
            "body": obj.body,
            "bcc": obj.bcc,
        }


class RecipientSerializer(drf_serializers.BaseSerializer):
    def to_representation(self, obj):
        user = obj["user"]
        user_profile = obj["user_profile"]
        return {
            "email": user.email,
            "first_name": user_profile.first_name,
            "last_name": user_profile.last_name,
        }
