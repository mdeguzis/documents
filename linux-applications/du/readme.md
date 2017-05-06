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
