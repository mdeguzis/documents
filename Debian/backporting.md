# About
Helpful hints on backporting Debian packages

# General process with a pbuilder chroot

1. Ensure the source distribution/release chroot is built
2. locate package at packges.debian.org/PKGNAME
2. Locate and download the .dsc file

Exampel for `rustc`
```
DIST=stretch ARCH=amd64 pbuilder build --debbuildopts "-sa -v1.7.0+bsos1" rust.dsc
```

# Links

* [Building formal backports](https://wiki.debian.org/BuildingFormalBackports)
