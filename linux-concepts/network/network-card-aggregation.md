<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Bonding info](#bonding-info)
- [Links:](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Network card aggregation notes.

# Bonding info

```
cat /proc/net/bonding/bond0
```
# Bonded interface and NetworkManager

Don't set nm_controlled to yes; NetworkManager mangles bonded interfaces. It's probably the reason /etc/resolv.conf is empty as it sometimes trashes that file when there are network hiccups. Set that to 'no' so NetworkMangler doesn't trash your configuration. 

NetworkManager is designed for simple network connections, it's more geared for laptops and desktops than servers, and doesn't work with more complicated structures. Especially in an environment when it detects network changes, it has a history of doing weird things. Vheck if you're uninstalling NetworkManager and should probably do so nodes with bonded interfaces so it isn't messing with config files.'

# Links:

* [Network Card Aggregation (RHEL)](http://panoramicsolution.com/blog/?p=388)
