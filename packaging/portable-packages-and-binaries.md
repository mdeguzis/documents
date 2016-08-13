# About

Some info on makign distro-agnostic packages

# Static linking

* [Creating-portable-linux-binaries](http://insanecoding.blogspot.com/2012/07/creating-portable-linux-binaries.html)

# Shipping binaries

Linux doesn't pick up libraries in the same folder unless you've built it with rpath set to the current folder or 
have used LD_LIBRARY_PATH to override the rpath setting/ LD_LIBRARY_PATH isn't something you set in your make file,
it's something you add to a launcher script.

In contrast, setting `rpath` would be a compiler flag you add.

## compiler approach

This approach is not as portable, and requiers more effort, due to needed modification of the Makefile or build script.

```
-rpath=dir
      Add a directory to the runtime library search path. This is used
      when linking an ELF executable with shared objects. All -rpath
      arguments are concatenated and passed to the runtime linker, which
      uses them to locate shared objects at runtime.
vs.

-L searchdir
--library-path=searchdir
      Add path searchdir to the list of paths that ld will search for
      archive libraries and ld control scripts.
      
```

Small examples:

```
gcc -Wl,-rpath=dir_to_libs
gcc -o test test.o -L. -lmylib -Wl,-rpath=.
```

## Launch-script approach

```
#!/bin/bash

# Set library path to a blank value to avoid using system libs
LD_LIBRARY_PATH=""

# Launch executable
cd /path/to/my/binary
./my-binary
```

# Why is rpath or -L needed?

"David Carter-Hitchin" <david@carter-hitchin.clara.co.uk> asks on
Fri, 2 Dec 2005 23:47:28 -0000 about -Wl,-rpath versus -L.

The -L option supplies a colon-separated library path that is to be
searched at LINK TIME for libraries. Thus

```
cc -o foo foo.c -L/usr/local/lib -lfoo
```

means that either libfoo.a or libfoo.so should be found in either
/usr/local/lib, or elsewhere in the default search patch (in
GNU/Linux, the directories can be listed in /etc/ld.so.conf, and the
cache updated by running /etc/ldconfig).

Whether the .a or .so form of the library is needed is platform
dependent (e.g., IBM AIX uses only the .a form), and also dependent on
compiler options to select dynamic or static linking.  The default is
normally dynamic linking to save disk space and waste CPU time.

However, this means while that the executable foo may have been
successfully linked against a shared library, at RUN TIME, the
run-time loader looks for it in the default search path, possibly
prefixed by a colon-separated list of libraries supplied by the
LD_LIBRARY_PATH variable.

If, in our example, /usr/local/lib is not part of the default path,
then the run-time loader will not be able to find the shared library,
EVEN THOUGH LINKING SUCCEEDED (because of the -L/usr/local/lib
option).

You can check whether shared libraries can be found by running

```
env -i ldd foo
```

(the "env -i" says to ignore any existing environment variables, such
as LD_LIBRARY_PATH).

For example, on one of my systems, I find

```
% env -i ldd /usr/local/bin/emacs
libXaw3d.so.5 =>         (file not found)
libXmu.so.4 =>   /usr/lib/libXmu.so.4
libXt.so.4 =>    /usr/lib/libXt.so.4
...
```

Notice the "(file not found") line.  That library is actually present
on that system in /usr/local/lib, and I can make it succeed like this:

```
% env -i LD_LIBRARY_PATH=/usr/local/lib ldd /usr/local/bin/emacs
      libXaw3d.so.5 =>         /usr/local/lib/libXaw3d.so.5
    	libXmu.so.4 =>   /usr/lib/libXmu.so.4
...

```

Thus, when shared libraries are present in nondefault directories, you
need to supply an additional linker option, usually -R or -Wl,-rpath=,
with a run-time library path.  Our example above becomes for gcc

```
gcc -o foo foo.c -L/usr/local/lib -lfoo -Wl,-rpath=/usr/local/lib

```

In a Makefile, I would write this as

```
gcc -o foo foo.c -L$(prefix)/lib -lfoo -Wl,-rpath=$(prefix)/lib
```

so that the same library path is used at link time as at run time, and
so that the executable file, foo, records that path.  With GNU
autoconf, the normal condition is that prefix is the root of the file
tree into which you install software locally, so the above command is
fairly typical.  Unfortunately, software developers who have
nondefault library search paths often forget to supply the -Wl,-rpath
or -R options in their Makefiles, with the result that the code builds
and runs at their sites, but not at end user sites.

>From notes that I keep:

```
>> ...
>> Unfortunately, there are at least three incompatible kinds of
>> command-line options that tell the compiler to instruct the linker to
>> save library paths in the executable:
>>
>> 	-Wl,-rpath,/path/to/dir		gcc, g++, FreeBSD, SGI, Sun compilers
>> 	-rpath /path/to/dir		Compaq/DEC, SGI compilers
>> 	-Rdir:dir:dir			Portland Group, Sun compilers
>>
>> Notice that SGI and Sun support two such flavors.
>> ...
```

In my view, there is clearly brain damage here: (1) compiler writers
should have standardized on the same option name for recording the
run-time library path (I'd vote for -R), and (2) the linker should
really record the run-time library path by default, so that -R would
almost never be needed.

Source: https://gcc.gnu.org/ml/gcc-help/2005-12/msg00017.html

# Further reading

* [GCC (GNU) mail thread](https://gcc.gnu.org/ml/gcc-help/2005-12/msg00017.html)
