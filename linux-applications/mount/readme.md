<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mount USB as rw](#mount-usb-as-rw)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mount USB as rw

```
# one way
 mount -t vfat  /dev/sda2 /media/bigdrive -o rw,umask=000
 
 # another way
 mount -o umask=0,uid=nobody,gid=nobody /dev/something /mnt/somewhere
 ```

# Detect stale mounts

```
grep -v tracefs /proc/mounts | cut -d' ' -f2 | \
  while read m; do \
    timeout --signal=KILL 1 ls -d $m > /dev/null || echo "$m"; \
  done
```

Pythonic way:
```
#!/bin/python
import signal
import os
import subprocess
import time

class Alarm(Exception):
    pass

def alarm_handler(signum, frame):
    raise Alarm

mounts = []
mounts.append('/filedrop')
signal.signal(signal.SIGALRM, alarm_handler)

for mount in mounts:
    # set 3 second alarm
    signal.alarm(3)
    try:
        proc = subprocess.Popen(['stat', mount], stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = proc.communicate()
        if stderr:
            for line in stderr.split('\n'):
                print line

        print mount + " [OK]"
        # DEBUG ONLY
        #time.sleep(4)
        # reset the alarm
        signal.alarm(0)

    except Alarm:
        print "Oops, taking too long!"
```

Source: https://stackoverflow.com/questions/1643347/is-there-a-good-way-to-detect-a-stale-nfs-mount
