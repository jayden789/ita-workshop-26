"""
send ita19 invitation
"""

from collections import namedtuple
import csv
import re

from django.conf import settings
from django.core import mail


Record = namedtuple("Record", "email first_name last_name session_title day time")


TEMPLATE_RAW = """
Dear {first_name},

Thank you very much for participating in the ITA workshop.

We write to let you know that we have tentatively assigned you to chair the session: {session_title} on {day} at {time}.

We hope you can chair this session. If not, please kindly email Arman Fazeli at <a href="mailto:afazelic@ucsd.edu">afazelic@ucsd.edu</a> by Sunday morning so we can find another chair.

Thank you very much for your help and looking forward to seeing you soon,

ITA
"""

TEMPLATE = re.sub(r"\n", "<br />", TEMPLATE_RAW.strip())

SUBJECT = "Invitation to chair a session at the ITA workshop"


def make_record(row):
    return Record._make(field.strip() for field in row)


def read_records(path):
    with open(path) as file:
        reader = csv.reader(file, delimiter="\t")
        next(reader)
        return list(map(make_record, reader))


def make_message(record):
    """Returns EmailMessage object"""
    body = TEMPLATE.format(
        first_name=record.first_name,
        session_title=record.session_title,
        day=record.day,
        time=record.time.lower(),
    )
    message = mail.EmailMessage(
        subject=SUBJECT,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[record.email],
        bcc=[settings.DEFAULT_BCC_EMAIL],
    )
    message.content_subtype = "html"
    return message


def main():
    num_sent = 0
    for record in read_records("ita19-chairs.tsv"):
        message = make_message(record)
        # message.send()
        print(
            "sent to {} {} <{}>".format(
                record.first_name, record.last_name, record.email
            )
        )
        num_sent += 1
    print("{} total emails sent".format(num_sent))
