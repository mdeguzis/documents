<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Backup / Cloning](#backup--cloning)
  - [Create disk image](#create-disk-image)
  - [Watching progress](#watching-progress)
- [See also:](#see-also)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Usage notes for dd

# Backup / Cloning

## Create disk image

1. Boot from a live media.
2. Make sure no partitions are mounted from the source hard drive.
3. Mount the external HD
4. Backup the drive.

```
# dd if=/dev/sdX conv=sync,noerror bs=64K | gzip -c  > /path/to/backup.img.gz
```

If necessary (e.g. when the format of the external HD is FAT32) split the disk image in volumes (see also the split man pages).
```
# dd if=/dev/sdX conv=sync,noerror bs=64K | gzip -c | split -a3 -b2G - /path/to/backup.img.gz
```

If there is not enough disk space locally, you may send the image through ssh:
```
# dd if=/dev/sdX conv=sync,noerror bs=64K | gzip -c | ssh user@local dd of=backup.img.gz
```

5. Save extra information about the drive geometry necessary in order to interpret the partition table stored within the image. The most important of which is the cylinder size.
```
# fdisk -l /dev/sdX > /path/to/list_fdisk.info
```

## Watching progress

Using pv (if available), you can issue a command such as:
```
dd if=/dev/sdX conv=sync,noerror bs=64K | pv -s <DISK_SIGE> | gzip -c  > /path/to/backup.img.gzd if=/dev/sdX conv=sync,noerror bs=64K | pv -s <DISK_SIGE> | gzip -c  > /path/to/backup.img.gz
```

Replace disk size with a human-readable format, such as "100 G".

dd has a decent progress meter:
```
dd status=progress if=/dev/sdX conv=sync,noerror bs=64K | pv -s <DISK_SIGE> | gzip -c  > /path/to/backup.img.gz
```

This will display the total size and rate.

You can also fire up another terminal/TTY and issue
```
watch ls -lah /path/to/backup.img.gz
```

This is a pretty easy way to watch progress. You can also use `pv`.


# See also:

https://github.com/mdeguzis/documents/tree/master/linux-applications/pv

# Links

* https://wiki.archlinux.org/index.php/disk_cloning
