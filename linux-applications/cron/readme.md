<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Cron execution and paths](#cron-execution-and-paths)
- [Visualization of cron setup](#visualization-of-cron-setup)
- [Useful commands](#useful-commands)
  - [Listing all jobs for all users](#listing-all-jobs-for-all-users)
  - [Viewing cronjobs for specific user](#viewing-cronjobs-for-specific-user)
  - [Edit another user's crontab](#edit-another-users-crontab)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for cron (automation). A good layout of the cron daemon and it's technical details can be found at: http://www.unixgeeks.org/security/newbie/unix/cron-1.html

# Cron execution and paths

Cron knows nothing about your shell; it is started by the system, so it has a minimal environment. If you want anything, you need to have that brought in yourself.

To work around this, source the path in your script or in crontab. In the crontab, before you command, add . $HOME/.profile. For example:
```
0 5 * * * . $HOME/.profile; /path/to/command/to/run
```

Source: [Stack Exchange](http://unix.stackexchange.com/questions/27289/how-can-i-run-a-cron-command-with-existing-environmental-variables)

# Visualization of cron setup

```
##   Entry              Description     Equivalent To
##   @yearly (or @annually)     Run once a year at midnight in the morning of January 1         0 0 1 1 *
##   @monthly   Run once a month at midnight in the morning of the first of the month   0 0 1 * *
##   @weekly    Run once a week at midnight in the morning of Sunday    0 0 * * 0
##   @daily             Run once a day at midnight      0 0 * * *
##   @hourly    Run once an hour at the beginning of the hour   0 * * * *
##   @reboot    Run at startup  @reboot
##   
##   *    *    *    *    *  command to be executed
##   ┬    ┬    ┬    ┬    ┬
##   │    │    │    │    │
##   │    │    │    │    │
##   │    │    │    │    └───── day of week (0 - 7) (0 or 7 are Sunday, or use names)
##   │    │    │    └────────── month (1 - 12)
##   │    │    └─────────────── day of month (1 - 31)
##   │    └──────────────────── hour (0 - 23)
##   └───────────────────────── min (0 - 59)
##     
##   The following example will run each 10 minutes
##   */10 * * * * /usr/bin/somedirectory/somecommand

##   Disable E-mail notifications
MAILTO=""

##   Set where to look for executable files
PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/sbin:/usr/local/bin:$PATH
```

# Useful commands

## Listing all jobs for all users

```
for user in $(cut -f1 -d: /etc/passwd); do echo "Checking cronjobs for user: $user" && sudo crontab -u $user -l; done
```

## Viewing cronjobs for specific user

```
sudo crontab -l -u <USER>
```

## Edit another user's crontab
```
sudo crontab -e -u <USER>
```

# Links

* https://crontab.guru
