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
    "2019-02-15",
    "2019-02-14",
    "2019-02-13",
    "2019-02-12",
    "2019-02-11",
]


def _format_attending_date(date):
    return "attending_date_{}".format(date).replace("-", "_")


ParticipantRecord = collections.namedtuple(
    "ParticipantRecord",
    [
        "registrant_number",
        "first_name",
        "last_name",
        "affiliation_title",
        *(_format_attending_date(date) for date in VALID_DATES),
        "sunday_reception_guests",
        "wednesday_banquet_guests",
        "valentines_event_guests",
        "paid",
        "fee_type_override",
    ],
)


def _get_registrations():
    return (
        models.Registration.objects.filter(
            workshop__slug="ita19",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )
        .select_related("user_profile", "user_profile__affiliation")
        .prefetch_related("attending_dates", "options")
        .order_by("registrant_number")
    )


def _attending_date_indicators(attending_dates):
    attending_date_strs = set(str(date.date_value) for date in attending_dates)
    return dict(
        (_format_attending_date(date), date in attending_date_strs)
        for date in VALID_DATES
    )


SUNDAY_RECEPTION_GUESTS = collections.OrderedDict(
    {
        "ita19_sundayReception_selfPlus2": 3,
        "ita19_sundayReception_selfPlus1": 2,
        "ita19_sundayReception_selfOnly": 1,
    }
)


BANQUET_GUESTS = collections.OrderedDict(
    {
        "ita19_banquetSelf_selfPlus2": 3,
        "ita19_banquetSelf_selfPlus1": 2,
        "ita19_banquetSelf_selfOnly": 1,
    }
)


VALENTINES_EVENT_GUESTS = collections.OrderedDict(
    {
        "ita19_valentinesEvent_selfPlus2": 3,
        "ita19_valentinesEvent_selfPlus1": 2,
        "ita19_valentinesEvent_selfOnly": 1,
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


def _convert_regn_to_record(regn):
    option_slugs = [option.slug for option in regn.options.all()]

    attending_dates = _attending_date_indicators(regn.attending_dates.all())
    sunday_reception_guests = get_first_in_dict(
        option_slugs, SUNDAY_RECEPTION_GUESTS, default=0
    )
    wednesday_banquet_guests = get_first_in_dict(
        option_slugs, BANQUET_GUESTS, default=0
    )
    valentines_event_guests = get_first_in_dict(
        option_slugs, VALENTINES_EVENT_GUESTS, default=0
    )

    return ParticipantRecord(
        registrant_number=regn.registrant_number,
        first_name=regn.user_profile.first_name,
        last_name=regn.user_profile.last_name,
        affiliation_title=regn.user_profile.affiliation_title,
        **attending_dates,
        sunday_reception_guests=sunday_reception_guests,
        wednesday_banquet_guests=wednesday_banquet_guests,
        valentines_event_guests=valentines_event_guests,
        paid=regn.has_approved_payment,
        fee_type_override=regn.fee_type,
    )


def _write_records():
    regns = _get_registrations()
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    filename = "ita19_name_badge_data_{}.tsv".format(timestamp)
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
