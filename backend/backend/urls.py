"""
URL configuration.
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers

from api import views
from api.mail import views as mail_views

router = routers.DefaultRouter()  # pylint: disable=invalid-name
router.register(r"users", views.UserViewSet, basename="user")
router.register(
    r"user_profiles", views.UserProfileViewSet, basename="userprofile"
)
router.register(r"groups", views.GroupViewSet, basename="group")
router.register(r"workshops", views.WorkshopViewSet, basename="workshop")
router.register(
    r"registration_fees",
    views.RegistrationFeesViewSet,
    basename="registration_fee",
)
router.register(
    r"registration_options",
    views.RegistrationOptionViewSet,
    basename="registration_option",
)
router.register(
    r"registrations", views.RegistrationViewSet, basename="registration"
)
router.register(
    r"registration_payments",
    views.RegistrationPaymentViewSet,
    basename="registration_payment",
)
router.register(r"inviters", views.InviterViewSet, basename="inviter")
router.register(r"invitations", views.InvitationViewSet, basename="invitation")
router.register(
    r"affiliations", views.AffiliationViewSet, basename="affiliation"
)
router.register(r"talks", views.TalkViewSet, basename="talk")
router.register(
    r"schedulable_talks",
    views.SchedulableTalksViewSet,
    basename="schedulabletalk",
)
router.register(r"rooms", views.RoomViewSet, basename="room")
router.register(
    r"talk_schedules", views.TalkScheduleViewSet, basename="talkschedule"
)
router.register(
    r"registration_aggregate_stats",
    views.RegistrationAggregateStatsViewSet,
    basename="registration_aggregate_stats",
)
router.register(r"mail", mail_views.MailViewSet, basename="mail")
router.register(
    r"one_time_charges", views.OneTimeChargeViewSet, basename="onetimecharge"
)
router.register(
    r"one_time_charge_payments",
    views.OneTimeChargePaymentViewSet,
    basename="onetimechargepayment",
)

# router.register(
#     r"mobile_notifications",
#     views.notifications,
#     basename="mobilenotifications"
# )
urlpatterns = [  # pylint: disable=invalid-name
    path("django-admin/", admin.site.urls),
    path("api/v0/", include(router.urls)),
    path(
        "api/v0/users_with_registration_data/",
        views.UsersWithRegnDataView.as_view(),
        name="users_with_registration_data",
    ),
    path(
        "drf-auth/v0/",
        include("rest_framework.urls", namespace="rest_framework"),
    ),
    # override to enforce first/last names
    path(
        "rest-auth/registration/",
        views.CustomRegisterView.as_view(),
        name="rest_register",
    ),
    # override since we don't need this for API-based auth
    path(
        "registration/account-email-verification-sent/",
        views.null_view,
        name="account_email_verification_sent",
    ),
    # Mobile API's currently hard coded
    path("api/v0/notifications/<str:slug>", views.notifications),
    path("api/v0/page_not_available", views.page_not_available),
    path("api/v0/schedule/<str:slug>", views.schedule),
    path("api/v0/participants/<str:slug>", views.participants),
    path("api/v0/gallery/<str:slug>", views.gallery_mobile),
    path("api/v0/trivia/<str:slug>", views.trivia),
    path("api/v0/upload_picture", views.upload_picture),
    path("api/v0/list_pictures", views.list_pictures),
    path("api/v0/delete_picture/<str:filename>", views.delete_picture),
    # django-rest-auth
    path("rest-auth/", include("rest_auth.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("django-auth/", include("django.contrib.auth.urls")),
]
