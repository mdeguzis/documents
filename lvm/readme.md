# About

General notes on LVM managment

# Command reference

* mkfs
* [mkfs.ext4/mk2fs](http://man7.org/linux/man-pages/man8/mke2fs.8.html)
* [parted](http://man7.org/linux/man-pages/man8/parted.8.html)
* [lvcreate](http://man7.org/linux/man-pages/man8/lvcreate.8.html)
* [pvcreate](http://man7.org/linux/man-pages/man8/pvcreate.8.html)
* [pvdisplay](http://man7.org/linux/man-pages/man8/pvdisplay.8.html)
* [pvscan](http://man7.org/linux/man-pages/man8/pvscan.8.html)
* [vgcreate](http://man7.org/linux/man-pages/man8/vgcreate.8.htmle)

# LVM Data volume creation

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

## Creating the physical volume for LVM

```
sudo pvcreate /dev/sdb
```

After creation, review with `sudo pvdisplay`

## Assign the created physical volume

This should be part of a new volume group so the system knows it's not used for system data, but for applications.

```
sudo vgcreate vg_data_1 /dev/sdb
```

After creation, review with `sudo pvdisplay`

## Create logical volume for LVM

```
sudo lvcreate -n bulk_data_1 -l+100%FREE vg_data_1
```

**Reference notes:**

```
 -n|--name LogicalVolume{Name|Path}
 -l|--extents LogicalExtentsNumber[%{VG|PVS|FREE|ORIGIN}]
```

## Format the LVM partition with a file system


### RHEL 6

```
sudo mkfs.ext4 -m 2 /dev/vg_data1/bulk_data_1
```

* Note:  It is recommended to use the `-m 2` option when formatting ext volumes on Linux so that only 2% of space is reserved for superuser. The default of 5% can waste a lot of space on modern disk sizes, but this can be changed later if forgotten. The `-m` option is not documented in the man page for `mkfs`, but `mkfs.ext4` only. `man mkfs.ext4` usually redirects to the `mk2fs` man page.

**Reference notes:**

```
-m reserved-blocks-percentage
```

### RHEL 7

RHEL 7 has XFS, a 64-bit, high-performance JFS. Ideally, use XFS for your mount points, unless otherwise desired.

```
sudo mkfs.xfs /dev/mapper/vg_data_1-bulk_data_1
```

**Reference notes:**

```
vg_data_1 - Our LVM volume group
bulk_data_1 - Our LVM volume itself
```

## Mounting

See [documents/system/fstab.md](https://github.com/ProfessorKaos64/documents/blob/master/system/fstab.md)

# LVM Data volume addition

Check available space first with:

```
df -h
pvdisplay
```

## Using parted

```
sudo parted /dev/sdb
```

It is good practice to use sectors, or unit `s` to work with the volume. This ensures starting sectors are accurate.

```
unit s
print

Number  Start  End        Size       File system  Name     Flags
 1      2048s  62912511s  62910464s               primary  lvm
```

Resize the partition. **Important:** Removing the partition and recreating it will not destroy it, as long as everything by the new end sectors match the previous entry when print was issued. Remember, the `-1` commmand option supplied to mkpart will create a partition that spans the entire disk and will not prompt for filesystem type.

```
rm 1
mkpart primary 2048s -1
set 1 lvm on
print

Number  Start  End        Size       File system  Name     Flags
 1      2048s  67108830s  67106783s               primary  lvm
 
quit
```

If any warnings present themselves about the kernel failing to read the partition table until a reboot occurs, you will need to restart the system. It is very important to verify, **before rebooting**, that the Start, Number, Name, and flags match the first entry before manipulating the volume. 

## Resize the physical LVM colume

Now that the parition is resized, it needs to reflect the LVM volume.

```
sudo pvresize /dev/sdb1
sudo pvdisplay
```

## Resize the logical LVM volume


```
lvdisplay
```

Advise the LV to use all the new available space:

```
sudo lvresize -l+100%FREE /dev/vg_volume_name/volume_name_num
```

## Advise the OS to utilize the new space

Ext 2/3/4 systems can make use of resize2fs:

```
sudo resize2fs  /dev/vg_volume_name/volume_name_num
```

Review:

```
df -h
```

XFS systems:

```
xfs_growfs
```

# Man pages

* [man pages index [a-z]](http://man7.org/linux/man-pages/dir_all_alphabetic.html)
* [mkfs](http://man7.org/linux/man-pages/man8/mkfs.8.html)
* [mkfs.ext4/mk2fs](http://man7.org/linux/man-pages/man8/mke2fs.8.html)
* [parted](http://man7.org/linux/man-pages/man8/parted.8.html)
* [lvcreate](http://man7.org/linux/man-pages/man8/lvcreate.8.html)
* [pvcreate](http://man7.org/linux/man-pages/man8/pvcreate.8.html)
* [pvdisplay](http://man7.org/linux/man-pages/man8/pvdisplay.8.html)
* [pvscan](http://man7.org/linux/man-pages/man8/pvscan.8.html)
* [vgcreate](http://man7.org/linux/man-pages/man8/vgcreate.8.htmle)
