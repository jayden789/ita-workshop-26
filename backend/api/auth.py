"""
Authentication-related utilities.
"""

import logging

from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings as django_settings
from django.core import mail


logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


def _get_create_user_confirmation_url(key):
    frontend_root = django_settings.FRONTEND_ROOT_DOMAIN
    return "https://{root}/create_account/confirm/{key}".format(
        root=frontend_root, key=key
    )


def _render_create_user_confirmation_mail_body(url):
    # noqa: E501
    return """Hello,

You are receiving this email because someone has requested a new ITA user account, using your email address.
If you did not make this request, you may safely ignore this email.

Please verify your email address by visiting the following page: {url}

Thanks for visiting the ITA site!

— The ITA team""".format(
        url=url
    )


class CustomAccountAdapter(DefaultAccountAdapter):
    """
    Overrides some behaviors of DefaultAccountAdapter.
    """

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        logger.info(
            "BEGIN send_confirmation_mail for email %s and key %s",
            emailconfirmation.email_address.email,
            emailconfirmation.key
        )
        key = emailconfirmation.key
        confirmation_url = _get_create_user_confirmation_url(key)
        body = _render_create_user_confirmation_mail_body(confirmation_url)
        
        subject = "Your new ITA user account"
        sender = django_settings.DEFAULT_FROM_EMAIL
        recipients = [emailconfirmation.email_address.email]
        bcc = [django_settings.DEFAULT_BCC_EMAIL]
        message = mail.EmailMessage(
            subject=subject,
            body=body,
            from_email=sender,
            to=recipients,
            bcc=bcc,
        )
        sent = message.send()
        logger.info(
            "END send_confirmation_mail for email %s and key %s; sent = %s",
            emailconfirmation.email_address.email,
            emailconfirmation.key,
            sent
        )
