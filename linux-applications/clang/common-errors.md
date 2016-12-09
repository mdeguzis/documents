<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [error: debug information for auto is not yet supported](#error-debug-information-for-auto-is-not-yet-supported)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# error: debug information for auto is not yet supported

```
You can observe the problem by attempting to compile Cap'n Proto from
source code (https://capnproto.org/capnproto-c++-0.5.3.tar.gz) with the
following configure invocation:

    ./configure CXX=clang++ CXXFLAGS='-std=gnu++1y -g'

The error only occurs in C++14 mode (e.g. -std=gnu++1y or -std=c++14), not
in C++11 mode. The code compiles successfully in C++11 mode.
```

souce: [Debian bug tracker](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=800483)
