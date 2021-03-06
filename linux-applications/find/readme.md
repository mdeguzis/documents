<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Finding files based on date or age](#finding-files-based-on-date-or-age)
  - [mtime and ctime explanation](#mtime-and-ctime-explanation)
  - [file age](#file-age)
  - [file age by date / time](#file-age-by-date--time)
- [Find by UID](#find-by-uid)
- [Symlinks](#symlinks)
  - [Get real path](#get-real-path)
  - [Getting the symlink/dir chain using namei](#getting-the-symlinkdir-chain-using-namei)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Find command usage, tips, and tricks

# Finding files based on date or age

## mtime and ctime explanation
```
find . -mtime 0   # find files modified between now and 1 day ago
                  # (i.e., within the past 24 hours)
find . -mtime -1  # find files modified less than 1 day ago
                  # (i.e., within the past 24 hours, as before)
find . -mtime 1   # find files modified between 24 and 48 hours ago
find . -mtime +1  # find files modified more than 48 hours ago
```

## file age

Basic
```
# created older than 3 days
sudo find /tmp/dir/* -ctime +3

# created newer than 3 days
sudo find /tmp/dir/* -ctime -3

# created by date
sudo find /tmp/dir/* -ctime +3 -printf "%T+\t%p\n" | sort
```

## file age by date / time
```
# created older than <DATE>
sudo find /tmp/dir/* -not -newermt 2017-05-04 -printf "%T+\t%p\n" | sort

# created newer than <DATE>
sudo find /tmp/dir/* -newermt 2017-05-04 -printf "%T+\t%p\n" | sort
```

# Find by UID

```
sudo find /tmp -uid <UID> -exec ls -ld {} \;
```

# Symlinks

## Get real path

```
find /etc/hadoop/java -type l -exec realpath {} \; | grep -v "^$(pwd)"
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.161-0.b14.el7_4.x86_64
```

## Getting the symlink/dir chain using namei

```
$ namei /etc/hadoop/java
f: /etc/hadoop/java
 d /
 d etc
 d hadoop
 l java -> /etc/alternatives/java_sdk_1.8.0_openjdk
   d /
   d etc
   d alternatives
   l java_sdk_1.8.0_openjdk -> /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.161-0.b14.el7_4.x86_64
     d /
     d usr
     d lib
     d jvm
     d java-1.8.0-openjdk-1.8.0.161-0.b14.el7_4.x86_64
```
