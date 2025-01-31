from collections import namedtuple
import csv

from django.db import transaction
from django.contrib.auth.models import Group

from api.models import User, Registration, INVITER_GROUP_NAME, Workshop

Entry = namedtuple(
    "Entry",
    (
        "inviter_id",
        "invitee_id",
        "invitee_first_name",
        "invitee_last_name",
        "invitee_email",
    ),
)

path = "/app/workshop18_invitees_ucsd.tsv"

with open(path) as f:
    next(f)
    reader = csv.reader(f, delimiter="\t")
    entries = list(map(Entry._make, reader))
    for entry in entries:
        print(entry)

print("len(entries) =", len(entries))

with transaction.atomic():
    inviter_group = Group.objects.get(name=INVITER_GROUP_NAME)
    ita19 = Workshop.objects.get(slug="ita19")
    for entry in entries:
        inviter = User.objects.filter(old_db_user_id=int(entry.inviter_id)).first()
        invitee = User.objects.filter(old_db_user_id=int(entry.invitee_id)).first()
        assert inviter is not None
        if invitee is None:
            print("invitee not in DB for entry {}".format(entry))
            continue
        regn, created = Registration.objects.update_or_create(
            user=invitee,
            workshop=ita19,
            defaults={"inviter": inviter, "registrant_type": "INVITED"},
        )
        print(
            "set inviter={} for invitee={} (created={})".format(
                inviter, invitee, created
            )
        )
