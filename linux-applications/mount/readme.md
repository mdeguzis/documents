<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mount USB as rw](#mount-usb-as-rw)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mount USB as rw

```
# one way
 mount -t vfat  /dev/sda2 /media/bigdrive -o rw,umask=000
 
 # another way
 mount -o umask=0,uid=nobody,gid=nobody /dev/something /mnt/somewhere
 ```
