<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [dmesg, syslog, messages](#dmesg-syslog-messages)
  - [syslog](#syslog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Logging concept under GNU/Linux

# dmesg, syslog, messages

[Syslog](http://en.wikipedia.org/wiki/Syslog) is a standard logging facility. It collects messages of various programs and services including the kernel, and stores them, depending on setup, in a bunch of log files typically under `/var/log`. In some datacenter setups there are hundreds of devices each with its own log; syslog comes here handy too. One just sets up a dedicated syslog server which collects all the individual device logs over the network. Syslog can also save logs to databases, and other stuff.

According to my `/etc/syslog.conf`, default `/var/log/kern.log` captures only the kernel's messages of any loglevel; i.e. the output of `dmesg`.

`/var/log/messages` instead aims at storing valuable, non-debug and non-critical messages. This log should be considered the "general system activity" log.

`/var/log/syslog` in turn logs everything, except auth related messages.

Other insteresting standard logs managed by syslog are `/var/log/auth.log`, `/var/log/mail.log`.

Source: [stackoverflow](http://askubuntu.com/questions/26237/difference-between-var-log-messages-var-log-syslog-and-var-log-kern-log)

## syslog

Usually this consists of 6 columns. Here is an example for summary request:

```
Column 1 = "May 11 10:00:39"               > Timestamp
Column 2 = "scrooge"                       > Loghost
Column 3 = "SG_child[808]:"                > Application/Process
Column 4 = "[ID 748625 user.info]"         > Syslog facility.level
Column 5 = "m:WR-SG-SUMMARY"               > Message ID
Column 6 = "c:X  vhost:..."                > Message [including time statistics and rid, sid, ip]
```

Format: https://techzone.ergon.ch/syslog-message-format
