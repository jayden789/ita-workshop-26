# Infrastructure

## Overview

The *ita-rebuild* application can be divided into frontend and backend
subsystems. This document describes the production deployment of each of these
subsystems, and how the deployment is realized in infrastructure. Deployment
instructions belong in each subsystem's respective repo directory, and
troubleshooting information belongs in other documents.

The reader is advised to review the **Local deployment** section to understand
how your local deployment should be used, and its limitations.

### Frontend

The frontend is a set of static files hosted on the **Calit2 server**.
Historically, the Calit2 server hosted the original version of the ITA workshop
website (written in PHP), until the rewrite/rebuild (this project).

### Backend

The backend is structured as a Docker-Compose stack, which consists of a Django
application (the REST-ish API) and a reverse proxy (Caddy). This stack is
deployed on the **backend server**, which is currently a DigitalOcean instance.

As of 2020-01-15, we are working on migrating the stack to a UCSD-based
server. TODO(alex): update this doc when the migration is complete.

### Data

Application data is divided between two places: the Calit2 server, and the
production database. The Calit2 server holds user-generated non-relational
data, such as profile pictures and paper artifacts. The production database
runs in Amazon RDS.

## Access

This section describes how to access parts of the infrastructure.

### Backend server

You can SSH into the backend server at `ita-backend.chew.im` as user `human`.
The project repo is cloned at `/opt/ita-rebuild/`, and the production
docker-compose configuration is at
`/opt/ita-rebuild/backend/compose/prod/docker-compose.yml`.

We have a convention of managing the backend via a tmux session named
`operator`: to connect to it, run `tmux attach -t operator`. From within the
session, you can pull updates from the GitHub repo, run deployments, execute
one-off commands in the Django management shell, view logs, etc.
Adopting this convention helps mitigate the risk of multiple human operators
attempting to manage the backend concurrently.

(To disconnect from the tmux session, you can simply kill your SSH connection,
or alternatively press `CTRL-b` followed by `d`. This will leave the tmux
session, and the shells/processes within it, running.)

### Calit2 server

You can SSH into the Calit2 server at `ita.calit2.net` as user `itaweb`. Once
logged in, you must first `cd htdocs` (since `itaweb` does not have `+x` on its
home directory.) You may notice that `htdocs/` is littered with old files; the
salient directories are as follows:

- `htdocs/ws/` contains the static frontend files. Read the README in this
  repo's `frontend/` directory for information on how to generate and deploy
  these files.
- `htdocs/workshop/ita_rebuild_files/prod/` contains the user-generated data
  mentioned before. Here you will find `.../profile_pictures/` and
  `.../talk_papers/`.

### Database

One should, with very few exceptions, never need to access the database except
via Django (through the API or management shell). The important exception is
database restoration from backups, which are automatically taken daily. To do
so, you must log in to the AWS console and then to the RDS service console.

## Local deployment

Your **local deployment** is a near-replica of the production deployment, which
is designed to allow you to test your changes without risk of breaking
production. To this end, it is almost entirely separated from the production
deployment (and from other developers' local deployments). You can find set-up
details in the `README.md` files in this repo's `frontend/` and `backend/`
directories.

You must note that this local deployment has aspects which are not entirely
local, and thus have the possibility to affect the production deployment or
others' deployments:

1. As discussed in the **Data** section below, some user-generated data is stored
   on the Calit2 server. The directory containing production data lives
   alongside another directory which contains "local" data. This "local" data
   directory is shared between ALL local deployments: both other developers'
   and your own (if you have multiple).

   In order to mitigate the risk of unwanted interaction, any user-generated
   content stored in this shared directory is assigned a filename which
   includes a randomly-generated UUID. This lowers the probability of an
   accidental collision to be negligible.

2. The local stack uses a Authorize.net account (in their sandbox/testing
   environment) which is shared with all other local stacks. No issues arise
   from this sharing because our application never queries transactions except
   by their transaction ID, and no local stacks can create transactions with
   the same ID.
