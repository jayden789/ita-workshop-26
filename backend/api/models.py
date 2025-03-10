"""API models."""

from decimal import Decimal
from enum import Enum
import logging
import pathlib
import re
import os
import uuid

from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter as get_allauth_adapter
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin, Group
from django.contrib.postgres.fields import JSONField
from django.core import validators
from django.core.mail import send_mail
from django.db import models, transaction
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField


logger = logging.getLogger(__name__)  # pylint: disable=invalid-name

INVITER_GROUP_NAME = "Inviters"
INVITER_UCSD_FACULTY_EMAIL = "ita.ucsd+faculty.inviter@gmail.com"
INVITER_UCSD_STUDENT_EMAIL = "ita.ucsd+student.inviter@gmail.com"

SCHEDULER_GROUP_NAME = "Schedulers"
REGISTRATION_VIEWER_GROUP_NAME = "RegistrationViewers"


class BaseModel(models.Model):
    """Model with default `created_on` and `modified_on` fields.

    Based on https://stackoverflow.com/a/11031907/1104102.
    """

    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Date(BaseModel):
    """A wrapper around DateField for fields modeling a set of dates."""

    date_value = models.DateField(editable=False, unique=True)

    class Meta:
        ordering = ("date_value",)

    def __str__(self):
        return str(self.date_value)


class MoneyField(models.DecimalField):
    """Utility 'two-decimal-place' currency field."""

    MAX_DIGITS = 8
    DECIMAL_PLACES = 2

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_digits", self.MAX_DIGITS)
        kwargs.setdefault("decimal_places", self.DECIMAL_PLACES)
        super().__init__(*args, **kwargs)


# pylint: disable=too-few-public-methods
class SlugValidator(validators.RegexValidator):
    """
    Validator for URL-safe slugs.

    They are like C identifiers: every character is alphanumeric or an
    underscore, except the first character can't be a digit.
    """

    regex = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


class UserManager(BaseUserManager):
    """
    Custom `UserManager` based on django.contrib.auth.models.UserManager.
    """

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a user."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a superuser."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)

    def update_or_create_user(self, email, *, defaults=None, superuser=False):
        """
        Like `QuerySet.update_or_create`, but for `User` instances; i.e. uses
        `create_user` and `create_superuser` and handles passwords correctly.

        If the user already exists, the password is only set if
        `defaults["password"]` is set. But if the user is created, then its
        password will be set to `defaults["password"]` if set, or None
        ("unusable password" in Django terms) otherwise.
        """
        if defaults is None:
            defaults = {}
        create_method = getattr(
            self, "create_superuser" if superuser else "create_user"
        )
        defaults.setdefault("is_staff", superuser)
        defaults.setdefault("is_superuser", superuser)

        should_update_password = "password" in defaults
        password = defaults.pop("password", None)

        try:
            user = User.objects.get(email=email)
            if should_update_password:
                user.set_password(password)
            created = False
        except User.DoesNotExist:
            user = create_method(email, password)
            created = True

        for attr, value in defaults.items():
            setattr(user, attr, value)
        user.save()

        return user, created


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom implementation of django.contrib.auth.models.AbstractUser, with no
    username field (using email address as the identifier instead).
    """

    email = models.EmailField(
        verbose_name="email address", max_length=255, unique=True
    )
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Designates whether this user should be treated as active."
        "Unselect this instead of deleting accounts.",
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)
    user_profile = models.OneToOneField(
        "UserProfile", models.PROTECT, related_name="user", null=True
    )

    # users.id in old itaweb database. This field is stored only for
    # debugging/auditing purposes; it should never be serialized or exposed by
    # the API.
    old_db_user_id = models.IntegerField(
        "users.id in old itaweb database", null=True, blank=True, unique=True
    )

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        abstract = False

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def mark_email_verified(self, *, requester):
        """
        Manually marks this user's email as "verified", and saves to the DB.
        This should only be used for mock users, or those with known "good"
        email addresses.
        """
        email_address, _ = EmailAddress.objects.get_or_create(
            user=self, email=self.email
        )
        adapter = get_allauth_adapter()
        adapter.confirm_email(None, email_address)
        logger.info(
            "User (email=%s, pk=%s) manually verified email=%s for user pk=%s",
            requester.email,
            requester.pk,
            self.email,
            self.pk,
        )
        return self.email

    @property
    def email_is_verified(self):
        """Returns True if the user's email is verified."""
        return self.emailaddress_set.filter(
            email=self.email, verified=True
        ).exists()

    def _is_in_group(self, group_name):
        """
        Returns True if this user is in a Group with the given name, or False
        otherwise.
        """
        return self.groups.filter(name=group_name).exists()

    def _set_group_membership(self, group_name, is_member):
        group = Group.objects.get(name=group_name)
        if is_member:
            self.groups.add(group)
        else:
            self.groups.remove(group)  # pylint: disable=no-member

    @property
    def is_inviter(self):
        """
        Returns True if this user is in the Inviter group, or False
        otherwise.
        """
        return self._is_in_group(INVITER_GROUP_NAME)

    @is_inviter.setter
    def is_inviter(self, value):
        """Setter for is_inviter."""
        self._set_group_membership(INVITER_GROUP_NAME, value)

    @property
    def is_scheduler(self):
        """
        Returns True if this user is in the Scheduler group, or False
        otherwise.
        """
        return self._is_in_group(SCHEDULER_GROUP_NAME)

    @is_scheduler.setter
    def is_scheduler(self, value):
        """Setter for is_scheduler."""
        self._set_group_membership(SCHEDULER_GROUP_NAME, value)

    @property
    def is_registration_viewer(self):
        """
        Returns True if this user is in the RegistrationViewers group, or False
        otherwise.
        """
        return self._is_in_group(REGISTRATION_VIEWER_GROUP_NAME)

    @is_registration_viewer.setter
    def is_registration_viewer(self, value):
        """Setter for is_registration_viewer."""
        self._set_group_membership(REGISTRATION_VIEWER_GROUP_NAME, value)

    def __str__(self):
        return self.email


