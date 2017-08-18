<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Determine what has a file open](#determine-what-has-a-file-open)
- [Showing danling/unlinked files](#showing-danlingunlinked-files)

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

# Showing danling/unlinked files

>+|-L [l]
This option enables ('+') or disables ('-') the listing of file link counts, where they are available - e.g., they aren't available for sockets, or most FIFOs and pipes.

>When
>+L is specified without a following number, all link counts will be listed. When -L is specified (the default), no link counts will be listed.

>When
>+L is followed by a number, only files having a link count less than that number will be listed. (No number may follow -L.) A specification of the form ''+L1'' will select open files that have been unlinked. A specification of the form ''+aL1 <file_system>'' will select unlinked open files on the specified file system.

See: https://linux.die.net/man/8/lsof
