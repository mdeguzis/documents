<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Common programs](#common-programs)
- [Command examples](#command-examples)
  - [System installation age](#system-installation-age)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
