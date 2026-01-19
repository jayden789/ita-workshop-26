"""
Script to insert some mock data into the database.

As prerequisites, one should already have:
  - run migrations
  - load global config data (the load_config_data command)
  - set up ITA 2019 (the setup_workshop_ita19 command)

This command is built to be idempotent, so that as long as you don't change the
keys of mock data instances, this command will essentially "reset" all mock
data.
"""

import datetime
import random
import secrets

from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter as get_allauth_adapter
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker

from api.models import (
    Affiliation,
    Date,
    FeeType,
    Honorific,
    INVITER_GROUP_NAME,
    INVITER_UCSD_FACULTY_EMAIL,
    INVITER_UCSD_STUDENT_EMAIL,
    ParticipationStatus,
    ProfilePicture,
    RegistrantType,
    Registration,
    RegistrationPayment,
    RegistrationPaymentStatus,
    Talk,
    TalkPaper,
    TalkSchedule,
    Workshop,
)

User = get_user_model()  # pylint: disable=invalid-name


def confirm_mock_user_email(user):
    """
    Manually confirms a user's email. This should only be used for mock users,
    or those with known "good" email addresses.
    """
    email_address, _ = EmailAddress.objects.get_or_create(
        user=user, email=user.email
    )
    adapter = get_allauth_adapter()
    adapter.confirm_email(None, email_address)


def setup_testadmin():
    """Set up a test admin account."""
    name = "testadmin"
    admin, created = User.objects.update_or_create_user(
        "{}@example.com".format(name), superuser=True
    )
    if created:
        admin.set_password("{}pw".format(name))
    confirm_mock_user_email(admin)

    profile = admin.user_profile
    profile.first_name = "TestAdmin"
    profile.last_name = "Tortellini"  # I'm not hungry, I swear
    profile.save()

    return admin


def _setup_affiliation(title):
    """
    Set up a single Affilation, using any existing Affiliation with the same
    title if it exists, or creating it otherwise.
    """
    affiliation = Affiliation.objects.filter(title=title).first()
    if affiliation is None:
        affiliation = Affiliation.objects.create(title=title)
    return affiliation


def setup_affiliations():
    """Set up affiliations for UCSD and IAS."""
    ucsd = _setup_affiliation("UC San Diego")
    ias = _setup_affiliation("IAS")
    return ucsd, ias


def setup_users(affil1, affil2):
    """Set up some users."""
    data = [
        ("MISS", "Alice", "Anderson", affil1),
        ("MISTER", "Bob", "Brown", affil1),
        ("DOCTOR", "Carol", "Cooper", affil2),
        ("", "Dave", "Diaz", affil2),
        ("", "Ivy", "Ichinose", affil1),
        ("PROFESSOR", "Julian", "Jackson", affil2),
    ]
    users = {}
    for honorific, first_name, last_name, affiliation in data:
        user, created = User.objects.update_or_create_user(
            "{}@example.com".format(first_name.lower()), defaults={}
        )
        if created:
            user.set_password("{}pw".format(first_name.lower()))
        confirm_mock_user_email(user)
        users[first_name.lower()] = user

        profile = user.user_profile
        profile.honorific = honorific
        profile.first_name = first_name
        profile.last_name = last_name
        profile.affiliation = affiliation
        profile.website = "https://example.com/{}".format(first_name).lower()
        profile.presenting_default = first_name in ["Alice", "Dave"]
        profile.save()

    return users


def setup_alice_regn(alice, workshop, dates, regn_options):
    """Set up a Registration for Alice."""
    regn, _ = Registration.objects.get_or_create(workshop=workshop, user=alice)
    regn.participation_status = ParticipationStatus.ALMOST_CERTAINLY.name
    regn.attending_dates.set([dates[d] for d in range(18, 23)])
    regn.options.set(
        [
            regn_options["ita24_sundayReception_notAttending"],
            regn_options["ita24_banquetSelf_selfOnly"],
            regn_options["ita24_valentinesEvent_selfOnly"],
        ]
    )
    regn.save()
    return regn


