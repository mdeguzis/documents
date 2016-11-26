<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Repo](#repo)
- [Arch Linux](#arch-linux)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on creating 32 bit base images

# Repo

See https://github.com/ProfessorKaos64/LibreGeek-Packaging/tree/docker for build scripts

# Arch Linux

Partially taken from [docker hub](https://hub.docker.com/r/binhex/arch-scratch/)

Build a [32 bit chroot](https://wiki.archlinux.org/index.php/Building_32-bit_packages_on_a_64-bit_system) first. Once docker is up
and running, run the following command:

enter the choot/container

```
arch-nspawn ~/chroot_i686 bash
```

Create the base root tarball
```
mkdir -p /ext && tar -cvpjf /ext/root.tar.bz2 --exclude=/ext --exclude=/etc/hosts --exclude=/etc/hostname --exclude=/etc/resolv.conf --exclude=/sys --one-file-system /
```

Transfer root tarball to a network machine using scp, or whatever means you deem acceptable.

Then, build the docker image with the provided Dockerfile.
