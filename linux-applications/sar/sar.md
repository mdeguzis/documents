# About
The sar command writes to standard output the contents of selected cumulative activity counters in the operating system. The accounting system, based on the values in the count and interval parameters, writes information the specified number of times spaced at the specified intervals in seconds. If the interval parameter is set to zero, the sar command displays the average statistics for the time since the system was started. If the interval parameter is specified without the count parameter, then reports are generated continuously. The collected data can also be saved in the file specified by the -o filename flag, in addition to being displayed onto the screen. If filename is omitted, sar uses the standard system activity daily data file, the /var/log/sa/sadd file, where the dd parameter indicates the current day. By default all the data available from the kernel are saved in the data file.

The sar command extracts and writes to standard output records previously saved in a file. This file can be either the one specified by the -f flag or, by default, the standard system activity daily data file.

# Usage

## By file
```
sar -f /var/log/sa/<sa_file>
```

## By Process
Useful for history logging:
```
$ egrep '^(Vm|Rss)' /proc/<SOME_PID>/status
VmPeak: 13018456 kB
VmSize: 13016736 kB
VmLck:         0 kB
VmPin:         0 kB
VmHWM:    175100 kB
```

## Other nice options:

* `-q`: Report queue length and load averages. 


# Reading sar

## Headers
```
05:50:01 AM     CPU     %user     %nice   %system   %iowait    %steal     %idle
```

* time:
* CPU:
* %user:
* %nice:
* %system:
* %iowait:
* %steal:
* %idle:

## What Metrics Indicate Issues?

CPU is being loaded up, but no backlog/wait:
```
$ sar -f /var/log/sa/sa10
05:50:01 AM     CPU     %user     %nice   %system   %iowait    %steal     %idle
06:00:01 PM     all     10.07      0.05      0.78      0.17      0.00     88.93
06:10:01 PM     all     41.88      0.06      1.78      0.18      0.00     56.10
06:20:01 PM     all     99.02      0.07      0.58      0.00      0.00      0.33
```

Very high CPU and long wait times:
```
$ sar -q -f /var/log/sa/sa10
05:30:01 PM   runq-sz  plist-sz   ldavg-1   ldavg-5  ldavg-15   blocked
07:00:01 PM        78      3093    417.11    366.27    296.27         0
07:10:02 PM       133      6279    327.72    342.27    322.75         0
07:20:01 PM       196      6311    351.53    335.43    325.86         0
07:30:01 PM        65      6207    387.44    392.22    364.41         0
07:40:01 PM       204      6189    446.27    424.01    391.77         0
```

Load averages over 400 are 'really high' over 1000 is 'insane' i.e. when the node is really quite unresponsive. Note the low iowait in the same time periods; that indicates the jobs really are that cpu intensive, i.e. they are not waiting for io as the wait is 0.


# Documentation
* https://linux.die.net/man/1/sar
* https://www.linuxtechi.com/generate-cpu-memory-io-report-sar-command/
