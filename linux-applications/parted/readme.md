<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Partitioning a drive](#partitioning-a-drive)
  - [Listing](#listing)
  - [Creating the partition](#creating-the-partition)
  - [Create the partition](#create-the-partition)
- [Format the drive](#format-the-drive)
- [Labeling the drive](#labeling-the-drive)
  - [Ext files sytems](#ext-files-sytems)
  - [FAT32](#fat32)
- [Attaching a drive using fstab](#attaching-a-drive-using-fstab)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for using parted

# Partitioning a drive

## Listing

Listing drives:

```
# fdisk
fdisk -l 

# lsblk
lsblk
```

The new drive added is listed as `/dev/sde`

```
mikeyd@archboxmtd ~ $ lsblk
NAME                     MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sdf                        8:80   0   1.8T  0 disk 
└─sdf1                     8:81   0   1.8T  0 part /mnt/backup_drive
loop1                      7:1    0     2G  0 loop 
└─docker-8:2-918358-pool 254:0    0   100G  0 dm   
sdd                        8:48   0 596.2G  0 disk 
└─sdd1                     8:49   0 596.2G  0 part /mnt/bluray_archive
sdb                        8:16   0   1.8T  0 disk 
└─sdb1                     8:17   0   1.8T  0 part /mnt/server_media_x
sr0                       11:0    1     2K  0 rom  
sde                        8:64   0 931.5G  0 disk 
loop0                      7:0    0   100G  0 loop 
└─docker-8:2-918358-pool 254:0    0   100G  0 dm   
sdc                        8:32   0 465.8G  0 disk 
└─sdc1                     8:33   0 465.8G  0 part /mnt/dvd_archive
sda                        8:0    0 223.6G  0 disk 
├─sda4                     8:4    0 115.7G  0 part /home
├─sda2                     8:2    0   100G  0 part /
├─sda3                     8:3    0   7.9G  0 part [SWAP]
└─sda1                     8:1    0  1007K  0 part 
```

start parted
```
sudo parted /dev/sde
```

## Creating the partition

Print the table for review
```
print
```

If the drive not initialized, you'll likely see similar output:
```
Error: /dev/sde: unrecognised disk label
Model: ATA Samsung SSD 850 (scsi)                                         
Disk /dev/sde: 1000GB
Sector size (logical/physical): 512B/512B
Partition Table: unknown
Disk Flags
```

Make a new partition table (see `help mklabel` for options). 
You could go with a label type of `dos`, but it is suggested you use `gpt` to allow disk sizes > 2 TB.

```
(parted) mklabel gpt
Warning: The existing disk label on /dev/sde will be destroyed and all data on this disk will be lost. Do you want to continue?
Yes/No? Yes 
```

You switch the unit to GB / TB to make things a bit easier:
```
unit TB
```

Print the disk table again, you'll notice the change:
```
(parted) print                                                            
Model: ATA Samsung SSD 850 (scsi)
Disk /dev/sde: 1.00TB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags: 
```

## Create the partition


To use all of the disk size, use 0 at both start and end markers:
```
mkpart primary ext4 0 0
```

This is equivalent to:
```
mkpart primary ext4 0.00TB 1.00TB
```

You could also specify percent:
```
mkpart primary ext4 1 100%
```
This is 1 MiB to 100%

Now,exit parted with the `quit` command

#  Format the drive

The most basic task now, is to format the drive with a file system. It is recommended to use the -m 2 option when 
formatting ext volumes on Linux so that only 2% of space is reserved for superuser. The default of 
5% can waste a lot of space on modern disk sizes, but this can be changed later if forgotten. 
The -m option is not documented in the man page for mkfs, but mkfs.ext4 only. man mkfs.ext4 usually 
redirects to the mk2fs man page.

ext4
```
sudo mkfs.ext4 -m 2 /dev/sde
```

vfat
```
sudo mkfs.vfat -F 32 /dev/sde
```

* `-F` FAT-SIZE - Specifies  the type of file allocation tables used (12, 16 or 32 bit).  If nothing is specified, mkfs.fat will automatically select between 12, 16 and 32 bit, whatever fits better for the filesystem size.

You may see:
```
/dev/sde contains `DOS/MBR boot sector; partition 1 : ID=0xee, start-CHS (0x0,0,1), end-CHS (0x3ff,254,63), startsector 1, 1953525167 sectors, extended partition table (last)' data
Proceed anyway? (y,n) 
```

If it is a new drive, answer yes.

# Labeling the drive

## Ext files sytems

Example
```
sudo e2label /dev/sda1
```

## FAT32

Check the label
```
sudo mlabel -i <device> -s ::
```

Create the label:
```
sudo mlabel -i <device> ::<label>
```

# Attaching a drive using fstab

Now, attach the drive in `/etc/fstab`. You will want to use the UUID of the drive. The advantage of using the 
UUID is that it is independent from the actual device number the operating system gives your hard disk. 
Image you add another hard disk to the system, and for some reason the OS decides that your old disk is now 
sdb instead of sba. Your boot process would be screwed up if fstab would point to the device name. However, 
in case of the UUIDs, it would be fine.

Obtain the UUID:
```
blkid /dev/sde
```

Add the entry ([list of mount optoins](http://man7.org/linux/man-pages/man8/mount.8.html#FILESYSTEM-INDEPENDENT_MOUNT%20OPTIONS) to [fstab](https://wiki.archlinux.org/index.php/Fstab).
```
UUID=2e6fbb0e-8a4a-4149-a725-6b541ef7bf74 /mnt/server_media_y ext4 defaults,discard 0 0
```

defaults consist of:
```
Use  the  default  options: rw, suid, dev, exec, auto, nouser, and async.
```
# Links

* [GNU user manual](https://www.gnu.org/software/parted/manual/parted.html)
* [Using parted with drives over 2 TB](https://www.cyberciti.biz/tips/fdisk-unable-to-create-partition-greater-2tb.html)
