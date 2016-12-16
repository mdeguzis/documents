<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Hooks](#hooks)
- [Note!](#note)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Hooks

```
# Specifies the default location for the user hooks.
# Default is "/usr/lib/pbuilder/hooks"
# HOOKDIR="/path/to/hook/dir"
HOOKDIR="/var/cache/pbuilder/hooks.d"
```

# Note! 
This is a very important part. With hooks you can control the build process in every stage.

The convention of hook files are:

```
X<digit><digit><whatever-else-you-want-as-name>
```

The X defines the hook class followed by 2 digits which define the order of execution within a class.

##Classes	Description

* **A**	Is for --build target. It is executed before build starts; after unpacking the build system, and unpacking the source, and satisfying the build-dependency.
* **B**	s executed after build system finishes building, successfully, before copying back the build result.
* **C**	Is executed after build failure, before cleanup.
* **D**	Is executed before unpacking the source inside the chroot, after setting up the chroot environment.
