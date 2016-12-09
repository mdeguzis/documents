<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Versioning](#versioning)
- [Example with `dpkg --comapare-versions`](#example-with-dpkg---comapare-versions)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful Debian info

# Versioning

* [Versioning](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Version)
* [dpkg --compare-versions](https://manpages.debian.org/cgi-bin/man.cgi?query=dpkg)
 * [Debian handbook, see "GOING FURTHER Comparison of versions"](https://debian-handbook.info/browse/stable/sect.manipulating-packages-with-dpkg.html)

# Example with `dpkg --comapare-versions`

>Since dpkg is the program for handling Debian packages, it also provides the reference implementation of the logic of comparing version numbers. This is why it has a --compare-versions option, usable by external programs (especially configuration scripts executed by dpkg itself). This option requires three parameters: a version number, a comparison operator, and a second version number. The different possible operators are lt (strictly less than), le (less than or equal to), eq (equal), ne (not equal), ge (greater than or equal to), and gt (strictly greater than). If the comparison is correct, dpkg returns 0 (success); if not, it gives a non-zero return value (indicating failure).<sup>[1](https://debian-handbook.info/browse/stable/sect.manipulating-packages-with-dpkg.html)</sup>

```
dpkg --compare-versions 2.7.6+bsos-1 gt 7:2.7.6-0ubuntu0.15.10.1; echo $?
1
```

# References

* [Guidelines for program installation (pingus)](http://pingus.seul.org/~grumbel/tutorials/game_install/install_dirs-2.html)

