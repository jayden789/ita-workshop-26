# api/management/commands/load_ita26_old_users.py
#
# ITA26: For EXISTING users from CSV:
# - find user by email
# - update profile fields (name, honorific, affiliation, email_original, optional job title)
# - create/get Registration for ita26
# - set participation_status = ALMOST_CERTAINLY
# - set registrant_type = SELF_REGISTERED if empty (adjust if you want INVITED)
# - set presenting based on CSV, and update the AUTO-created Talk (do not create Talk here)
# - print counts: csv_rows vs updates done

from django.core.management.base import BaseCommand
from django.db import IntegrityError, transaction
import csv
import os

from api.models import (
    User,
    UserProfile,
    Affiliation,
    Workshop,
    Registration,
    ParticipationStatus,
    RegistrantType,
    Honorific,
)


class Command(BaseCommand):
    help = "ITA26: Update EXISTING users from CSV, ensure registration, set presenting, update existing auto-talk."

    def add_arguments(self, parser):
        parser.add_argument("--csv", type=str, default=None, help="Path to CSV.")

    def handle(self, *args, **options):
        root_path = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
        )
        default_csv_path = os.path.join(root_path, "api", "ITA_2026_old_users.csv")
        csv_path = options["csv"] or default_csv_path

        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"CSV not found: {csv_path}")

        workshop = self.get_workshop("ita26")
        rows = self.load_rows(csv_path)

        total_rows = len(rows)

        # counters
        missing_user = 0
        skipped_rows = 0
        updated_users = 0
        registrations_created = 0
        registrations_existing = 0
        presenting_yes = 0
        talks_updated = 0
        missing_auto_talk_for_presenters = 0
        existing_registration_emails = []

        for idx, row in enumerate(rows, start=2):
            email = (row.get("Email Address") or "").strip().lower()
            first_name = (row.get("First name") or row.get("First Name") or "").strip()
            last_name = (row.get("Last name") or row.get("Last Name") or "").strip()

            # Honorific in CSV: Mr./Ms./Dr./Prof.
            honorific_raw = (row.get("Title") or "").strip()
            job_title = (row.get("Job Title") or "").strip()
            affiliation = (row.get("Affiliation") or "").strip()

            if not email:
                skipped_rows += 1
                self.stdout.write(self.style.WARNING(f"[Row {idx}] Skipped: missing email"))
                continue

            try:
                with transaction.atomic():
                    user = User.objects.filter(email=email).first()
                    if user is None:
                        missing_user += 1
                        self.stdout.write(self.style.WARNING(f"[Row {idx}] Missing user: {email}"))
                        continue

                    # Profile
                    profile = getattr(user, "user_profile", None)
                    if profile is None:
                        # should rarely happen, but keep safe
                        profile = UserProfile.objects.create(user=user)

                    changed = False

                    # Only overwrite names if provided (old users CSV may still contain them)
                    if first_name:
                        profile.first_name = first_name
                        changed = True
                    if last_name:
                        profile.last_name = last_name
                        changed = True

                    honorific_value = self.parse_honorific(honorific_raw)
                    if honorific_value:
                        if self.model_has_field(UserProfile, "honorific"):
                            profile.honorific = honorific_value
                            changed = True

                    # Optional job title
                    if job_title:
                        if self.model_has_field(UserProfile, "title"):
                            profile.title = job_title
                            changed = True

                    # Optional email_original
                    if self.model_has_field(UserProfile, "email_original"):
                        profile.email_original = email
                        changed = True

                    # affiliation (only if provided)
                    if affiliation:
                        self.set_affiliation(profile, affiliation)
                        changed = True

                    if changed:
                        profile.save()

                    updated_users += 1

                    # Registration
                    regn, created_reg = Registration.objects.get_or_create(
                        workshop=workshop, user=user
                    )
                    if created_reg:
                        registrations_created += 1
                    else:
                        registrations_existing += 1
                        existing_registration_emails.append(email)

                    # Ensure linkage required by your Registration model
                    if regn.user_profile is None:
                        regn.user_profile = user.user_profile

                    # Force ALMOST_CERTAINLY for everyone
                    regn.participation_status = ParticipationStatus.ALMOST_CERTAINLY.name

                    # Set registrant_type if missing (adjust if you prefer INVITED for old users)
                    if not regn.registrant_type:
                        regn.registrant_type = RegistrantType.SELF_REGISTERED.name

                    wants_present = self.normalize_yes(
                        row.get("Would you like to present a talk?") or ""
                    )
                    regn.presenting = bool(wants_present)

                    regn.save()

                    if wants_present:
                        presenting_yes += 1
                        talk = regn.talks.first()
                        if talk is None:
                            missing_auto_talk_for_presenters += 1
                        else:
                            updated = self.update_existing_talk(
                                talk=talk,
                                talk_title=(row.get("Talk title") or "").strip(),
                                authors=(row.get("Authors") or "").strip(),
                                abstract=(row.get("Abstract") or "").strip(),
                                topic_comment=(
                                    row.get("Topic comment")
                                    or row.get("Topic comment ")
                                    or ""
                                ).strip(),
                                time_comment=(row.get("Time comment") or "").strip(),
                            )
                            if updated:
                                talks_updated += 1

            except IntegrityError as e:
                skipped_rows += 1
                self.stdout.write(self.style.ERROR(f"[Row {idx}] IntegrityError {email}: {e}"))
        if existing_registration_emails:
            self.stdout.write(
                self.style.WARNING(
                    "Users with EXISTING registrations:\n"
                    + "\n".join(f"  - {e}" for e in existing_registration_emails)
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Done (ITA26 OLD USERS).\n"
                f"CSV rows={total_rows}\n"
                f"updated_users={updated_users}\n"
                f"missing_user={missing_user}\n"
                f"registrations_created={registrations_created}\n"
                f"registrations_existing={registrations_existing}\n"
                f"presenting_yes={presenting_yes}\n"
                f"talks_updated={talks_updated}\n"
                f"missing_auto_talk_for_presenters={missing_auto_talk_for_presenters}\n"
                f"skipped_rows={skipped_rows}\n"
            )
        )

    # ---------- helpers ----------

    def load_rows(self, csv_path: str):
        with open(csv_path, mode="r", encoding="utf-8-sig", newline="") as f:
            return list(csv.DictReader(f))

    def get_workshop(self, slug: str):
        workshop = Workshop.objects.filter(slug=slug).first()
        if workshop is None:
            raise ValueError(f"Workshop with slug='{slug}' not found.")
        return workshop

    def normalize_yes(self, value: str) -> bool:
        v = (value or "").strip().lower()
        return v in ["yes", "y", "true", "1"]

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

    def update_existing_talk(self, talk, talk_title, authors, abstract, topic_comment, time_comment) -> bool:
        """
        Update the already-existing (auto-created) Talk. Do NOT create one here.
        """
        updated = False

        if talk_title:
            talk.title = talk_title[:200]
            updated = True

        if authors and hasattr(talk, "authors_comment"):
            talk.authors_comment = authors[:2000]
            updated = True

        if abstract and hasattr(talk, "abstract"):
            talk.abstract = abstract[:2000]
            updated = True

        if topic_comment and hasattr(talk, "topic_comment"):
            talk.topic_comment = topic_comment[:2000]
            updated = True

        if time_comment and hasattr(talk, "scheduling_comment"):
            talk.scheduling_comment = time_comment[:2000]
            updated = True

        if updated:
            talk.save()

        return updated

    def set_affiliation(self, profile, affiliation_name: str):
        """
        Match the mock script behavior: Affiliation objects keyed by `title`.
        Falls back if your Affiliation uses a different field.
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
