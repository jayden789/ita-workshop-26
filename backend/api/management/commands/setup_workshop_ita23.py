"""
Set up Workshop and RegistrationOption instances for ITA 2023.

This command is idempotent and preserves the integrity of data; thus, one may
safely run it on app startup (for example).
"""

import datetime
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from api import models


class Command(BaseCommand):
    """The main command."""

    help = "Set up the Workshop and RegistrationOption instances for ITA 2023."

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def print_success(self, msg):
        """Print a message to stdout, with SUCCESS styling."""
        self.print(self.style.SUCCESS(msg))

    def setup_dates(self):
        """Set up `Date` instances for the duration of the workshop."""
        dates = {}
        for day in range(12, 18):
            date_value = datetime.date(2023, 2, day)
            date, _ = models.Date.objects.get_or_create(date_value=date_value)
            dates[str(date_value)] = date

        self.print_success("Set up dates:")
        for date in dates.values():
            self.print(
                "  - {date!s} ({weekday})".format(
                    date=date.date_value,
                    weekday=date.date_value.strftime("%a"),
                )
            )

        return dates

    def setup_workshop(self, dates):
        """Set up the ITA 2023 `Workshop` instance."""
        start_date = dates["2023-02-12"].date_value
        end_date = dates["2023-02-17"].date_value
        update_values = {
            "title": "ITA Workshop 2023",
            "start_date": start_date,
            "end_date": end_date,
             "base_fee_affiliate": Decimal("145.0"),
        "base_fee_full": Decimal("290.0"),
        "base_fee_student": Decimal("190.0"),
        "daily_fee_affiliate": Decimal("65.0"),
        "daily_fee_full": Decimal("65.0"),
        "daily_fee_student": Decimal("45.0"),
        }
        workshop, _ = models.Workshop.objects.update_or_create(
            slug="ita23", defaults=update_values
        )

        self.print_success("Set up workshop {!s}".format(workshop))

        return workshop

    def setup_sunday_reception_options(self, workshop, date):
        """Setup `RegistrationOption` instances for the Sunday Reception."""
        assert date.weekday() == 6  # Sunday

        def full_slug(slug):
            return "{}_sundayReception_{}".format(workshop.slug, slug)

        fee = Decimal("30.00")
        fee_student = Decimal("20.00")

        not_attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("notAttending"),
            defaults={"date": date, "title": "Not attending"},
        )
        self_only, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfOnly"),
            defaults={
                "date": date,
                "title": "You",
                "fee_affiliate": fee,
                "fee_full": fee,
                "fee_student": fee_student,
            },
        )
        plus_one, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus1"),
            defaults={
                "date": date,
                "title": "You and one guest",
                "fee_affiliate": fee * 2,
                "fee_full": fee * 2,
                "fee_student": fee_student * 2,
            },
        )
        plus_two, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus2"),
            defaults={
                "date": date,
                "title": "You and two guests",
                "fee_affiliate": fee * 3,
                "fee_full": fee * 3,
                "fee_student": fee_student * 3,
            },
        )

        self.print_success("Set up registration options for Sunday reception:")
        for opt in (not_attending, self_only, plus_one, plus_two):
            self.print("  - {}".format(opt.slug))

    def setup_banquet_options(self, workshop, date):
        """Set up `RegistrationOption` instances for the Wednesday Banquet."""
        assert date.weekday() == 2  # Wednesday

        def full_slug(slug):
            return "{}_banquetSelf_{}".format(workshop.slug, slug)

        fee = Decimal("90.00")
        fee_student = Decimal("55.00")

        not_attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("notAttending"),
            defaults={"date": date, "title": "Not attending"},
        )
        self_only, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfOnly"),
            defaults={
                "date": date,
                "title": "You",
                "fee_affiliate": fee,
                "fee_full": fee,
                "fee_student": fee_student,
            },
        )
        plus_one, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus1"),
            defaults={
                "date": date,
                "title": "You and one guest",
                "fee_affiliate": fee * 2,
                "fee_full": fee * 2,
                "fee_student": fee_student * 2,
            },
        )
        plus_two, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus2"),
            defaults={
                "date": date,
                "title": "You and two guests",
                "fee_affiliate": fee * 3,
                "fee_full": fee * 3,
                "fee_student": fee_student * 3,
            },
        )

        self.print_success(
            "Set up registration options for Wednesday banquet:"
        )
        for opt in (not_attending, self_only, plus_one, plus_two):
            self.print("  - {}".format(opt.slug))


    def setup_saturday_workshop_options(self, workshop, date):
        """Set up `RegistrationOption` instances for the Saturday Workshop."""
        assert date.weekday() == 5  # Saturday

        def full_slug(slug):
            return "{}_satWorkshop_{}".format(workshop.slug, slug)

        fee = Decimal("50.00")
        fee_student = Decimal("35.00")

        not_attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("notAttending"),
            defaults={"date": date, "title": "Not attending"},
        )
        attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("attending"),
            defaults={
                "date": date,
                "title": "You",
                "fee_affiliate": fee,
                "fee_full": fee,
                "fee_student": fee_student,
            },
        )

        self.print_success(
            "Set up registration options for Saturday workshop:"
        )
        for opt in (not_attending, attending):
            self.print("  - {}".format(opt.slug))


    def setup_valentines_event(self, workshop, date):
        """
        Set up regn option for the Valentine's day event.
        """
        fee = Decimal("40.0")

        def full_slug(slug):
            return "{}_valentinesEvent_{}".format(workshop.slug, slug)

        not_attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("notAttending"),
            defaults={"date": date, "title": "Not attending"},
        )
        self_only, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfOnly"),
            defaults={
                "date": date,
                "title": "You",
                "fee_affiliate": fee,
                "fee_full": fee,
                "fee_student": fee,
            },
        )
        plus_one, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus1"),
            defaults={
                "date": date,
                "title": "You and one guest",
                "fee_affiliate": fee * 2,
                "fee_full": fee * 2,
                "fee_student": fee * 2,
            },
        )
        plus_two, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("selfPlus2"),
            defaults={
                "date": date,
                "title": "You and two guests",
                "fee_affiliate": fee * 3,
                "fee_full": fee * 3,
                "fee_student": fee * 3,
            },
        )

        self.print_success(
            "Set up registration options for Valentine's event:"
        )
        for opt in (not_attending, self_only, plus_one, plus_two):
            self.print("  - {}".format(opt.slug))

    def setup_monday_lunch(self, workshop, date):
        """
        Set up regn option for the Monday lunch.
        """
        def full_slug(slug):
            return "{}_mondayLunch_{}".format(workshop.slug, slug)

        not_attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("notAttending"),
            defaults={"date": date, "title": "Not attending"},
        )
        attending, _ = models.RegistrationOption.objects.update_or_create(
            workshop=workshop,
            slug=full_slug("attending"),
            defaults={"date": date, "title": "Attending"},
        )

        self.print_success("Set up registration options for Monday lunch:")
        for opt in (not_attending, attending):
            self.print("  - {}".format(opt.slug))

    def handle(self, *args, **options):
        with transaction.atomic():
            dates = self.setup_dates()
            sunday = dates["2023-02-12"].date_value
            monday = dates["2023-02-13"].date_value
            wednesday = dates["2023-02-15"].date_value
            thursday = dates["2023-02-16"].date_value
            # saturday = dates["2022-05-27"].date_value

            workshop = self.setup_workshop(dates)
            self.setup_sunday_reception_options(workshop, sunday)
            self.setup_monday_lunch(workshop, monday)
            self.setup_banquet_options(workshop, wednesday)
            self.setup_valentines_event(workshop, thursday)
            # self.setup_saturday_workshop_options(workshop, saturday)
