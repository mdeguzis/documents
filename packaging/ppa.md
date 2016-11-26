<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [OpenPGP keys](#openpgp-keys)
- [Signing .changes files](#signing-changes-files)
- [config files](#config-files)
- [Uploading](#uploading)
  - [Ubuntu](#ubuntu)
  - [Debian and other derivitives](#debian-and-other-derivitives)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on uploading to PPAs

# OpenPGP keys

For Ubuntu PPAs, ensure your user profile page https://launchpad.net/~<user>/+editpgpkeys lists the appropriate 
keys you have on your host machine that you are signing with

# Signing .changes files

`dpkg-buildpackage` will sign after the package created, unless otherwise told not to. For instance, if using pbuilder, you can use
`debsign` after the package is build, since the build occurs in an chroot, not your host machine. See the man page for `debsign`.
Setting DEBSIGN_KEYID can override the default. 

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
debsign -k <KEY_ID> <pacakage>*.changes
```

# config files

* `/etc/dput.cf`
* `~/.dput.cf`

#  Uploading

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
