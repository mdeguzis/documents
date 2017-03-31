<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Version management](#version-management)
  - [automatic package-picking](#automatic-package-picking)
  - [Specify used package versions in the [versions] section of versions.cfg](#specify-used-package-versions-in-the-versions-section-of-versionscfg)
- [Necessary for buildout not to mess up capitalization.](#necessary-for-buildout-not-to-mess-up-capitalization)
  - [Uncomment below (and enable allow-picked-versions)](#uncomment-below-and-enable-allow-picked-versions)
  - [to write out picked versions to a separate file](#to-write-out-picked-versions-to-a-separate-file)
  - [Uncomment to prevent downloading packages](#uncomment-to-prevent-downloading-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Version management
Here are examples of utilizing verison management

##  automatic package-picking

```
newest = false
allow-picked-versions = false
allowed-eggs-from-site-packages = pyzmq
include-site-packages = false
```

## Specify used package versions in the [versions] section of versions.cfg
```
extends = versions.cfg
versions = versions
```

# Necessary for buildout not to mess up capitalization.
```
extensions = buildout-versions
```

## Uncomment below (and enable allow-picked-versions)
## to write out picked versions to a separate file
```
buildout_versions_file = picked_versions.cfg
```

## Uncomment to prevent downloading packages
```
offline = true
```
