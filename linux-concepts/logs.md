# About

Logging concept under GNU/Linux

# dmesg, syslog, messages

[Syslog](http://en.wikipedia.org/wiki/Syslog) is a standard logging facility. It collects messages of various programs and services including the kernel, and stores them, depending on setup, in a bunch of log files typically under `/var/log`. In some datacenter setups there are hundreds of devices each with its own log; syslog comes here handy too. One just sets up a dedicated syslog server which collects all the individual device logs over the network. Syslog can also save logs to databases, and other stuff.

According to my `/etc/syslog.conf`, default `/var/log/kern.log` captures only the kernel's messages of any loglevel; i.e. the output of `dmesg`.

`/var/log/messages` instead aims at storing valuable, non-debug and non-critical messages. This log should be considered the "general system activity" log.

`/var/log/syslog` in turn logs everything, except auth related messages.

Other insteresting standard logs managed by syslog are `/var/log/auth.log`, `/var/log/mail.log`.

Source: [stackoverflow](http://askubuntu.com/questions/26237/difference-between-var-log-messages-var-log-syslog-and-var-log-kern-log)
