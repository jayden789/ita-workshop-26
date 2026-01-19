"""
Payment-related views and helper functions.
"""

from collections import namedtuple
from decimal import Decimal
import json
import logging

from authorizenet import apicontractsv1
from authorizenet.apicontrollers import (
    getHostedPaymentPageController,
    getTransactionDetailsController,
)

from django.conf import settings as django_settings

from api import models

AuthorizeNetApiMessage = namedtuple("AuthorizeNetApiMessage", "code text")
TransactionDetails = namedtuple(
    "TransactionDetails",
    ["transaction_id", "response_code", "invoice_number", "settle_amount"],
)

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


def get_api_response_messages(response):
    """Return list of response messages."""
    if response.messages is None:
        return []
    return [
        AuthorizeNetApiMessage(message["code"], message["text"])
        for message in response.messages.message
    ]


def is_api_response_ok(response):
    """Return whether the response has the 'Ok' result code."""
    return (response is not None) and (
        response.messages.resultCode == apicontractsv1.messageTypeEnum.Ok
    )


def build_merchant_auth():
    """Build a merchantAuthentication object."""
    merchant_auth = apicontractsv1.merchantAuthenticationType()
    merchant_auth.name = django_settings.AUTHORIZE_NET_API_CREDENTIALS_NAME
    merchant_auth.transactionKey = (
        django_settings.AUTHORIZE_NET_API_CREDENTIALS_TRANSACTION_KEY
    )
    return merchant_auth


def build_order(*, invoice_number, description):
    """Build an order object."""
    order = apicontractsv1.orderType()
    order.invoiceNumber = invoice_number
    order.description = description
    return order


def build_transaction_request(*, amount, invoice_number, description):
    """Build a transactionRequest object, with the given amount."""
    request = apicontractsv1.transactionRequestType()
    request.transactionType = (
        apicontractsv1.transactionTypeEnum.authCaptureTransaction
    )
    request.amount = amount
    request.order = build_order(
        invoice_number=invoice_number, description=description
    )
    return request


def build_setting(name, value):
    """Build a setting with given name and value."""
    setting = apicontractsv1.settingType()
    setting.settingName = name
    setting.settingValue = json.dumps(value)
    return setting


def build_return_options_setting(generated_uuid):
    """
    Build a hostedPaymentReturnOptions setting.

    Note that because Authorize.net has a crappy API, they send a
    `transactResponse` message from their iframe only if `showReceipt` is
    False, and `url` is non-empty. Also, `url` must use HTTPS in order to
    satisfy browsers' Content Security Policy. This crucial information can be
    found not in their official documentation, but in a support forum post:

    https://community.developer.authorize.net/t5/Integration-and-Testing/Not-getting-transactResponse-event-when-using-IFrameCommunicator/m-p/59658/highlight/true#M34236
    """
    redirect_domain = django_settings.AUTHORIZE_NET_API_REDIRECT_DOMAIN
    return build_setting(
        apicontractsv1.settingNameEnum.hostedPaymentReturnOptions,
        {"showReceipt": True, "url": str(redirect_domain)+"/register?confirmationToken="+str(generated_uuid), "urlText": "Click for Receipt", "cancelUrl": str(redirect_domain)+"/register?paymentCancelled=true", "cancelUrlText": "Cancel"},
    )


def build_order_options_setting():
    """Build a hostedPaymentOrderOptions setting."""
    return build_setting(
        apicontractsv1.settingNameEnum.hostedPaymentOrderOptions,
        {"show": True, "merchantName": "Information Theory and Applications"},
    )


def build_customer_options_setting():
    """Build a hostedPaymentCustomerOptions setting."""
    return build_setting(
        apicontractsv1.settingNameEnum.hostedPaymentCustomerOptions,
        {"addPaymentProfile": False},
    )


def build_iframe_communicator_setting():
    """Build a hostedPaymentIFrameCommunicatorUrl setting."""
    return build_setting(
        apicontractsv1.settingNameEnum.hostedPaymentIFrameCommunicatorUrl,
        {
            "url": "https://ita.ucsd.edu/workshop/iframe_communicator"
        },
    )


