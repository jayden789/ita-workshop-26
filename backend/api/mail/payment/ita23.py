"""Template rendering for ITA 2024 registration payment receipts."""

from email.mime.application import MIMEApplication
import datetime
from django.conf import settings as django_settings
from django.core import mail
import subprocess
import os

from api.models import (
    Registration,
    RegistrationPayment,
    RegistrationPaymentStatus,
)


def _are_dates_consecutive(dates):
    return all(
        (d2 - d1 == datetime.timedelta(days=1))
        for d1, d2 in zip(dates[:-1], dates[1:])
    )


def _render_attendance_day(date):
    return date.strftime("%a")


def _render_attendance(regn):
    dates = sorted(d.date_value for d in regn.attending_dates.all())
    if _are_dates_consecutive(dates):
        return "{} to {}".format(
            _render_attendance_day(dates[0]), _render_attendance_day(dates[-1])
        )
    return ", ".join(_render_attendance_day(date) for date in dates)


def _render_sunday_reception(regn):
    options = regn.selected_option_slugs()
    choice = None
    if "ita25_sundayReception_selfOnly" in options:
        choice = "one guest"
    if "ita25_sundayReception_selfPlus1" in options:
        choice = "two guests"
    if "ita25_sundayReception_selfPlus2" in options:
        choice = "three guests"
    if choice is None:
        return []
    return ["Sunday reception: {}".format(choice)]


def _render_monday_lunch(regn):
    # Same code format as others, for consistency
    options = regn.selected_option_slugs()
    choice = None
    if "ita24_mondayLunch_attending" in options:
        choice = "one guest"
    if choice is None:
        return []
    return ["Monday lunch: {}".format(choice)]


def _render_wednesday_banquet(regn):
    options = regn.selected_option_slugs()
    choice = None
    if "ita25_banquetSelf_selfOnly" in options:
        choice = "one guest"
    if "ita25_banquetSelf_selfPlus1" in options:
        choice = "two guests"
    if "ita25_banquetSelf_selfPlus2" in options:
        choice = "three guests"
    if choice is None:
        return []
    return ["Wednesday banquet: {}".format(choice)]


def _render_valentines_event(regn):
    options = regn.selected_option_slugs()
    choice = None
    if "ita24_valentinesEvent_selfOnly" in options:
        choice = "one guest"
    if "ita24_valentinesEvent_selfPlus1" in options:
        choice = "two guests"
    if "ita24_valentinesEvent_selfPlus2" in options:
        choice = "three guests"
    if choice is None:
        return []
    return ["Thursday dinner: {}".format(choice)]


def _render_registration_options(regn):
    return (
        _render_sunday_reception(regn)
        + _render_wednesday_banquet(regn)
    )

