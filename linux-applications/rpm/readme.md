<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links:](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on bulding RPM packages and more.

# rpm verification
Re-pasted this from the man page for quick lookups when not at a terminal:

The format of the output is a string of 8 characters, a possible attribute marker:
```
c %config configuration file.
d %doc documentation file.
g %ghost file (i.e. the file contents are not included in the package payload).
l %license license file.
r %readme readme file.
```

From the package header, followed by the file name. Each of the 8 characters denotes the result of a comparison of attribute(s) of the file to the value of those attribute(s) recorded in the database. A single "." (period) means the test passed, while a single "?" (question mark) indicates the test could not be performed (e.g. file permissions prevent reading). Otherwise, the (mnemonically emBoldened) character denotes failure of the corresponding --verify test:

```
S file Size differs
M Mode differs (includes permissions and file type)
5 digest (formerly MD5 sum) differs
D Device major/minor number mismatch
L readlink(2) path mismatch
U User ownership differs
G Group ownership differs
T mTime differs
P caPabilities differ
```

# Links:

* [Maximum RPM](http://www.rpm.org/max-rpm/index.html)