def setup_bob_regn(bob, workshop, dates, regn_options):
    """Set up a Registration for Bob."""
    regn, _ = Registration.objects.get_or_create(workshop=workshop, user=bob)
    regn.participation_status = ParticipationStatus.PROBABLY.name
    regn.attending_dates.set([dates[d] for d in [19, 20, 22]])
    regn.options.set(
        [
            regn_options["ita24_sundayReception_selfPlus2"],
            regn_options["ita24_banquetSelf_selfPlus1"],
            regn_options["ita24_valentinesEvent_selfPlus1"],
        ]
    )
    regn.presenting = True
    regn.save()
    return regn


def setup_carol_regn(carol, workshop, dates, regn_options):
    """Set up a Registration for Carol."""
    regn, _ = Registration.objects.get_or_create(workshop=workshop, user=carol)
    regn.participation_status = ParticipationStatus.PROBABLY_NOT.name
    regn.attending_dates.set([dates[18], dates[19]])
    regn.options.set(
        [
            regn_options["ita24_banquetSelf_notAttending"],
            regn_options["ita24_valentinesEvent_selfPlus2"],
        ]
    )
    regn.save()
    return regn


def setup_alice_talk(regn):
    """Set up a Talk for Alice."""
    talk_paper = TalkPaper()
    talk_paper.file = PLACEHOLDER_TALK_PAPER_PATH.format("A")
    talk_paper.save()

    talk, _ = Talk.objects.update_or_create(
        registration=regn,
        defaults={
            "title": "A Talk by Alice",
            "abstract": "In this talk, Alice speaks.",
            "paper": talk_paper,
        },
    )
    return talk


def setup_bob_talk(regn):
    """Set up a Talk for Bob."""
    talk_paper = TalkPaper()
    talk_paper.file = PLACEHOLDER_TALK_PAPER_PATH.format("B")
    talk_paper.save()

    talk, _ = Talk.objects.update_or_create(
        registration=regn,
        defaults={
            "title": "Information-Theoretic Burgers",
            "paper": talk_paper,
            "topic_comment": (
                "optimal grill covering, spatula-armed bandits,"
                " Gaussian condiment mixtures"
            ),
        },
    )
    return talk


def setup_carol_talk(regn):
    """Set up a Talk for Carol."""
    talk, _ = Talk.objects.update_or_create(
        registration=regn,
        defaults={
            "title": "Jingle Bells",
            "scheduling_comment": "Better late than never!",
        },
    )
    return talk


def setup_alice_schedule(alice, alice_talk, bob_talk, carol_talk):
    """Set up a TalkSchedule for Alice."""
    track1 = [[alice_talk.id, bob_talk.id], [carol_talk.id]]
    track2 = [[bob_talk.id], [carol_talk.id, alice_talk.id]]
    day1 = [track1, track2]
    talk_structure = [day1]

    schedule, _ = TalkSchedule.objects.update_or_create(
        title="Alice's Schedule",
        owner=alice,
        defaults={"talk_structure": talk_structure},
    )
    return schedule


def _placeholder_profile_pic(user_profile):
    return "https://via.placeholder.com/{}x{}.png?text={}+{}".format(
        random.randint(200, 400),
        random.randint(300, 500),
        user_profile.first_name,
        user_profile.last_name,
    )


NEW_PROFILE_PIC_PATH = "placeholder_profile_pictures/placeholder{}.jpg"


def _set_random_profile_pic(user_profile):
    rand = random.random()
    if rand < 0.5:
        user_profile.old_profile_pic = _placeholder_profile_pic(user_profile)
    if 0.25 < rand < 0.8:
        profile_pic = ProfilePicture()
        profile_pic.picture = NEW_PROFILE_PIC_PATH.format(
            user_profile.first_name[0].upper()
        )
        profile_pic.save()
        user_profile.new_profile_pic = profile_pic