# pylint: disable=unused-argument
def create_related_user_profile_for_user(sender, instance, created, **kwargs):
    """
    If the saved `User` was just created, then create a new `UserProfile` and
    associate it to the `User`.
    """
    if created:
        instance.user_profile = UserProfile.objects.create()
        instance.save()
        instance.user_profile.save()


models.signals.post_save.connect(
    create_related_user_profile_for_user,
    sender=User,
    weak=False,
    dispatch_uid="models.create_related_user_profile_for_user",
)


class Affiliation(BaseModel):
    """
    A user's affiliation, e.g. "UCSD" or "Google".
    """

    title = models.CharField(max_length=200, unique=True)
    created_by = models.OneToOneField(
        User, models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title


class Honorific(Enum):
    """
    In formal communications, this is used as a prefix for a user's full name.
    We use the term "honorific" in order to avoid the overloaded term "title".
    """

    MISTER = "Mr"
    MISS = "Ms"
    DOCTOR = "Dr"
    PROFESSOR = "Prof"


class HonorificField(models.CharField):
    """Django model field for `Honorific` values."""

    CHOICES = [(honorific.name, honorific.value) for honorific in Honorific]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", HonorificField.CHOICES)
        kwargs.setdefault("blank", False)
        kwargs.setdefault("default", "")
        super().__init__(*args, **kwargs)


class ShirtType(Enum):
    """Either MENS or WOMENS."""

    MENS = "Men's"
    WOMENS = "Women's"


class ShirtTypeField(models.CharField):
    """Django model field for `ShirtType` values."""

    CHOICES = [(shirt_type.name, shirt_type.value) for shirt_type in ShirtType]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", ShirtTypeField.CHOICES)
        super().__init__(*args, **kwargs)


class ShirtSize(Enum):
    """A shirt size."""

    SMALL = "S"
    MEDIUM = "M"
    LARGE = "L"
    XLARGE = "XL"
    XXLARGE = "XXL"


class ShirtSizeField(models.CharField):
    """Django model field for `ShirtSize` values."""

    CHOICES = [(shirt_size.name, shirt_size.value) for shirt_size in ShirtSize]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", ShirtSizeField.CHOICES)
        super().__init__(*args, **kwargs)


def new_profile_pic_path(user_profile, filename):
    """
    Generates a path at which to store a profile picture.
    """
    random_token = str(uuid.uuid4())
    path = pathlib.PurePosixPath("profile_pictures", random_token)
    return str(path)


class ProfilePicture(BaseModel):
    """
    A wrapper field for a profile picture.
    """

    picture = models.ImageField(upload_to=new_profile_pic_path)

    @property
    def url(self):
        """Shorthand for the picture's `url` field."""
        return self.picture.url


class UserProfile(BaseModel):
    """
    Fields associated with a `User` which are not related to authentication or
    authorization.
    """

    # Publicly-viewable, user-editable
    honorific = HonorificField()
    first_name = models.CharField("first name", max_length=30)
    last_name = models.CharField("last name", max_length=150)
    affiliation = models.ForeignKey(
        Affiliation,
        models.PROTECT,
        related_name="affiliated_users",
        blank=True,
        null=True,
    )
    website = models.URLField(max_length=200, blank=True, default="")
    old_profile_pic = models.URLField(max_length=250, blank=True, default="")
    new_profile_pic = models.ForeignKey(
        ProfilePicture,
        models.SET_NULL,
        related_name="user_profile",
        blank=True,
        null=True,
    )
    is_student = models.BooleanField(default=False)

    # User-viewable, user-editable
    phone_number = models.CharField(
        "phone number", max_length=20, blank=True, default=""
    )
    shirt_type = ShirtTypeField(blank=True, default="")
    shirt_size = ShirtSizeField(blank=True, default="")

    # Admin-viewable, admin-editable
    nickname = models.CharField(
        "nickname", max_length=150, blank=True, default=""
    )
    presenting_default = models.BooleanField(default=False)

    # Admin-viewable, non-editable
    first_name_original = models.CharField(
        "original first name", max_length=30, editable=False, blank=True
    )
    last_name_original = models.CharField(
        "original last name", max_length=150, editable=False, blank=True
    )
    email_original = models.EmailField(
        "original email address", max_length=255, editable=False, blank=True
    )

    def save(self, *args, **kwargs):  # pylint: disable=arguments-differ
        if self.first_name_original == "" and self.first_name != "":
            self.first_name_original = self.first_name
        if self.last_name_original == "" and self.last_name != "":
            self.last_name_original = self.last_name
        if self.email_original == "" and self.related_user is not None:
            self.email_original = self.related_user.email
        super().save(*args, **kwargs)

    def make_copy(self):
        """
        Return a shallow copy of this instance.
        """
        return UserProfile(
            honorific=self.honorific,
            first_name=self.first_name,
            last_name=self.last_name,
            affiliation=self.affiliation,
            website=self.website,
            is_student=self.is_student,
            phone_number=self.phone_number,
            shirt_type=self.shirt_type,
            shirt_size=self.shirt_size,
            nickname=self.nickname,
            first_name_original=self.first_name_original,
            last_name_original=self.last_name_original,
            email_original=self.email_original,
        )

    @property
    def related_user(self):
        """
        Return the related `User`, through the OneToOneField of either `User`
        or `Registration`.

        It is assumed that whenever both relations exist, they point to the
        same `User`.
        """
        if hasattr(self, "user"):
            return getattr(self, "user")
        if hasattr(self, "registration"):
            return getattr(self, "registration").user
        return None

    @property
    def email(self):
        """Returns the related User's email."""
        return self.related_user.email

    @property
    def affiliation_title(self):
        """
        Shortcut to access this profile's affiliation's title.
        """
        if self.affiliation is None:
            return ""
        return self.affiliation.title

    @property
    def formal_name(self):
        """
        Return the full name, prefixed with the honorific as appropriate.
        """
        return "{}{}".format(self.honorific_prefix, self.full_name)

    @property
    def formal_last_name(self):
        """
        Return the last name, prefixed with the honorific as appropriate.
        """
        if self.honorific_prefix == "":
            return self.full_name
        return "{}{}".format(self.honorific_prefix, self.last_name)

    @property
    def honorific_prefix(self):
        """
        Return the honorific in a suitable prefix format, or the empty string
        if the honorific is absent.

        For example, "MISTER" is formatted as "Mr. ".
        """
        if self.honorific == "":
            return ""
        return "{}. ".format(Honorific[self.honorific].value)

    @property
    def profile_pic(self):
        """
        Returns the new profile picture if present, or the old profile pic
        otherwise.
        """
        if self.new_profile_pic is not None:
            return self.new_profile_pic.url
        return self.old_profile_pic

    @property
    def full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "{} {}".format(self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        return self.full_name


class Workshop(BaseModel):
    """
    The 'root' of the workshop-related models. Each `Workshop` represents a
    major event (e.g. ITA Workshop 2018).
    """

    title = models.CharField(max_length=100, unique=True)
    slug = models.CharField(
        max_length=50, unique=True, validators=[SlugValidator]
    )
    start_date = models.DateField()
    end_date = models.DateField()

    # Fees
    base_fee_affiliate = MoneyField(default=Decimal("280"))
    base_fee_full = MoneyField(default=Decimal("280"))
    base_fee_student = MoneyField(default=Decimal("140"))
    daily_fee_affiliate = MoneyField(default=Decimal("60"))
    daily_fee_full = MoneyField(default=Decimal("60"))
    daily_fee_student = MoneyField(default=Decimal("40"))

    # Whether the Workshop is open for registration
    reg_open = models.BooleanField(default=False)

    def get_base_fee(self, fee_type):
        """
        Returns the base fee amount corresponding to the provided
        FeeType.
        """
        return fee_type.get_fee(
            affiliate=self.base_fee_affiliate,
            full=self.base_fee_full,
            student=self.base_fee_student,
        )

    def get_daily_fee(self, fee_type):
        """
        Returns the daily fee amount corresponding to the provided
        FeeType.
        """
        return fee_type.get_fee(
            affiliate=self.daily_fee_affiliate,
            full=self.daily_fee_full,
            student=self.daily_fee_student,
        )

    def __str__(self):
        return "{title} ({slug})".format(title=self.title, slug=self.slug)


# pylint: disable=unused-argument
def separate_regn_user_profiles_if_registration_closed(
    sender, instance, created, **kwargs
):
    """
    When a `Workshop` instance has `reg_open` set to False, ensure that each
    related registration's `UserProfile` is separate from that of its `User`
    field.

    This way, changes to `self.user.user_profile` will not be reflected in
    historic `Registrations`.
    """
    if instance.reg_open:
        return
    with transaction.atomic():
        for regn in instance.registrations.all():
            separate_user_profile = regn.get_separate_user_profile()
            separate_user_profile.save()
            regn.user_profile = separate_user_profile
            regn.save()


models.signals.post_save.connect(
    separate_regn_user_profiles_if_registration_closed,
    sender=Workshop,
    weak=False,
    dispatch_uid="models.separate_regn_user_profiles_if_registration_closed",
)


class FeeType(Enum):
    """
    Each `Registration` has an associated `FeeType` which determines the fee
    amounts for registration (overall and for individual options).
    """

    AFFILIATE = "Affiliate"
    EXEMPT = "Exempt"
    FULL = "Full"
    STUDENT = "Student"
    WAIVED = "Waived"

    def get_fee(self, *, affiliate, full, student):
        """
        Returns `Decimal('0')` if this `FeeType` is non-paying; otherwise,
        returns the value of the correspondingly-named argument.
        """
        return {
            FeeType.AFFILIATE: affiliate,
            FeeType.FULL: full,
            FeeType.STUDENT: student,
        }.get(self, Decimal("0"))


class FeeTypeField(models.CharField):
    """Django model field for `FeeType` values."""

    CHOICES = [(fee_type.name, fee_type.value) for fee_type in FeeType]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", FeeTypeField.CHOICES)
        kwargs.setdefault("default", FeeType.FULL.name)
        super().__init__(*args, **kwargs)


class ParticipationStatus(Enum):
    """
    Represents a user's certainty that they will attend a particular workshop.
    """

    ALMOST_CERTAINLY = "Almost certainly"
    PROBABLY = "Probably"
    PROBABLY_NOT = "Probably not"
    NEXT_TIME = "Next time"


PARTICIPATING_STATUSES = [
    ParticipationStatus.ALMOST_CERTAINLY.name,
    ParticipationStatus.PROBABLY.name,
]

FEE_TYPE_EXEMPT_WAIVED = [
    FeeType.EXEMPT.name,
    FeeType.WAIVED.name,
]

DOC_OR_PROF = [Honorific.DOCTOR.name,Honorific.PROFESSOR.name]


class ParticipationStatusField(models.CharField):
    """Django model field for `ParticipationStatus` values."""

    CHOICES = [(status.name, status.value) for status in ParticipationStatus]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 50)
        kwargs.setdefault("choices", ParticipationStatusField.CHOICES)
        kwargs.setdefault("default", "")
        super().__init__(*args, **kwargs)


class RegistrantType(Enum):
    """
    Each `Registration` is either invited, or self-registered.
    """

    INVITED = "Invited"
    SELF_REGISTERED = "Self-registered"


class RegistrantTypeField(models.CharField):
    """Django model field for `RegistrantType` values."""

    CHOICES = [(reg_type.name, reg_type.value) for reg_type in RegistrantType]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", RegistrantTypeField.CHOICES)
        kwargs.setdefault("default", RegistrantType.SELF_REGISTERED.name)
        super().__init__(*args, **kwargs)


class RegistrationOption(BaseModel):
    """
    An options that a `User` may select when registering for a `Workshop`, e.g.
    T-shirt, banquet attendance, etc.
    """

    workshop = models.ForeignKey(
        Workshop, models.CASCADE, related_name="registration_options"
    )
    date = models.DateField(null=True, blank=True)
    slug = models.CharField(
        max_length=50, unique=True, validators=[SlugValidator]
    )

    title = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=2000, default="")

    fee_affiliate = MoneyField(default=Decimal("0"))
    fee_full = MoneyField(default=Decimal("0"))
    fee_student = MoneyField(default=Decimal("0"))

    def get_fee(self, fee_type):
        """Returns the fee amount corresponding to the provided FeeType."""
        return fee_type.get_fee(
            affiliate=self.fee_affiliate,
            full=self.fee_full,
            student=self.fee_student,
        )

    def __str__(self):
        return str(self.title)


