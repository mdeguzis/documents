<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General links](#general-links)
- [Subjects](#subjects)
- [Sourcing options in scrits](#sourcing-options-in-scrits)
- [Tips and tricks](#tips-and-tricks)
  - [Using vi commands at the bash prompt](#using-vi-commands-at-the-bash-prompt)
  - [Running command from bash history](#running-command-from-bash-history)
  - [Garbled terminal](#garbled-terminal)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful info for working with bash

# Style Guide
* https://google.github.io/styleguide/shellguide.html

# General links

* [Bash pitfalls](http://mywiki.wooledge.org/BashPitfalls)

# Subjects

* [Arrays](https://github.com/ProfessorKaos64/documents/blob/master/bash/bash-arrays.md)

# Sourcing options in scrits 

* [Sourcing options in scripts (bash hackers)](http://wiki.bash-hackers.org/howto/getopts_tutorial)
* [Sourcing options in scripts (broader examples)](http://mywiki.wooledge.org/BashFAQ/035)

# Tips and tricks

## Using vi commands at the bash prompt

Bash provides two modes for command line editing - **emacs** and **vi**. Emacs editing mode is the default and I already wrote an [article and created a cheat sheet for this mode][2].

This time I am going to introduce you to bash's **vi editing mode** and give out a detailed cheat sheet with the default keyboard mappings for this mode.

The difference between the two modes is what command each key combination (or key) gets bound to. You may inspect your current keyboard mappings with bash's built in **bind** command:
    
    
    $ bind -P
    
    abort can be found on "C-g", "C-xC-g", "M-C-g".
    accept-line can be found on "C-j", "C-m".
    alias-expand-line is not bound to any keys
    ...
    

To get into the **vi editing mode** type
    
    
     
    $ set -o vi
    

in your bash shell (to switch back to emacs editing mode, type **set -o emacs**).

If you are used to a vi text editor you will feel yourself at home. 

Use `ESC` to enter command mode.

See: http://www.catonmat.net/download/bash-vi-editing-mode-cheat-sheet.pdf

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