def _random_sunday_reception_options():
    if random.random() < 0.3:
        if random.random() < 0.5:
            return []
        return ["ita24_sundayReception_notAttending"]
    return random.choices(
        [
            "ita24_sundayReception_selfOnly",
            "ita24_sundayReception_selfPlus1",
            "ita24_sundayReception_selfPlus2",
        ],
        weights=[2, 2, 1],
    )


def _random_banquet_self_options():
    if random.random() < 0.2:
        if random.random() < 0.5:
            return []
        return ["ita24_banquetSelf_notAttending"]
    return random.choices(
        [
            "ita24_banquetSelf_selfOnly",
            "ita24_banquetSelf_selfPlus1",
            "ita24_banquetSelf_selfPlus2",
        ],
        weights=[2, 2, 1],
    )


def _random_valentine_options():
    if random.random() < 0.3:
        return []
    return random.choices(
        [
            "ita24_valentinesEvent_notAttending",
            "ita24_valentinesEvent_selfOnly",
            "ita24_valentinesEvent_selfPlus1",
            "ita24_valentinesEvent_selfPlus2",
        ],
        weights=[1, 2, 3, 1],
    )


def _random_monday_lunch_options():
    if random.random() < 0.3:
        return []
    return random.choices(
        ["ita24_mondayLunch_attending", "ita24_mondayLunch_notAttending"]
    )


def _random_regn_option_slugs():
    sunday_reception = _random_sunday_reception_options()
    banquet_self = _random_banquet_self_options()
    valentines = _random_valentine_options()
    monday_lunch = _random_monday_lunch_options()
    return sunday_reception + banquet_self + valentines + monday_lunch


def _random_attending_dates(dates_list, participation_status):
    if participation_status in [
        ParticipationStatus.PROBABLY_NOT,
        ParticipationStatus.NEXT_TIME,
        None,
    ]:
        return []

    if participation_status == ParticipationStatus.PROBABLY:
        num_dates = random.choices(range(1, 5), weights=[1, 2, 3, 2])[0]
        return random.sample(dates_list, num_dates)

    if participation_status == ParticipationStatus.ALMOST_CERTAINLY:
        num_dates = random.choices(range(1, 7), weights=[1, 2, 3, 3, 2, 1])[0]
        return random.sample(dates_list, num_dates)

    raise ValueError("Unknown ParticipationStatus")


PLACEHOLDER_TALK_PAPER_PATH = "placeholder_talk_papers/placeholder{}.pdf"


def _set_random_talk(
    talk,
    add_title=True,
    add_abstract=True,
    add_comment=True,
    add_paper=True,
    add_authors=True,
):
    fake = Faker()
    if add_title:
        talk.title = fake.sentences(nb=1)[0]
    if add_abstract:
        talk.abstract = fake.paragraph(
            nb_sentences=6, variable_nb_sentences=False
        )
    if add_comment:
        talk.scheduling_comment = fake.paragraph(
            nb_sentences=2, variable_nb_sentences=False
        )
        talk.topic_comment = fake.paragraph(
            nb_sentences=2, variable_nb_sentences=False
        )
    if add_paper:
        letter = talk.registration.user_profile.first_name[0].upper()
        talk_paper = TalkPaper()
        talk_paper.file = PLACEHOLDER_TALK_PAPER_PATH.format(letter)
        talk_paper.save()
        talk.paper = talk_paper
    if add_authors:
        num_authors = random.randrange(2, 8)
        author_names = [
            " ".join([fake.first_name(), fake.last_name()])
            for _ in range(num_authors)
        ]
        talk.authors_comment = ', '.join(author_names)


def _create_approved_payment(regn):
    return RegistrationPayment.objects.create(
        registration=regn,
        amount=regn.total_fee_amount,
        invoice_number="MOCK-{}".format(secrets.token_hex(7)),
        status=RegistrationPaymentStatus.APPROVED.name,
    )


