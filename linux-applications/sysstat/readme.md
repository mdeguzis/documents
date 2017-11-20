<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [utilities](#utilities)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on using sysstat utilities

# utilities

Following are sysstat utilities.

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
