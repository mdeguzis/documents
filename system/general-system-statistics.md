# About

This page details general system commands for reporting details about a given GNU/Linux system.

# Common programs

* tune2fs
* uname
* uptime

# Command examples

## System installation age

You can use the command tune2fs to find out when the filesystem was created.

```
$ tune2fs -l /dev/main/partition |grep  'Filesystem created'
```

Example

```
$ sudo tune2fs -l /dev/dm-1 |grep  'Filesystem created'
Filesystem created:       Sat Dec  7 20:42:03 2013
```