class Registration(BaseModel):
    """
    Each user may have 0 or 1 `Registration`s associated with each `Workshop`,
    which represents the dates on which they plan to attend, the
    `RegistrationOption`s they have selected, and fee-related fields.
    """

    # workshop-and-user form a joint key
    workshop = models.ForeignKey(
        Workshop, models.CASCADE, related_name="registrations"
    )
    user = models.ForeignKey(
        User, models.CASCADE, related_name="registrations"
    )
    user_profile = models.OneToOneField(
        UserProfile, models.PROTECT, related_name="registration", null=True
    )

    # Participation
    attending_dates = models.ManyToManyField(Date)
    participation_status = ParticipationStatusField(blank=True)
    options = models.ManyToManyField(RegistrationOption)
    attending_italt= models.BooleanField(default=False)
    banquet_options = models.CharField("banquet options", max_length=3, null=True)

    # Fees
    fee_type = FeeTypeField(blank=True, default="")  # string name
    total_fee_amount = MoneyField(editable=False)  # Computed on save
    paid_fee_amount = MoneyField(default=0.0, editable=False)
    has_approved_payment = models.BooleanField(default=False, editable=False)
    approved_payments_total_amount = MoneyField(default=0.0, editable=False)

    # Presentation
    presenting = models.BooleanField(default=False)
    plenary = models.BooleanField(default=False)
    poster = models.BooleanField(default=False)
    graduation_talk = models.BooleanField(default=False)
    graduation_presentation = models.BooleanField(default=False)

    # Misc
    registrant_type = RegistrantTypeField()
    inviter = models.ForeignKey(
        User,
        models.SET_NULL,
        related_name="invited_registrations",
        null=True,
        blank=True,
    )
    registrant_number = models.PositiveIntegerField(null=True, default=None)

    class Meta:
        unique_together = (
            ("workshop", "user"),
            ("workshop", "registrant_number"),
        )

    def __str__(self):
        return "{user!s} at {workshop!s}".format(
            user=self.user, workshop=self.workshop
        )

    def compute_total_fee(self):
        """
        Computes and returns the total fee amount, including base fee, daily
        fees, and fees for selected `RegistrationOption`s.
        """
        # Field
        if self.fee_type != "":
            fee_type = FeeType[self.fee_type]
        elif self.user_profile.is_student:
            fee_type = FeeType.STUDENT
        else:
            fee_type = FeeType.FULL

        base_fee = self.workshop.get_base_fee(fee_type)
        num_days = len(self.attending_dates.all())
        days_fee = self.workshop.get_daily_fee(fee_type) * num_days
        options_fee = sum(
            option.get_fee(fee_type) for option in self.options.all()
        )
        return base_fee + days_fee + options_fee

    @property
    def is_participating(self):
        """Returns if this Registration is considered "participating"."""
        return self.participation_status in PARTICIPATING_STATUSES

    def save(self, *args, **kwargs):  # pylint: disable=arguments-differ
        # TODO(alex) why did I implement this by double-saving?
        with transaction.atomic():
            self.total_fee_amount = 0
            super().save(*args, **kwargs)
            self.total_fee_amount = self.compute_total_fee()
            if (self.registrant_number is None) and self.is_participating:
                max_registrant_number = (
                    Registration.objects.filter(workshop=self.workshop)
                    .aggregate(max_num=models.Max("registrant_number"))
                    .get("max_num")
                )
                if max_registrant_number is None:
                    max_registrant_number = 0
                self.registrant_number = max_registrant_number + 1
            super().save()

    def set_user_profile_from_user(self):
        """
        Set `self.user_profile` equal to that of `self.user`.
        """
        self.user_profile = self.user.user_profile

    def get_separate_user_profile(self):
        """
        Return a `UserProfile` which is distinct from `self.user.user_profile`,
        which is `self.user_profile` if satisfactory.
        """
        if self.user.user_profile == self.user_profile:
            return self.user_profile.make_copy()
        return self.user_profile

    def _get_approved_payments(self):
        return RegistrationPayment.objects.filter(
            registration=self, status=RegistrationPaymentStatus.APPROVED.name
        )

    def update_approved_payment_fields(self):
        """
        Computes has_approved_payment and approved_payments_total_amount and
        sets those fields. Also, if has_approved_payment is True, then sets
        participation_status to at least PROBABLY. Does not save.
        """
        no_payment_required = self.fee_type in [
            FeeType.EXEMPT.name,
            FeeType.WAIVED.name,
        ]
        self.has_approved_payment = (
            self._get_approved_payments().exists()
        )
        if self.has_approved_payment and (
            self.participation_status not in PARTICIPATING_STATUSES
        ):
            self.participation_status = ParticipationStatus.PROBABLY.name

        # Returns the sum of amounts among all approved associated
        # RegistrationPayments
        total = (
            self._get_approved_payments()
            .aggregate(models.Sum("amount"))
            .get("amount__sum", None)
        )
        if total is None:
            total = Decimal("0.00")
        self.approved_payments_total_amount = total

    def selected_option_slugs(self):
        return set(opt.slug for opt in self.options.all())
    
    def enable_presentation(self):
        if self.user_profile.honorific == "PROFESSOR" or self.user_profile.honorific == "DOCTOR":
            self.presenting = True
    
    def enable_poster(self):
        if self.user_profile.is_student:
            self.poster = True
            

