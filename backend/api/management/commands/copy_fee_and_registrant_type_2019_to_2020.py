"""
Copy non-default fee_type and registrant_type values from 2019 Registrations to
2020 Registrations.
"""

import re

from django.conf import settings
from django.core.management.base import BaseCommand

from api import models


class Command(BaseCommand):
    help = (
        "Copy non-default fee_type and registrant_type values from 2019"
        "Registrations to 2020 Registrations."
    )

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def print_success(self, msg):
        """Print a message to stdout, with SUCCESS styling."""
        self.print(self.style.SUCCESS(msg))

    def handle(self, *args, **options):
        ita19 = models.Workshop.objects.get(slug='ita19')
        ita20 = models.Workshop.objects.get(slug='ita20')
        ita22 = models.Workshop.objects.get(slug='ita22')
        ita23 = models.Workshop.objects.get(slug='ita23')

        default_registrant_type = (
            models.Registration._meta.get_field('registrant_type').get_default()
        )
        default_fee_type = (
            models.Registration._meta.get_field('fee_type').get_default()
        )

        regns_to_copy = (
            models.Registration.objects.filter(workshop=ita19).exclude(
                registrant_type=default_registrant_type,
                fee_type=default_fee_type
            )
        )

        self.print("Copying fee and registrant type for {} registrations"
                   .format(len(regns_to_copy)))

        for regn19 in regns_to_copy:
            regn20, _ = models.Registration.objects.get_or_create(
                workshop=ita20, user=regn19.user,
            )
            regn20.registrant_type = regn19.registrant_type
            regn20.fee_type = regn19.fee_type
            regn20.save()

        for regn20 in regns_to_copy:
            regn22, _ = models.Registration.objects.get_or_create(
                workshop=ita22, user=regn19.user,
            )
            regn22.registrant_type = regn20.registrant_type
            regn22.fee_type = regn20.fee_type
            regn22.save()
        
        for regn22 in regns_to_copy:
            regn23, _ = models.Registration.objects.get_or_create(
                workshop=ita23, user=regn19.user,
            )
            regn23.registrant_type = regn23.registrant_type
            regn23.fee_type = regn20.fee_type
            regn23.save()

        self.print_success("{} registrations copied".format(len(regns_to_copy)))
