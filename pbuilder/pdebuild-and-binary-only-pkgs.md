# What happens
You have uploaded "foo-bar_1.0.0+deb8u1" to your repository and are likely using reprepro. You fire off `reprepro processincoming default` and receive this text:

```
File "pool/main/f/foo-bar_1.0.0+deb8u1.debian.tar.gz" is already registered with different checksums!
md5 expected: 97257ae2c5790b84ed7bb1b412f1d518, got: df78f88b97cadc10bc0a73bf86442838
sha1 expected: ae93c44593e821696f72bee4d91ce4b6f261e529, got: d6f910ca5707ec92cb71601a4f4c72db0e5f18d9
sha256 expected: c3fac5ed112f89a8ed8d4137b34f173990d8a4b82b6212d1e0ada1cddc869b0e, got: ebdcc9ead44ea0dd99f2dc87decffcc5e3efaee64a8f62f54aec556ac19d579c
size expected: 2334, got: 2344
There have been errors!
```

# Why this happens
Even if `reprepro remove repo_testing PKGNAME` is issued, the source control / source itself is still indexed in the database.

# What you can do
You have 2 options

1. Bump the package revision on your upload
2. Pass the `-b` option to `dpkg-buildpackage` to build only the binaries and do not include the source code "changes" in the .changes and .dsc files

# SteamOS-Tools-Packaging specific
As of 20160217, almost every build script containts these 3 lines

```
BUILDER="pdebuild"
BUILDOPTS=""
[...]

# build
${BUILDER} ${BUILDOPTS}
```

In this example, using `BUILDOPTS="-b"` will tell `pdebuild` to build a binary-only package.

# For reference:

* [StackOverflow](http://stackoverflow.com/questions/21563872/reprepro-complains-about-the-generated-pbuilder-debian-tar-gz-archive-md5)
* [AskUbuntu](http://askubuntu.com/questions/189926/how-can-i-prevent-dpkg-buildpackage-from-modifying-the-modification-date-of-the)
* [rpki-pbuilder.py example](http://subvert-rpki.hactrn.net/trunk/buildtools/rpki-pbuilder.py)
