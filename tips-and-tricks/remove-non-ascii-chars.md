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


## sed

```
sed -i 's/[\d128-\d255]//g' FILENAME
```
Note: May fail with older sed versions <= 4.2.2 GNU Sed
