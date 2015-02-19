# LJMU Maker Education Asset Survey

This is the development codebase for the LJMU Maker Education asset inventory survey.  

## Usage

The server requires [Python 3.4+](http://python.org/) and a recent version of the [Flask](http://http://flask.pocoo.org) web application microframework.  The command-line usage of the server is:

```
usage: survey.py [-h] [--host HOST] [--port PORT] [--debug] LOG RESPONSES

Host the asset inventory site.

positional arguments:
  LOG          log filename
  RESPONSES    response path

optional arguments:
  -h, --help   show this help message and exit
  --host HOST  web server host
  --port PORT  web server port
  --debug      debug mode
```

Appropriate access control and quota configuration should be enforced at the operating system level for the log file and response directory.

## Thanks

Thanks to Mark Sabino ([@saybeano](http://twitter.com/saybeano)) for his input and testing of the survey application.

