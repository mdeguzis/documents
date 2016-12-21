<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Creation](#creation)
- [Applying](#applying)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

General tips on creating, applying, and working with patches.

# Patching (set of files)

Generally, it is always good to edit the original and new file in a clean directory, or in a copy of the origianl source code.


```
source-0.1.0    source-0.1.0.orig
```

Now, edit your file in the source directory, **NOT** the .orig backup folder:

```
vim source-0.1.0/file1
```
             
Create a diff of the file as your patch. Compare your changed file in the new folder, to the clean file in the source-0.1.0.orig directory.

```
diff -uNr source-0.1.0.i.orig source-0.1.0 > mychanges.patch
```

`-u`  
 	output NUM (default 3) lines of unified context  
`-N`  
	treat absent files as empty  
`-r`  
	recursively compare any subdirectories found  

## Example patch:

```
--- openra-20160508.orig/SharpFont.dll.config   2016-09-14 21:06:55.760000000 -0400
+++ openra-20160508/SharpFont.dll.config        2016-09-14 21:08:02.844000000 -0400
@@ -1,7 +1,4 @@
 <?xml version="1.0" encoding="utf-8" ?>
 <configuration>
-       <dllmap dll="freetype6.dll">
-               <dllentry os="linux" dll="libfreetype.so.6" />
-               <dllentry os="osx" dll="/Library/Frameworks/Mono.framework/Libraries/libfreetype.6.dylib" />
-       </dllmap>
+       <dllmap dll="freetype6.dll" os="linux" target="libfreetype.so.6" />
 </configuration>
```

# Patching (one file)


To create a patch for a single file, it is often sufficient to do::

```
SRCTREE= linux
MYFILE=  drivers/net/mydriver.c

cd $SRCTREE
cp $MYFILE $MYFILE.orig
vi $MYFILE	# make your change
cd ..
diff -uNr $SRCTREE/$MYFILE{.orig,} > /tmp/patch
```

The last line brackets are a short form for:
```
diff -uNr $SRCTREE/$MYFILE.orig $SRCTREE/$MYFILE > /tmp/patch
```

# Applying

Since we worked in clean directories, we want to strip the first directory (seen above), so that the patch is relative to where 
`patch` expects it to be. We do this with the `-p1` option. `-p0` will keep the absolute path intact. You would run this from the 
directory where the file to be patch is. The patch itself can be in another directory, so alter your path if desired to `mychanges.patch`.

```
patch -p1 mychanges.patch
```

# Links

* [Submitting Patches to the Linux kernel](https://www.kernel.org/doc/Documentation/SubmittingPatches)
