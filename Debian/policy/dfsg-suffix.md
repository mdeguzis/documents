<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [What does dfsg in the package name mean?](#what-does-dfsg-in-the-package-name-mean)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What does dfsg in the package name mean?

>dfsg is a conventional way of naming a package, when upstream software was repackaged, because it contains some non-free elements. 
>The changes should be documented in README.Debian-source. The recommended way of naming a package with the 'dfsg' bit is:

```
<UPSTREAM VER>+dfsg-<DEBIAN VER>
```

>For example: I have packaged foobar application which has just released version 1.2.3. 
> Normally the package name would be: abc_1.2.3-1 - and it was packaged as such. I have then discovered 
> that the package contains some files that can not be distributed with the main Debian repository. 
> I have removed them from source package (from .orig.tar.gz) and released new package: abc_1.2.3+dfsg-1. 
>Later on, I have found even more files that should be removed. I did that and released abc_1.2.3+dfsg2-1.

Source: [Debian mentors](https://wiki.debian.org/DebianMentorsFaq#What_does_dfsg_in_the_package_name_mean.3F)
