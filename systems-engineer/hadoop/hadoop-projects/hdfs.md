<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Features](#features)
- [Namenode](#namenode)
- [HDFS shell](#hdfs-shell)
  - [hadoop fs, hadoop dfs, and hdfs dfs](#hadoop-fs-hadoop-dfs-and-hdfs-dfs)
  - [file and folder management](#file-and-folder-management)
      - [Removing folder](#removing-folder)
  - [Notable examples](#notable-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

A single physical machine gets saturated with its storage capacity as data grows. With this growth comes the impending need to partition your data across separate machines. This type of File system that manages storage of data across a network of machines is called a Distributed File System. HDFS is a core component of Apache Hadoop and is designed to store large files with streaming data access patterns, running on clusters of commodity hardware.

# Features

* Distributed file system across multiple servers
* Can scale up to 200 PB / 4500 servers on a single cluster
* NameNaode manages cluster metadata 
* DataNodes store the data

# Namenode

The NameNode does not directly send requests to DataNodes. It sends instructions to the DataNodes by replying to heartbeats sent by those DataNodes. The instructions include commands to:

* replicate blocks to other nodes,
* remove local block replicas,
* re-register and send an immediate block report, or
* shut down the node.

# HDFS shell

* [HDFS Commands manual](https://hadoop.apache.org/docs/r2.7.3/hadoop-project-dist/hadoop-hdfs/HDFSCommands.html)
* [HDFS filesystem shell commands](https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-common/FileSystemShell.html)
* [HDFS Quota Management](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsQuotaAdminGuide.html)

## hadoop fs, hadoop dfs, and hdfs dfs

FS relates to a generic file system which can point to any file systems like local, HDFS etc. So this can be used when you are dealing with different file systems such as Local FS, HFTP FS, S3 FS, and others
```
hadoop fs {args}
```

dfs is very specific to HDFS. would work for operation relates to HDFS. This has been deprecated and we should use hdfs dfs instead.
```
hadoop dfs <args>
```

same as 2nd i.e would work for all the operations related to HDFS and is the recommended command instead of hadoop dfs

```
hdfs   dfs <args>
```

Below is the list categorized as HDFS commands.

**hdfs commands**
```
namenode|secondarynamenode|datanode|dfs|dfsadmin|fsck|balancer|fetchdt|oiv|dfsgroups
```

So even if you use Hadoop dfs , it will look locate hdfs and delegate that command to hdfs dfs

## file and folder management

#### Removing folder

Simple removal:
```
sudo -u hdfs hadoop fs -rm -r /path/to/folder
```

Permenant removal (skips trash)
```
# Usage: hdfs dfs -rmr [-skipTrash] URI [URI …]
sudo -u hdfs hadoop fs -rmr -skipTrash /path/to/folder
```

## Notable examples

removing folder

```
sudo -u hdfs hdfs dfs -rm -r /user/testuser1
```

if you somehow created a user dir with a new line...

```
# verify
sudo -u hdfs hdfs dfs -find /user -name "*testuser1\n"

# Remove
sudo -u hdfs hdfs dfs -rm -r /user/"*testuser1\n"
```
