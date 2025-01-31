"""
Exports a TSV file containing URLs to profile pictures of registrants.
"""

import csv
import datetime

from django.core.management.base import BaseCommand
from django.db import connection, transaction

from api import models


VALID_DATES = frozenset(
    ["2019-02-15", "2019-02-14", "2019-02-13", "2019-02-12", "2019-02-11"]
)


def _last_attending_date(regn):
    if not regn.attending_dates.exists():
        return None
    attending_dates = set(map(str, regn.attending_dates.all()))
    valid_attending_dates = VALID_DATES & attending_dates
    if bool(valid_attending_dates):
        return max(valid_attending_dates)
    return None


def _get_registrations():
    participating = (
        models.Registration.objects.filter(
            workshop__slug="ita19",
            participation_status__in=models.PARTICIPATING_STATUSES,
        )
        .select_related("user_profile", "user_profile__new_profile_pic")
        .prefetch_related("attending_dates")
        .order_by("user_profile__last_name", "user_profile__first_name")
    )
    for regn in participating:
        if regn.user_profile.profile_pic == "":
            continue
        yield (
            regn.user_profile.last_name,
            regn.user_profile.first_name,
            regn.user_profile.profile_pic,
            _last_attending_date(regn),
        )


def _write_records():
    regns = _get_registrations()
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%d_%H-%M-%S")
    filename = "participant_pics_{}.tsv".format(timestamp)
    with open(filename, "w") as file:
        writer = csv.writer(file, delimiter="\t")
        writer.writerows(regns)
    return filename


class Command(BaseCommand):
    """The main command."""

    help = __doc__

    def handle(self, *args, **options):
        with transaction.atomic():
            filename = _write_records()
            self.stdout.write(
                "{} DB queries made".format(len(connection.queries))
            )
            self.stdout.write("Wrote records to {}".format(filename))
