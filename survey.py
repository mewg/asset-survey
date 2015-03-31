"""
This module provides the web-server for the maker education project asset
inventory.
"""

import argparse
import json
import logging
import os
import uuid

import flask

# Form validation constants.
REQUIRED_FIELDS = ["name", "email", "faculty", "inventory"]
REQUIRED_INVENTORY_FIELDS = ["item", "description", "quantity", "location", "availability", "training"]

# Create the module-wide logger instance.
logger = logging.getLogger("survey")

# Application configuration.
response_path = None

# Create the web application.
app = flask.Flask(__name__)

# Configure the web application.
app.config["LOGGER_NAME"] = "survey.server"
app.config["MAX_CONTENT_LENGTH"] = 2048

@app.route("/")
def root():
    """
    Serves the static index page as the root of the site.
    """
    return app.send_static_file("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    """
    Validates the survey submission and stores the response on the filesystem.
    """
    # Attempt to interpret the response as a JSON document.  If the request is
    # not a valid document, this will fail.
    document = flask.request.get_json()
    # Verify that required fields are present by removing them from a clone of
    # the document keys.
    fields = list(document.keys())
    for field in REQUIRED_FIELDS:
        if field not in fields:
            return flask.make_response(422, "Required field is missing")
        fields.remove(field)
    # If any keys remain in the document, the client has responded with
    # additional, unwanted data.
    if fields:
        return flask.make_response(422, "Unexpected field in response")
    # Verify that at least one inventory item has been submitted.
    if len(document["inventory"]) == 0:
        return flask.make_response(422, "Must include at least one asset")
    # Verify the structure of each inventory item.
    for item in document["inventory"]:
        fields = list(item.keys())
        for field in REQUIRED_INVENTORY_FIELDS:
            if field not in fields:
                return flask.make_response(422, "Asset field is missing")
            fields.remove(field)
        if fields:
            return flask.make_response(422, "Unexpected asset field")
    # Now that the document is validated, store it on the filesystem.
    filename = "{}.json".format(uuid.uuid4())
    path = os.path.join(response_path, filename)
    with open(path, "w") as handle:
        json.dump(document, handle, indent=4)
    # If we've gotten this far, we can assume the document was valid and has
    # been stored successfully.
    return flask.make_response("Success", 200)

# Create the command-line argument parser.
parser = argparse.ArgumentParser(description="Host the asset inventory site.")
parser.add_argument("--host", type=str, default="0.0.0.0", help="web server host")
parser.add_argument("--port", type=int, default=8080, help="web server port")
parser.add_argument("--debug", default=False, action="store_true", help="debug mode")
parser.add_argument("log", metavar="LOG", type=argparse.FileType("w"), help="log filename")
parser.add_argument("responses", metavar="RESPONSES", type=str, help="response path")

# Main entry point.
if __name__ == "__main__":
    # Parse command-line arguments.
    args = parser.parse_args()
    response_path = args.responses
    # Initialise logging.
    logging.basicConfig(stream=args.log, level=logging.DEBUG)
    # Create the web server and start responding to requests.
    logger.info("Starting the application server...")
    app.run(host=args.host, port=args.port, debug=args.debug)