def build_hosted_payment_settings(
    *,
    return_options_setting,
    order_options_setting,
    customer_options_setting,
    iframe_communicator_setting
):
    """Build an arrayOfSettings object for the hostedPaymentSettings field."""
    settings = apicontractsv1.ArrayOfSetting()
    settings.setting.append(return_options_setting)
    settings.setting.append(order_options_setting)
    settings.setting.append(customer_options_setting)
    settings.setting.append(iframe_communicator_setting)
    return settings


def build_get_hosted_payment_page_request(
    merchant_auth, transaction_request, hosted_payment_settings
):
    """Build a getHostedPaymentPageRequest."""
    request = apicontractsv1.getHostedPaymentPageRequest()
    request.merchantAuthentication = merchant_auth
    request.transactionRequest = transaction_request
    request.hostedPaymentSettings = hosted_payment_settings
    return request


def execute_get_hosted_payment_page_request(request, environment):
    """Executed a getHostedPaymentPageRequest and return the response."""
    controller = getHostedPaymentPageController(request)
    controller.setenvironment(environment)
    controller.execute()
    return controller.getresponse()


def get_hosted_payment_page_url():
    """Return the URL for a hosted payment page."""
    return django_settings.AUTHORIZE_NET_HOSTED_PAYMENT_PAGE_URL


def get_payment_page_token(*, regn_payment, description):
    """
    From a `RegistrationPayment` instance, does the following:

    - builds a transactionRequest for a Registration object
    - builds and executes a paymentPageRequest for the transaction
    - extracts the hosted payment page token

    Returns None if the payment page request fails.
    """

    amount = regn_payment.amount
    invoice_number = regn_payment.invoice_number

    # Build merchantAuth and transactionRequest
    merchant_auth = build_merchant_auth()
    transaction_request = build_transaction_request(
        amount=amount, invoice_number=invoice_number, description=description
    )
    print("LINE 1>>>>>")
    # Build hostedPaymentSettings
    return_options_setting = build_return_options_setting(regn_payment.continue_uuid)
    order_options_setting = build_order_options_setting()
    customer_options_setting = build_customer_options_setting()
    iframe_communicator_setting = build_iframe_communicator_setting()
    hosted_payment_settings = build_hosted_payment_settings(
        return_options_setting=return_options_setting,
        order_options_setting=order_options_setting,
        customer_options_setting=customer_options_setting,
        iframe_communicator_setting=iframe_communicator_setting,
    )
    print("LINE 2>>>>>")

    # Build and execute payment page request
    payment_page_request = build_get_hosted_payment_page_request(
        merchant_auth, transaction_request, hosted_payment_settings
    )
    environment = django_settings.AUTHORIZE_NET_ENVIRONMENT
    response = execute_get_hosted_payment_page_request(
        payment_page_request, environment
    )
    if is_api_response_ok(response):
        return str(response.token)


    logger.error("Payment page request failed. Messages:")
    for error_message in get_api_response_messages(response):
        logger.error("  - {!r}".format(error_message))

    return None


def get_payment_page_token_for_one_time_charge_payment(
    *, charge_payment, description
):
    """
    From a `OneTimeChargePayment` instance, does the following:

    - builds a transactionRequest
    - builds and executes a paymentPageRequest for the transaction
    - extracts the hosted payment page token

    Returns None if the payment page request fails.
    """

    amount = charge_payment.charge.amount
    invoice_number = charge_payment.invoice_number

    # Build merchantAuth and transactionRequest
    merchant_auth = build_merchant_auth()
    transaction_request = build_transaction_request(
        amount=amount, invoice_number=invoice_number, description=description
    )

    # Build hostedPaymentSettings
    return_options_setting = build_return_options_setting(charge_payment.pk)
    order_options_setting = build_order_options_setting()
    customer_options_setting = build_customer_options_setting()
    iframe_communicator_setting = build_iframe_communicator_setting()
    hosted_payment_settings = build_hosted_payment_settings(
        return_options_setting=return_options_setting,
        order_options_setting=order_options_setting,
        customer_options_setting=customer_options_setting,
        iframe_communicator_setting=iframe_communicator_setting,
    )

    # Build and execute payment page request
    payment_page_request = build_get_hosted_payment_page_request(
        merchant_auth, transaction_request, hosted_payment_settings
    )
    environment = django_settings.AUTHORIZE_NET_ENVIRONMENT
    response = execute_get_hosted_payment_page_request(
        payment_page_request, environment
    )
    if is_api_response_ok(response):
        return str(response.token)

    logger.error("Payment page request failed. Messages:")
    for error_message in get_api_response_messages(response):
        logger.error("  - {!r}".format(error_message))

    return None


