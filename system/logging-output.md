<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Logging command/script output from a terminal window](#logging-commandscript-output-from-a-terminal-window)
  - [Redirection](#redirection)
  - [the `script` program](#the-script-program)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Logging command/script output from a terminal window

There are several ways to do this

## Redirection

```
script.sh 2>&1 log.txt
```

This approach works most of the time. However, redirection may not catch everything. A good example is trying to capture all output from `mock -r fedora-24-x86_64 --init`.
The log will cut out this mock initialization:

```
INFO: mock.py version 1.2.18 starting (python version = 2.7.9)...
Start: init plugins
WARNING: specified 'pigz' as the root cache compress program but not available; using gzip
INFO: selinux disabled
Finish: init plugins
Start: run
Start: clean chroot
Finish: clean chroot
Start: chroot init
INFO: calling preinit hooks
INFO: enabled root cache
INFO: enabled dnf cache
Start: cleaning dnf metadata
Finish: cleaning dnf metadata
Mock Version: 1.2.18
INFO: Mock Version: 1.2.18
Start: dnf install
```

## the `script` program

```
script -c "mock -r fedora-24-x86_64 --init" log.txt
````

Howver, this does produce a binary file. You can read it without the symbols with `cat`, but to upload the file
to a paste site in ascii format, you will need to convert it. `pastebinit` accomplishes this nicely. `dos2unx` will not 
handle binary files. Workarounds are listed below.

Convert the log file directly
```

```

Upload output as ASCII formatted text: 
```
pastebinit log.txt
```

# Links

* [Simple redirection (TLDP)](http://www.tldp.org/LDP/intro-linux/html/sect_05_01.html)
