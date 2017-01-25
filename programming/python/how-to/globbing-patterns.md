# About

Match a given path with a wildcard, do <CODE>

# Examples

## Remove a set of files:
```
import glob
import os

for logname in glob.glob('/tmp/mylog*.txt'):
  os.remove(logname)
```

# Links

https://pymotw.com/2/glob/
