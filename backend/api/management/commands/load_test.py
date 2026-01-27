# api/management/commands/load_test.py
#
# Helper command:
# - Reads the SAME CSV format as load_ita26_old_users.py
# - Creates ONLY missing User + UserProfile (+ optional affiliation/honorific/title)
# - Does NOT create Registration or Talk
# - Safe to run multiple times (idempotent-ish): skips users that already exist

from django.core.management.base import BaseCommand
from django.db import IntegrityError, transaction
import csv
import os

from api.models import User, UserProfile, Affiliation, Honorific


DEFAULT_PASSWORD = "ita26_default_password"  # change this


class Command(BaseCommand):
    help = "TEST: Create User + UserProfile for each row in old-users CSV. No registrations/talks."

    def add_arguments(self, parser):
        parser.add_argument("--csv", type=str, default=None, help="Path to CSV.")

    def handle(self, *args, **options):
        root_path = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
        )
        # Keep default aligned with your old-users loader
        default_csv_path = os.path.join(root_path, "api", "ITA_2026_old_users.csv")
        csv_path = options["csv"] or default_csv_path

        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"CSV not found: {csv_path}")

        rows = self.load_rows(csv_path)
        total_rows = len(rows)

        created_users = 0
        created_profiles = 0
        already_exists = 0
        skipped_rows = 0
        integrity_errors = 0

        for idx, row in enumerate(rows, start=2):
            email = (row.get("Email Address") or "").strip().lower()
            first_name = (row.get("First name") or row.get("First Name") or "").strip()
            last_name = (row.get("Last name") or row.get("Last Name") or "").strip()

            # CSV "Title" is honorific (Mr./Ms./Dr./Prof.)
            honorific_raw = (row.get("Title") or "").strip()
            job_title = (row.get("Job Title") or "").strip()
            affiliation = (row.get("Affiliation") or "").strip()

            if not email:
                skipped_rows += 1
                self.stdout.write(self.style.WARNING(f"[Row {idx}] Skipped: missing email"))
                continue

            try:
                with transaction.atomic():
                    if User.objects.filter(email=email).exists():
                        already_exists += 1
                        continue

                    user = User.objects.create_user(email=email, password=DEFAULT_PASSWORD)
                    created_users += 1

                    profile = getattr(user, "user_profile", None)
                    if profile is None:
                        profile = UserProfile.objects.create(user=user)
                        created_profiles += 1

                    # Names (set if provided)
                    if first_name:
                        profile.first_name = first_name
                    if last_name:
                        profile.last_name = last_name

                    # honorific mapping from CSV
                    honorific_value = self.parse_honorific(honorific_raw)
                    if honorific_value and self.model_has_field(UserProfile, "honorific"):
                        profile.honorific = honorific_value

                    # optional job title -> profile.title (only if the field exists)
                    if job_title:
                        self.set_if_field_exists(profile, "title", job_title)

                    # optional email_original
                    self.set_if_field_exists(profile, "email_original", email)

                    # affiliation
                    if affiliation:
                        self.set_affiliation(profile, affiliation)

                    profile.save()

            except IntegrityError as e:
                integrity_errors += 1
                self.stdout.write(self.style.ERROR(f"[Row {idx}] IntegrityError {email}: {e}"))

        self.stdout.write(
            self.style.SUCCESS(
                "Done (LOAD_TEST).\n"
                f"CSV rows={total_rows}\n"
                f"created_users={created_users}\n"
                f"created_profiles={created_profiles}\n"
                f"already_exists={already_exists}\n"
                f"skipped_rows={skipped_rows}\n"
                f"integrity_errors={integrity_errors}\n"
            )
        )

    # ---------- helpers ----------

    def load_rows(self, csv_path: str):
        with open(csv_path, mode="r", encoding="utf-8-sig", newline="") as f:
            return list(csv.DictReader(f))

    def parse_honorific(self, raw: str) -> str:
        v = (raw or "").strip().lower()
        mapping = {
            "mr": Honorific.MISTER.name,
            "mr.": Honorific.MISTER.name,
            "ms": Honorific.MISS.name,
            "ms.": Honorific.MISS.name,
            "dr": Honorific.DOCTOR.name,
            "dr.": Honorific.DOCTOR.name,
            "prof": Honorific.PROFESSOR.name,
            "prof.": Honorific.PROFESSOR.name,
        }
        return mapping.get(v, "")

    def set_if_field_exists(self, obj, field_name: str, value):
        try:
            obj._meta.get_field(field_name)
        except Exception:
            return
        setattr(obj, field_name, value)

    def set_affiliation(self, profile, affiliation_name: str):
        """
        Match your mock script: Affiliation keyed by `title` if it exists.
        """
        name = (affiliation_name or "").strip()
        if not name:
            return

        if self.model_has_field(Affiliation, "title"):
            aff, _ = Affiliation.objects.get_or_create(title=name)
            profile.affiliation = aff
            return

        for field in ["name", "label", "affiliation"]:
            if self.model_has_field(Affiliation, field):
                lookup = {f"{field}__iexact": name}
                aff = Affiliation.objects.filter(**lookup).first()
                if aff is None:
                    aff = Affiliation.objects.create(**{field: name})
                profile.affiliation = aff
                return

    def model_has_field(self, model, field_name: str) -> bool:
        try:
            model._meta.get_field(field_name)
            return True
        except Exception:
            return False