# pylint: disable=unused-argument
def create_related_user_profile_for_registration(
    sender, instance, created, **kwargs
):
    """
    Post-save hook to set up a UserProfile for a newly-created Registration
    instance.
    """
    if created:
        instance.set_user_profile_from_user()
        instance.presenting = instance.user_profile.presenting_default
        # If this user profile is already linked to a registration,
        # set up a new user profile
        if instance.user_profile.registration:
            new_user_profile = instance.get_separate_user_profile()
            new_user_profile.save()
            instance.user_profile = new_user_profile
        instance.save()


models.signals.post_save.connect(
    create_related_user_profile_for_registration,
    sender=Registration,
    weak=False,
    dispatch_uid="models.create_related_user_profile_for_registration",
)


def create_related_talk_for_registration(sender, instance, created, **kwargs):
    """Post-save hook to set up a Talk for a newly-created Registration."""
    if created:
        Talk.objects.get_or_create(registration=instance)


models.signals.post_save.connect(
    create_related_talk_for_registration,
    sender=Registration,
    weak=False,
    dispatch_uid="models.create_related_talk_for_registration",
)


class RegistrationPaymentStatus(Enum):
    """
    The status of a `RegistrationPayment` in the payment flow.

    Initiated:
        Payment flow initiated, but not completed nor canceled explicitly
    APPROVED, DECLINED, ERROR, HELD_FOR_REVIEW:
        As in Authorize.net terminology
    Canceled:
        Payment flow explicitly canceled (currently unsupported)
    """

    INITIATED = "Initiated"
    CANCELED = "Canceled"
    APPROVED = "Approved"
    DECLINED = "Declined"
    ERROR = "Error"
    HELD_FOR_REVIEW = "Held for review"

    @property
    def is_terminal(self):
        """
        Return True if this status is terminal, i.e. should not be transitioned
        to another status.
        """
        return self in [
            RegistrationPaymentStatus.CANCELED,
            RegistrationPaymentStatus.APPROVED,
            RegistrationPaymentStatus.DECLINED,
            RegistrationPaymentStatus.ERROR,
        ]


