# About

Some notes on fstab

# Structure

```
[Device] [Mount Point] [File System Type] [Options] [Dump] [Pass]
```

 Fields                | Description 
 --------------------- | -------------------
 \<device\>            | The device/partition (by /dev location or UUID) that contain a file system.
 \<mount point\>       | The directory on your root file system (aka mount point) from which it will be possible to access the content of the device/partition (note: swap has no mount point). Mount points should not have spaces in the names.
 \<file_system_type\>  | Type of file system (see LinuxFilesystemsExplained).
 \<options\>           | Mount options of access to the device/partition (see the man page for mount).
 \<dump\>              | Enable or disable backing up of the device/partition (the command dump). This field is usually set to 0, which disables it.
 \<pass num\>          | Controls the order in which fsck checks the device/partition for errors at boot time. The root device should be 1. Other partitions should be 2, or 0 to disable checking.

# Example

```
/path/to/drive_partition    /path/to/my_drive_data    FS-type    defaults    1 2
```

# Mounting

Simple mounting of device

```
sudo mount /my_drive_data
```

# Mount all devices

```
sudo moount -a
```
