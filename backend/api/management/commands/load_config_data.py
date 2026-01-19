"""
Loads global configuration data into the database.

This should NOT contain any workshop-specific data.
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string

from api import models
from api.management.commands.load_mock_data import confirm_mock_user_email

User = get_user_model()  # pylint: disable=invalid-name


class Command(BaseCommand):
    """The main command."""

    help = "Loads global configuration data into the database."

    def print_site_status(self, site, created):
        """
        Prints the status of the given site (either "created" or "exists").
        """
        action = "created" if created else "exists"
        msg = "Site '{name}' for domain '{domain}' {action}, with id {id}"
        formatted_msg = msg.format(
            name=site.name, domain=site.domain, action=action, id=site.id
        )
        self.stdout.write(self.style.SUCCESS(formatted_msg))

    def setup_inviter_group(self):
        """Set up the Inviter group."""
        group, _ = Group.objects.update_or_create(
            name=models.INVITER_GROUP_NAME
        )
        msg = "Set up inviter group {}".format(group.name)
        self.stdout.write(self.style.SUCCESS(msg))

    def setup_ucsd_inviters(self):
        """Sets up UCSD Faculty and Student inviters."""
        faculty_inviter, _ = User.objects.update_or_create(
            email=models.INVITER_UCSD_FACULTY_EMAIL
        )
        faculty_inviter.is_inviter = True
        faculty_inviter.user_profile.first_name = "INVITER_UCSD_FACULTY"
        faculty_inviter.user_profile.last_name = "INVITER_UCSD_FACULTY"
        faculty_inviter.user_profile.save()

        student_inviter, _ = User.objects.update_or_create(
            email=models.INVITER_UCSD_STUDENT_EMAIL
        )
        student_inviter.is_inviter = True
        student_inviter.user_profile.first_name = "INVITER_UCSD_STUDENT"
        student_inviter.user_profile.last_name = "INVITER_UCSD_STUDENT"
        student_inviter.user_profile.save()

        self.stdout.write(self.style.SUCCESS("Set up UCSD inviters"))

    def setup_scheduler_group(self):
        """Set up the Scheduler group."""
        group, _ = Group.objects.update_or_create(
            name=models.SCHEDULER_GROUP_NAME
        )
        msg = "Set up scheduler group {}".format(group.name)
        self.stdout.write(self.style.SUCCESS(msg))

    def setup_registration_viewer_group(self):
        """Set up the RegistrationViewer group."""
        group, _ = Group.objects.update_or_create(
            name=models.REGISTRATION_VIEWER_GROUP_NAME
        )
        msg = "Set up registration-viewer group {}".format(group.name)
        self.stdout.write(self.style.SUCCESS(msg))

    def setup_alon_orlitsky_user(self):
        """Set up Alon Orlitsky's user account."""
        alon, created = User.objects.update_or_create_user(
            "alon@eng.ucsd.edu", superuser=True
        )
        if created:
            alon.set_password("HTest123")
            alon.save()
        confirm_mock_user_email(alon)

        user_profile = alon.user_profile
        user_profile.first_name = "Alon"
        user_profile.last_name = "Orlitsky"
        user_profile.honorific = models.Honorific.PROFESSOR.name
        user_profile.affiliation = models.Affiliation.objects.get_or_create(
            title="UCSD"
        )[0]
        user_profile.save()

        msg = "Set up Alon Orlitsky's user ({})".format(
            "created" if created else "already existed"
        )
        self.stdout.write(self.style.SUCCESS(msg))

    def setup_alex_chew_user(self):
        """Set up Alex Chew's user account."""
        alex, created = User.objects.update_or_create_user(
            "alex@alexchew.net", superuser=False
        )
        if created:
            alex.set_password(get_random_string(24))
            alex.save()
        confirm_mock_user_email(alex)

        user_profile = alex.user_profile
        user_profile.first_name = "Alex"
        user_profile.last_name = "Chew"
        user_profile.honorific = models.Honorific.MISTER.name
        user_profile.affiliation = models.Affiliation.objects.get_or_create(
            title="UCSD"
        )[0]
        user_profile.is_student = True
        user_profile.save()

        msg = "Set up Alex Chew's user ({})".format(
            "created" if created else "already existed"
        )
        self.stdout.write(self.style.SUCCESS(msg))

    def handle(self, *args, **options):
        localhost, localhost_created = Site.objects.update_or_create(
            id=2,
            defaults={"domain": "localhost:8080", "name": "localhost:8080"},
        )
        self.print_site_status(localhost, localhost_created)

        prod, prod_created = Site.objects.update_or_create(
            id=3,
            defaults={
                "domain": "itaws.ucsd.edu",
                "name": "itaws.ucsd.edu",
            },
        )
        self.print_site_status(prod, prod_created)

        self.setup_inviter_group()
        self.setup_ucsd_inviters()
        self.setup_scheduler_group()
        self.setup_registration_viewer_group()

        self.setup_alon_orlitsky_user()
        self.setup_alex_chew_user()
