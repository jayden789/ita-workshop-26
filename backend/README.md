# ita-rebuild

## Running the backend server stack locally

You will need [Docker Compose](https://docs.docker.com/compose/).
All following commands should be run in the `backend/compose/local` directory.

### First-time setup

```bash
$ docker-compose up -d                                      # build images and start containers
$ docker-compose exec backend ./manage.py load_mock_data    # load mock data
```

docker-compose exec backend ./manage.py load_ita25_registration_form_response_to_db

Now the API explorer will be available at <https://localhost:8080/api/v0>. Note
that since the local TLS certificate is self-signed, you will probably get
a security warning in your browser indicating that this is so. It is safe to
dismiss this warning.

### Running commands in the backend service

```bash
$ docker-compose exec backend bash              # start a shell in backend
root@01234567:/app# ./manage.py reset_local_db  # flush DB, then reload config/setup and mock data
root@01234567:/app# ./manage.py shell           # start Django shell
```

### Useful docker-compose commands

```bash
$ docker-compose logs -f        # print logs with follow (like tail -f)
$ docker-compose stop           # stop containers
$ docker-compose start          # start containers
$ docker-compose down -v        # stop and remove containers, and remove networks and volumes
$ docker-compose up -d --build backend    # restart backend service, rebuilding if updated
```

### Local dependencies

If you need dependencies installed locally (e.g. for editor completion, or to
modify dependencies), then you will need
[Pipenv](https://pipenv.readthedocs.io/en/latest/).
Then run the following:

```bash
$ pipenv install                          # install Python dependencies
$ pipenv shell                            # activate the "backend" virtualenv
(backend) $                               # note: virtualenv adds "(backend)" to the prompt
(backend) $ pipenv install psycopg2       # installing a package
(backend) $ vi                            # starting an editor in the virtualenv
```

In order for dependency modifications to be reflected in the Docker container,
you should also run:

```bash
$ docker-compose exec backend pipenv install --system
```

## Production deployment

### Initial deployment

1.  On the deployment server, `git clone` the repository into any directory; say, `/opt/ita-rebuild`.

2.  From the repository root, copy the `backend/envs/prod/django.env.example` example env file to `backend/envs/prod/django.env`.
    Configure the variables within, including setting `SECRET_KEY` to a long random value.

3.  Navigate to the `backend/compose/prod` directory.

4.  Build the Docker images by running `docker-compose build`.

5.  Bring up the Compose cluster by running `docker-compose up -d`.
    Verify that all services in the cluster have started successfully by running `docker-compose ps`.

6.  Run the database migrations by running `docker-compose exec backend ./manage.py migrate`.

### Deploying updates

1.  Navigate to the repository root directory and `git pull` the desired updates.

2.  Re-build the Docker images, and restart containers with re-built images, by running `docker-compose up -d --build`.

3.  If deploying database migrations, run `docker-compose exec backend ./manage.py migrate`.

### Connecting to the database

1.  Install Postico to connect to the PostGres RDS instance. https://eggerapps.at/postico2/

2.  Connect to the database with the crendentials shared here: [Google Doc](https://docs.google.com/document/d/1VfN_um7YMkbbq-sNIbUlr3LapYb-LsMuvXMc2Ak_srE)

### To be a superuser

1. Connect to the Database (as specified above). In the api-user table, change the is_superuser field to “False“.
