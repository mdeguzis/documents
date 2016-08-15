# About

Tries to explain how the below are handled:

* override_dh_auto_build-indep:
* override_dh_auto_build-arch:
* override_dh_auto_install-arch:
* override_dh_auto_install-indep:

# Need to know

Consider the [dpkg-buildpackage manpage](http://man7.org/linux/man-pages/man1/dpkg-buildpackage.1.html)

```
       -g     Equivalent to --build=source,all (since dpkg 1.17.11).

       -G     Equivalent to --build=source,any (since dpkg 1.17.11).

       -b     Equivalent to --build=binary or --build=any,all.

       -B     Equivalent to --build=any.

       -A     Equivalent to --build=all.

       -S     Equivalent to --build=source.
```

# Moral of the story,

First go round, use ` dpkg-buildpackage -B.` in your build process. For pbuilder, that would be options of `--debbuildopts -B`

# Explanation

The Difference

The target binary-indep builds all Architecture: all binary packages in your source package. The target binary-arch builds all other packages, either Architecture: any or packages with an explicit architecture list or some architecture wildcards like Architecture: linux-any.

Why?

The distinction of these two paths inside the build process is relevant if you have a source package which contains both kinds of binary packages, architecture-dependent and -independent: The initial build of the package builds both types of binary packages, but every subsequent build on different architectures only needs to builds the architecture-dependent binary packages as you've already built all architecture-independent packages in the first build.

Example

Imagine you have a source package called foo which builds the binary packages foo-programs and foo-data. While the programs in foo-programs need to be compiled (e.g. because of being written in C) and hence the binary package is of Architecture: any, the data files in foo-data (images, translations, help texts, documentation, textures, game maps, etc.) are the same for all architectures, hence it's Architecture: all. Let's say the upstream version of foo is 1.0 and it's the first Debian package revision of that upstream release.

You first build all the packages on the amd64 architecture for 64-bit PCs, you'll get foo-programs_1.0-1_amd64.deb and foo-data_1.0-1_all.deb. But you also want to be able to run it on 32-bit PCs, hence you also need foo-programs_1.0-1_i386.deb. But you don't need a second foo-data_1.0-1_all.deb, so your build process only requires the *-arch targets, e.g. by calling dpkg-buildpackage -B.

Necessity of Explicit Targets

With the minimal dh style debian/rules it may not needed to explicitly specify targets, since many upstream build systems don't make this distinction, but if they do (e.g. by having a separate make target for building the documentation, you can implement that e.g. like this:

```
#!/usr/bin/make -f
%:
        dh $@

override_dh_auto_build-indep:
        $(MAKE) -C docs
(Example taken from the dh(7) man page.)
```