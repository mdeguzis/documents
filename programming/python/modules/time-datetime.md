<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Elapsed time](#elapsed-time)
- [Subtracing time between two 24hr / UTC times](#subtracing-time-between-two-24hr--utc-times)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
 
This page deals with time and datetime modles
 
# Elapsed time
 
You can easily report time in sconds as so.

```
import time
start = time.time()
end = start = time.time()
elapsed_time = int(now - start)

print elapsed time
```
 
You can also use datetime and it's timedelta method for better visual output:
```
from datetime import timedelta
mport time
start = time.time()
end = start = time.time()
elapsed_time = int(now - start)

str(timedelta(seconds=elapsed_time))
'0:00:00.233000'
```

# Subtracing time between two 24hr / UTC times

```
>>> import datetime
>>> t1 = datetime.datetime.strptime('13:21', '%H:%M')
>>> t2 = datetime.datetime.strptime('23:08', '%H:%M')
>>> t1
datetime.datetime(1900, 1, 1, 13, 21)
>>> t2
datetime.datetime(1900, 1, 1, 23, 8)
>>> t2 - t1
datetime.timedelta(0, 35220)
>>> str(t2 - t1)
'9:47:00'
```
