<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Vague errors about gcc/clang etc. and "amd64"](#vague-errors-about-gccclang-etc-and-amd64)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Some common issues that may arise when packaging

# Vague errors about gcc/clang etc. and "amd64"

Check that you are not using vars that conflict with builder vars. This has happened to me in the past when using pbuilder. Pbuilder makes use of ARCH, when some debian/rules files have used the same var. Using an alternate, or "arch" in debian/rules may help.
