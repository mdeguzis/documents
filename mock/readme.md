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

# Links

* [Fedora main page](https://fedoraproject.org/wiki/Mock?rd=Subprojects/Mock)
