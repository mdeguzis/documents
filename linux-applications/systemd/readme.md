<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [system runlevel vs. sysv](#system-runlevel-vs-sysv)
- [Unit files](#unit-files)
  - [Simple unit file](#simple-unit-file)
  - [Installation](#installation)
- [Tips and tricks](#tips-and-tricks)
- [Documentation](#documentation)
- [Education](#education)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

General notes on systemd. See [systemd cheatsheet](https://github.com/mdeguzis/documents/blob/master/linux-applications/systemd/systemd-cheat-sheet.md) for a list of handy commands.

# system runlevel vs. sysv

SysV Runlevel	| systemd Target |	Notes
--------------|----------------|---------------------
0	|runlevel0.target, poweroff.target	|Halt the system.
1, s, single	|runlevel1.target, rescue.target	|Single user mode.
2, 4	|runlevel2.target, runlevel4.target, multi-user.target	|User-defined/Site-specific runlevels. By default, identical to 3.
3	|runlevel3.target, multi-user.target	|Multi-user, non-graphical. Users can usually login via multiple consoles or via the network.
5	|runlevel5.target, graphical.target	|Multi-user, graphical. Usually has all the services of runlevel 3 plus a graphical login.
6	|runlevel6.target, reboot.target	| Reboot
emergency	|emergency.target	|Emergency shell

# Unit files

A unit configuration file whose name ends in .service encodes information about a process controlled and supervised by systemd.

This man page lists the configuration options specific to this unit type. See systemd.unit(5) for the common options of all unit configuration files. The common configuration items are configured in the generic "[Unit]" and "[Install]" sections. The service specific configuration options are configured in the "[Service]" section.

Additional options are listed in systemd.exec(5), which define the execution environment the commands are executed in, and in systemd.kill(5), which define the way the processes of the service are terminated, and in systemd.resource-control(5), which configure resource control settings for the processes of the service.

If a service is requested under a certain name but no unit configuration file is found, systemd looks for a SysV init script by the same name (with the .service suffix removed) and dynamically creates a service unit from that script. This is useful for compatibility with SysV. Note that this compatibility is quite comprehensive but not 100%. For details about the incompatibilities, see the Incompatibilities with SysV document.

The syntax of systemd's [unit files](http://www.freedesktop.org/software/systemd/man/systemd.unit.html) is inspired by XDG Desktop Entry Specification `.desktop` files, which are in turn inspired by Microsoft Windows `.ini` files. 


## Simple unit file

```
[Unit]
Description=Redis container
After=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker start -a redis_server
ExecStop=/usr/bin/docker stop -t 2 redis_server

[Install]
WantedBy=local.target
```

## Installation

Unit files are loaded from two locations. From lowest to highest precedence they are:

UNIT LOAD PATH
Unit files are loaded from a set of paths determined during compilation, described in the two tables below. Unit files found in directories listed earlier

override files with the same name in directories lower in the list.
from `man systemd.unit`

* `/etc/systemd/system`: Local configuration 
* `/run/systemd/system`: Runtime units
* `/usr/lib/systemd/system`:  Units of installed packages

# Troubleshooting and Gotchas

## Using symlinks in `/etc/systemd/system`
> Lennart Poettering 2016-06-07 10:34:10 UTC
> So, current systemd versions will actually follow symlinks in "systemctl enable", but only if they are located in /usr, but not when located in /etc. This is because "systemctl enable" is about creating and removing symlinks in /etc, and we really won't want bsae our decisions what symlinks to create or remove on the symlinks that were created before. Closing as fixed hence.

Source: https://bugs.freedesktop.org/show_bug.cgi?id=54560

# Tips and tricks

* Comments prepended with # may be used in unit-files as well, but only in new lines. Do not use end-line comments after systemd parameters or the unit will fail to activate.

# Documentation

* [Writing unit files (docker)](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/managing_containers/using_systemd_with_containers)
* [systemd service (freedesktop.org)](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
* [systemd (Arch Linux)](https://wiki.archlinux.org/index.php/systemd)

# Education

* [Digital Ocean tutorials](https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal)
* [Ace Attorney Debian init cases (all)](https://www.phoronix.com/forums/forum/software/distributions/45968-debian-init-discussion-in-phoenix-wright-format)
* [Ace Attorney Debian init case (part1)](http://aceattorney.sparklin.org/jeu.php?id_proces=57684)
 