class RegistrationPaymentStatusField(models.CharField):
    """Django model field for `RegistrationPaymentStatus` values."""

    CHOICES = [
        (status.name, status.value) for status in RegistrationPaymentStatus
    ]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", RegistrationPaymentStatusField.CHOICES)
        kwargs.setdefault("default", RegistrationPaymentStatus.INITIATED.name)
        super().__init__(*args, **kwargs)


class RegistrationPayment(BaseModel):
    """
    A payment for a `Registration`.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    registration = models.ForeignKey(
        Registration, models.PROTECT, editable=False
    )
    continue_uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    amount = MoneyField(editable=False)
    status = RegistrationPaymentStatusField(editable=False)
    invoice_number = models.CharField(max_length=20, editable=False)
    transaction_id = models.CharField(
        max_length=50, blank=True, editable=False
    )

    def save(self, *args, **kwargs):  # pylint: disable=arguments-differ
        super().save(*args, **kwargs)
        regn = self.registration
        regn.update_approved_payment_fields()
        regn.save()


class OneTimeChargeStatus(Enum):
    """
    Flow status of a OneTimeCharge.

    -   When a privileged user creates a OneTimeCharge, it is OPEN.
    -   If a privileged user cancels the charge before it is paid, it becomes
        CANCELED.
    -   If the charged user pays the OneTimeCharge, it becomes PAID.
    """

    OPEN = "Open"
    CANCELED = "Canceled"
    PAID = "Paid"

    @property
    def is_terminal(self):
        """
        Returns True if this status is terminal; i.e. should not be
        transitioned to another status.
        """

        return self in [OneTimeChargeStatus.CANCELED, OneTimeChargeStatus.PAID]


class OneTimeChargeStatusField(models.CharField):
    """Django model field for `OneTimeChargeStatus` values."""

    CHOICES = [(status.name, status.value) for status in OneTimeChargeStatus]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", OneTimeChargeStatusField.CHOICES)
        kwargs.setdefault("default", OneTimeChargeStatus.OPEN.name)
        super().__init__(*args, **kwargs)


class OneTimeCharge(BaseModel):
    """A money charge, manually created for a one-time expense."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    recipient = models.ForeignKey(User, models.PROTECT, editable=False)
    amount = MoneyField()
    status = OneTimeChargeStatusField()
    # The message should be shown to the recipient
    message = models.CharField(max_length=2000, blank=True, default="")
    # The comment SHOULD NOT be shown to the recipient, but only to privileged
    # users
    comment = models.CharField(max_length=2000, blank=True, default="")

    @property
    def is_paid(self):
        """Returns True if the status is paid."""
        return self.status == OneTimeChargeStatus.PAID.name


