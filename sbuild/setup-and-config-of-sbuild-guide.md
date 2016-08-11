<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Guide](#guide)
  - [Create File System](#create-file-system)
  - [Creating folders and create Subvolume](#creating-folders-and-create-subvolume)
  - [chroot creation](#chroot-creation)
  - [sbuild Add User](#sbuild-add-user)
  - [generate sbuild SSH key](#generate-sbuild-ssh-key)
  - [schroot configuration](#schroot-configuration)
  - [customize fstab](#customize-fstab)
  - [sources.list generate the chroot](#sourceslist-generate-the-chroot)
  - [test build](#test-build)
  - [Enable Cross-compilation](#enable-cross-compilation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Transalated from:https://people.debian.org/~glaubitz/sbuildsetup.html (German)

# Guide

Setup and configuration of sbuild (with btrfs)

```
root @ vs76: ~> apt-get install sbuild btrfs-tools debootstrap
Reading package lists ... Done
Building dependency tree
Reading state information ... Done
btrfs-tools is already the newest version.
The Following additional packages will be installed:
  dctrl-tools debian-keyring devscripts ie-python diffstat distro-info-data dput equivs hardening-includes iso-codes libarchive-zip-perl libboost-filesystem1.55.0
  libboost-program-options1.55.0 libboost-regex1.55.0 libboost-system1.55.0 libclass-accessor-perl libclass-data-inheritable-perl libclass-inspector-perl-perl libclone
  libcommon-sense-perl libconvert-binhex-perl libcrypt-ssleay-perl libdevel-stacktrace-perl libdigest-hmac-perl libdistro-info-perl libemail-date-format-perl
(...)
Setting up python3-debian (0.1.27) ...
Setting up python3-magic (1: 22.05 + 15-2) ...
Setting up libsbuild-perl (0.65.2-1) ...
Setting up sbuild (0.65.2-1) ...
Setting up dh-python (1.20141111-2) ...
Processing triggers for libc-bin (2.19-17) ...
root @ vs76: ~>
```

## Create File System

```
root @ vs76: ~> mkfs.btrfs -f/dev/sda3
Btrfs v3.17
See http://btrfs.wiki.kernel.org for more information.

Turning ON incompat feature 'extref': increased hardlink limit per file to 65536
fs created label (zero) on/dev/sda3
nodesize 16384 16384 leafsize sector size 4096 size 37.03GiB
root @ vs76: ~>
```

## Creating folders and create Subvolume

```
root @ vs76: ~> mkdir -p /srv/chroots/sid-amd64-sbuild
root @ vs76: ~> mount/dev/sda3/srv/chroots/sid-amd64-sbuild/
root @ vs76: ~> btrfs subvolume create/srv/chroots/sid-amd64-sbuild/buildd base
Create Subvolume '/srv/chroots/sid-amd64-sbuild/buildd base'
root @ vs76: ~> umount/srv/chroots/sid-amd64-sbuild
root @ vs76: ~> mount -o SubVol = buildd-base/dev/sda3/srv/chroots/sid-amd64-sbuild/
root @ vs76: ~> mkdir/srv/chroots/sid-amd64-sbuild/snapshots
root @ vs76: ~>
```

## chroot creation

```
root @ vs76: ~> debootstrap --no-check-gpg --variant = buildd --include = eatmydata unstable/srv/chroots/sid-amd64-sbuild/ftp://ftp.de.debian.org/debian
I: Retrieving Release
I: Retrieving Packages
I: Validating Packages
(...)
I: Configuring liblsan0: amd64 ...
I: Configuring dpkg-dev ...
I: Configuring libasan1: amd64 ...
I: Configuring libgcc-4.9-dev: amd64 ...
I: Configuring apt ...
I: Configuring libcloog-isl4: amd64 ...
I: Configuring libstdc ++ - 4.9-dev: amd64 ...
I: Configuring cpp-4.9 ...
I: Configuring cpp ...
I: Configuring gcc-4.9 ...
I: Configuring gcc ...
I: Configuring g ++ - 4.9 ...
I: Configuring g ++ ...
I: Configuring build-essential ...
I: Configuring libc-bin ...
I: Base system installed successfully.
root @ vs76: ~>
```

## sbuild Add User

```
root @ vs76: ~> adduser glaubitz sbuild
Adding user `glaubitz 'to group` sbuild' ...
Adding user to group glaubitz sbuild
Done.
root @ vs76: ~>
```

##  generate sbuild SSH key

```
root @ vs76: ~> mkdir ~/.gnupg
root @ vs76: ~> sbuild-update --keygen
Generating archive key.
gpg: keyring `/root/.gnupg/secring.gpg 'created
gpg: keyring `/root/.gnupg/pubring.gpg 'created

Not enough random bytes available. Please do some other work to give
the OS a chance to collect more entropy! (Need 288 more bytes) (...)
root @ vs76: ~>
```

## schroot configuration

```
root @ vs76: ~> cat/etc/schroot/chroot.d/sid-amd64-sbuild
[Sid-amd64-sbuild]
type = btrfs-snapshot
description = Debian sid btrfs snapshot
btrfs-source subvolume =/srv/chroots/sid-amd64-sbuild
btrfs-snapshot-directory =/srv/chroots/sid-amd64-sbuild/snapshots
groups = root, sbuild, glaubitz
root = root groups, sbuild, glaubitz
source-root users = glaubitz, sbuild
command-prefix = eatmydata
root @ vs76: ~>
````

## customize fstab

```
root @ vs76: ~> cat/etc/fstab
#/Etc/fstab: static file system information.
#
# <File sys> <mountpoint> <type> <options> <dump> <pass>
UUID = 43c64b32-d7b5-4cca-ae5f-682d5a74c3e3/ext4 rw 0 1 # device at install:/dev/sda1
# UUID = 3d418983-22f9-413f-a7a1-1e34200537f9/local_scratch ext4 rw 0 2 # device at install:/dev/sda3
UUID = a8e2a2c1-A05B-40CA-9417-825bf2a7939b/var ext4 rw 0 2 # device at install/dev/sda6
UUID = 8433560c-8a2b-4a75-827e-bf95db8d60ba none swap sw 0 0 # device at install:/dev/sda5
/Dev/floppy/media/floppy auto rw, noauto, user 0 0
/Dev/cdrom/media/cdrom auto rw, noauto, user 0 0
/Dev/usbstick/media/usbstick auto rw, noauto, user 0 0
none/tmp tmpfs defaults 0 0
home:/srv/home/home nfs vers = 3, nosuid, nodev, intr, tcp, comment = systemd.automount 0 0

# chroots
/Dev/sda3/srv/chroots/sid-amd64-sbuild btrfs defaults, SubVol = buildd base, noatime, nodiratime 0 0

# Chroot procs
proc/srv/chroots/sid-amd64-sbuild/proc proc defaults 0 0
sysfs/srv/chroots/sid-amd64-sbuild/sys sysfs defaults 0 0
/Dev/pts/srv/chroots/sid-amd64-sbuild/dev/pts none bind 0 0
root @ vs76: ~>
```

## sources.list generate the chroot

```
root @ vs76: ~> cat/srv/chroots/sid-amd64-sbuild/etc/apt/sources.list
deb http://deb.physik.fu-berlin.de:9999/debian unstable main contrib non-free
deb-src http://deb.physik.fu-berlin.de:9999/debian unstable main contrib non-free
root @ vs76: ~>
```

## test build

```
glaubitz @ vs76: ~> Widget -u http://http.debian.net/debian/pool/main/x/xbill/xbill_2.1-8.dsc
Widget: retrieving http://http.debian.net/debian/pool/main/x/xbill/xbill_2.1-8.dsc
--2015-05-08 13: 08: 08-- http://http.debian.net/debian/pool/main/x/xbill/xbill_2.1-8.dsc
Resolving http.debian.net (http.debian.net) ... 176.9.184.93, 5.153.231.35, 128.31.0.66, ...
Connecting to http.debian.net (http.debian.net) | 176.9.184.93 |: 80 ... connected.
(...)
dpkg-source: info: unpacking xbill_2.1.orig.tar.gz
dpkg-source: info: unpacking xbill_2.1-8.debian.tar.gz
dpkg-source: info: applying 01_makefile_in.diff
dpkg-source: info: applying 02_hurd_logos.diff
dpkg-source: info: applying 03_fix_ftbfs_binutils_gold.diff
glaubitz @ vs76: ~>
glaubitz @ vs76: ~> sbuild --arch = amd64 --source --arch-all -d sid xbill_2.1-8.dsc
sbuild (Debian sbuild) 0.65.2 (24 Mar 2015) on vs76.physik.fu-berlin.de
(...)
┌──────────────────────────────────────────────────────────────────────────────┐
│ │ Summary
└──────────────────────────────────────────────────────────────────────────────┘

Build Architecture: amd64
Build-Space: 1792
Build-Time: 8
Distribution: sid
Host Architecture: amd64
Install-Time: 19
Job: xbill_2.1-8.dsc
Machine Architecture: amd64
Package: xbill
Package Time: 40
Source Version: 2.1-8
Space: 1792
Status: successful
Version: 2.1-8
────────────────────────────────────────────────────────────────────────────────
Finished at 20150508-1306
Build needed 0:00:40, 1792k disc space
glaubitz @ vs76: ~>
```

## Enable Cross-compilation

Thanks QEMU can be personalized with sbuild even packages for completely different architectures build.
Therefore one must initially first install QEMU:

```
root @ vs76: ~> apt-get install qemu-user-static binfmt-support
Reading package lists ... Done
Building dependency tree
Reading state information ... Done
THE FOLLOWING NEW packages will be installed:
  binfmt-support qemu-user-static
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 0 B/6,961 kB of archives.
After this surgery, 81.9 MB of additional disk space will be used.
Selecting Previously unselected package binfmt-support.
(Reading database ... 81197 files and directories currently installed.)
Preparing to unpack .../binfmt-support_2.1.5-1_amd64.deb ...
Unpacking binfmt-support (2.1.5-1) ...
Selecting Previously unselected package qemu-user-static.
Preparing to unpack .../qemu-user-static_2.1 + dfsg-12 + deb8u4_amd64.deb ...
Unpacking qemu-user-static (1: 2.1 + dfsg-12 + deb8u4) ...
Processing triggers for systemd (215-17 + deb8u2) ...
Processing triggers for man-db (2.7.0.2-5) ...
Setting up binfmt-support (2.1.5-1) ...
insserv: Script zedv-merge-interfaces is broken: incomplete LSB comment.
insserv: missing `Required-Start: 'entry: please add even if empty.
insserv: missing `Required-Stop: 'entry: please add even if empty.
insserv: script zedv-ntpdate: ntp service already provided!
insserv: Script zedv-merge-interfaces is broken: incomplete LSB comment.
insserv: missing `Required-Start: 'entry: please add even if empty.
insserv: missing `Required-Stop: 'entry: please add even if empty.
Setting up qemu-user-static (1: 2.1 + dfsg-12 + deb8u4) ...
Processing triggers for systemd (215-17 + deb8u2) ...
root @ vs76: ~>
After you create the chroot for the desired architecture using the --foreign option, for example, for armhf (architecture of the Raspberry Pi 2):

root @ vs76:/local_scratch> debootstrap --no-check-gpg --variant = buildd --foreign --arch = armhf unstable sid-armhf-sbuild/ftp://ftp.debian.org/debian/
root @ vs76:/local_scratch> debootstrap --no-check-gpg --variant = buildd --foreign --arch = armhf unstable sid-armhf-sbuild/ftp://ftp.debian.org/debian/
I: Retrieving Release
I: Retrieving Packages
I: Validating Packages
I: Resolving dependencies of required packages ...
I: Resolving dependencies of base packages ...
I: Found additional required dependencies: dmsetup adduser insserv libapparmor1 libaudit1 libaudit-common libbz2-1.0 libcap2 libcap2-bin libcryptsetup4 libdb5.3 libdebconfclient0 libdevmapper1.02.1 libgcrypt20 libgpg-error0 libkmod2 libncursesw5 libseccomp2 libsemanage1 libsemanage-common libsystemd0 libudev1 libustr-1.0-1 systemd systemd -sysv
I: Found additional base dependencies: binutils bzip2 cpp cpp-5 debian-archive-keyring dpkg-dev g ++ g ++ - 5 gcc gcc-5 gnupg gpgv libapt-pkg4.16 libasan2 libatomic1 libc6-dev libcc1-0 libc-dev-bin libdpkg -perl libgcc-5-dev libgdbm3 libgmp10 libgomp1 libisl13 libmpc3 libmpfr4 libreadline6 libstdc ++ - 5-dev libstdc ++ 6 libubsan0 libusb-0.1-4 linux-libc-dev make patch perl perl-modules readline-common xz-utils
I: Checking component main on ftp://ftp.debian.org/debian ...
I: Retrieving libacl1 2.2.52-2
I: Validating libacl1 2.2.52-2
I: Retrieving adduser 3,113 + nmu3
I: Validating adduser 3,113 + nmu3
I: Retrieving libapparmor1 2.10-2 + ​​b1
I: Validating libapparmor1 2.10-2 + ​​b1
(...)
I: Extracting libmount1 ...
I: Extracting libsmartcols1 ...
I: Extracting libuuid1 ...
I: Extracting mount ...
I: Extracting util-linux ...
I: Extracting liblzma5 ...
I: Extracting zlib1g ...
root @ vs76:/local_scratch>
Then you simply copy the statically-linked binary for QEMU ARM in the chroot and then calls ./debootstrap/debootstrap --second-stage on, after being changed with chroot back into the chroot:

root @ vs76:/local_scratch> cd sid-armhf-sbuild/
root @ vs76:/local_scratch/sid-armhf-sbuild> cp -av/usr/bin/qemu-arm-static usr/bin
'/Usr/bin/qemu-arm-static' -> 'usr/bin/qemu-arm-static'
root @ vs76:/local_scratch/sid-armhf-sbuild> chroot.
bash: warning: setlocale: LC_ALL: can not change locale (en_US.UTF-8)
I have no name @ vs76:/# ./debootstrap/debootstrap --second-stage
I: keyring file not available at/usr/share/keyrings/debian-archive-keyring.gpg; switching to https mirror https://mirrors.kernel.org/debian
I: Installing core packages ...
I: Unpacking required packages ...
I: Unpacking libacl1: armhf ...
I: Unpacking adduser ...
I: Unpacking libapparmor1: armhf ...
I: Unpacking libattr1: armhf ...
I: Unpacking libaudit-common ...
I: Unpacking libaudit1: armhf ...
I: Unpacking base-files ...
I: Unpacking base-passwd ...
I: Unpacking bash ...
I: Unpacking libbz2-1.0: armhf ...
I: Unpacking libdebconfclient0: armhf ...
I: Unpacking coreutils ...
I: Unpacking libcryptsetup4: armhf ...
I: Unpacking dash ...
I: Unpacking libdb5.3: armhf ...
(...)
I: Configuring dpkg-dev ...
I: Configuring libgcc-5-dev: armhf ...
I: Configuring libapt-pkg4.16: armhf ...
I: Configuring apt ...
I: Configuring gcc-5 ...
I: Configuring libstdc ++ - 5-dev: armhf ...
I: Configuring gcc ...
I: Configuring g ++ - 5 ...
I: Configuring g ++ ...
I: Configuring build-essential ...
I: Configuring libc-bin ...
I: Base system installed successfully.
I have no name @ vs76:/#
Then described just above a schroot configuration invest for sid-armhf-build and then specify with when building with sbuild simple yet --arch = armhf.

Done.

```

Except where otherwise Noted, content on this wiki is licensed under the Following license: CC Attribution-Noncommercial-Share Alike 3.0 Unported
Recent changes RSS feed Donate Powered by PHP Valid XHTML 1.0 Valid CSS Driven by DokuWiki


