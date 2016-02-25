# About
Useful tips and tricks for packaging under multiarch

# Links
* [Debian Multiarch Implementation](https://wiki.debian.org/Multiarch/Implementation)

# Multiarch
There are two approaches:

## dh-exec. 
This is neat, standard, flexible for other substitution uses, and recommended unless your package is a 1.0 format source package and cannot be converted. Build-depend on dh-exec (>=0.3), debhelper (>=9). Make the .install or .links file executable, set debhelper compat level to 9, add the dh-exec shebang line and use ${DEB_HOST_MULTIARCH} as needed.

```
#! /usr/bin/dh-exec
usr/lib/${DEB_HOST_MULTIARCH}/libpaper.so.* lib/${DEB_HOST_MULTIARCH}
```

## debian/rules
Generate debian/*.install from debian/*.install.in. Substitute @DEB_HOST_MULTIARCH@ in the rule. If you do not have an install: target, you will need to do this at the beginning of your binary/binary-indep/binary-arch target.) You should then also clean up the generated file(s) in the clean target, or using debian/clean. If using CDBS do the substitution in the common-install-arch:: target. The substitution rules would be something like:

```
debian/%.install: debian/%.install.in
+       sed 's/@DEB_HOST_MULTIARCH@/$(DEB_HOST_MULTIARCH)/g' $< > $@
```
