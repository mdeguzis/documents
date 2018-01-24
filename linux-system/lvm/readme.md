<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Command reference](#command-reference)
- [LVM Data volume creation](#lvm-data-volume-creation)
  - [Creating the partition](#creating-the-partition)
  - [Creating the physical volume for LVM](#creating-the-physical-volume-for-lvm)
  - [Assign the created physical volume](#assign-the-created-physical-volume)
  - [Create logical volume for LVM](#create-logical-volume-for-lvm)
  - [Format the LVM partition with a file system](#format-the-lvm-partition-with-a-file-system)
    - [RHEL 6](#rhel-6)
    - [RHEL 7](#rhel-7)
  - [Mounting](#mounting)
- [LVM Data volume addition](#lvm-data-volume-addition)
  - [Using parted](#using-parted)
  - [Resize the physical LVM colume](#resize-the-physical-lvm-colume)
  - [Resize the logical LVM volume](#resize-the-logical-lvm-volume)
  - [Advise the OS to utilize the new space](#advise-the-os-to-utilize-the-new-space)
- [LVM data volume modification](#lvm-data-volume-modification)
  - [Case 1: move/add separate /tmp mount, borrowing space from another physical volume](#case-1-moveadd-separate-tmp-mount-borrowing-space-from-another-physical-volume)
- [Man pages](#man-pages)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

# TEMP
fix up notes from these links

https://www.digitalocean.com/community/tutorials/an-introduction-to-lvm-concepts-terminology-and-operations
See: https://www.techrepublic.com/blog/linux-and-open-source/working-with-physical-volumes-logical-volumes-and-volume-groups-in-lvm/
See: https://siva2009.wordpress.com/2010/08/26/how-to-create-lvm-using-pvcreate-vgcreate-lvcreate-and-lvextend-commands/

# LVM Architecture and Terminology

## LVM Storage Management Structures

LVM functions by layering abstractions on top of physical storage devices. The basic layers that LVM uses, starting with the most primitive, are.

* **Physical Volumes:**  
LVM utility prefix: pv...
Description: Physical block devices or other disk-like devices (for example, other devices created by device mapper, like RAID arrays) are used by LVM as the raw building material for higher levels of abstraction. Physical volumes are regular storage devices. LVM writes a header to the device to allocate it for management.

* **Volume Groups:**  
LVM utility prefix: vg...
Description: LVM combines physical volumes into storage pools known as volume groups. Volume groups abstract the characteristics of the underlying devices and function as a unified logical device with combined storage capacity of the component physical volumes.

* **Logical Volumes:**    
LVM utility prefix: lv... (generic LVM utilities might begin with lvm...)
Description: A volume group can be sliced up into any number of logical volumes. Logical volumes are functionally equivalent to partitions on a physical disk, but with much more flexibility. Logical volumes are the primary component that users and applications will interact with.

Source: https://www.digitalocean.com/community/tutorials/an-introduction-to-lvm-concepts-terminology-and-operations

# LVM Data volume creation

## General

## Basic steps

* Use fdisk (or gdisk, parted, etc.) to create a partition <DISK_DEVICE>.
* Use pvcreate /dev/<DISK_DEVICE> to make the partition a physical volume.
* Run vgcreate mystorage /dev/<DISK_DEVICE> to a volume group called <NAME> using the partition as storage space.
* Run lvcreate … <NAME> for each of the logical volumes you want to create.

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

Check The existing Volumes and their free space. Chances are, you can use free space within a physical volume.
```
$ sudo pvs
  PV         VG       Fmt  Attr PSize     PFree
  /dev/sda2  rhel     lvm2 a--    <19.51g    40.00m
  /dev/sdb1  vg_data1 lvm2 a--  <1024.00g        0
  /dev/sdc1  vg_data2 lvm2 a--  <1024.00g        0
  /dev/sdd1  vg_data1 lvm2 a--     <2.00t        0
  /dev/sde1  vg_data1 lvm2 a--     <3.00t <1022.00g
```

Create the PV
```
sudo pvcreate /dev/sdb
```

After creation, review with `sudo pvdisplay`

## Create the Volume Group

Assign the created physical volume. This should be part of a new volume group so the system knows it's not used for system data, but for applications.

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

Another example:
```
sudo lvcreate -n <LV_NAME> -i 2 -I 4 -L500G <VG_NAME>
```

* `-i`  
Number of stripes
* `-I`  
Stripe size [k|UNIT]
* `-L`  
Size [m|UNIT]
* `VG_NAME`  
The volume group name, such as "vg_data1"


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

# LVM data volume modification

## Case 1: move/add separate /tmp mount, borrowing space from another physical volume

Step 1: Check what is mounted and available:
```
$ sudo lvs -o+stripes

LV VG Attr LSize Pool Origin Data% Meta% Move Log Cpy%Sync Convert #Str
root rhel -wi-ao ---- 4.00g 1
swap rhel -wi-ao ---- 4.00g 1
usr rhel -wi-ao ---- 20.00g 1
var rhel -wi-ao ---- 50.00g 1
```

```
$ sudo pvs

PV VG Fmt Attr PSize PFree
/dev/sda3 rhel lvm2 a-- 111.07g 33.07g
/dev/sdb1 vg_data1 lvm2 a-- 1.09t 807.78g
/dev/sdc1 vg_data1 lvm2 a-- 1.09t 807.78g
```

Step 2: Add `/tmp` mount to `/etc/fstab`

```
$ sudo vi /etc/fstab

# add line:
/dev/mapper/vg_data1-tmp /tmp xfs defaults 1 2
```

3. Create a separate mount volume for /tmp

```
lvcreate -n tmp -i 2 -I 4 -L8G vg_data1
mkfs.xfs /dev/mapper/vg_data1-tmp
mkdir /tmp-old
mv /tmp/ /tmp-old*
mount /tmp
mv /tmp-old/ /tmp*
restorecon -R /tmp
rmdir /tmp-old
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


# Links

* [RHEL (Multipath Devices)](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/DM_Multipath/mpath_devices.html)
