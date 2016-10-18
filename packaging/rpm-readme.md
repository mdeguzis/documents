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

# Packaging

* [Packager's Guide](https://docs.fedoraproject.org/en-US/Fedora_Draft_Documentation/0.1/html/Packagers_Guide/)
* [How to create an RPM pacakge](https://fedoraproject.org/wiki/How_to_create_an_RPM_package)
* [Third party repositories](https://fedoraproject.org/wiki/Third_party_repositories)
* [RPM Fusion](http://rpmfusion.org/)
* [OBS (Open Build System)](https://build.opensuse.org/)

# Open Build System

* [Main site](https://build.opensuse.org/)
* [Tutorial](https://en.opensuse.org/openSUSE:Build_Service_Tutorial)

# Misc

* [Working with Kodi and RPM fusion](http://kodi.wiki/view/HOW-TO:Install_Kodi_on_Fedora_23_using_RPMFusion_packages#Configuring_Fedora_.2F_Installing_Dependencies)

# RPM package quick start:

Generating a clean spec file template:

```
rpmdev-newspec <PKG_NAME>
```

# Download sources instead of using something like wget:

```
spectool -g *spec
```

Lint the package:

```
fedpkg --dist f24 lint
```


Building:

```
fedpkg --dist f24 local
```

Building with mock:

```
fedpkg --dist f24 mockbuild
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
