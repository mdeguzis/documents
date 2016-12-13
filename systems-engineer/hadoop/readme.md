<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Latest news and updates](#latest-news-and-updates)
- [Hadoop](#hadoop)
  - [Main components](#main-components)
  - [General components overview](#general-components-overview)
- [Ambari](#ambari)
  - [Notable features](#notable-features)
  - [Main Components](#main-components)
  - [Other components](#other-components)
- [Hortonworks Sandbox](#hortonworks-sandbox)
  - [Logins for tutorials](#logins-for-tutorials)
  - [Commoon commands](#commoon-commands)
- [Links](#links)
  - [Specific introduction topics](#specific-introduction-topics)
  - [Setting up nodes](#setting-up-nodes)
  - [Quick Start Guides](#quick-start-guides)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes about Hadoop. General notes and links can be found on this page, with dedicated information found in it's own page. Any instructions on setting up hadoop below are more targeted towards simple networks / home environments (for now). This document serves as a "Cliff Notes"-like presentation of Hadoop.

# Latest news and updates

See: [hadoop/hadoop-updates-news.md](https://github.com/mdeguzis/documents/tree/master/systems-engineer/hadoop)

# Hadoop

## Overview

* **Hadoop Common** – contains libraries and utilities needed by other Hadoop modules.
* **Hadoop Distributed File System (HDFS)** – a distributed file-system that stores data on commodity machines, providing very high aggregate bandwidth across the cluster.
  * Namenode - manages cluster metadata and datanodes that store the data. Each block of file content is typically 128 MB. The Namenode also monitors the blocks
* **Hadoop YARN** – a resource-management platform responsible for managing computing resources in clusters and using them for scheduling of users’ applications.
* **Hadoop MapReduce** – a programming model for large scale data processing. Composed of JobTracker, which is the master, and the per-node slaves called TaskTrackers

## 5 pillars of the Hadoop  Framework

1. Data Management
2. Data Access
3. Data Governance and Integration
4. Security
5. Operations

A full list of comoponents, and their descriptions, can be found here at [hadoop/components.md](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/components.md).

## HDFS

A single physical machine gets saturated with its storage capacity as data grows. With this growth comes the impending need to partition your data across separate machines. This type of File system that manages storage of data across a network of machines is called a Distributed File System. HDFS is a core component of Apache Hadoop and is designed to store large files with streaming data access patterns, running on clusters of commodity hardware.

* Distributed file system across multiple servers
* Can scale up to 200 PB / 4500 servers on a single cluster
* NameNaode manages cluster metadata 
* DataNodes store the data

The NameNode does not directly send requests to DataNodes. It sends instructions to the DataNodes by replying to heartbeats sent by those DataNodes. The instructions include commands to:

* replicate blocks to other nodes,
* remove local block replicas,
* re-register and send an immediate block report, or
* shut down the node.

## MapReduce and YARN

### MapReduce

* The Map function divides the input into ranges by the InputFormat and creates a map task for each range in the input. The JobTracker distributes those tasks to the worker nodes. The output of each map task is partitioned into a group of key-value pairs for each reduce. 
* The Reduce function then collects the various results and combines them to answer the larger problem that the master node needs to solve. Each reduce pulls the relevant partition from the machines where the maps executed, then writes its output back into HDFS. Thus, the reduce is able to collect the data from all of the maps for the keys and combine them to solve the problem.
* The phases are input, map, shuffle and sort, reduce, and output. For Unix geeks, this is analogous to `cat`, `grep`, `sort`, `unique`, and `output`.
* In a simplistic view, this process entails eating input and flipping keys around.

### Yarn

* The fundamental idea of YARN is to split up the two major responsibilities of the JobTracker i.e. resource management and job scheduling/monitoring, into separate daemons: a global **ResourceManager** and per-application **ApplicationMaster** (AM).
* The ResourceManager and per-node slave, the NodeManager (NM), form the new, and generic, system for managing applications in a distributed manner.
* ResourceManager and ApplicationMaster negotiate resources, while the per-node NodeManager keeps ResourceManager informed of that node's running resources (CPR, RAM, Disk, Network).
* YARN uses the existing MapReduce framework, providing compatibility with existing MapReduce users.
* Procedurally:
  * Application container is spawned
  * ApplicationMaster for container makes resource request to resource manager
  * ResourceManager is also aware of the node specifications from the NodeManager.
  * ResoureceManager allocates available resources via the pluggable Scheduler

## Hive and Pig

### Hive

Hive is an SQL like query language that enables those analysts familiar with SQL to run queries on large volumes of data.  Hive has three main functions: data summarization, query and analysis. Hive provides tools that enable easy data extraction, transformation and loading (ETL). Hive is comprised of yables (think RDMS) made up of partitions. Hive is not suited for real-time queries and row-level updates. It is more designed for assesing immutable objects, such as logs.

Hive consists of Data (located in HDFS as file(s)) and Schema (representation of a plan or theory in the form of an outline or model). Schema and data are seperate, as data can be removed or added independently. Think of Schema as layout that provides direction on where Hive can be "pointed" or what defintions Hive should adhere to. Schema is required if you have existing data in HDFS that you want to use in Hive.

See: [hadoop/hive/readme.md]() for more examples and content.

There are several runtimes Hive can use when executing SQL queries:
* Hadoop MapReduce
* Tez
* Spark

Components:
* HCatalog - table and storage management layer that enables users with different data processing tools  to more easily read and write data on the grid
* WebHCat - service that you can use to run Hadoop MapReduce (or YARN), Pig, Hive jobs or perform Hive metadata operations using an HTTP (REST style) interface.

Uses:
* Query data
* Specific Questions

### Pig

Features
* HiveQL similar to SQL (SQL92 spec)
* Multi-table inserts
* Convert SQL queries into MapReduce jobs without user knowledge of MapReduce itself
* Allows plugging in custom MapReduce scripts as queries

Uses
* ETL (Extract -> Transform -> Load)
* Preparing data for easier analysis
* Long series of steps to perform

## Tez

* Customizable and extensible framework/API for building high performance batch and interactive data processing applications, coordinated by YARN in Apache Hadoop
* Speeds up MapReduce while maintaining MapReduces's scaling paradigm
* Used by Hive and Pig
* Extensible and embeddable, providing the fit-to-purpose freedom to express highly optimized data processing applications and giving them an advantage over end-user-facing engines such as MapReduce and Spark

# Ambari

## Notable features

* Ambari 2.4+
  * Role-Based Access Control (RBAC) - provides granular control of the Ambari dashboard

## Main Components

* **Dashboard (Ambari)** - Primary UI for Hadoop operations
  * Heat maps
  * configs: useful metadata for installed/running services
* **Services**
  * Summary information
  * Manage configs / config profiles / config groups
* **Hosts** - Available hosts attached to the current Hadoop framework. Lists summmary information and lists installed components for each host
* **Alerts**
* **Admin**

## Other components

* Views
* Ambari management is located at: Admin/UserID > Manage Ambari

# Hortonworks Sandbox

* http://hortonworks.com/hadoop-tutorial/learning-the-ropes-of-the-hortonworks-sandbox/
* [Hortonworks Hello World tutorial](http://hortonworks.com/hadoop-tutorial/hello-world-an-introduction-to-hadoop-hcatalog-hive-and-pig/#section_2)
  * Last section read: 4.3.3
* [Hortonworks on Youtube](https://www.youtube.com/channel/UCXFjdDwI_CRTPxlshXWMu7w)

## Logins for tutorials

Service |	User 	| Password
--------|-------|-------
Ambari, OS  |	admin |	hadoop (on first login only)
Ambari, OS 	| maria_dev |	maria_dev
Ambari, OS 	| raj_ops |	raj_ops
Ambari, OS 	| holger_gov |	holger_gov
Ambari, OS 	| amy_ds |	amy_ds

## Commoon commands

````
# Updates password
ambari-admin-password-reset
# If Ambari doesn't restart automatically, restart ambari service
ambari-agent restart
```

# Links

* [Apache main page](http://hadoop.apache.org/)

## Specific introduction topics

* [HDFS](https://youtu.be/1_ly9dZnmWc)
* [MapReduce](https://www.youtube.com/watch?v=ht3dNvdNDzI)
* [YARN](https://youtu.be/wlouNFscZS0)
* [Hive](https://youtu.be/Pn7Sp2-hUXE)
* [Tez](https://youtu.be/cPSfA1bhgVA)

## Setting up nodes 

* [Single Node (CentOS 7)](http://www.tecmint.com/install-configure-apache-hadoop-centos-7/)

## Quick Start Guides

* [Beginners guide](http://blog.matthewrathbone.com/2013/04/17/what-is-hadoop.html)
* [Hadoop Quick Start Guide (Apache)](https://wiki.apache.org/hadoop/QuickStart)
* [Hadoop Quick Start Guide (Cloudera)](http://www.cloudera.com/developers/get-started-with-hadoop-tutorial.html)
* [Hadoop Quick Start Guide (TutorialsPoint)](https://www.tutorialspoint.com/hadoop/hadoop_quick_guide.htm)
* [Understanding Hadoop 2.0](http://hortonworks.com/blog/understanding-hadoop-2-0/)
