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

# Terminology

* **Step Into** - A method is about to be invoked, and you want to debug into the code of that method, so the next step is to go into that method and continue debugging step-by-step.
* **Step Over** - A method is about to be invoked, but you're not interested in debugging this particular invocation, so you want the debugger to execute that method completely as one entire step.
* **Step Return** - You're done debugging this method step-by-step, and you just want the debugger to run the entire method until it returns as one entire step.
* **Resume** - You want the debugger to resume "normal" execution instead of step-by-step
* **Line Breakpoint** - You don't care how it got there, but if execution reaches a particular line of code, you want the debugger to temporarily pause execution there so you can decide what to do.

# Common tools
 
 * gdb
 * strace
 
## gdb

 * [Debugging with GDB (large manual)](http://www.sourceware.org/gdb/download/onlinedocs/gdb.html)
 * [General overview](https://www.chemie.fu-berlin.de/chemnet/use/info/gdb/gdb_5.html)
 * [gdb backtrace](https://sourceware.org/gdb/onlinedocs/gdb/Backtrace.html)

## strace

```
strace -fp $(pidof -s steam) -e file -t
```

# General guidelines

* [Arch Linux wiki](https://wiki.archlinux.org/index.php/Step-by-step_debugging_guide)
