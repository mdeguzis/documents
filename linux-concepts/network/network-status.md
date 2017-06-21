# About

Notes on checking Network status

# Check when an adapter address was last updated.

The sysconfig adapter script is typically updated when information is changed, so checking the time stamp on that is one way:

```
ls -la /etc/sysconfig/network-scripts/ifcfg-bond
-rw-r--r--. 1 root root 330 Mar 02  2017 /etc/sysconfig/network-scripts/ifcfg-bond0
```
