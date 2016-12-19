<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Hortonworks Sandbox](#hortonworks-sandbox)
- [Latest news and updates](#latest-news-and-updates)
- [Labs and exercies](#labs-and-exercies)
- [Hadoop](#hadoop)
  - [Overview](#overview)
  - [5 pillars of the Hadoop  Framework](#5-pillars-of-the-hadoop--framework)
  - [Hadoop projects / components](#hadoop-projects--components)
- [Ambari](#ambari)
- [Hortonworks](#hortonworks)
  - [Logins for tutorials](#logins-for-tutorials)
- [Links](#links)
  - [Cheatsheets](#cheatsheets)
  - [Conferences](#conferences)
  - [Specific introduction videos](#specific-introduction-videos)
  - [Main video channels](#main-video-channels)
  - [Setting up nodes](#setting-up-nodes)
  - [Quick Start Guides](#quick-start-guides)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes about Hadoop. General notes and links can be found on this page, with dedicated information found in it's own page. Any instructions on setting up hadoop below are more targeted towards simple networks / home environments (for now). This document serves as a "Cliff Notes"-like presentation of Hadoop.

# Hortonworks Sandbox

* http://hortonworks.com/hadoop-tutorial/learning-the-ropes-of-the-hortonworks-sandbox/
* [Hortonworks Hello World tutorial](http://hortonworks.com/hadoop-tutorial/hello-world-an-introduction-to-hadoop-hcatalog-hive-and-pig/#section_2)
  * Section currently on: Section 2.2.7 of "Lab 2: Data Manipulation with Hive"
* [Hortonworks on Youtube](https://www.youtube.com/channel/UCXFjdDwI_CRTPxlshXWMu7w)


**For an overview/list of users see:**

http://127.0.0.1:8888/ (quick links page).

The HDP sandbox must first be started.

# Latest news and updates

See: [hadoop/hadoop-updates-news.md](https://github.com/mdeguzis/documents/tree/master/systems-engineer/hadoop)

# Labs and exercies

See: [labs/readme.md](https://github.com/mdeguzis/documents/tree/master/systems-engineer/hadoop/labs)

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

## Hadoop projects / components

* [HDFS](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/hdfs.md)
* [MapReduce](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/mapreduce.md)
* [Yarn](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/yarn.md)
* [Hive](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/hive.md)
* [Acid on Hive](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/acid-on-hive.md)
* [Pig](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/pig.md)
* [Tez](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/tez.md)
* [Stinger and Stinger.next](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/stinger-and-stringer.next.md)

## Concepts

* [Bucketing](http://hadooptutorial.info/bucketing-in-hive/)

# Ambari

See: [hadoop/ambari/readme.md](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/ambari/readme.md)

# Hortonworks

## Logins for tutorials

Service |	User 	| Password
--------|-------|-------
Ambari, OS  |	admin |	hadoop (on first login only)
Ambari, OS 	| maria_dev |	maria_dev
Ambari, OS 	| raj_ops |	raj_ops
Ambari, OS 	| holger_gov |	holger_gov
Ambari, OS 	| amy_ds |	amy_ds

# Links

* [Apache main page](http://hadoop.apache.org/)

## Cheatsheets

* [Hive](http://hortonworks.com/blog/hive-cheat-sheet-for-sql-users/)

## Conferences

* [Data Summit (New York,  NY, USA](http://www.dbta.com/DataSummit)
* [IEEE International (Washington DC, USA)](http://cci.drexel.edu/bigdata/bigdata2016/index.html)
* [Strata+Hadoop (New York, USA)](http://conferences.oreilly.com/strata/hadoop-big-data-ny) [<sup>[1]</sup>](#cite1).
* [Listings from Cloudera](http://www.cloudera.com/about-cloudera/events.html)

## Specific introduction videos

* [HDFS](https://youtu.be/1_ly9dZnmWc)
* [MapReduce](https://www.youtube.com/watch?v=ht3dNvdNDzI)
* [YARN](https://youtu.be/wlouNFscZS0)
* [Hive](https://youtu.be/Pn7Sp2-hUXE)
* [Tez](https://youtu.be/cPSfA1bhgVA)
* [Pig](https://youtu.be/PQb9I-8986s)

## Main video channels

* [Hadoop Summit](https://www.youtube.com/channel/UC5o4P1O-WVE15EZWqayc5dw)
* [Hortonworks](https://www.youtube.com/channel/UCXFjdDwI_CRTPxlshXWMu7w)

## Setting up nodes 

* [Single Node (CentOS 7)](http://www.tecmint.com/install-configure-apache-hadoop-centos-7/)

## Quick Start Guides

* [Beginners guide](http://blog.matthewrathbone.com/2013/04/17/what-is-hadoop.html)
* [Hadoop Quick Start Guide (Apache)](https://wiki.apache.org/hadoop/QuickStart)
* [Hadoop Quick Start Guide (Cloudera)](http://www.cloudera.com/developers/get-started-with-hadoop-tutorial.html)
* [Hadoop Quick Start Guide (TutorialsPoint)](https://www.tutorialspoint.com/hadoop/hadoop_quick_guide.htm)
* [Understanding Hadoop 2.0](http://hortonworks.com/blog/understanding-hadoop-2-0/)

# References
1. <a name="cite1"></a> Strata is a name O'Reilly Media uses to use for conferences related to Big Data.
