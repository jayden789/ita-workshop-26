import csv
from itertools import islice
import sys

from django.db import transaction
from django.contrib.auth.models import Group

from api.models import User, Registration, INVITER_GROUP_NAME


if len(sys.argv) != 2:
    print("usage error")

path = "/app/inviters.tsv"

users_inviters = []
with open(path) as f:
    reader = csv.reader(f, delimiter="\t")
    for row in islice(reader, 1, None):
        print(", ".join(row))
        (user_id, _, _, inviter_id, _, _) = row
        print("user_id = {}, inviter_id = {}".format(user_id, inviter_id))
        users_inviters.append((user_id, inviter_id))

print("len(users_inviters) =", len(users_inviters))

with transaction.atomic():
    inviter_group = Group.objects.get(name=INVITER_GROUP_NAME)
    for (user_old_id, inviter_old_id) in users_inviters:
        user = User.objects.filter(old_db_user_id=user_old_id).first()
        inviter = User.objects.filter(old_db_user_id=inviter_old_id).first()
        if inviter is not None:
            print("adding {} to inviter group".format(inviter))
            inviter_group.user_set.add(inviter)
        if user is not None:
            regns = Registration.objects.filter(user=user)
            regns.update(inviter=inviter)
            print(
                "setting inviter={} on {}'s {} regns".format(
                    inviter, user, regns.count()
                )
            )
