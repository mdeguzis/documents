# About

Some common issues that may arise when packaging

# Vague errors about gcc/clang etc. and "amd64"

Check that you are not using vars that conflict with builder vars. This has happened to me in the past when using pbuilder. Pbuilder makes use of ARCH, when some debian/rules files have used the same var. Using an alternate, or "arch" in debian/rules may help.
