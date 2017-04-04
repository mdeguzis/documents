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
