# About

General notes on LVM managment

# LVM volume creation


## Creating the partition

First, partition the disk. You can use the shell prompt for parted over specifying the commands seperately. The command supplied to mkpart will create a partition that spans the entire disk and will not prompt for filesystem type. If you want to create the file system type ahead of time, you can supply that as an argument following primary.

```
sudo parted /dev/sdb
mklabel gpt
mkpart primary 1 -1
set 1 lvm on
print
```

**Reference notes:**

```
mklabel label-type
mkpart part-type [fs-type] start end
set partition flag state
print  Display the partition table.
```

*TODO* - finish the rest in this section!

# Man pages

* [man pages index [a-z]](http://man7.org/linux/man-pages/dir_all_alphabetic.html)
* [mkfs](http://man7.org/linux/man-pages/man8/mkfs.8.html)
* [parted](http://man7.org/linux/man-pages/man8/parted.8.html)
* [lvcreate](http://man7.org/linux/man-pages/man8/lvcreate.8.html)
* [pvcreate](http://man7.org/linux/man-pages/man8/pvcreate.8.html)
* [pvdisplay](http://man7.org/linux/man-pages/man8/pvdisplay.8.html)
* [pvscan](http://man7.org/linux/man-pages/man8/pvscan.8.html)
* [vgcreate](http://man7.org/linux/man-pages/man8/vgcreate.8.htmle)
