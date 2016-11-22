<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Mock is a tool for building packages. It can build packages for different architectures and different Fedora or RHEL versions than the build host has. Mock creates chroots and builds packages in them. Its only task is to reliably populate a chroot and attempt to build a package in that chroot.
Mock also offers a multi-package tool, mockchain, that can build chains of packages that depend on each other.
Mock is capable of building SRPMs from source configuration management if the mock-scm package is present, then building the SRPM into RPMs. See --scm-enable in the documentation.

# Setup mock

# Add user to group mock
usermod -a -G mock ${USER}

Initalizing your chroot:
```
mock -r epel-7-x86_64 --init
```

See: `/etc/mock` for a list of targets.

Cleaning a chroot:
```
mock -r epel-7-x86_64 --clean
```

# Building packages

## Fedora

```
fedpkg mockbuild
```

## CentOS / RHEL

First build the source rpm for mock
```
rpmbuild -bs mypackage.spec
```

Issue the build with mock:
```
mock -r epel-7-x86_64 rebuild package-1.1-1.src.rpm
```

Sans additional arguments, your package will fall into `/var/lib/mock/<config>/result`

## Testing rpm packagge

Install the local package with `yum` (fetches deps):

```
yum --nogpgcheck localinstall <package>.rpm
```

You can also use `rpm`

```
rpm -ivh <package>.rpm
```



# Links

* [Building packages with mock](http://blog.packagecloud.io/eng/2015/05/11/building-rpm-packages-with-mock/)
* [Fedora main page](https://fedoraproject.org/wiki/Mock?rd=Subprojects/Mock)
