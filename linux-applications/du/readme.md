<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Show top level sizes](#show-top-level-sizes)
- [List disk usage on a path, ignoring other filesystems.](#list-disk-usage-on-a-path-ignoring-other-filesystems)
- [List disk summary with wildcard, skipping mounts](#list-disk-summary-with-wildcard-skipping-mounts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes for using `du`

# Show top level sizes

```
# Using --max-depth
sudo du -h /var/* --max-depth=0 | sort -h

# Using wildcard expansion
sudo du -hs /var/* | sort -h
```

# List disk usage on a path, ignoring other filesystems. 

This is useful for our / partitions, as we have several directories under it that are mounted on different filesystems, such as /home and /usr.

```
# x, --one-file-system
#              skip directories on different file systems

sudo du -hx /
```

# List disk summary with wildcard, skipping mounts 

This is useful for analyzing storage space issues without entering other filesystems (e.g. /usr on its own mount).

```
for d in /*; do egrep " ${d} " /proc/mounts > /dev/null || sudo du -sh ${d}; done | sort -h
```

# When du and df report diffenent usage

Check df
```
df -h 
/dev/sdb1                 50G  5.8G   45G  100% /var/log/folder
```

check du:
```
du -hs /var/log/folder
4.2G /var/log/folder
```

Doesn't make sense, does it? :) read on...

It's possible that a process has opened a large file which has since been deleted. You'll have to kill that process to free up the space. You may be able to identify the process by using lsof. On Linux deleted yet open files are known to lsof and marked as (deleted) in lsof's output.

You can check this with:

```
# all
sudo lsof +L1

# your directory having and issue
sudo lsof +L1 | grep "/path/to/somewhere"
```

example:
```
sudo lsof +L1 | grep "/var/log/folder"
java       7111         user1    3w   REG 253,10      266240     0      1036 /var/log/hadoop/folder.this.that (deleted)
cat       16273     user2    3r   REG 253,10 47464110435     0      1040 /var/log/hadoop/hdfs/folder.log.1 (deleted)
```

kill the PIDs:
```
sudo kill 7111 16273
```

check df again:
```
df -h 
/dev/sdb1                 50G  5.8G   45G  12% /var/log/folder
```

See: https://linux.die.net/man/8/lsof
