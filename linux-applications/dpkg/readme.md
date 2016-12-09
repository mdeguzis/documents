<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Using chroots/pbuilder/sbuild](#using-chrootspbuildersbuild)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful tops and tricks revolving around `dpkg` and it's sub-commands

# Using chroots/pbuilder/sbuild

A good hint, and practice, if say, using Arch Linux with pbuilder, is to use `-nc` with debbuildopts to avoid running dh_clean ahead of the chroot being unpacked. dh_auto_clean and dh_clean run ahead of pbuilder and* of course inside the build environment.

Example:

```
--debbuildopts -nc
```
