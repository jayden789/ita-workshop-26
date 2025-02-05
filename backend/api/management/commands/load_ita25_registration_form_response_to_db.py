from django.core.management.base import BaseCommand
import csv
import os
from api.models import (
    UserProfile,
    Workshop,
    User,
    Registration,
    RegistrationOption,
    Date,
)


class Command(BaseCommand):
    def handle(self, *args, **options):
        data = self.load_data()
        self.load_existing_users()
        for (
            first_name,
            last_name,
            email,
            student,
            title,
            co_authors,
            abstract,
            topic_comment,
            scheduling_comment,
            days_attending,
            sunday_reception,
            wednesday_banquet_preference,
        ) in zip(
            data["First name"],
            data["Last name"],
            data["Email Address"],
            data["Student"],
            data["Title"],
            data["Co-authors"],
            data["Abstract"],
            data["Topic comment"],
            data["Scheduling comment "],
            data["Days attending"],
            data["Sunday reception"],
            data["Wednesday banquet preference"],
        ):
            exist, old_email = self.check_account_exist(
                first_name, last_name, email
            )

            if not exist:
                self.create_new_user(
                    first_name, last_name, email, email, student == "Yes"
                )

            elif exist and old_email is not None:
                self.update_existing_user(old_email, email, student == "Yes")

            self.create_registration(email)

            # Update talk info
            self.update_talk_info(
                email,
                title,
                co_authors,
                abstract,
                topic_comment,
                scheduling_comment,
            )

            # Update workshop info
            self.update_workshop_info(
                email,
                days_attending,
                sunday_reception,
                wednesday_banquet_preference,
            )

    def load_data(self):
        # Get the project root directory
        root_path = os.path.dirname(
            os.path.dirname(
                os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
            )
        )
        # Construct the full path to the CSV file
        csv_path = os.path.join(
            root_path,
            "api",
            "ITA_2025_Registration_Form_Response.csv",
        )
        # Load form data from the .csv file
        with open(csv_path, mode="r") as file:
            csv_data = csv.reader(file)
            header = next(csv_data)
            data = {k: [] for k in header}
            for row in csv_data:
                for i, value in enumerate(row):
                    data[header[i]].append(value)

        return data

    def load_existing_users(self):
        # User = get_user_model()
        user_queryset = User.objects.all()
        users = list(user_queryset.values())
        self.userProfiles = [
            {
                **UserProfile.objects.filter(id=u["user_profile_id"])
                .values()
                .first(),
                "email": u["email"],
            }
            for u in users
        ]

    def check_account_exist(self, first_name, last_name, email):
        possible_matching_profiles = [
            up
            for up in self.userProfiles
            if up["first_name"] == first_name and up["last_name"] == last_name
        ]
        if len(possible_matching_profiles) == 0:
            return False, None

        exact_matching_profile = [
            pmp for pmp in possible_matching_profiles if pmp["email"] == email
        ]

        if len(exact_matching_profile) > 0:
            return True, None

        return True, possible_matching_profiles[0]["email"]

    def create_new_user(
        self, first_name, last_name, email, password, is_student
    ):
        # User = get_user_model()
        user = User.objects.create_user(email=email, password=password)
        user_profile = user.user_profile
        user_profile.first_name = first_name
        user_profile.last_name = last_name
        user_profile.is_student = is_student
        user_profile.save()

    def update_existing_user(self, old_email, new_email, is_student):
        user = User.objects.filter(email=old_email).first()
        if user:
            user.email = new_email
            user.save()
            user_profile = user.user_profile
            user_profile.email_original = new_email
            user_profile.is_student = is_student
            user_profile.save()

    def create_registration(self, email):
        workshop = Workshop.objects.filter(slug="ita25").first()
        user = User.objects.filter(email=email).first()
        registration, created = Registration.objects.get_or_create(
            workshop=workshop, user=user
        )
        if created:
            print("Registration created for {}".format(email))
        else:
            print("Registration failed: {}".format(email))

    def update_talk_info(
        self,
        email,
        title,
        co_authors,
        abstract,
        topic_comment,
        scheduling_comment,
    ):
        if (
            not title
            and not co_authors
            and not abstract
            and not topic_comment
            and not scheduling_comment
        ):
            return
        workshop = Workshop.objects.filter(slug="ita25").first()
        user = User.objects.filter(email=email).first()
        registration, _ = Registration.objects.get_or_create(
            workshop=workshop, user=user
        )
        talk = registration.talks.first()
        talk.title = title[:200]
        talk.authors_comment = co_authors[:2000]
        talk.abstract = abstract[:2000]
        talk.topic_comment = topic_comment[:2000]
        talk.scheduling_comment = scheduling_comment[:2000]
        talk.save()
        registration.presenting = True
        registration.save()

    def update_workshop_info(
        self,
        email,
        days_attending,
        sunday_reception,
        wednesday_banquet_preference,
    ):
        date_mapping = {
            "Monday": "2025-02-10",
            "Tuesday": "2025-02-11",
            "Wednesday": "2025-02-12",
            "Thursday": "2025-02-13",
            "Friday": "2025-02-14",
        }
        date_strings = [
            date_mapping[d.strip()] for d in days_attending.split(",")
        ]
        attending_dates = Date.objects.filter(date_value__in=date_strings)
        sunday_reception_opt = None
        wednesday_banquet_opt = None
        banquet_options = None

        if sunday_reception == "Yes":
            sunday_reception_opt = RegistrationOption.objects.filter(
                slug="ita25_sundayReception_selfOnly"
            ).first()
        else:
            sunday_reception_opt = RegistrationOption.objects.filter(
                slug="ita25_sundayReception_notAttending"
            ).first()

        if wednesday_banquet_preference == "Not attending":
            wednesday_banquet_opt = RegistrationOption.objects.filter(
                slug="ita25_banquetSelf_notAttending"
            ).first()
        else:
            wednesday_banquet_opt = RegistrationOption.objects.filter(
                slug="ita25_banquetSelf_selfOnly"
            ).first()

        if wednesday_banquet_preference != "Not attending":
            banquet_options = (
                "C"
                if wednesday_banquet_preference == "Chicken"
                else "F" if wednesday_banquet_preference == "Fish" else "V"
            )

        workshop = Workshop.objects.filter(slug="ita25").first()
        user = User.objects.filter(email=email).first()
        registration, _ = Registration.objects.get_or_create(
            workshop=workshop, user=user
        )
        registration.attending_dates.set(attending_dates)
        registration.participation_status = "ALMOST_CERTAINLY"
        registration.options.set([sunday_reception_opt, wednesday_banquet_opt])
        registration.banquet_options = banquet_options
        registration.save()
