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
DSC_URL="http://http.debian.net/debian/pool/main/l/llvm-toolchain-3.8/llvm-toolchain-3.8_3.8-2.dsc"
dget ${DSC_URL} && rm -rf result/* && mkdir result && sudo -E BUILD_DIR=result/ DIST=brewmaster STEAMOS_TOOLS_BETA_HOOK="true" pbuilder --build --distribution=brewmaster --debbuildopts -sa --debbuildopts -nc llvm-toolchain-3.8_3.8-2.dsc
```

The current `generic-building/backport-debian-pkg.sh` does not support multiple archives yet.


# Links

* [Building formal backports](https://wiki.debian.org/BuildingFormalBackports)
* [git-pbuilder](https://wiki.debian.org/git-pbuilder)
* [Packaging with git](https://wiki.debian.org/PackagingWithGit)
