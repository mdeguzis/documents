<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Features](#features)
- [Namenode](#namenode)
- [HDFS shell](#hdfs-shell)
  - [hadoop fs, hadoop dfs, and hdfs dfs](#hadoop-fs-hadoop-dfs-and-hdfs-dfs)
  - [file and folder management](#file-and-folder-management)
    - [List storage summary, sorted](#list-storage-summary-sorted)
    - [Removing folder](#removing-folder)
  - [Notable examples](#notable-examples)
- [Heap Usage](#heap-usage)
  - [Heap Usage](#heap-usage-1)
  - [Configuration gotchas](#configuration-gotchas)
- [Troubleshooting](#troubleshooting)
  - [Benchmark HDFS speed](#benchmark-hdfs-speed)

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

### List storage summary, sorted

```
sudo -u hdfs hadoop fs -du -h -s /user/* | sed 's/ //' | sort -h
```

### Removing folder

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

# Heap Usage

## Heap Usage

If an alert states that the percentage of heap used is too high, then it's possible that this is just a natural consequence of the way the JVM manages the heap and reports its usage. It might not be a real operational problem. 0.5 M blocks on a DataNode is not necessarily too large.

As objects are allocated, they'll fill the heap. Many objects turn out to be short-lived and get garbage collected relatively quickly. For longer-lived objects, they might not get cleared until the heap is very highly consumed and the JVM decides to trigger a full garbage collection. As far as measurement of the heap usage, this can look like a sawtooth pattern if you can imagine a plot of heap usage over time.

Sometimes a JVM will just hover reporting a high proportion of its heap used. This can happen if there were a large number of long-lived objects that couldn't be collected quickly, but there isn't quite enough new object allocation activity happening right now to trigger the full garbage collection that would bring the reported usage back down. One way to test this theory is to trigger a full garbage collection manually on one of the DataNodes, such as by running this command on the DataNode's PID:

```
jcmd <PID> GC.run
```

If the reported heap usage drops significantly after running this command, then that validates the above theory.

A possible way to "stay ahead" of this problem and do full garbage collections more frequently is to add the following garbage collection options to HADOOP_DATANODE_OPTS:

```
-XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=<percent>
```

The typical value for `<percent>` is 70. In some cases, this may need tuning to find the optimal value, but in practice, I have seen 70 work well almost always.

If you're interested in more background on garbage collection, then you might want to read [NameNode Garbage Collection Configuration: Best Practices and Rationale](https://community.hortonworks.com/content/kbentry/14170/namenode-garbage-collection-configuration-best-pra.html). This article is admittedly focused on the NameNode instead of the DataNode, but much of the background information on garbage collection and configuration is applicable to any JVM process.

* [Namendoe heap size formula](https://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.3.6/bk_installing_manually_book/content/ref-80953924-1cbf-4655-9953-1e744290a6c3.1.html)
* [Datanode heap size formula]


## Configuration gotchas

* `totalMemory()` Returns the total amount of memory in the Java virtual machine.
* `maxMemory()` Returns the maximum amount of memory that the Java virtual machine will attempt to use

Max is going to be the `-Xmx` parameter from the service start command. The total memory main factor is the number of blocks in your HDFS cluster. The namenode requires ~150 bytes for each block, +16 bytes for each replica, and it must be kept in live memory. So a default replication factor of 3 gives you 182 bytes, and you have 7534776 blocks gives about 1.3GB. Plus all other non-file related memory in use in the namenode, 1.95GB sounds about right. I would say that your HDFS cluster size requires a bigger namenode, more RAM. If possible, increase namenode startup -Xmx. If maxed out, you'll need a bigger VM/physical box.

# Troubleshooting

## Benchmark HDFS speed

```
date && hadoop fs -ls /user &>/dev/null && date
```

## Max open files

https://community.hortonworks.com/articles/74208/ulimit-settings-not-respected-when-service-is-star.html

```
$sudo -u hdfs bash -c "ulimit -a" | grep open
open files                      (-n) 128000

$ cat /etc/security/limits.d/hdfs.conf | grep nofile
hdfs   - nofile 128000

$ pgrep -U hdfs
2698

$ sudo grep open /proc/2698/limits
Max open files            4096                 4096                 files   
```
