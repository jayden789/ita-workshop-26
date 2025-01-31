"""
Loads a old-DB dump `internal_records.pkl` created by `api/old_db_migration.py`
into the Django-managed DB.
"""

import itertools
import pickle
import re
import secrets

from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter as get_allauth_adapter
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db import transaction
from tqdm import tqdm

from api import models, old_db_migration

User = get_user_model()  # pylint: disable=invalid-name

InternalUser = old_db_migration.InternalUser
InternalUserProfile = old_db_migration.InternalUserProfile
InternalRegistration = old_db_migration.InternalRegistration


MAX_NUM_MIGRATED_USERS = 5000


def get_alon_user():
    """Fetches Alon's User instance."""
    return User.objects.get(email="alon@ucsd.edu")


def default_email(internal_user):
    """
    Returns a placeholder email which redirects to ita@ucsd.edu.
    """
    return "ita+default_email.{last}.{first}.{user_id}@ucsd.edu".format(
        first=internal_user.first_name,
        last=internal_user.last_name,
        user_id=internal_user.old_db_user_id,
    )


def deceased_email(internal_user):
    """
    Returns a placeholder email which redirects to ita@ucsd.edu.
    """
    return "ita+deceased_email.{last}.{first}.{user_id}@ucsd.edu".format(
        first=internal_user.first_name,
        last=internal_user.last_name,
        user_id=internal_user.old_db_user_id,
    )


def get_effective_email(internal_user):
    """
    Normalizes email addresses by setting up placeholder emails for duplicates,
    missing emails, "deceased" users, and other special-role users.
    """
    effective_email = internal_user.email

    # Blank -> default
    if internal_user.email == "":
        effective_email = default_email(internal_user)

    # All the various accounts with this email -> default
    elif internal_user.email == "gcoulousi@eng.ucsd.edu" and not (
        internal_user.first_name == "Gabrielle"
        and internal_user.last_name == "Coulousi"
    ):
        effective_email = default_email(internal_user)

    # Some with Alon's email -> default
    elif internal_user.email == "alon@ucsd.edu" and not (
        internal_user.first_name == "Alon"
        and internal_user.last_name == "Orlitsky"
    ):
        effective_email = default_email(internal_user)

    # Previous inviter account -> previous_inviter email
    elif (
        internal_user.first_name == "Previous"
        and internal_user.last_name == "Inviter"
    ):
        effective_email = "ita+previous_inviter@ucsd.edu"

    # Deceased user -> deceased email
    elif re.search("deceased", internal_user.email, re.IGNORECASE):
        effective_email = deceased_email(internal_user)

    return effective_email


def convert_user(internal_user, user_model, inviter_group):
    """
    Converts an `InternalUser` record into a `User` instance and saves it to
    the Django DB.
    """
    effective_email = get_effective_email(internal_user)
    user, created = user_model.objects.update_or_create_user(
        effective_email,
        defaults={"old_db_user_id": internal_user.old_db_user_id},
    )
    if created:
        user.set_password(secrets.token_hex(16))
        user.save()
    # verify non-normalized email addresses
    if effective_email == internal_user.email:
        email_address, _ = EmailAddress.objects.get_or_create(
            user=user, email=effective_email
        )
        adapter = get_allauth_adapter()
        adapter.confirm_email(None, email_address)
    if internal_user.is_inviter:
        inviter_group.user_set.add(user)
    return user


def convert_bool(int_value):
    """
    "Casts" 0 to False and 1 to True; throws ValueError for other inputs.
    """
    if int_value == 0:
        return False
    if int_value == 1:
        return True
    raise ValueError("not a boolean int value")


def convert_int(str_value, min_val=1):
    """
    "Casts" a string value into:
    - an integer, if the integer value is at least `min_val`
    - None, if the string value represents an integer less than `min_val`
    - None, if the string value is None or empty
    """
    if str_value is None or str_value == "":
        return None
    int_value = int(str_value)
    if int_value > min_val:
        return None
    return int_value