def getReciept(registration_payment):
    regn = registration_payment.registration
    _ = 0
    options = regn.selected_option_slugs()
    receptionCnt = None
    banquetCnt = None 
    # attendingItalt = None 
    if "ita25_sundayReception_selfOnly" in options:
        receptionCnt = "1"
    if "ita25_sundayReception_selfPlus1" in options:
        receptionCnt = "2"
    if "ita25_sundayReception_selfPlus2" in options:
        receptionCnt = "3"
    if receptionCnt is None:
        receptionCnt = "N/A"
    
    if "ita25_banquetSelf_selfOnly" in options:
        banquetCnt = "1"
    if "ita25_banquetSelf_selfPlus1" in options:
        banquetCnt = "2"
    if "ita25_banquetSelf_selfPlus2" in options:
        banquetCnt = "3"
    if banquetCnt is None:
        banquetCnt = "N/A"

    # if "ita24_italt_attending" in options:
    #     attendingItalt = "1"
    # if "ita24_italt_notAttending" in options:
    #     attendingItalt = "N/A"

    banquetFees = "-"
    receptionFees = "-"
    noOfdaysFees = "-"
    register_fees ="-"
    # italtFees = "-"
    isStudent = False
    isAffiliate = False
    if (regn.fee_type == "Student" or regn.fee_type == "STUDENT"):
        isStudent = True
    if (regn.fee_type == "Affiliate" or regn.fee_type == "AFFILIATE"):
        isAffiliate = True
    elif regn.user_profile.is_student:
        isStudent = True
    
    recep_cnt = 0 
    ban_cnt = 0
    # italt_cnt = 0
    if receptionCnt!= "N/A":
        recep_cnt = int(receptionCnt)
    if banquetCnt != "N/A":
        ban_cnt = int(banquetCnt)
    # if attendingItalt != "N/A":
    #     italt_cnt = 1
    
    base_cost_student = 200
    daily_cost = 45
    daily_cost_normal = 70
    reception_cost = 25
    reception_cost_normal = 40
    banq = 60
    banq_normal = 95
    # italt = 45
    # italt_normal = 75

    # if base_cost_student  + len(regn.attending_dates.all())*daily_cost + reception_cost*recep_cnt + banq*ban_cnt + italt_cnt * italt == int(registration_payment.amount):
    #     isStudent = True

    # if base_cost_student  + len(regn.attending_dates.all())*daily_cost_normal + reception_cost_normal*recep_cnt + banq_normal*ban_cnt + italt_cnt * italt_normal == int(registration_payment.amount):
    #     isAffiliate = True

    if isStudent:
        register_fees = str(base_cost_student)
        noOfdaysFees = str(len(regn.attending_dates.all())*daily_cost)
        if receptionCnt!= "N/A":
            receptionFees = str(reception_cost*int(receptionCnt))
        if banquetCnt != "N/A":
            banquetFees = str(banq*int(banquetCnt))
        # if attendingItalt != "N/A":
        #     italtFees = str(italt)
    elif isAffiliate:
        register_fees = "200"
        noOfdaysFees = str(len(regn.attending_dates.all())*daily_cost_normal)
        if receptionCnt!= "N/A":
            receptionFees = str(reception_cost_normal*int(receptionCnt))
        if banquetCnt != "N/A":
            banquetFees = str(banq_normal*int(banquetCnt))
        # if attendingItalt != "N/A":
        #     italtFees = str(italt_normal) 
    else:
        register_fees = "300"
        noOfdaysFees = str(len(regn.attending_dates.all())*70)
        if receptionCnt!= "N/A":
            receptionFees = str(40*int(receptionCnt))
        if banquetCnt != "N/A":
            banquetFees = str(95*int(banquetCnt))
        # if attendingItalt != "N/A":
        #     italtFees = str(italt_normal) 

    formal_name = regn.user_profile.formal_last_name
    if formal_name is None:
        formal_name = regn.user_profile.formal_name
    info ={
        "noOfDaysFees" : noOfdaysFees ,
        "totalFees" : registration_payment.amount ,
        "formalName" : formal_name ,
        "registerFees" : register_fees,
        "noOfDays" : len(regn.attending_dates.all()) ,
        "receptionCnt" : receptionCnt ,
        "receptionFees" : receptionFees ,
        "banquetCnt" : banquetCnt ,
        "banquetFees" : banquetFees,
        # "italtCnt": attendingItalt,
        # "italtFees": italtFees 
    }

    return convertIntoPDF(info)


def convertIntoPDF(options):
    options_val = ["noOfDaysFees",
                   "totalFees",
                   "formalName",
                   "registerFees",
                   "noOfDays",
                   "receptionCnt",
                   "receptionFees",
                   "banquetCnt",
                   "banquetFees", 
                #    "italtCnt", 
                #    "italtFees"
                   ]

    with open("./main.tex",mode="r") as f:
        data = f.read()
    print("THIS ---- here")
    for opt in options_val:
        data = data.replace(opt,str(options[opt]))
    with open("edited_main.tex", mode="w") as f2:
        f2.write(data)
    return_value = subprocess.call(['pdflatex', 'edited_main.tex'], shell=False)
    print("Return Value : ",return_value)
    with open("edited_main.pdf",mode="rb") as f3:
        pdf = MIMEApplication(f3.read(),_subtype="pdf")
    pdf.add_header('Content-Disposition', 'attachment', filename='Invoice.pdf')
    return pdf

def _render_email_body(registration_payment):
    regn = registration_payment.registration
    attendance = _render_attendance(regn)
    options = _render_registration_options(regn)
    options_list = "\n".join("- {}".format(option) for option in options)
    formal_name_ = regn.user_profile.formal_last_name
    if formal_name_ is None:
        formal_name_ = regn.user_profile.formal_name
    return """Dear {formal_name},

Thank you very much for registering for the 2025 ITA Workshop.
We have received your ${amount:.2f} payment.

Your registration included the following options:
- Attendance: {attendance}
{options_list}


Sincerely,
ITA
    """.format(
        formal_name=formal_name_,
        amount=registration_payment.amount,
        attendance=attendance,
        options_list=options_list,
    )


def create_receipt_email(registration_payment):
    """
    Create a registration payment receipt email.
    """
    assert registration_payment.registration.workshop.slug == "ita25"
    assert (
        registration_payment.status == RegistrationPaymentStatus.APPROVED.name
    )

    subject = "Your 2025 ITA Workshop registration payment receipt"
    body = _render_email_body(registration_payment)
    attach = [getReciept(registration_payment)]
    sender = django_settings.DEFAULT_FROM_EMAIL
    recipients = [registration_payment.registration.user.email]
    bcc = [django_settings.DEFAULT_BCC_EMAIL]
    return mail.EmailMessage(
        subject=subject, body=body, from_email=sender, to=recipients, bcc=bcc , attachments= attach
    )


def send_receipt_email(registration_payment):
    """Shorthand to create_receipt_email(...).send()."""
    email = create_receipt_email(registration_payment)
    email.send()
