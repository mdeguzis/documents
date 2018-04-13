# Some simple methods:

## perl

Fix with:
```
perl -pi -e 's/[^[:ascii:]]//g' FILE
```
Source: https://stackoverflow.com/a/3264957

## tr

You can also use tr (\n keeps the line feeds):
```
tr -cd '[:print:]\n' < FILE > NEW_FILE
```
https://stackoverflow.com/a/15035525

