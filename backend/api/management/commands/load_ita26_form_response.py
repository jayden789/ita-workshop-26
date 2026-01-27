# api/management/commands/load_ita26_form_response.py

from django.core.management.base import BaseCommand
from django.db import IntegrityError, transaction
import csv
import os

from api.models import User, UserProfile, Affiliation


DEFAULT_PASSWORD = "ita26_default_password"  # change this


class Command(BaseCommand):
    help = "Load ITA 2026 form responses and create/update users + profiles."

    def add_arguments(self, parser):
        parser.add_argument(
            "--csv",
            type=str,
            default=None,
            help="Path to the ITA 2026 responses CSV file.",
        )

    def handle(self, *args, **options):
        root_path = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
        )

        default_csv_path = os.path.join(
            root_path,
            "api",
            "ITA_2026_form.csv",
        )

        csv_path = options["csv"] or default_csv_path

        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"CSV not found: {csv_path}")

        rows = self.load_rows(csv_path)

        created_count = 0
        updated_count = 0
        skipped_count = 0
        present_count = 0

        for idx, row in enumerate(rows, start=2):  # start=2 because header is line 1
            email = (row.get("Email Address") or "").strip().lower()
            first_name = (row.get("First Name") or "").strip()
            last_name = (row.get("Last Name") or "").strip()

            # NOTE: Your 2026 CSV column names may include trailing spaces for some fields.
            # We'll safely check both variants.
            title = (row.get("Title") or row.get("Job Title") or "").strip()
            affiliation = (row.get("Affiliation") or "").strip()

            if not email or not first_name or not last_name:
                skipped_count += 1
                self.stdout.write(
                    self.style.WARNING(
                        f"[Row {idx}] Skipped (missing required): email/first/last"
                    )
                )
                continue

            try:
                with transaction.atomic():
                    user = User.objects.filter(email=email).first()

                    if user is None:
                        # Create new user with default password
                        user = User.objects.create_user(email=email, password=DEFAULT_PASSWORD)
                        created_count += 1
                    else:
                        updated_count += 1

                    # Ensure profile exists (your app seems to auto-create it, but be safe)
                    profile = getattr(user, "user_profile", None)
                    if profile is None:
                        profile = UserProfile.objects.create(user=user)

                    # Update profile fields if they exist on your model
                    self.set_if_field_exists(profile, "first_name", first_name)
                    self.set_if_field_exists(profile, "last_name", last_name)
                    self.set_if_field_exists(profile, "title", title)
                    self.set_affiliation(profile, affiliation)
                    # Some schemas store original email in profile
                    self.set_if_field_exists(profile, "email_original", email)

                    workshop = self.get_workshop_ita26()
                    registration = self.get_or_create_registration_for_user(workshop, user)

                    # If presenting == Yes, mark presenting and upsert Talk fields
                    wants_present = self.normalize_yes(
                        row.get("Would you like to present a talk?") or ""
                    )

                    if wants_present:
                        registration.presenting = True
                        registration.save()
                        present_count += 1
                        talk_title = (row.get("Talk title") or "").strip()
                        authors = (row.get("Authors") or "").strip()
                        abstract = (row.get("Abstract") or "").strip()
                        topic_comment = (row.get("Topic comment") or row.get("Topic comment ") or "").strip()
                        time_comment = (row.get("Time comment") or "").strip()

                        self.upsert_talk_for_registration(
                            registration,
                            talk_title,
                            authors,
                            abstract,
                            topic_comment,
                            time_comment,
                        )
                        

            except IntegrityError as e:
                skipped_count += 1
                self.stdout.write(
                    self.style.ERROR(f"[Row {idx}] IntegrityError for {email}: {e}")
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created={created_count}, Updated={updated_count}, Skipped={skipped_count}, Presenting={present_count}"
            )
        )

    def load_rows(self, csv_path: str):
        with open(csv_path, mode="r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            return list(reader)

    def set_if_field_exists(self, obj, field_name: str, value):
        """
        Only set fields that actually exist on the Django model,
        so this command won't crash if your UserProfile schema differs.
        """
        try:
            obj._meta.get_field(field_name)
        except Exception:
            return
        setattr(obj, field_name, value)
        
    def set_affiliation(self, profile, affiliation_name: str):
        """
        UserProfile.affiliation is a FK to Affiliation.
        We resolve by name; create if missing.
        """
        # If your model uses blank affiliations, just skip
        name = (affiliation_name or "").strip()
        if not name:
            return

        # Try common field names for affiliation display
        # Most likely it's `name`, but we defensively try a few.
        # We'll find the first one that exists on the model.
        possible_fields = ["name", "title", "affiliation", "label"]

        field = None
        for f in possible_fields:
            try:
                Affiliation._meta.get_field(f)
                field = f
                break
            except Exception:
                continue

        if field is None:
            # If we can't find a text field to match on, just skip rather than crash
            return

        # Case-insensitive match to avoid duplicates like "UCSD" vs "Ucsd"
        lookup = {f"{field}__iexact": name}
        aff = Affiliation.objects.filter(**lookup).first()

        if aff is None:
            aff = Affiliation.objects.create(**{field: name})

        profile.affiliation = aff

    def get_workshop_ita26(self):
        # Change slug here if needed
        from api.models import Workshop
        workshop = Workshop.objects.filter(slug="ita26").first()
        if workshop is None:
            raise ValueError("Workshop with slug='ita26' not found. Create it or fix the slug.")
        return workshop

    def get_or_create_registration_for_user(self, workshop, user):
        """
        Create a Registration for every user.
        IMPORTANT: ensure user_profile is set so compute_total_fee won't crash.
        """
        from api.models import Registration

        registration, _ = Registration.objects.get_or_create(
            workshop=workshop,
            user=user,
        )

        # Ensure registration.user_profile is set (critical for compute_total_fee)
        if registration.user_profile is None:
            registration.user_profile = user.user_profile

        # registrant_type is required in your model; set a safe default if empty
        # You MUST replace this string with a valid RegistrantType choice used in your project.
        if not registration.registrant_type:
            registration.registrant_type = "FULL"  # <-- CHANGE if your choices differ

        registration.save()
        return registration

    def normalize_yes(self, value: str) -> bool:
        v = (value or "").strip().lower()
        return v in ["yes", "y", "true", "1"]

    def upsert_talk_for_registration(
        self,
        registration,
        talk_title,
        authors,
        abstract,
        topic_comment,
        time_comment,
    ):
        """
        Create talk if missing; then update fields.
        """
        # Import here to avoid circulars at import-time
        from api.models import Talk

        talk = registration.talks.first()
        if talk is None:
            # create a new talk connected to this registration
            talk = Talk.objects.create(registration=registration)

        if talk_title:
            talk.title = talk_title[:200]
        if authors:
            # 2025 used authors_comment for co-authors/authors
            if hasattr(talk, "authors_comment"):
                talk.authors_comment = authors[:2000]
        if abstract and hasattr(talk, "abstract"):
            talk.abstract = abstract[:2000]
        if topic_comment and hasattr(talk, "topic_comment"):
            talk.topic_comment = topic_comment[:2000]
        if time_comment and hasattr(talk, "scheduling_comment"):
            talk.scheduling_comment = time_comment[:2000]

        talk.save()

    # -----------------------------
    # Override handle: add reg/talk
    # -----------------------------


