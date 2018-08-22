<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Some simple methods:](#some-simple-methods)
  - [python](#python)
  - [perl](#perl)
  - [tr](#tr)
  - [sed](#sed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Some simple methods:

## python
join is is filtering, removing anything non-ASCII. Test the ordinal range.

```
x = ''.join([i if ord(i) < 128 else '' for i in x])
```
See: 
* https://stackoverflow.com/a/20078869 
* http://effbot.org/pyfaq/what-does-unicodeerror-ascii-decoding-encoding-error-ordinal-not-in-range-128-mean.htm

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
