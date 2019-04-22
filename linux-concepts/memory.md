<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Memory Consumption](#memory-consumption)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on Linux memory and memory management.

# Memory Consumption

Display the top ten running processes - sorted by memory usage

```
ps aux | sort -nk +4 | tail
```
ps returns all running processes which are then sorted by the 4th field in numerical order and the top 10 are sent to STDOUT.

Display the top ten running processes - sorted by memory usage
Display the top processes sorted by memory usage. This is mostly useful because it's easy to remember and can give me a quick 'top' view of a group of servers when used over pssh. (Though I'd recommend |head -10 to minimize the output). 
```
top -b -o +%MEM |head -17
```

I also like this version for clean ouput
```
ps axo %mem,pid,euser,cmd | sort -nr | head -n 10
```

If username is cut off, try adjusting columns:
```
ps ax o user:16,pid,pcpu,pmem,vsz,rss,stat,start_time,time,cmd
```
Notice the `user:16` adjustment here.

Full command width:
```
ps axwwo user:16,pid,pcpu,pmem,vsz,rss,stat,start_time,time,cmd
```

# Links

* http://www.linuxatemyram.com/
* https://stackoverflow.com/questions/13052930/linux-memory-usage-history (historical look)
