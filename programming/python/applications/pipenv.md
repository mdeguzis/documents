# About

Start usage info for pipenv

# Quick start scratch notes

quick start
```
pipenv --python 2.7
pipenv install
```

# Notes

* Pipfile will be near empty if you just are using your own setup.py

# Pros and Cons

## Pros

packages cache! very speedy

# Basic usefull commands

Update Pipenv & pip to latest.
```
pipenv --update
```

Know where your pipenv is, only affects the path it is installed from
```
[mikeyd@archboxmtd: pyknoxtool]$ pipenv --venv
/home/mikeyd/.local/share/virtualenvs/pyknoxtool-g-2IAaMG
[mikeyd@archboxmtd: pyknoxtool]$ cd ..
[mikeyd@archboxmtd: geisinger-repos]$ pipenv --venv
No virtualenv has been created for this project yet!
```

```
$ pipenv --venv
/home/mikeyd/.local/share/virtualenvs/pyknoxtool-g-2IAaMG​
```

# Security

Built in scanner!
```
[mikeyd@archboxmtd: pyknoxtool]$ pipenv check
Checking PEP 508 requirements…
Passed!
Checking installed package safety…
All good!
```

# pipenv known issues:

https://github.com/kennethreitz/pipenv/issues/1083

Workaround:
```
pipenv run pip install -e .
```
