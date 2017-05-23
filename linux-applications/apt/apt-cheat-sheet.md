<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Commands](#commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Onlines newer apt conventions vs. older `apt-get` equivalients.

# Commands

 apt | apt-get     | description
 ----|-------------|------------------
apt update |apt-get update|
apt upgrade |apt-get upgrade |
apt full-upgrade |apt full-upgrade |
apt install package |apt-get install package |
apt remove package |apt-get remove package |
apt autoremove |apt-get autoremove |
apt purge package(s) |apt-get remove –purge package(s) |
apt search string |apt-cache search string |
apt list -a package |apt-cache poilcy package |
apt list --upgradable |apt-get -u upgrade –assume-no |
apt list –-installed |dpkg -l|
apt show package |apt-cache show package |
apt show -a package |apt-cache showpkg package |
apt depends package(s) |apt-cache depends package(s) |
apt rdepends package(s) |apt-rdepends package(s) |
apt hold package |echo package hold | sudo dpkg –set-selections |
apt unhold |echo package install | sudo dpkg –set-selections |
apt held |dpkg --get-selections | grep hold |
apt edit-sources |vim /etc/apt/sources.list |
