<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Repairing](#repairing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Somtimes you paste text between files and receive this message:

```
SyntaxError: Non-ASCII character '\xe2' in file <FILE>
... on line 7, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details
```

# Repairing

This is likely a stray byte floating around. You can find it by running:
```
with open("x.py") as fp:
    for i, line in enumerate(fp):
        if "\xe2" in line:
            print i, repr(line)
```
