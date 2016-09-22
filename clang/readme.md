<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Complete list of flags](#complete-list-of-flags)
- [Use clang vs. gcc](#use-clang-vs-gcc)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Info for clang

# Complete list of flags

```
clang -cc1 --help
```

# Use clang vs. gcc

```
SET (CMAKE_C_COMPILER             "/usr/bin/clang")
SET (CMAKE_C_FLAGS                "-Wall -std=c99")
SET (CMAKE_C_FLAGS_DEBUG          "-g")
SET (CMAKE_C_FLAGS_MINSIZEREL     "-Os -DNDEBUG")
SET (CMAKE_C_FLAGS_RELEASE        "-O4 -DNDEBUG")
SET (CMAKE_C_FLAGS_RELWITHDEBINFO "-O2 -g")

SET (CMAKE_CXX_COMPILER             "/usr/bin/clang++")
SET (CMAKE_CXX_FLAGS                "-Wall")
SET (CMAKE_CXX_FLAGS_DEBUG          "-g")
SET (CMAKE_CXX_FLAGS_MINSIZEREL     "-Os -DNDEBUG")
SET (CMAKE_CXX_FLAGS_RELEASE        "-O4 -DNDEBUG")
SET (CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O2 -g")

SET (CMAKE_AR      "/usr/bin/llvm-ar")
SET (CMAKE_LINKER  "/usr/bin/llvm-ld")
SET (CMAKE_NM      "/usr/bin/llvm-nm")
SET (CMAKE_OBJDUMP "/usr/bin/llvm-objdump")
SET (CMAKE_RANLIB  "/usr/bin/llvm-ranlib")

```

# Builds with linking targeting GNU C++ or LLVM C++

See: standards.md in this directory. You may have to change what C++ standard you are using, depending on how the project is designed. Changes are stdc++ will work fine in most cases. However, this is not always the case. You will need `libc++-dev` on Debian systems to make use of `-stdlib=libc++` for CMake builds.

```
cmake -DCMAKE_CXX_FLAGS="-O2 -g -stdlib=libc++"
```

* [Discussion thread 1](http://stackoverflow.com/questions/14972425/should-i-use-libc-or-libstdc)

Reference: [Stackoverflow](http://stackoverflow.com/questions/7031126/switching-between-gcc-and-clang-llvm-using-cmake)

# Links

* [Clang manual (4.0)](http://clang.llvm.org/docs/UsersManual.html)
* [Feature parity](http://clang.llvm.org/cxx_status.html)