def setup_random_registrants(
    workshop, dates, regn_options, inviters, num_registrants=50
):
    """Set up random users (without passwords) and registrations."""
    regns = []
    statuses = random.choices(
        [
            ParticipationStatus.ALMOST_CERTAINLY,
            ParticipationStatus.PROBABLY,
            ParticipationStatus.PROBABLY_NOT,
            ParticipationStatus.NEXT_TIME,
            None,
        ],
        weights=[3, 2, 1, 1, 3],
        k=num_registrants,
    )
    fake = Faker()

    ucsd_student_inviter = User.objects.get(email=INVITER_UCSD_STUDENT_EMAIL)
    ucsd_faculty_inviter = User.objects.get(email=INVITER_UCSD_FACULTY_EMAIL)

    for i, status in enumerate(statuses):
        if i % 2 == 0:
            first_name = fake.first_name_male()
            last_name = fake.last_name_male()
            honorific = random.choice(
                [
                    Honorific.DOCTOR.name,
                    Honorific.MISTER.name,
                    Honorific.PROFESSOR.name,
                    "",
                ]
            )
        else:
            first_name = fake.first_name_female()
            last_name = fake.last_name_female()
            honorific = random.choice(
                [
                    Honorific.DOCTOR.name,
                    Honorific.MISS.name,
                    Honorific.PROFESSOR.name,
                    "",
                ]
            )

        user, _ = User.objects.update_or_create_user(
            "{}_{}_registrant@example.com".format(
                first_name.lower(), last_name.lower()
            )
        )
        confirm_mock_user_email(user)

        profile = user.user_profile
        profile.honorific = honorific
        profile.first_name = first_name
        profile.last_name = last_name
        profile.affiliation, _ = Affiliation.objects.get_or_create(
            title=fake.company()
        )

        _set_random_profile_pic(profile)

        profile.website = "https://example.com/{}_{}".format(
            first_name, last_name
        ).lower()

        # 25% chance of being a student
        profile.is_student = random.randrange(4) == 0

        # 40% chance of PBD
        profile.presenting_default = random.randrange(5) < 2
        profile.save()

        regn, _ = Registration.objects.get_or_create(
            workshop=workshop, user=user
        )
        regn.participation_status = "" if status is None else status.name
        regn.options.set(
            [regn_options[slug] for slug in _random_regn_option_slugs()]
        )
        regn.attending_dates.set(
            _random_attending_dates(list(dates.values()), status)
        )

        regn.inviter = random.choice(
            [
                None,
                inviters[0],
                inviters[1],
                ucsd_faculty_inviter,
                ucsd_student_inviter,
            ]
        )
        regn.registrant_type = (
            RegistrantType.SELF_REGISTERED.name
            if regn.inviter is None
            else RegistrantType.INVITED.name
        )

        # 25% chance of having a fee type override
        if random.randrange(4) == 0:
            regn.fee_type = random.choices(
                [
                    FeeType.AFFILIATE,
                    FeeType.EXEMPT,
                    FeeType.FULL,
                    FeeType.STUDENT,
                    FeeType.WAIVED,
                ],
                weights=[2, 1, 1, 2, 1],
            )[0].name

        # 67% chance of presenting
        if random.randrange(3) > 0:
            regn.presenting = True
            talk = regn.talks.first()
            _set_random_talk(
                talk,
                add_title=(random.randrange(4) > 0),
                add_abstract=(random.randrange(2) > 0),
                add_comment=(random.randrange(3) == 0),
                add_paper=(random.randrange(3) > 0),
                add_authors=(random.randrange(4) > 0),
            )
            talk.save()

        regn.save()
        regns.append(regn)

        # 20% chance of having paid already
        if random.randrange(5) == 0:
            _create_approved_payment(regn)

    return regns


