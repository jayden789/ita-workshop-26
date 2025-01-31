from . import ita23

POST_PAYMENT_HOOKS = {"ita24": ita23.send_receipt_email}


def call_post_payment_hooks(registration_payment):
    """
    Calls all registered post-payment hooks, passing the given
    RegistrationPayment.
    """
    workshop_slug = registration_payment.registration.workshop.slug
    if workshop_slug in POST_PAYMENT_HOOKS:
        POST_PAYMENT_HOOKS[workshop_slug](registration_payment)
