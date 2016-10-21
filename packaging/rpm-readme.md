<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Packaging](#packaging)
- [Open Build System](#open-build-system)
- [Misc](#misc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Info for items specific to The Linux distirbution, Fedora.

# CentOS-specific

* [centpkg (early stages)](https://wiki.centos.org/HowTos/Centpkg)

# Packaging

## General

* [How to create an RPM pacakge (fedora)](https://fedoraproject.org/wiki/How_to_create_an_RPM_package)
* [How to create an RPM package (tldp)](http://www.tldp.org/HOWTO/RPM-HOWTO/build.html)
* [Man page rpmbuild](http://www.rpm.org/max-rpm-snapshot/rpmbuild.8.html)
* [OBS (Open Build System)](https://build.opensuse.org/)
* [Packager's Guide](https://docs.fedoraproject.org/en-US/Fedora_Draft_Documentation/0.1/html/Packagers_Guide/)
* [RPM Fusion](http://rpmfusion.org/)
* [Setup packaging environment (CentOS)](https://wiki.centos.org/HowTos/SetupRpmBuildEnvironment)

# Man pages

* [spectool](http://www.unix.com/man-page/centos/1/spectool/)

## spec files

 * [Macros (Fedora docs)](https://fedoraproject.org/wiki/Packaging:RPMMacros?rd=Packaging/RPMMacros)
 * [Macros (rpm.org)](http://www.rpm.org/wiki/PackagerDocs/Macros)
 * [Spec file macros](http://www.rpm.org/max-rpm/s1-rpm-specref-macros.html)
 * [Spec file tags (rpm.org)](http://rpm.org/api/4.4.2.2/specfile.html)
 * [Sources](https://fedoraproject.org/wiki/Packaging:SourceURL?rd=Packaging/SourceURL)

# Open Build System

* [Main site](https://build.opensuse.org/)
* [Tutorial](https://en.opensuse.org/openSUSE:Build_Service_Tutorial)

# Mock-specific

* See [documents/centos-fedora-rhel/mock](https://github.com/ProfessorKaos64/documents/blob/master/centos-fedora-rhel/mock.md)

Example mock build with `rpmbuild` (see `/etc/mock`):

```
mock -r centos-7-x86_64 --spec=component.spec --sources=. --resultdir=mock/result --buildsrpm
```

# Misc

* [Working with Kodi and RPM fusion](http://kodi.wiki/view/HOW-TO:Install_Kodi_on_Fedora_23_using_RPMFusion_packages#Configuring_Fedora_.2F_Installing_Dependencies)

# RPM package quick start:

## Generating spec file templates

Generating a clean spec file template:

```
rpmdev-newspec <PKG_NAME>
```

## Sources

It is good practice to download sources properly with `spectool`:
```
spectool -R -g *spec
```

`-g` - gets the sources/patches that are listed with a URL
`-R` - download into rpm's %{_sourcedir}.

## Building

Building locally:

```
fedpkg --dist f24 local
```

Building with mock (fedora):

```
fedpkg --dist f24 mockbuild
```

Building with mock (CentOS or RHEL):

```
mock -r <CONFIG_FILE_IN_ETC_MOCK> rebuild <PKG.src.rpm>
```

## Changelog

Manual:
```
* date Packager's Name <packager's_email> version-revision
- Summary of changes
```

Automatic:
```
rpmdev-bumpspec --comment=summary of changes --userstring=Packager's Name <packager's_email> spec file 
```

## Review

Lint the package:

Fedora
```
fedpkg --dist f24 lint
```

CentOS/RHEL
```
rpmlint -i <PACKAGE>.spec
```

Using fedora-revew:

```
rm -rf *rpm results*
fedpkg --dist f24 <PKG_NAME>
fedora-review -n <PKG_NAME>
```

Unpacking an RPM package:

```
 rpm2cpio <PACKAGE> | cpio -id 
 ```
