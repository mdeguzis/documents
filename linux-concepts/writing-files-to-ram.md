<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How to](#how-to)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# How to

You can mount a tmpfs partititon and write the file there:

```
mount -t tmpfs -o size=500m tmpfs /mountpoint
```

This partition now is limited to 500 MB. If your temporary file grows larger than 500 MB an error will occur: no space left on device. But, it doesn't matter when you specify a larger amount of space than your systems RAM has. tmpfs uses swap space too, so you cannot force a system crash, as opposed to ramfs.

You can now write your file into /mountpoint:

```
command | tee /mountpoint/scriptnameYYYYMMDD.txt
```
