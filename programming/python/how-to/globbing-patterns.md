<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Examples](#examples)
  - [Remove a set of files:](#remove-a-set-of-files)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
