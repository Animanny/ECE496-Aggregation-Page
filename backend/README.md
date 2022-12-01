# Backend Build instructions

The backend is built with Flask and serves the build folder in the front end.

The only prerequisite is Python and the [virtualenv](https://pypi.org/project/virtualenv/) package installed.

```bash
$ cd backend
$ python3 -m virtualenv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
$ export FLASK_APP=index.py
$ flask run
or run flask --app index --debug run
```
