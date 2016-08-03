<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General process with a pbuilder chroot](#general-process-with-a-pbuilder-chroot)
- [Boostrapping for packages](#boostrapping-for-packages)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Helpful hints on backporting Debian packages

# General process with a pbuilder chroot

1. Ensure the source distribution/release chroot is built
2. locate package at packges.debian.org/PKGNAME
2. Locate and download the .dsc file

Example for `rustc`
```
DIST=stretch ARCH=amd64 pbuilder build --debbuildopts "-sa -v1.7.0+bsos1" rust.dsc
```

Example when backporting a package that has multiple archives:

```
rm -rf $HOME/temp && mkdir $HOME/temp && cd $HOME/temp &&
DSC_URL="http://http.debian.net/debian/pool/main/l/llvm-toolchain-3.8/llvm-toolchain-3.8_3.8.1-4.dsc" &&
dget ${DSC_URL} -d && rm -rf result_dir && mkdir result_dir && sudo -E DIST=brewmaster pbuilder --build --distribution brewmaster --buildresult result_dir --debbuildopts -sa --debbuildopts -nc llvm-toolchain-3.8_3.8.1-4.dsc
```

The current `generic-building/backport-debian-pkg.sh` does not support multiple archives yet.  

**Do not** set BUILD_DIR above manually, as this conflicts with some packages, such as "llvm-toolchain". Instead, use `--buildresult /path/to/result_dir`.

# Boostrapping for packages

Some packages require bootstrapping, such as gcc-5. This may require bootstrapping to sucessfully backport the package.

* [Bootstrapping](https://wiki.debian.org/DebianBootstrap)

# Links

* [Building formal backports](https://wiki.debian.org/BuildingFormalBackports)
* [git-pbuilder](https://wiki.debian.org/git-pbuilder)
* [Packaging with git](https://wiki.debian.org/PackagingWithGit)
