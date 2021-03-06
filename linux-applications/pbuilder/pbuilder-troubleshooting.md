<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Having issues with pbuilder?](#having-issues-with-pbuilder)
- [Errors with packaging that contains build profiles/stages](#errors-with-packaging-that-contains-build-profilesstages)
- [reprepro complains about the generated pbuilder md5](#reprepro-complains-about-the-generated-pbuilder-md5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Having issues with pbuilder?

Try using the debug paramater (example):
```
sudo DIST=jessie ARCH=amd64 pbuilder create --debug
```

You could also invoke the `-x` bash option to show debug output from bash itself. pbuilder invokes `.pbuilderrc` with bash.

```
bash -x /usr/sbin/pbuilder create --debug
```
# Errors with packaging that contains build profiles/stages

Often this points to an older version of pbuilder that doesn't interpret stags correctly, such as `<!stage1>`.


# reprepro complains about the generated pbuilder md5

Link:
* [StackOverflow](http://stackoverflow.com/questions/21563872/reprepro-complains-about-the-generated-pbuilder-debian-tar-gz-archive-md5)
* [AskUbuntu](http://askubuntu.com/questions/189926/how-can-i-prevent-dpkg-buildpackage-from-modifying-the-modification-date-of-the)
* [rpki-pbuilder.py example](http://subvert-rpki.hactrn.net/trunk/buildtools/rpki-pbuilder.py)

The third link above notes:

```
# Getting this to work right also required adding:
#
#   DEBBUILDOPTS="-b"
#
# to /etc/pbuilderrc; without this, reprepro (eventually, a year after
# we set this up) started failing to incorporate some of the built
# packages, because the regenerated source packages had different
# checksums than the ones loaded initially.  See:
#
# http://stackoverflow.com/questions/21563872/reprepro-complains-about-the-generated-pbuilder-debian-tar-gz-archive-md5
#
# Putting stuff in ~/.pbuilderrc didn't work with pbuilder-dist when I
# tried it last year, this may just be that sudo isn't configured to
# pass HOME through, thus pbuilder is looking for ~root/.pbuilderrc.
# Worth trying again at some point but not all that critical.
```

Resolution:

Seems to be that you need the following option in `.pbuilderrc`:

```
DEBBUILDOPTS="-b"
```
