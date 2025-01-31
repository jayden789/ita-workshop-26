"""
Downloads picture URLs from a records file. You can obtain the records file by
running the following command in a container of the `backend` service:

::

    $ ./manage.py export_participant_pics
"""

import csv
import io
from multiprocessing.pool import ThreadPool
import pathlib
import requests
import sys

from PIL import Image


DOWNLOAD_DIR = pathlib.Path("pics")
FILL_COLOR = "#000000"


def save_response(response, path):
    image = Image.open(io.BytesIO(response.content))
    if image.mode in ("RGBA", "LA"):
        background = Image.new(image.mode[:-1], image.size, FILL_COLOR)
        background.paste(image, image.split()[-1])
        image = background
    elif image.mode in ("P",):
        image = image.convert("RGB")
    image.save(path, "JPEG", quality=80)


def download_for_record(record):
    last_name, first_name, pic_url, last_attending_date = record
    date_str = {
        "2019-02-11": "Mon",
        "2019-02-12": "Tue",
        "2019-02-13": "Wed",
        "2019-02-14": "Thu",
        "2019-02-15": "Fri",
    }.get(last_attending_date, "NONE")
    filename = "{date_str}_{last_name}_{first_name}.jpg".format(
        date_str=date_str, last_name=last_name, first_name=first_name
    )
    path = DOWNLOAD_DIR / filename

    skipped = True
    if not path.exists():
        skipped = False
        response = requests.get(pic_url)
        save_response(response, path)
    return path, skipped


def download_records(records):
    pool = ThreadPool(8)
    results = pool.imap_unordered(download_for_record, records)
    for path, skipped in results:
        print("{} {}".format("Skipped" if skipped else "Downloaded", path))


def main():
    assert len(sys.argv) == 2
    DOWNLOAD_DIR.mkdir(exist_ok=True)
    with open(sys.argv[1]) as records_file:
        records = list(csv.reader(records_file, delimiter="\t"))
    download_records(records)


if __name__ == "__main__":
    main()
