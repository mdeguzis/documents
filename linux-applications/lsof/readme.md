<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Determine what has a file open](#determine-what-has-a-file-open)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

>NAME
       lsof - list open files

>SYNOPSIS
       lsof  [  -?abChKlnNOPRtUvVX ] [ -A A ] [ -c c ] [ +c c ] [ +|-d d ] [ +|-D D ] [ +|-e s ] [ +|-f [cfgGn] ] [ -F [f] ] [ -g [s] ] [ -i [i] ] [ -k k ] [ +|-L [l] ] [ +|-m m ] [ +|-M ] [ -o [o] ] [ -p s ] [ +|-r [t[m<fmt>]] ] [
       -s [p:s] ] [ -S [t] ] [ -T [t] ] [ -u s ] [ +|-w ] [ -x [fl] ] [ -z [z] ] [ -Z [Z] ] [ -- ] [names]


# Determine what has a file open

Example:
```
vim test.txt
# Put he process in the background with CTRL+Z
[user@HOST ~]$ lsof | grep "test.txt"
vim       33047             user    5u      REG              253,4     12288   83893592 /home/user/tmp/test.txt.swp
```