class OneTimeChargePaymentStatus(Enum):
    """
    The status of a `OneTimeChargePayment` in the payment flow.

    Initiated:
        Payment flow initiated, but not completed nor canceled explicitly
    APPROVED, DECLINED, ERROR, HELD_FOR_REVIEW:
        As in Authorize.net terminology
    Canceled:
        Payment flow explicitly canceled (currently unsupported)
    """

    INITIATED = "Initiated"
    CANCELED = "Canceled"
    APPROVED = "Approved"
    DECLINED = "Declined"
    ERROR = "Error"
    HELD_FOR_REVIEW = "Held for review"

    @property
    def is_terminal(self):
        """
        Return True if this status is terminal, i.e. should not be transitioned
        to another status.
        """
        return self in [
            OneTimeChargePaymentStatus.CANCELED,
            OneTimeChargePaymentStatus.APPROVED,
            OneTimeChargePaymentStatus.DECLINED,
            OneTimeChargePaymentStatus.ERROR,
        ]


class OneTimeChargePaymentStatusField(models.CharField):
    """Django model field for `OneTimeChargePaymentStatus` values."""

    CHOICES = [
        (status.name, status.value) for status in OneTimeChargePaymentStatus
    ]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 20)
        kwargs.setdefault("choices", OneTimeChargePaymentStatusField.CHOICES)
        kwargs.setdefault("default", OneTimeChargePaymentStatus.INITIATED.name)
        super().__init__(*args, **kwargs)


