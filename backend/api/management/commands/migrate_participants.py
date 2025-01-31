
"""
Migrate participants with Honorific 'DOCTOR' or 'PROFESSOR' to 2024

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

    help = "Set up the Workshop and RegistrationOption instances for ITA 2024."

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def print_success(self, msg):
        """Print a message to stdout, with SUCCESS styling."""
        self.print(self.style.SUCCESS(msg))

    def migrate_2023_to_2024(self):
        workshop24 = models.Workshop.objects.get(slug="ita24")
        regns = models.Registration.objects.filter(
            workshop__slug="ita23",
            user_profile__honorific__in=[models.Honorific.DOCTOR.name, models.Honorific.PROFESSOR.name]
        ).select_related("user", "user_profile").all()
        for r in regns:
            registeration, created = models.Registration.objects.get_or_create(
                workshop=workshop24, user=r.user
            )
            registeration.participation_status = models.ParticipationStatus.ALMOST_CERTAINLY.name
            registeration.save()
            if created:
                print("Created registeration for", r.user)

    def handle(self, *args, **options):
        with transaction.atomic():
            self.migrate_2023_to_2024()
