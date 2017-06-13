<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Description](#description)
- [Monitoring progress of dd](#monitoring-progress-of-dd)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Notes on using pv

# Description

pv allows a user to see the progress of data through a pipeline, by giving information such as time elapsed, percentage completed (with progress bar), current throughput rate, total data transferred, and ETA.
To use it, insert it in a pipeline between two processes, with the appropriate options. Its standard input will be passed through to its standard output and progress will be shown on standard error.

pv will copy each supplied FILE in turn to standard output (- means standard input), or if no FILEs are specified just standard input is copied

# Monitoring progress of dd

Install pv and put it between input / output only dd commands.

Note: you cannot use it when you already started dd.

```
dd if=/dev/urandom | pv | dd of=/dev/null
```

Output

```
1,74MB 0:00:09 [ 198kB/s] [      <=>                               ]
```

You could specify the approximate size with the --size if you want a time estimation.

Example Assuming a 2GB disk being copied from /dev/sdb

Command without pv would be:

```
sudo dd if=/dev/sdb of=DriveCopy1.dd bs=4096
```

Command with pv:

```
sudo dd if=/dev/sdb | pv -s 2G | dd of=DriveCopy1.dd bs=4096
```

Output:

```
440MB 0:00:38 [11.6MB/s] [======>                             ] 21% ETA 0:02:19
```

Other uses

You can of course use pv directly to pipe the output to stdout:

```
pv /home/user/bigfile.iso | md5sum
```

Output

```
50,2MB 0:00:06 [8,66MB/s] [=======>         ] 49% ETA 0:00:06
```

Note that in this case, pv recognizes the size automatically.