def setup_users_without_verified_email(count=10):
    fake = Faker()
    users = []
    for i in range(count):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user, _ = User.objects.update_or_create_user(
            "{}_{}_unverified@example.com".format(
                first_name.lower(), last_name.lower()
            ),
            defaults={"password": "{}pw".format(first_name.lower())},
        )
        user.user_profile.first_name = first_name
        user.user_profile.last_name = last_name
        user.user_profile.save()
        users.append(user)
    return users


class Command(BaseCommand):
    """Command to load basic fixture data."""

    help = "Loads some basic fixture data"

    def handle(self, *args, **options):  # pylint: disable=too-many-locals
        # This should be in the DB from the load_config_data command.
        inviters = Group.objects.get(name=INVITER_GROUP_NAME)

        # Retrieve workshop data. These are assumed to be in the DB from the
        # setup_workshop_ita19 command.
        ita24 = Workshop.objects.get(slug="ita24")
        dates = {
            day: Date.objects.get(date_value=datetime.date(2024, 2, day))
            for day in range(18, 24)
        }
        regn_options = {
            option.slug: option for option in ita24.registration_options.all()
        }

        with transaction.atomic():
            # The workshop needs to be open for registration
            ita24.reg_open = True
            ita24.save()
            self.print_success(
                "Set {} open for registration".format(ita24.slug)
            )

            # Mock affiliations
            affil_ucsd, affil_ias = setup_affiliations()
            self.print_success("Set up affiliations:")
            for affil in [affil_ucsd, affil_ias]:
                self.print("  - {!s}".format(affil))

            # Mock admin
            testadmin = setup_testadmin()
            self.print_success("Set up test admin: {!s}".format(testadmin))

            # Mock users
            users = setup_users(affil_ucsd, affil_ias)
            inviters.user_set.add(users["ivy"])
            inviters.user_set.add(users["julian"])
            self.print_success("Set up users:")
            for user in users.values():
                self.print("  - {}".format(user.email))
            users["alice"].is_scheduler = True
            users["bob"].is_registration_viewer = True
            users["ivy"].is_scheduler = True
            users["julian"].is_registration_viewer = True

            # Registrations
            alice_regn = setup_alice_regn(
                users["alice"], ita24, dates, regn_options
            )
            bob_regn = setup_bob_regn(users["bob"], ita24, dates, regn_options)
            carol_regn = setup_carol_regn(
                users["carol"], ita24, dates, regn_options
            )
            self.print_success("Set up registrations:")
            for regn in [alice_regn, bob_regn, carol_regn]:
                self.print("  - {!s}".format(regn))

            # Talks
            alice_talk = setup_alice_talk(alice_regn)
            bob_talk = setup_bob_talk(bob_regn)
            carol_talk = setup_carol_talk(carol_regn)
            self.print_success("Set up talks:")
            for talk in [alice_talk, bob_talk, carol_talk]:
                self.print("  - {!s}".format(talk))

            # Talk schedules
            alice_schedule = setup_alice_schedule(
                users["alice"], alice_talk, bob_talk, carol_talk
            )
            self.print_success("Set up talk schedules:")
            for schedule in [alice_schedule]:
                self.print("  - {!s}".format(schedule))

            # Registrants
            random_regns = setup_random_registrants(
                ita24, dates, regn_options, [users["ivy"], users["julian"]]
            )
            self.print_success("Set up random registrants:")
            for regn in random_regns:
                self.print(
                    "  - {}, {}".format(
                        regn.user_profile.formal_name,
                        regn.participation_status,
                    )
                )

            # Users with unverified email
            random_users_unverified = setup_users_without_verified_email()
            self.print_success("Set up random users without verified email:")
            for user in random_users_unverified:
                self.print(
                    "  - {} ({})".format(
                        user.user_profile.full_name, user.email
                    )
                )

        self.stdout.write(self.style.SUCCESS("Loaded all mock data"))

    def print(self, msg):
        """Print a message to stdout."""
        self.stdout.write(msg)

    def print_success(self, msg):
        """Print a message to stdout, with SUCCESS styling."""
        self.print(self.style.SUCCESS(msg))
