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
