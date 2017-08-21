# About

Notes on using sysstat utilities

# utilities

Utilities part of Sysstat

Following are the other sysstat utilities.

* `sar` collects and displays ALL system activities statistics.
* `sadc` stands for “system activity data collector”. This is the sar backend tool that does the data collection.
* `sa1` stores system activities in binary data file. sa1 depends on sadc for this purpose. sa1 runs from cron.
* `sa2` creates daily summary of the collected statistics. sa2 runs from cron.
* `sadf` can generate sar report in CSV, XML, and various other formats. Use this to integrate sar data with other tools.
* `iostat` generates CPU, I/O statistics
* `mpstat` displays CPU statistics.
* `pidstat` reports statistics based on the process id (PID)
* `nfsiostat` displays NFS I/O statistics.
* `cifsiostat` generates CIFS statistics.

## sar

Sar = Collect, report, or save system activity information. sar is a part of the sysstat utilities package. The sysstat utilities are a collection of performance monitoring tools for Linux. These include sar, sadf, mpstat, iostat, tapestat, pidstat, cifsiostat  and sa tools

### Default Behavior

By default sysstat will collect data every 10 minutes, some people (like me) will want a shorter collection interval. In order to accomplish this you can simply modify the cronjob that runs every 10 minutes under `/etc/cron.d/sysstat`. See `/etc/default/sysstat`.

By default sysstat will only retain its log files (historical performance statistics) for 7 days, personally I prefer to keep these files around for at least 31 days. To keep these files longer simply edit the /etc/sysstat/sysstat config file.

### Files and directories

* `/etc/cron.d/sysstat` - cronjb
* `/etc/sysstat/sysstat` - config
* `/var/log/sysstat` or `/var/log/sa` - logs. The files end with a number that denotes the day. For instance, `sa04` is actually the file from the 4th day of the current month. The files are written after the current day ends, so `sa04` is the statistics from the 3rd day of the current month. Typically these are rolled over for each month.

### Usage examples

All info
```
sar -A
```

For example, the following gives the system CPU statistics 3 times (with 1 second interval).
```
sar 1 3
```

CPU
```
sar -P
```

I/O
```
sar -b
```

Memory and swap
```
# memory
sar -r

# swap
sar -S

# Paging stats
sar -B

# huge pages
sar -H
```

See: `man sar`  
See also: [sar - Centos](https://www.globo.tech/learning-center/install-sar-centos)  
See also: [sar usage examples](http://www.thegeekstuff.com/2011/03/sar-examples)
