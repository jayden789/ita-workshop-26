"""
Usage:

1.  Run this script on a machine with access to the MySQL database, from the
    `backend` directory.  This generates `internal_records.pkl`, which is a
    dump of the old DB in an internal representation (defined below as
    `Internal*`).
2.  Copy `internal_records.pkl` into a backend container.
3.  Run `./manage.py load_old_db_migration_dump` from the backend container,
    with `internal_records.pkl` in the working directory.
"""


import os
import sys

sys.path.append(os.path.abspath(os.path.join(".")))

from collections import namedtuple
import getpass
import pickle

InternalUser = namedtuple(
    "InternalUser",
    ["old_db_user_id", "email", "first_name", "last_name", "is_inviter"],
)

InternalUserProfile = namedtuple(
    "InternalUserProfile",
    [
        "old_db_user_id",
        "honorific",
        "first_name",
        "last_name",
        "affiliation",
        "website",
        "profile_pic",
        "is_student",
        "phone_number",
        "shirt_type",
        "shirt_size",
        "nickname",
        "presenting_default",
        "first_name_original",
        "last_name_original",
        "email_original",
    ],
)

InternalRegistration = namedtuple(
    "InternalRegistration",
    ["old_db_user_id", "fee_type", "presenting", "registrant_type", "inviter"],
)


INTERNAL_USER_QUERY = """
select
    u.id old_db_user_id,
    lower(trim(u.email)) email,
    trim(u.firstname) first_name,
    trim(u.lastname) last_name,
    (u.id in (select i.id from workshop_inviters i)) is_inviter
from users u
where
    u.enabled = 1
    and (u.email is not null)
    and (u.email <> '')
    and (u.id not in (
        -- test accounts
        2510, 1400, 4085, 746, 3121,
        5033,
        -- duplicates; we keep the ones with registrations
        1052, 4194, 4409, 4023, 3123,
        4652, 4960, 2464, 4654, 3537,
        4633, 3599, 3909, 4610, 3114,
        4325, 1416, 4098, 2893, 2448,
        4143, 4418, 2128, 4264, 4257,
        4929
    ))
;
"""

INTERNAL_USER_PROFILE_QUERY = """
select
    u.id old_db_user_id,
    case u.title
        when 1 then 'MISTER'
        when 2 then 'MISS'
        when 3 then 'DOCTOR'
        when 4 then 'PROFESSOR'
        else ''
        end honorific,
    trim(u.firstname) first_name,
    trim(u.lastname) last_name,
    trim(u.affiliation) affiliation_title,
    trim(u.website) website,
    if(u.has_picture = 1,
        concat('http://ita.ucsd.edu/workshop/18/users_images/', u.id, '.jpg'),
        '') profile_pic,
    u.is_student is_student,
    trim(u.phone) phone_number,
    (case
        coalesce(
            if(r18.gender in ('M', 'F'), r18.gender, null),
            if(r17.gender in ('M', 'F'), r17.gender, null),
            if(r16.gender in ('M', 'F'), r16.gender, null),
            if(r15.gender in ('M', 'F'), r15.gender, null),
            if(r14.gender in ('M', 'F'), r14.gender, null),
            if(r13.gender in ('M', 'F'), r13.gender, null)
        )
        when 'M' then 'MENS'
        when 'F' then 'WOMENS'
        else '' end
    ) shirt_type,
    (case
        coalesce(
            if(r18.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r18.tsize, null),
            if(r17.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r17.tsize, null),
            if(r16.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r16.tsize, null),
            if(r15.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r15.tsize, null),
            if(r14.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r14.tsize, null),
            if(r13.tsize in ('S', 'M', 'L', 'XL', 'XXL'), r13.tsize, null)
        )
        when 'S' then 'SMALL'
        when 'M' then 'MEDIUM'
        when 'L' then 'LARGE'
        when 'XL' then 'XLARGE'
        when 'XXL' then 'XXLARGE'
        else '' end
    ) shirt_size,
    trim(u.nickname) nickname,
    u.pt_ongoing presenting_default,
    trim(u.firstname) first_name_original,
    trim(u.lastname) last_name_original,
    lower(trim(u.email)) email_original
from users u
    left join workshop18_registration r18 on u.id = r18.user_id
    left join workshop17_registration r17 on u.id = r17.user_id
    left join workshop16_registration r16 on u.id = r16.user_id
    left join workshop15_registration r15 on u.id = r15.user_id
    left join workshop14_registration r14 on u.id = r14.user_id
    left join workshop13_registration r13 on u.id = r13.user_id
where
    u.enabled = 1
;
"""

INTERNAL_REGISTRATION_QUERY = """
select
    u.id old_db_user_id,
    case r.fee_type
        when 1 then 'EXEMPT'
        when 2 then 'AFFILIATE'
        when 3 then 'FULL'
        when 4 then 'WAIVED'
        else ''
        end fee_type,
    u.pt_ongoing presenting,
    if(u.invited = 1, 'INVITED', 'SELF_REGISTERED') registrant_type,
    r.inviter inviter
from workshop18_registration r
join users u on r.user_id = u.id
where
    u.enabled = 1
;
"""


def fetch_users(conn):
    """
    Fetches InternalUser records, returning them as a dict from old_db_user_id
    to InternalUser.
    """
    cursor = conn.cursor()
    cursor.execute(INTERNAL_USER_QUERY)
    users = {}
    for record in cursor:
        user = InternalUser(*record)
        users[user.old_db_user_id] = user
    cursor.close()
    return users


def fetch_user_profiles(conn):
    """
    Fetches InternalUserProfile records, returning them as a dict from
    old_db_user_id to InternalUserProfile.
    """
    cursor = conn.cursor()
    cursor.execute(INTERNAL_USER_PROFILE_QUERY)
    user_profiles = {}
    for record in cursor:
        user_profile = InternalUserProfile(*record)
        user_profiles[user_profile.old_db_user_id] = user_profile
    cursor.close()
    return user_profiles


def fetch_registrations(conn):
    """
    Fetches InternalRegistration records, returning them as a dict from
    old_db_user_id to InternalUserProfile.
    """
    cursor = conn.cursor()
    cursor.execute(INTERNAL_REGISTRATION_QUERY)
    registrations = {}
    for record in cursor:
        registration = InternalRegistration(*record)
        registrations[registration.old_db_user_id] = registration
    cursor.close()
    return registrations


def dump_internal_records():
    import mysql.connector as connector

    # Connect to DB
    password = getpass.getpass("DB password: ")
    try:
        conn = connector.connect(
            user="root", password=password, host="127.0.0.1", database="itaweb"
        )
    except connector.Error as err:
        print(err)
        return

    # Fetch records
    internal_users = fetch_users(conn)
    internal_user_profiles = fetch_user_profiles(conn)
    internal_registrations = fetch_registrations(conn)
    conn.close()

    internal_records = {
        "internal_users": {
            key: tuple(val) for key, val in internal_users.items()
        },
        "internal_user_profiles": {
            old_db_user_id: tuple(val)
            for old_db_user_id, val in internal_user_profiles.items()
            if old_db_user_id in internal_users
        },
        "internal_registrations": {
            old_db_user_id: tuple(val)
            for old_db_user_id, val in internal_registrations.items()
            if old_db_user_id in internal_users
        },
    }
    with open("internal_records.pkl", "wb") as pkl_file:
        pickle.dump(internal_records, pkl_file)


if __name__ == "__main__":
    dump_internal_records()
