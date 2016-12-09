<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General process with a pbuilder chroot](#general-process-with-a-pbuilder-chroot)
- [Packages with build-indep and build-arch targets](#packages-with-build-indep-and-build-arch-targets)
- [Examples](#examples)
- [Boostrapping for packages](#boostrapping-for-packages)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Helpful hints on backporting Debian packages

# General process with a pbuilder chroot

1. Ensure the source distribution/release chroot is built
2. locate package at packges.debian.org/PKGNAME
2. Locate and download the .dsc file

# Packages with build-indep and build-arch targets

If a pacakge (Qt is a great example), has arch-independent targets, you need to take note that you must build in 2 stages:

1. Build first with `-B` passed to dpkg-buildpackage (for pbuidler, specify `-- --binary-arch`)
2. Build secondly with normal build options.

# Examples

Example when backporting a package that has multiple archives:

Via pdebuild (BUILD_TMP here is set via $HOME/.pbuilderrc):
```
rm -rf $HOME/temp && mkdir $HOME/temp && cd $HOME/temp &&
DSC_URL="target-package.dsc" &&
dget ${DSC_URL} -d && rm -rf result && mkdir result 
sudo -E DIST=brewmaster BULID_TMP=result pdebuild --debuildopts -nc
```

Or, via pbuidler directly

```
sudo -E DIST=brewmaster pbuilder --build --distribution brewmaster --buildresult result --debbuildopts -sa --debbuildopts -nc target-package.dsc
```

# Boostrapping for packages

Some packages require bootstrapping, such as gcc-5. This may require bootstrapping to sucessfully backport the package.

* [Bootstrapping](https://wiki.debian.org/DebianBootstrap)

# Links

* [Building formal backports](https://wiki.debian.org/BuildingFormalBackports)
* [git-pbuilder](https://wiki.debian.org/git-pbuilder)
* [Packaging with git](https://wiki.debian.org/PackagingWithGit)