class OneTimeChargePayment(BaseModel):
    """A payment for a OneTimeCharge."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    charge = models.ForeignKey(OneTimeCharge, models.PROTECT, editable=False)
    status = OneTimeChargePaymentStatusField(editable=False)
    invoice_number = models.CharField(max_length=20, editable=False)
    transaction_id = models.CharField(
        max_length=50, blank=True, editable=False
    )

    def save(self, *args, **kwargs):  # pylint: disable=arguments-differ
        super().save(*args, **kwargs)
        if self.status == OneTimeChargePaymentStatus.APPROVED.name:
            charge = self.charge
            charge.status = OneTimeChargeStatus.PAID.name
            charge.save()


class Invitation(BaseModel):
    """
    A `User` must receive an `Invitation` for a particular `Workshop` in order
    to upload and present one or more `Talk`s.
    """

    workshop = models.ForeignKey(Workshop, models.CASCADE)
    sender = models.ForeignKey(
        User, models.CASCADE, related_name="invitations_sent"
    )
    recipient = models.ForeignKey(
        User, models.CASCADE, related_name="invitations_received"
    )

    class Meta:
        unique_together = (
            # A recipient can only have one Invitation to a Workshop
            ("recipient", "workshop"),
        )

    def __str__(self):
        return "from {sender} to {recipient} for {workshop}".format(
            sender=self.sender,
            recipient=self.recipient,
            workshop=self.workshop,
        )


def new_talk_paper_path(user_profile, original_filename):
    """
    Generates a path at which to store a Talk paper.
    """
    random_token = str(uuid.uuid4())
    filename = "paper_{}.pdf".format(random_token)
    path = pathlib.PurePosixPath("talk_papers", filename)
    return str(path)


def new_talk_video_path(user_profile, original_filename):
    """
    Generates a path at which to store a Talk video, preserving the original file extension.
    """
    random_token = str(uuid.uuid4())
    # Extract the original file extension
    original_ext = pathlib.Path(original_filename).suffix
    # Ensure the extension is in lowercase for consistency
    filename = f"video_{random_token}{original_ext.lower()}"
    path = pathlib.PurePosixPath("talk_videos", filename)
    return str(path)

# def new_talk_video_path(user_profile, original_filename):
#     """
#     Generates a path at which to store a Talk video.
#     """
#     random_token = str(uuid.uuid4())
#     filename = "video_{}.mp4".format(random_token)
#     path = pathlib.PurePosixPath("talk_videos", filename)
#     return str(path)


