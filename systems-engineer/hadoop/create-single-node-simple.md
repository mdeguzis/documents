<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Components](#components)
- [System configs](#system-configs)
  - [Set host info and env](#set-host-info-and-env)
  - [Add to /etc/hosts](#add-to-etchosts)
- [Ensure Java SDK is installed](#ensure-java-sdk-is-installed)
  - [Configure java version](#configure-java-version)
- [Create a new user account without root privledges for Hadoop](#create-a-new-user-account-without-root-privledges-for-hadoop)
- [Configure .bashrc for the hadoop user](#configure-bashrc-for-the-hadoop-user)
- [Download and unpack hadoop](#download-and-unpack-hadoop)
- [](#)
- [TODO, have errands to do :)](#todo-have-errands-to-do-)
- [](#-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Components

* Hadoop Common – it contains the Java libraries and utilities needed by other Hadoop modules.
* HDFS – Hadoop Distributed File System – A Java based scalable file system distributed across multiple nodes.
* MapReduce – YARN framework for parallel big data processing.
* Hadoop YARN: A framework for cluster resource management.

# System configs

## Set host info and env

You can use "master" to be more in line with hadoop conventions
```
hostnamectl set-hostname centos7
```

## Add to /etc/hosts
add your IP address and FQDN to `/etc/hosts`


# Ensure Java SDK is installed
```
sudo yum install java-1.8.0-openjdk
```

## Configure java version
```
sudo alternatives --config java
```

# Create a new user account without root privledges for Hadoop

```
#clean out any left over mail dir
sudo rm -f "/var/spool/mail/hadoop"

# Add user
sudo useradd -d /opt/hadoop hadoop
sudo passwd hadoop
```

# Configure .bashrc for the hadoop user
```
## HADOOP env variables
export HADOOP_HOME=/opt/hadoop
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
```

# Download and unpack hadoop

#
# TODO, have errands to do :)
#
