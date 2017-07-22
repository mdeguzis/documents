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
