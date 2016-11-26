<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Common tools](#common-tools)
- [gdb](#gdb)
- [strace](#strace)
- [General guidelines](#general-guidelines)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Some notes about debugging

# Common tools
 
 * gdb
 * strace
 
# gdb

 * [gdb backtrace](https://sourceware.org/gdb/onlinedocs/gdb/Backtrace.html)

# strace

```
strace -fp $(pidof -s steam) -e file -t
```

# General guidelines

* [Arch Linux wiki](https://wiki.archlinux.org/index.php/Step-by-step_debugging_guide)
