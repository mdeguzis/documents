<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General](#general)
- [Hive](#hive)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

List of commands for hadoop, their description, and arguments. Listed in alphabetical order.

# hadoop commands

# hadoop distcp 

Launches a MapReduce job that will take data and stream it from one cluster to another.

The most common invocation of DistCp is an inter-cluster copy:

```
bash$ hadoop distcp2 hdfs://nn1:8020/foo/bar \ 
hdfs://nn2:8020/bar/foo
```

This will expand the namespace under `/foo/bar` on nn1 into a temporary file, partition its contents among a set of map tasks, and start a copy on each TaskTracker from nn1 to nn2.

One can also specify multiple source directories on the command line:

```
bash$ hadoop distcp2 hdfs://nn1:8020/foo/a \ 
hdfs://nn1:8020/foo/b \ 
hdfs://nn2:8020/bar/foo
```

Or, equivalently, from a file using the `-f` option:

```
bash$ hadoop distcp2 -f hdfs://nn1:8020/srclist \ 
hdfs://nn2:8020/bar/foo 
Where srclist contains
hdfs://nn1:8020/foo/a 
```

## hadoop fs

Usage: `hadoop fs -put <localsrc> ... <dst>`

Copy single src, or multiple srcs from local file system to the destination file system. Also reads input from stdin and writes to destination file system.

```
hadoop fs -put localfile /user/hadoop/hadoopfile
hadoop fs -put localfile1 localfile2 /user/hadoop/hadoopdir
hadoop fs -put localfile hdfs://nn.example.com/hadoop/hadoopfile
hadoop fs -put - hdfs://nn.example.com/hadoop/hadoopfile Reads the input from stdin.
```

Exit Code:

Returns 0 on success and -1 on error.


```
hadoop fs  -put \<PATH_FROM\>\<PATH_TO\> | Transfer data to HDFS (local)
```

# Hive

command                |   arguments           |  description
-----------------------|-----------------------|--------------
hive | -f \<query.hql\> | Perform a Hive query using a given script


# Links

* [Hadoop shell commands](https://hadoop.apache.org/docs/r2.7.2/hadoop-project-dist/hadoop-common/FileSystemShell.html)
