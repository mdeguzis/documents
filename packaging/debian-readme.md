# Hardening

See: https://wiki.debian.org/Hardening

# Modifying the source

* [Chapter 3. Modifying the source](https://www.debian.org/doc/manuals/maint-guide/modify.en.html)

# Debian files

## debian/rules

### Tips

* If you only have one target install/binary, using docs/dirs/install etc., vs package.docs/package.dirs/package.install is not necessary.
* If you only have one target install/binary, having files in debian/package_name or debian/tmp/ will be auto installed by debhelper, unless otherwise overriden.
* 
## debian/install

`dh_install` copies files form`debian/tmp` (or other places) to `debian/pkgname`. If theres only a single binary package, you usually don't need `dh_install`, as you can instruct the upstream build system to install the files to debian/pkgname

>If you need to make changes in the Makefile, you should be careful to support the $(DESTDIR) variable. Although it is unset by default, the $(DESTDIR) variable is prepended to each file path used for the program installation. The packaging script will set $(DESTDIR) to the temporary directory.

>For a source package generating a single binary package, the temporary directory used by the dh_auto_install command will be set to debian/package. [24] Everything that is contained in the temporary directory will be installed on users' systems when they install your package; the only difference is that dpkg will be installing the files to paths relative to the root directory rather than your working directory.

>Bear in mind that even though your program installs in debian/package, it still needs to behave correctly when installed from the .deb package under the root directory. So you must not allow the build system to hardcode strings like /home/me/deb/package-version/usr/share/package into files in the package.

See: [5.11 install of debian/other](https://www.debian.org/doc/manuals/maint-guide/dother.en.html#install)

## debian/watch

See [How to write a good debian/watch easily | Eriberto Blo](http://eriberto.pro.br/blog/?p=1459)

# Resources

* [Debian New Maintainers Guide](https://www.debian.org/doc/manuals/maint-guide/maint-guide.en.pdf)
* [Required files under the debian directory](https://www.debian.org/doc/manuals/maint-guide/dreq.en.html)
* [Other Fils Under the debian Directory](https://www.debian.org/doc/manuals/maint-guide/dother.en.html)
