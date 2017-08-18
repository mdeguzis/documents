<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Elapsed time](#elapsed-time)

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
