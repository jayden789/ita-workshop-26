"""
Gunicorn config.

Psycopg2 patching code adapted from django-db-geventpool README.
"""


from psycogreen.gevent import patch_psycopg


def post_fork(server, worker):
    """Gunicorn post_fork hook."""
    patch_psycopg()
    worker.log.info("patched psycopg2 for django-db-geventpool")
