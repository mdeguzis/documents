# Debian-specific

## Hardening

See: https://wiki.debian.org/Hardening

# Debian files

## debian/rules

### Tips

* If you only have one target install/binary, using docs/dirs/install etc., vs package.docs/package.dirs/package.install is not necessary.
* If you only have one target install/binary, having files in debian/package_name or debian/tmp/ will be auto installed by debhelper, unless otherwise overriden.
* 
## debian/install

`dh_install` copies files form`debian/tmp` (or other places) to `debian/pkgname`. If theres only a single binary package, you usually don't need `dh_install`, as you can instruct the upstream build system to install the files to debian/pkgname

See: [5.11 install of debian/other](https://www.debian.org/doc/manuals/maint-guide/dother.en.html#install)

# Resources

* [Debian New Maintainers Guide](https://www.debian.org/doc/manuals/maint-guide/maint-guide.en.pdf)
* [Required files under the debian directory](https://www.debian.org/doc/manuals/maint-guide/dreq.en.html)
* [Other Fils Under the debian Directory](https://www.debian.org/doc/manuals/maint-guide/dother.en.html)
