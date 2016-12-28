# About

HBase is an open source, non-relational, distributed database modeled after Google's BigTable and is written in Java. 

It is developed as part of Apache Software Foundation's Apache Hadoop project and runs on top of HDFS (Hadoop Distributed File System),
providing BigTable-like capabilities for Hadoop. That is, it provides a fault-tolerant way of storing large quantities of sparse data
(small amounts of information caught within a large collection of empty or unimportant data, such as finding the 50 largest items 
in a group of 2 billion records, or finding the non-zero items representing less than 0.1% of a huge collection).

# What it is

* Fault-tolerant
* Capable of storing large quantities of sparse data
* Non-relational, distributed database
* An input and output for MapReduce jobs run in Hadoop

# What it is not

*  A direct replacement for a classic SQL database

# Features 

* compression
* in-memory operation
* bloom filters on a per-column basis
* HBase can serve as the input and output for MapReduce jobs run in Hadoop, and may be accessed through the Java API but also through REST, Avro or Thrift gateway APIs
* 