class TalkPaper(BaseModel):
    """
    A wrapper field for a Talk paper file.
    """

    file = models.FileField(upload_to=new_talk_paper_path)

    @property
    def url(self):
        """Shorthand for the file's `url` field."""
        return self.file.url

class TalkVideo(BaseModel):
    """
    A wrapper field for a Talk video file.
    """

    file = models.FileField(upload_to=new_talk_video_path)

    @property
    def url(self):
        """Shorthand for the file's `url` field."""
        return self.file.url

class Room(BaseModel):
    """
    A location in which a `TalkTrack` can occur.
    """

    workshop = models.ForeignKey(
        Workshop, models.CASCADE, related_name="rooms"
    )
    title = models.CharField(max_length=100)

    class Meta:
        unique_together = (("workshop", "title"),)

    def __str__(self):
        return "{title} at {workshop}".format(
            title=self.title, workshop=self.workshop
        )
    
#yo
class Timeslot(BaseModel):
    class SlotType(models.TextChoices):
        REGULAR = 'RE', 'Regular' 
        PLENARY = 'PL', 'Plenary'
        EVENT = 'EV', 'Event'
        LUNCH = 'LU', 'Lunch'
        BREAKFAST = 'BF', "Breakfast"
        BREAK = 'BR', 'Break'
    day= models.CharField(max_length= 10)
    type = models.CharField(choices=SlotType.choices, max_length=2)
    start_time = models.TimeField(auto_now=False, auto_now_add=False)
    end_time = models.TimeField(auto_now=False, auto_now_add=False)
    #talks = ArrayField(models.ForeignKey(Talk, on_delete=models.CASCADE), blank=True, null=True)
    #talks = models.ManyToManyField(Talk)

#yo
class Session(BaseModel):
    title = models.CharField(max_length= 100)
    chair = models.ForeignKey(User, on_delete = models.CASCADE, blank= True, null= True)
    room_id = models.ForeignKey(Room, on_delete= models.CASCADE, blank= True, null= True)
    #talks = ArrayField(models.ForeignKey(Talk, on_delete=models.CASCADE), blank=True, null=True)
    timeslot_id= models.ForeignKey(Timeslot, on_delete= models.CASCADE, blank= True, null= True)
    def __str__(self):
        return '"{title}" is chaired by {chair} in the room {room_id}'.format(
            title = self.title, chair = self.chair, 
            room_id = self.room_id
            )


class Talk(BaseModel):
    """
    A `Talk` represnts any kind of presentation associated with a workshop
    participant (i.e. a `User` with a `Registration`), including plenary talks,
    session talks, and poster talks.
    """

    registration = models.ForeignKey(
        Registration, models.CASCADE, related_name="talks"
    )
    session_id= models.ForeignKey(Session, on_delete= models.CASCADE, blank= True, null= True)
    title = models.CharField(max_length=200, default="", blank=True)
    abstract = models.CharField(max_length=2000, default="", blank=True)
    paper = models.ForeignKey(
        TalkPaper, models.SET_NULL, related_name="talk", blank=True, null=True
    )
    video = models.ForeignKey(
        TalkVideo, models.SET_NULL, related_name="talk", blank=True, null=True
    )
    topic_comment = models.CharField(max_length=2000, default="", blank=True)
    scheduling_comment = models.CharField(
        max_length=2000, default="", blank=True
    )
    authors_comment = models.CharField(max_length=2000, default="", blank=True)
    admin_comment = models.CharField(max_length=2000, default="", blank=True)

    @property
    def paper_url(self):
        """Shorthand for the paper's `url` field."""
        if self.paper is None:
            return ""
        return self.paper.url
    
    @property
    def video_url(self):
        """Shorthand for the video's `url` field."""
        if self.video is None:
            return ""
        return self.video.url

    def __str__(self):
        return '{presenter} - "{title}"'.format(
            presenter=self.registration.user, title=self.title
        )


class TalkSchedule(BaseModel):
    """
    A schedule of talks.

    The `talk_structure` field is a JSON blob for flexibility, and therefore
    lacks a proper relational schema. However, there is a JSON schema, which
    should be documented here (and validated below).

    TODO: add documentation for the JSON schema
    TODO: validate JSON structure against the schema
    """

    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, models.CASCADE, related_name="schedules")
    talk_structure = JSONField(default=list)

    def __str__(self):
        return '"{title}" owned by {owner}'.format(
            owner=self.owner, title=self.title
        )
