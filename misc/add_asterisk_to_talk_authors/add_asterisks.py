from django.db import models as dbm
from api.models import Talk, PARTICIPATING_STATUSES
import re
missing_asterisk = (
    Talk.objects.filter(
        registration__presenting=True,
        registration__participation_status__in=PARTICIPATING_STATUSES,
    )
    .exclude(dbm.Q(authors_comment__contains="*"))
    .exclude(dbm.Q(authors_comment=""))
    .select_related("registration", "registration__user_profile")
)
print("{} talks have coauthors, but no asterisk".format(missing_asterisk.count()))
for talk in missing_asterisk:
    formal_name = talk.registration.user_profile.formal_name
    email = talk.registration.user.email
    print("Talk pk={} for {} ({}):".format(talk.pk, formal_name, email))
    print("  - Original: {}".format(talk.authors_comment))
    # Ensure last name is present
    last_name = talk.registration.user_profile.last_name
    if len(last_name) == 0:
        print("  X Skipping: no last name in user profile")
        continue
    # Find single last name
    pattern = r"\b{}\b".format(last_name)
    matches = re.findall(pattern, talk.authors_comment)
    if len(matches) != 1:
        print("  X Skipping: last name appeared {} times".format(len(matches)))
        continue
    # Compute modified
    new_authors_comment = re.sub(
        pattern, last_name + "*", talk.authors_comment, count=1
    )
    print("  ✓ Modified: {}".format(new_authors_comment))
    talk.authors_comment = new_authors_comment
    # talk.save()
