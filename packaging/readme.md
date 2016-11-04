<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Debugging](#debugging)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
This directory contains some useful information for Linux distribution packaging (general info).

# Locating Packages

## Debian distros

You can use `apt-cache seach <package_name>`

## Arch Linux

Use https://www.archlinux.org/packages/ for locating packages. Pacakges you need may also exist in the AUR. For locating package contents, the package `pkgfile` works great.

```
pkgfile -s <search_string>
```

## Debian
Seach packages.debian.org/<pkgname>. If the build system cannot find a certain package, try searching for the .pc (package config) file.

```
File	                                             Packages
/usr/lib/i386-linux-gnu/pkgconfig/libxml-2.0.pc	     libxml2-dev
```

## Ubuntu

Locate packages on packages.ubuntu.com

# Debugging

* If you experience a "undefined ... function" when compiling a project, chances are that software is either:
  * not installed
  * the wrong package
  * too old
* Case in point, `qtwebengine` with `--system-vpx` (requires >= v 1.5).

# Tips and tricks

## Debian variants

Don't use package tar.gz if you can. You loose the commit logs and meta data, unless other wise included. It is much better to use the git source Debian provides for many packages (see links below). This is especially useful for build scripts, and package systems like the AUR (Arch Linux User Repository). If you want ot save yourself time scrolling anomscm.debian.org, type "site:https://anonscm.debian.org/git/ <PACKAGE_NAME>" into Google.

* https://anonscm.debian.org/git/ (page will take some time load)
