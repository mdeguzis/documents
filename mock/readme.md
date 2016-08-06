# About

Mock is a tool for building packages. It can build packages for different architectures and different Fedora or RHEL versions than the build host has. Mock creates chroots and builds packages in them. Its only task is to reliably populate a chroot and attempt to build a package in that chroot.
Mock also offers a multi-package tool, mockchain, that can build chains of packages that depend on each other.
Mock is capable of building SRPMs from source configuration management if the mock-scm package is present, then building the SRPM into RPMs. See --scm-enable in the documentation.

# Links

* [Fedora main page](https://fedoraproject.org/wiki/Mock?rd=Subprojects/Mock)
