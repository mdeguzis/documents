# About

Useful information for Setting up CentOS 7 in Virtual Box

# Common Issues

## Gues Additions

Make sure:

1. Minimal development tools are installed (gcc, make, gcc-c++). You can also install the group `@development`
2. Ensure your kernel and kernel source align:

```
rpm -qa | grep kernel | sort
abrt-addon-kernelloops-2.0.8.21.el6.centos.x86_64
Dracut-kernel-004-335.el6.centos.noarch
kernel-2.6.32-431.el6.x86_64
kerneldevel-26.32-431.1.2.8.1.3l6.x86_64
```

As you can see from the above, the "minor" kernel versions are different for the kernel and kernel source. Make sure to fully update your system and reboot before attempting the install again.
