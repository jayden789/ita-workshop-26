# api/email_backends.py
import smtplib
import ssl
import logging
from django.core.mail.backends.base import BaseEmailBackend
from django.core.mail import EmailMessage
from django.conf import settings

EMAIL_HOST = settings.EMAIL_HOST
EMAIL_PORT = settings.EMAIL_PORT
EMAIL_HOST_USER = settings.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = settings.EMAIL_HOST_PASSWORD
SMTP_PORT = EMAIL_PORT


logger = logging.getLogger(__name__)


class CustomSMTPBackend(BaseEmailBackend):
    """
    Custom SMTP backend with DH key fix for your ef send_messages logic.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context = ssl.create_default_context()
        self.context.set_ciphers('HIGH:!DH:!aNULL')

    def send_messages(self, email_messages):
        
        num_sent = 0
        for msg in email_messages:
            try:
                with smtplib.SMTP(EMAIL_HOST, SMTP_PORT, timeout=30) as server:
                    server.set_debuglevel(1)  # SMTP verbose logs
                    logger.info("SMTP Connected")
                    server.starttls(context=self.context)
                    logger.info("TLS OK") 
                    server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
                    logger.info("Auth OK")
                    raw_msg = msg.message()
                    server.send_message(raw_msg)
                    num_sent += 1
                    logger.info("SENT!")
                    
            except Exception as e:
                logger.error(f"FAILED to {msg.to}: {type(e).__name__}: {str(e)}")
        
        logger.info(f"{num_sent}/{len(email_messages)} sent")
        return num_sent
