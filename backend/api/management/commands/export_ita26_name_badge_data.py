"""
Exports a TSV file containing participant data for name badges.
"""

import collections
import csv
import datetime

from django.core.management.base import BaseCommand
from django.db import connection, transaction

from api import models


VALID_DATES = [
    "2026-02-8",
    "2026-02-9",
    "2026-02-10",
    "2026-02-11",
    "2026-02-12",
    "2026-02-13"
]

DAY_MAP = {
    "2026-02-8": "Sun",
    "2026-02-9": "Mon",
    "2026-02-10": "Tue",
    "2026-02-11": "Wed",
    "2026-02-12": "Thu",
    "2026-02-13": "Fri"
}
BANQUET_OPTIONS = {
    "V": "🥦",
    "C": "🐔",
    "F": "🐟"
}

def _format_attending_date(date):
    return "attending_date_{}".format(date).replace("-", "_")


ParticipantRecord = collections.namedtuple(
    "ParticipantRecord",
    [
        "registrant_number",
        "first_name",
        "last_name",
        "affiliation_title",
        "attending_dates", 
        "sunday_reception_guests",
        "wednesday_banquet_guests",
        "saturday_italt_guests",
        "paid",
        "fee_type_override",
        "badge_str"
    ],
)


def _get_registrations():
    return (
        models.Registration.objects.filter(
            workshop__slug="ita26",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )
        .select_related("user_profile", "user_profile__affiliation")
        .prefetch_related("attending_dates", "options")
        .order_by("registrant_number")
    )


def _attending_date_indicators(attending_dates):
    attending_date_objs = [datetime.datetime.strptime(str(ts.date_value), "%Y-%m-%d") for ts in attending_dates]
    attending_date_objs.sort() 
    sorteddates = [datetime.datetime.strftime(ts, "%Y-%m-%d") for ts in attending_date_objs]
    attending_dates_string = ""

    for date in sorteddates:
        if date in DAY_MAP:
            attending_dates_string = attending_dates_string + DAY_MAP[date] + " "
    return attending_dates_string


SUNDAY_RECEPTION_GUESTS = collections.OrderedDict(
    {
        "ita26_sundayReception_selfPlus2": 3,
        "ita26_sundayReception_selfPlus1": 2,
        "ita26_sundayReception_selfOnly": 1,
    }
)

MONDAY_LUNCH_GUESTS = collections.OrderedDict(
    {
        "ita26_mondayReception_attending": 1
    }
)

BANQUET_GUESTS = collections.OrderedDict(
    {
        "ita26_banquetSelf_selfPlus2": 3,
        "ita26_banquetSelf_selfPlus1": 2,
        "ita26_banquetSelf_selfOnly": 1,
    }
)


ITALT_ATTENDING = collections.OrderedDict(
    {
        "ita26_italt_attending": 1
    }
)


def get_first_in_dict(target_keys, search_dict, default=None):
    """
    Returns the value corresponding to the first key among ``target_keys``
    which appears within ``search_dict`` (should be an OrderedDict), or
    ``default`` if no such key exists.
    """
    for key in target_keys:
        if key in search_dict:
            return search_dict.get(key)
    return default

def get_badge_str(attending_days, banquet_options, sunday_receiption_num, saturday_italt_guests):
    badge_str = ""

    if(sunday_receiption_num > 0):
        badge_str += str(sunday_receiption_num) + " | "
    if(len(attending_days) > 0):
        badge_str += attending_days
        if (saturday_italt_guests != None and saturday_italt_guests > 0):
            badge_str += "S "
    if((banquet_options != None) and len(banquet_options) > 0):
        badge_str += "| "
        for ch in banquet_options:
            badge_str += BANQUET_OPTIONS[ch]
    
    return badge_str


def _convert_regn_to_record(regn):
    option_slugs = [option.slug for option in regn.options.all()]

    attending_dates = _attending_date_indicators(regn.attending_dates.all())
    sunday_reception_guests = get_first_in_dict(
        option_slugs, SUNDAY_RECEPTION_GUESTS, default=0
    )
    wednesday_banquet_guests = get_first_in_dict(
        option_slugs, BANQUET_GUESTS, default=0
    )
    saturday_italt_guests = get_first_in_dict(
        option_slugs, ITALT_ATTENDING, default=0
    )

    return ParticipantRecord(
        registrant_number=regn.registrant_number,
        first_name=regn.user_profile.first_name,
        last_name=regn.user_profile.last_name,
        affiliation_title=regn.user_profile.affiliation_title,
        attending_dates=attending_dates,
        sunday_reception_guests=sunday_reception_guests,
        wednesday_banquet_guests=wednesday_banquet_guests,
        saturday_italt_guests=saturday_italt_guests,
        paid=regn.has_approved_payment,
        fee_type_override=regn.fee_type,
        badge_str = get_badge_str(attending_dates, regn.banquet_options, sunday_reception_guests,saturday_italt_guests )
    )


def _write_records():
    regns = _get_registrations()
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    filename = "ita26_name_badge_data_{}.tsv".format(timestamp)
    with open(filename, "w") as file:
        writer = csv.writer(file, delimiter="\t")
        writer.writerow(ParticipantRecord._fields)
        for regn in regns:
            record = _convert_regn_to_record(regn)
            writer.writerow(record)
    return filename


class Command(BaseCommand):  # pylint: disable=missing-docstring
    help = __doc__

    def handle(self, *args, **options):
        with transaction.atomic():
            filename = _write_records()
            self.stdout.write(
                "{} DB queries made".format(len(connection.queries))
            )
            self.stdout.write("Wrote records to {}".format(filename))
