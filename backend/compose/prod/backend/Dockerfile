FROM python:3.6
ENV PYTHONUNBUFFERED 1

# Set up app directory and contents
RUN mkdir /app
WORKDIR /app
COPY . /app

# Set up entrypoint and start scripts
COPY ./compose/prod/backend/entrypoint /entrypoint
RUN chmod +x /entrypoint
COPY ./compose/prod/backend/start /start
RUN chmod +x /start

# Install dependencies
RUN apt-get update
RUN apt-get install && apt-get install -y texlive-latex-base
RUN apt-get install && apt-get install -y texlive-fonts-recommended
RUN apt-get install -y texlive-fonts-extra
RUN pip install pipenv
RUN pip install pandas
RUN pip install psycogreen
RUN pip install shortuuid
RUN pipenv lock --clear
RUN pipenv install --system

# Run server
ENTRYPOINT ["/entrypoint"]
RUN sed -i '/CipherString = DEFAULT/s/^#\?/#/' /etc/ssl/openssl.cnf
