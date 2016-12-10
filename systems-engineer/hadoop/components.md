# Main  modules

The base Apache Hadoop framework is composed of the following modules:

* Hadoop Common – contains libraries and utilities needed by other Hadoop modules.
* Hadoop Distributed File System (HDFS) – a distributed file-system that stores data on commodity machines, providing very high aggregate bandwidth across the cluster.
* Hadoop YARN – a resource-management platform responsible for managing computing resources in clusters and using them for scheduling of users’ applications.
* Hadoop MapReduce – a programming model for large scale data processing.

# The five pillars

Each project has been developed to deliver an explicit function and each has its own community of developers and individual release cycles. There are five pillars to Hadoop that make it enterprise ready:

1. **Data Management** – Store and process vast quantities of data in a storage layer that scales linearly. Hadoop Distributed File System (HDFS) is the core technology for the efficient scale out storage layer, and is designed to run across low-cost commodity hardware. Apache Hadoop YARN is the pre-requisite for Enterprise Hadoop as it provides the resource management and pluggable architecture for enabling a wide variety of data access methods to operate on data stored in Hadoop with predictable performance and service levels.

  * Apache Hadoop YARN– Part of the core Hadoop project, YARN is a next-generation framework for  Hadoop data processing extending MapReduce capabilities by supporting non-MapReduce workloads associated with other programming models.
  * HDFS– Hadoop Distributed File System (HDFS) is a Java-based file system that provides scalable and reliable data storage that is designed to span large clusters of commodity servers.

2. **Data Access** – Interact with your data in a wide variety of ways – from batch to real-time. Apache Hive is the most widely adopted data access technology, though there are many specialized engines. For instance, Apache Pig provides scripting capabilities, Apache Storm offers real-time processing,  Apache HBase offers columnar NoSQL storage and Apache Accumulo offers cell-level access   control. All of these engines can work across one set of data and resources thanks to YARN and       intermediate engines such as Apache Tez for interactive access and Apache Slider for long-running   applications. YARN also provides flexibility for new and emerging data access methods, such as  Apache Solr for search and programming frameworks such as Cascading.

  * Apache Hive– Built on the MapReduce framework, Hive is a data warehouse that enables easy data summarization and ad-hoc queries via an SQL-like interface for large datasets stored in HDFS.
  * Apache Pig– A platform for processing and analyzing large data sets. Pig consists of a high-level language (Pig Latin) for expressing data analysis programs paired with the MapReduce framework for processing these programs.
  * MapReduce– MapReduce is a framework for writing applications that process large amounts of structured and unstructured data in parallel across a cluster of thousands of machines, in a reliable and fault-tolerant manner.
  * Apache Spark– Spark is ideal for in-memory data processing. It allows data scientists to implement fast, iterative algorithms for advanced analytics such as clustering and classification of datasets.
  * Apache Storm– Storm is a distributed real-time computation system for processing fast, large streams of data adding reliable real-time data processing capabilities to Apache Hadoop® 2.x
  * Apache HBase– A column-oriented NoSQL data storage system that provides random real-time read/write access to big data for user applications.
  * Apache Tez– Tez generalizes the MapReduce paradigm to a more powerful framework for executing a complex DAG (directed acyclic graph) of tasks for near real-time big data processing.
  * Apache Kafka– Kafka is a fast and scalable publish-subscribe messaging system that is often used in place of traditional message brokers because of its higher throughput, replication, and fault tolerance.
  * Apache HCatalog– A table and metadata management service that provides a centralized way for data processing systems to understand the structure and location of the data stored within Apache Hadoop.
  * Apache Slider– A framework for deployment of long-running data access applications in Hadoop. Slider leverages YARN’s resource management capabilities to deploy those applications, to manage their lifecycles and scale them up or down.
  * Apache Solr– Solr is the open source platform for searches of data stored in Hadoop. Solr enables powerful full-text search and near real-time indexing on many of the world’s largest Internet sites.
  * Apache Mahout– Mahout provides scalable machine learning algorithms for Hadoop which aids with data science for clustering, classification and batch based collaborative filtering.
  * Apache Accumulo– Accumulo is a high performance data storage and retrieval system with cell-level access control. It is a scalable implementation of Google’s Big Table design that works on top of Apache Hadoop and Apache ZooKeeper.

3. **Data Governance and Integration** – Quickly and easily load data, and manage   according to           policy.Apache Falcon provides policy-based workflows for data governance, while Apache Flume and Sqoop enable easy data ingestion, as do the NFS and WebHDFS interfaces to HDFS.

  * Apache Falcon– Falcon is a data management framework for simplifying data lifecycle management and processing pipelines on Apache Hadoop®. It enables users to orchestrate data motion, pipeline processing,disaster recovery, and data retention workflows.
  * Apache Flume– Flume allows you to efficiently aggregate and move large amounts of log data from many different sources to Hadoop.
  * Apache Sqoop– Sqoop is a tool that speeds and eases movement of data in and out of Hadoop. It provides a reliable parallel load for various, popular enterprise data sources.

4. **Security** – Address requirements of Authentication, Authorization, Accounting and Data Protection. Security is provided at every layer of the Hadoop stack from HDFS and YARN to Hive and the other Data Access components on up through the entire perimeter of the cluster via Apache Knox.
       
  * Apache Knox– The Knox Gateway (“Knox”) provides a single point of authentication and access for Apache Hadoop services in a cluster. The goal of the project is to simplify Hadoop security for users who access the cluster data and execute jobs, and for operators who control access to the cluster.
  * Apache Ranger– Apache Ranger delivers a comprehensive approach to security for a Hadoop cluster. It provides central security policy administration across the core enterprise security requirements of authorization, accounting and data protection.
    Operations–  Provision, manage, monitor and operate Hadoop clusters at scale.
  * Apache Ambari– An open source installation lifecycle management, administration and monitoring system for Apache Hadoop clusters.
  * Apache Oozie– Oozie Java Web application used to schedule Apache Hadoop jobs. Oozie combines multiple jobs sequentially into one logical unit of work.
  * Apache ZooKeeper– A highly available system for coordinating distributed processes. Distributed applications use ZooKeeper to store and mediate updates to important configuration information.
