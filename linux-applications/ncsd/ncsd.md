<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Notes](#notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

The daemon will try to watch for changes in configuration files appropriate for each database (e.g., /etc/passwd for the passwd database or /etc/hosts and /etc/resolv.conf for the hosts database), and flush the cache when these are changed. However, this will happen only after a short delay (unless the inotify(7) mechanism is available and glibc 2.9 or later is available), and this auto-detection does not cover configuration files required by nonstandard NSS modules, if any are specified in /etc/nsswitch.conf. In that case, you need to run the following command after changing the configuration file of the database so that nscd invalidates its cache:

# Notes

* Safe to restart during production hours.
