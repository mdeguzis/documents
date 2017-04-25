<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General links](#general-links)
- [Subjects](#subjects)
- [Sourcing options in scrits](#sourcing-options-in-scrits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful info for working with bash

# General links

* [Bash pitfalls](http://mywiki.wooledge.org/BashPitfalls)

# Subjects

* [Arrays](https://github.com/ProfessorKaos64/documents/blob/master/bash/bash-arrays.md)

# Sourcing options in scrits 

* [Sourcing options in scripts (bash hackers)](http://wiki.bash-hackers.org/howto/getopts_tutorial)
* [Sourcing options in scripts (broader examples)](http://mywiki.wooledge.org/BashFAQ/035)

# Tips and tricks

## Running command from bash history

You can use `history` to pull up a command from your login:

```
history | grep "command"
112 ls
113 echo "test"
114 echo "test2"

# Run command 
!112

# Just pring the command
!112:p
```

## Garbled terminal

If you accidentally mess up your terminal screen, say with feeding sed binary files, use `reset`. This will reset the terminal output and stop spitting out garbage. You can try it when your terminal is clear to see what it does; usually when you run it you can't actually see the `$` prompt and it's possible you don't actually have a prompt, but when you do and just can't see it, this clears things up without losing shell history.

Example:

* [My cross-gcc build script](https://github.com/ProfessorKaos64/LibreGeek-Packaging/blob/brewmaster/gcc/build-cross-gcc.sh)

