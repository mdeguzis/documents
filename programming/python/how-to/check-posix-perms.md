# About

Various methods to extract/read/analyze OS-level permissions with Python.

# Checking for special bits/flags

## Assess which bit to compare to

Example: SetGID
```
>>> os.mkdir('profkaos')
>>> old_mode = os.stat('profkaos').st_mode
>>> os.system('chmod g+s profkaos')
0
>>> new_mode = os.stat('profkaos').st_mode
>>> old_mode ^ new_mode
1024
```
So the bit you need to check is `1024`


## SetGID

This is represented with `chmod +s`. Either of the two methods here work. I prefer the former, as it is checking the property without the need for bitwise / math.
```
bool(os.stat('/home/user/testfile.txt').st_mode & stat.S_ISGID) 
os.stat('/home/user/testfile.txt').st_mode & 1024
1024
os.stat('/home/user/testfile.txt').st_mode & 1024 == 1024
True
```

## Sticky-bit

This is represented with `chmod +t`. Either of the two methods here work. I prefer the former, as it is checking the property without the need for bitwise / math.

```
>>> bool(os.stat('/home/user/testfile.txt').st_mode & stat.S_ISVTX)
>>> os.stat('/home/user/testfile.txt').st_mode & 01000
512
>>> os.stat('/home/user/testfile.txt').st_mode & 01000 == 01000
True
```

# Links

* [Interpreting 'stat' results](https://docs.python.org/2/library/stat.html)
