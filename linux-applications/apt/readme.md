<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Recursive listing of packages, listing only installed](#recursive-listing-of-packages-listing-only-installed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful info about apt. Please note the differences between `apt` (newer usage) and `apt-get` or `dpkg`. `apt` aims to make usage of the package manage more useful and consistent. `apt` has more colorful and cleanly formatted output. 

# Recursive listing of packages, listing only installed

Show complete list
```
apt-rdepends -r apache2 > rdepends_apache2.txt
```

Show only installed packages in the same manner:

```
apt-cache --recurse rdepends apache2 --installed
```
