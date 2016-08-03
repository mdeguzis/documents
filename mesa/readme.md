<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Commands](#commands)
- [Common notes](#common-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info about the mesa graphics stack.

# Commands

Basic command:
```
glxinfo
```

OpenGL info:
```
glxinfo | grep -i opengl
```

# Common notes

* Mesa provides the client side OpenGL interface for the open source GPU drivers based on the DRI2/DRM architecture. Or in other words: It's also a part of a driver. If you've got the proprietary drivers from NVidia or AMD installed you don't need Mesa. If you want to use the open source drivers (nouveau, radeon, radeonhd, intel) you need Mesa.
