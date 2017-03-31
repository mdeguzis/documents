<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [via psutils](#via-psutils)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# via psutils

Available via [pypi](https://pypi.python.org/pypi/psutil)

```
import psutil

def get_fs_type(path):
    bestMatch = ""
    fsType = ""
    for part in psutil.disk_partitions():
        if mypath.startswith(part.mountpoint) and len(bestMatch) < len(part.mountpoint):
            fsType = part.fstype
            bestMatch = part.mountpoint
    return fsType=
```