def build_transaction_details_request(merchant_auth, transaction_id):
    """
    Build a transaction details request.
    """
    request = apicontractsv1.getTransactionDetailsRequest()
    request.merchantAuthentication = merchant_auth
    request.transId = transaction_id
    return request


def execute_transaction_details_request(request, environment):
    """
    Execute a transaction details request.
    """
    controller = getTransactionDetailsController(request)
    controller.setenvironment(environment)
    controller.execute()
    return controller.getresponse()


def get_transaction_details(transaction_id):
    """
    Return the transaction details corresponding to the given transaction ID,
    by calling Authorize.net's Get Transaction Details API.
    """
    merchant_auth = build_merchant_auth()
    transaction_details_request = build_transaction_details_request(
        merchant_auth, transaction_id
    )
    environment = django_settings.AUTHORIZE_NET_ENVIRONMENT
    response = execute_transaction_details_request(
        transaction_details_request, environment
    )

    if not is_api_response_ok(response):
        logger.error("Get Transaction Details request failed. Messages:")
        for error_message in get_api_response_messages(response):
            logger.error("  - {!r}".format(error_message))
        return None

    response_transaction_id = str(response.transaction.transId)
    response_response_code = str(response.transaction.responseCode)
    response_invoice_number = str(response.transaction.order.invoiceNumber)
    response_settle_amount = Decimal(str(response.transaction.settleAmount))
    transaction_details = TransactionDetails(
        transaction_id=response_transaction_id,
        response_code=response_response_code,
        invoice_number=response_invoice_number,
        settle_amount=response_settle_amount,
    )

    logger.info(
        "Successfully got transaction details for transaction_id={!s}:"
        " {!r}".format(transaction_id, transaction_details)
    )

    return transaction_details


def validate_transaction_matches_payment(transaction_details, regn_payment):
    """
    Return True if the given `TransactionDetails` match the given
    `RegistrationPayment`, or False otherwise.
    """

    # Invoice numbers must match
    if transaction_details.invoice_number != regn_payment.invoice_number:
        return False

    # If transaction settles, it should match correct amount
    settled = transaction_details.response_code == 1
    same_amount = transaction_details.settle_amount == regn_payment.amount
    if settled and not same_amount:
        return False

    return True


def validate_transaction_matches_one_time_charge_payment(
    transaction_details, charge_payment
):
    """
    Return True if the given `TransactionDetails` match the given
    `OneTimeChargePayment`, or False otherwise.
    """

    # Invoice numbers must match
    if transaction_details.invoice_number != charge_payment.invoice_number:
        return False

    # If transaction settles, it should match correct amount
    settled = transaction_details.response_code == 1
    same_amount = (
        transaction_details.settle_amount == charge_payment.charge.amount
    )
    if settled and not same_amount:
        return False

    return True


TRANSACTION_RESPONSE_CODE_CONVERSION = {
    "1": models.RegistrationPaymentStatus.APPROVED,
    "2": models.RegistrationPaymentStatus.DECLINED,
    "3": models.RegistrationPaymentStatus.ERROR,
    "4": models.RegistrationPaymentStatus.HELD_FOR_REVIEW,
}


def transaction_details_to_payment_status(transaction_details):
    """
    Return the `RegistrationPaymentStatus` corresponding to the given
    `TransactionDetails`.

    <https://support.authorize.net/s/article/How-Do-I-Look-up-Authorize-Net-Api-Response-Codes>
    """
    try:
        return TRANSACTION_RESPONSE_CODE_CONVERSION[
            transaction_details.response_code
        ]
    except KeyError:
        raise ValueError("Unrecognized response code")


def transaction_details_to_one_time_charge_payment_status(transaction_details):
    try:
        return {
            "1": models.OneTimeChargePaymentStatus.APPROVED,
            "2": models.OneTimeChargePaymentStatus.DECLINED,
            "3": models.OneTimeChargePaymentStatus.ERROR,
            "4": models.OneTimeChargePaymentStatus.HELD_FOR_REVIEW,
        }[transaction_details.response_code]
    except KeyError:
        raise ValueError("Unrecognized response code")
