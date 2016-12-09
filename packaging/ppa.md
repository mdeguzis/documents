<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Package version policy](#package-version-policy)
- [Regarding pbuilder](#regarding-pbuilder)
- [PPA build dependencies](#ppa-build-dependencies)
- [OpenPGP keys](#openpgp-keys)
- [Signing .changes file](#signing-changes-file)
- [config files](#config-files)
- [Uploading](#uploading)
  - [Regarding multi dist uploads](#regarding-multi-dist-uploads)
  - [Ubuntu](#ubuntu)
  - [Debian and other derivitives](#debian-and-other-derivitives)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on uploading to PPAs

# Package version policy

If you are using Ubuntu you have seen that many packages include in the version the name ubuntu… some packages don’t include ubuntu at all in the package version. Here you can find a short explanation on how you can interpret the meaning of the package version of the Ubuntu packages and to find the correspondence with the Debian packages.

Basically each package will be in the form: “package-XubuntuY****”. Let’s break this apart and see what each part means:

1. package = this is the name of the program/library.
2. X = this is the debian version of the package
3. if X=0 this means that there is no debian package (or that the ubuntu team has forked a debian package to a newer version than the one found in the debian repositories) _ ex: bzip2-1.0.3-0ubuntu2_ (as shown in this example the debian package might be updated in the meantime and the ubuntu package will probably merged with it on the next version)
4. ubuntuY**** = this is the Yth ubuntu version of the debian package.
5. if this is missing this mean that it is a clean, unchanged debian package ex: gzip-1.3.5-12 (in this sample, this is the original debian package included in ubuntu)
6. if this is present it means that Ubuntu has taken the debian package and released it with some additional patches or bug fixes. _ ex: sudo-1.6.8p12-1ubuntu6_ (in this sample this is the 6th version of the ubuntu package based on the debian version 1.6.8p12-1 of sudo).

As a conclusion, the version of a package can be: 2.6.0-1 – means that this is the 1st debian package of version 2.6.0. No ubuntu changes were included. 2.6.0-1ubuntu1 – means that this is the 1st ubuntu package based on the debian package version 2.6.0-1 2.6.0-0ubuntu1 – means that there was not a debian package yet and this is the 1st ubuntu version of package 2.6.0

Source: [ducea.com](http://www.ducea.com/2006/06/17/ubuntu-package-version-naming-explanation/)

# Regarding pbuilder

If using pbuilder, it is suggested to use `--debbuildopts -nc` to avoid checksum mismatches when using debsign/dput.

# PPA build dependencies

If you make use of other PPA repositories to complete a build (say on an old release, like Ubuntu Trusty), but sure to add the PPA in the "Edit PPA dependencies" section of your PPA.

# OpenPGP keys

For Ubuntu PPAs, ensure your user profile page https://launchpad.net/~<user>/+editpgpkeys lists the appropriate 
keys you have on your host machine that you are signing with

# Signing .changes file

`dpkg-buildpackage` will sign after the package created, unless otherwise told not to. For instance, if using pbuilder, you can use `debsign` after the package is build, since the build occurs in an chroot, not your host machine. See the man page for `debsign`. Setting DEBSIGN_KEYID can override the default. Signing the .changes file will sign the .dsc file as well. Both a signed .dsc and a signed .changes file are required for uploading.

The two configuration files /etc/devscripts.conf and ~/.devscripts are sourced  in  that  order  to set configuration variables


Environment variables for debsign:
```
DEBSIGN_PROGRAM
      Setting this is equivalent to giving a -p option.

DEBSIGN_MAINT
      This is the -m option.

DEBSIGN_KEYID
      And this is the -k option.

DEBSIGN_ALWAYS_RESIGN
      Always re-sign files even if they are  already  signed,  without
      prompting.

DEBRELEASE_DEBS_DIR
      This  specifies  the directory in which to look for the .changes
      and .dsc files, and is either an absolute path  or  relative  to
      the  top of the source tree.  This corresponds to the --debs-dir
      command line option.  This directive could be used, for example,
      if  you  always  use  pbuilder or svn-buildpackage to build your
      packages.  Note that it also affects debrelease(1) in  the  same
      way, hence the strange name of the option.
```

With a specified key
```
debsign -k <KEY_ID> <pacakage>.changes
```

# config files

* `/etc/dput.cf`
* `~/.dput.cf`

#  Uploading

## Regarding multi dist uploads

If you are rebuilding the *same source* for another distribution in the same family (such as Ubuntu Xenial, then yakkety), make sure you build the subsequent dists using a tarball of different name. Including the suffix is ideal. This is why you typically see packages marked such as `doom64ex - 0.0.0+git20161128.a43c528~ubuntu16.04.1-1` vs `doom64ex - 0.0.0+git20161128.a43c528~ubuntu16.10-1`. Notice the variants after the tilde.

## Ubuntu
```
dput ppa:<user>/<repo> <package>_source.changes
```

## Debian and other derivitives
Ubuntu does things a bit differently, so you may need to edit your personal config appropriately: 

example
```
[libregeek]
fqdn                    = ppa.launchpad.net
method                  = ftp
incoming                = ~<user>/ubuntu/<repo>
login                   = anonymous
allow_unsigned_uploads  = 0
```

Uploading then is fairly straightforward
```
dput libregeek <package>_source.changes
``

# Links

* https://www.debian.org/doc/manuals/maint-guide/build.en.html
