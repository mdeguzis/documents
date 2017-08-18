<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Information gathering](#information-gathering)
  - [Partition block size](#partition-block-size)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Items of iterest around disks/SSD/storage

# Information gathering

## Partition block size

Returns size in Bytes
```
# sudo blockdev --getbsz <PARTITION>
sudo blockdev --getbsz /dev/sda
```

You can also check a file on that file system with stat:
```
stat .bash_history
  File: ‘.bash_history’
  Size: 100             Blocks: 8          IO Block: 4096   regular file
```
Note the "IO Block" above.

Some filesystem's have specific tools. Here is the example for XFS:
```
xfs_info /dev/mapper/rhel-root
meta-data=/dev/mapper/rhel-root  isize=256    agcount=8, agsize=131008 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=0        finobt=0 spinodes=0
data     =                       bsize=4096   blocks=1048064, imaxpct=25
         =                       sunit=64     swidth=64 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
log      =internal               bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=64 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```
Take note of the "data row" bsize.
