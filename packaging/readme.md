# About
This directory contains some useful information for Linux distribution packaging (general info).

# Debugging

* If you experience a "undefined ... function" when compiling a project, chances are that software is either:
  * not installed
  * the wrong package
  * too old
* Case in point, `qtwebengine` with `--system-vpx` (requires >= v 1.5).

# Debian-specific

## Hardening

See: https://wiki.debian.org/Hardening

# Debian rules

## Tips

* If you only have one target install/binary, using docs/dirs/install etc., vs package.docs/package.dirs/package.install is not necessary.
* If you only have one target install/binary, having files in debian/package_name or debian/tmp/ will be auto installed by debhelper, unless otherwise overriden.
