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
