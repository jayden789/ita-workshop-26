"""
Set up Workshop and RegistrationOption instances for ITA 2024.

This command is idempotent and preserves the integrity of data; thus, one may
safely run it on app startup (for example).
"""

from datetime import datetime, timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from api import models


class Command(BaseCommand):
    """The main command."""

    help = "Set up the Workshop and RegistrationOption instances for ITA 2024."

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def handle(self, *args, **options):
        with transaction.atomic():
            regns = models.Registration.objects.filter(workshop__slug="ita24").select_related("user_profile")

            for reg in regns:
                attending_dates = []
                for attending_date in reg.attending_dates.all():
                    dat_obj = attending_date.date_value
                    if dat_obj.year == 2023:
                        new_date = dat_obj.replace(year = dat_obj.year + 1) + timedelta(days=6)
                        date_ob = models.Date.objects.get(date_value=new_date)
                        # print(reg.user_profile, new_date, date_ob.id)
                        attending_dates.append(date_ob)
                if len(attending_dates) > 0:
                    reg.attending_dates.set(attending_dates)
                    reg.save()
            # self.setup_saturday_workshop_options(workshop, saturday)
