<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)
- [Setting up nodes](#setting-up-nodes)
- [Quick Start Guides](#quick-start-guides)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes about Hadoop. General notes and links can be found on this page, with dedicated information found in it's own page. Any instructions on setting up hadoop below are more targeted towards simple networks / home environments (for now).

# Hadoop

## Main components

* **Hadoop Common** – contains libraries and utilities needed by other Hadoop modules.
* **Hadoop Distributed File System (HDFS)** – a distributed file-system that stores data on commodity machines, providing very high aggregate bandwidth across the cluster.
  * Namenode - manages cluster metadata and datanodes that store the data. Each block of file content is typically 128 MB. The Namenode also monitors the blocks
* **Hadoop YARN** – a resource-management platform responsible for managing computing resources in clusters and using them for scheduling of users’ applications.
* **Hadoop MapReduce** – a programming model for large scale data processing.


## General components overview

* flume - distributed, reliable, and available service for efficiently collecting, aggregating, and moving large amounts of log data
* hive - data summarization, query, and analysis. Design queries and provide the structure for the raw data
* oozie - workflow scheduling system to manage Hadoop jobs.
* pig - high-level platform for creating programs that run on hadoop
* spark - the cluster computing framework. 
* sqoop - Tool for efficiently transferring bulk data between structured databases and Hadoop
* yarn - data processing framwork that extends MapReduce capabilities by supporting non-MapReduce workloads associated with other programming models.
* zeppelin - web-based notebook that enables interactive data analytics

A full list of comoponents, and their descriptions, can be found here at [hadoop/components.md](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/components.md).

# Ambari

## Notable features

* Ambari 2.4+
  * Role-Based Access Control(RBAC) - provides granular control of the Ambari dashboard

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
  * Last section read: 1.5
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

# Setting up nodes 

* [Single Node (CentOS 7)](http://www.tecmint.com/install-configure-apache-hadoop-centos-7/)

# Quick Start Guides

* [Beginners guide](http://blog.matthewrathbone.com/2013/04/17/what-is-hadoop.html)
* [Hadoop Quick Start Guide (Apache)](https://wiki.apache.org/hadoop/QuickStart)
* [Hadoop Quick Start Guide (Cloudera)](http://www.cloudera.com/developers/get-started-with-hadoop-tutorial.html)
* [Hadoop Quick Start Guide (TutorialsPoint)](https://www.tutorialspoint.com/hadoop/hadoop_quick_guide.htm)
* [Understanding Hadoop 2.0](http://hortonworks.com/blog/understanding-hadoop-2-0/)
