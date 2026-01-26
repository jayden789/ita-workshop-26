from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    """Flushes the DB, loads all config/setup data, and loads mock data."""

    help = "Flushes the DB, loads all config/setup data, and loads mock data."

    def handle(self, *args, **options):
        with transaction.atomic():
            call_command('flush', interactive=False)
            call_command('load_config_data')
            call_command('setup_workshop_ita19')
            call_command('setup_workshop_ita20')
            call_command('setup_workshop_ita22')
            call_command('setup_workshop_ita23')
            call_command('setup_workshop_ita24')
            call_command('setup_workshop_ita25')
            call_command('setup_workshop_ita26')
            call_command('load_mock_data')
