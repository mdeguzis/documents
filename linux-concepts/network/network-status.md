<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Check when an adapter address was last updated.](#check-when-an-adapter-address-was-last-updated)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on checking Network status

# Check when an adapter address was last updated.

The sysconfig adapter script is typically updated when information is changed, so checking the time stamp on that is one way:

```
ls -la /etc/sysconfig/network-scripts/ifcfg-bond
-rw-r--r--. 1 root root 330 Mar 02  2017 /etc/sysconfig/network-scripts/ifcfg-bond0
```
