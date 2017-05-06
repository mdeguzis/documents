<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Checking for special bits/flags](#checking-for-special-bitsflags)
  - [Assess which bit to compare to](#assess-which-bit-to-compare-to)
  - [SetGID](#setgid)
  - [Sticky-bit](#sticky-bit)
- [Caveats](#caveats)
  - [setuid on Linux](#setuid-on-linux)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

# Caveats

## setuid on Linux

Recall that the setuid and setgid bits were invented for a completely different purpose: causing an executable to run with its owner's uid or gid, rather than the uid or gid of the user running the file. Any other usage is just an extra feature.

These bits have no function on ordinary files that aren't executable. (And also shell scripts on some distros, due to security issues.) Originally, they also had no function for directories. Obviously somebody decided it would be cool to take the unused setgid on directories and use it to enforce consistency of group ownership. After all, if you're playing with group ownership, it's because more than one person is working with the file, and it probably makes sense for all the files in a given directory to belong to the same group, no matter who created them. Hassles due to somebody forgetting to run newgrp are eliminated.

So, why not implement the same feature for setuid and the file uid? Well, uid is much more basic than gid. If you implement this, often a file will not belong to the user who created it! Presumably the user can still modify the file (assuming the umask is something sane), but they can't change the permission bits. Hard to see the utility of that.

Source: [StackOverflow](https://superuser.com/questions/471844/why-is-setuid-ignored-on-directories)

# Links

* [Interpreting 'stat' results](https://docs.python.org/2/library/stat.html)