def convert_user_profile(
    internal_user_profile, django_user_profile, email_original
):
    """
    Converts an `InternalUserProfile` record into a `UserProfile` instance and
    saves it to the Django DB.
    """
    iup = internal_user_profile
    dup = django_user_profile

    if iup.honorific == "":
        dup.honorific = ""
    else:
        dup.honorific = models.Honorific[iup.honorific].name

    dup.first_name = iup.first_name
    dup.last_name = iup.last_name
    dup.affiliation = models.Affiliation.objects.get_or_create(
        title=iup.affiliation
    )[0]
    dup.website = iup.website
    dup.old_profile_pic = iup.profile_pic
    dup.is_student = convert_bool(iup.is_student)
    dup.phone_number = iup.phone_number

    if iup.shirt_type == "":
        dup.shirt_type = ""
    else:
        dup.shirt_type = models.ShirtType[iup.shirt_type].name

    if iup.shirt_size == "":
        dup.shirt_size = ""
    else:
        dup.shirt_size = models.ShirtSize[iup.shirt_size].name

    dup.nickname = iup.nickname
    dup.presenting_default = convert_bool(iup.presenting_default)
    dup.first_name_original = iup.first_name_original
    dup.last_name_original = iup.last_name_original
    dup.email_original = email_original
    dup.save()


def convert_registration(internal_registration, django_user, all_django_users):
    """
    Converts an `InternalRegistration` record into a `Registration` instance
    and saves it to the Django DB.
    """
    ita19 = fetch_ita19()
    create_values = {
        "presenting": convert_bool(internal_registration.presenting),
        "registrant_type": models.RegistrantType[
            internal_registration.registrant_type
        ].name,
        "participation_status": "",
    }

    if internal_registration.fee_type == "":
        create_values["fee_type"] = ""
    else:
        create_values["fee_type"] = models.FeeType[
            internal_registration.fee_type
        ].name

    old_inviter_user_id = convert_int(internal_registration.inviter)
    if old_inviter_user_id is not None:
        create_values["inviter"] = all_django_users.get(
            old_inviter_user_id, None
        )

    registration, _ = models.Registration.objects.get_or_create(
        workshop=ita19, user=django_user, defaults=create_values
    )

    return registration


def fetch_ita19():
    """Fetches the 2019 ITA Workshop instance."""
    return models.Workshop.objects.get(slug="ita19")


def load_internal_records_to_django(echo):
    """The main function."""
    with open("internal_records.pkl", "rb") as pkl_file:
        internal_records = pickle.load(pkl_file)

    internal_users = {
        key: InternalUser(*tup)
        for key, tup in itertools.islice(
            internal_records["internal_users"].items(), MAX_NUM_MIGRATED_USERS
        )
    }
    internal_user_profiles = {
        key: InternalUserProfile(*tup)
        for key, tup in internal_records["internal_user_profiles"].items()
    }
    internal_registrations = {
        key: InternalRegistration(*tup)
        for key, tup in internal_records["internal_registrations"].items()
    }

    effective_emails = [
        get_effective_email(iu) for iu in internal_users.values()
    ]
    # Make sure all effective emails are unique
    assert len(internal_users) == len(set(effective_emails))

    inviter_group = Group.objects.get(name=models.INVITER_GROUP_NAME)

    django_users = {}
    with transaction.atomic():
        # Load users
        for old_db_user_id, internal_user in tqdm(
            internal_users.items(), desc="users: "
        ):
            try:
                django_user = convert_user(internal_user, User, inviter_group)
            except:  # noqa pylint: disable=bare-except
                echo("exception for {!r}".format(internal_user))
                continue
            django_users[old_db_user_id] = django_user

            # Load corresponding user profile if it exists
            if old_db_user_id in internal_user_profiles:
                convert_user_profile(
                    internal_user_profiles[old_db_user_id],
                    django_user.user_profile,
                    django_user.email,
                )

        # Load registrations
        alon = get_alon_user()
        for old_db_user_id, internal_regn in tqdm(
            internal_registrations.items(), desc="registrations: "
        ):
            if old_db_user_id not in django_users:
                continue

            django_user = django_users[old_db_user_id]
            registration = convert_registration(
                internal_regn, django_user, django_users
            )

            # If a UserProfile has presenting_default, but has a non-INVITED
            # Registration, then set the Registration to INVITED and set its
            # inviter to Alon
            invited = (
                registration.registrant_type
                == models.RegistrantType.INVITED.name
            )
            if django_user.user_profile.presenting_default and not invited:
                registration.registrant_type = (
                    models.RegistrantType.INVITED.name
                )
                registration.inviter = alon
                registration.save()

    return django_users


class Command(BaseCommand):
    """The main command."""

    help = """
    Loads a old-DB dump created by `api/old_db_migration.py` into the
    Django-managed DB.
    """

    def handle(self, *args, **kwargs):  # pylint: disable=unused-argument
        django_users = load_internal_records_to_django(
            # pylint: disable=unnecessary-lambda
            lambda msg: self.stdout.write(msg)
        )
        self.stdout.write(
            "Migrated data for {} users".format(len(django_users))
        )
