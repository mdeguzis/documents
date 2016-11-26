<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Resizing dynamic VDI disk image](#resizing-dynamic-vdi-disk-image)
  - [Step 1:](#step-1)
  - [Step 2:](#step-2)
- [Resizing fixed VDI disk image](#resizing-fixed-vdi-disk-image)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

VirtualBox tips and tricks

# Resizing dynamic VDI disk image

Resizing **does not work** if the guest has *snapshots* (prior to version 4.3.*) nor will it work on *Fixed drives*.

## Step 1:

Note: if the path has spaces in it you will need to wrap the path in quotes.
   
Use the following command to increase the size of the drive:

```
VBoxManage modifyhd <absolute path to file> --resize <size in MB>
````

Example: I have a 10GB drive that I want to be 20GB the command would be.

```
VBoxManage modifyhd <absolute path including the name and extension> --resize 20480
```

## Step 2:

Extend the primary partition to include the new drive space. Download the Gparted live cd or what ever partition manager program you wish and mount it to the guests virtual CD and boot the guest.
From here you can expand the primary partition to use the new space

# Resizing fixed VDI disk image

Resizing of fixed VDIs or VHDs is not directly supported, nor is resizing of formats other than VHD/VDI. Nor is it easy to resize disks which are part of a snapshot chain. However, all of these problems are easily addressed if you clone the disk to a supported format first, using :-
(fields in brackets are placeholders which should be replaced with actual filenames, the brackets are not literal)

```
VBoxManage clonehd <infilename or UUID> <outfilename> --format VDI --variant Standard
```

You can then resize the resulting dynamic VDI using "VBoxManage modifyhd" as described above.

