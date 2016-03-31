# About
Useful tops and tricks revolving around `dpkg` and it's sub-commands

# Using chroots/pbuilder/sbuild

A good hint, and practice, if say, using Arch Linux with pbuilder, is to use `-nc` with debbuildopts to avoid running dh_clean ahead of the chroot being unpacked. dh_auto_clean and dh_clean run ahead of pbuilder and* of course inside the build environment.

Example:

```
--debbuildopts -nc
```
