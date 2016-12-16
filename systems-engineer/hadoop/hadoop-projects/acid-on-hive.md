# ACID on Hive

ACID stands for four traits of database transactions:

1. **A**tomicity (an operation either succeeds completely or fails, it does not leave partial data)
2. **C**onsistency (once an application performs an operation the results of that operation are visible to it in every subsequent operation)
3. **I**solation (an incomplete operation by one user does not cause unexpected side effects for other users)
4. **D**urability (once an operation is complete it will be preserved even in the face of machine or system failure).  

Up until Hive 0.13, atomicity, consistency, and durability were provided at the partition level.  Isolation could be provided by turning on one of the available locking mechanisms (ZooKeeper or in memory).  With the addition of transactions in Hive 0.13 it is now possible to provide full ACID semantics at the row level, so that one application can add rows while another reads from the same partition without interfering with each other.

# Use cases

1. **Streaming ingest of data** (e.g. Apache Flume, Apache Storm, or Apache Kafka) - Allows use case of rapid ingestion to partitions without high congestion. While ingesting data can be done at a high rate, previous to ACID, Hive could only add partitions every 15 minute to an hour.
2. **Slow changing dimensions** - [dimension tables](https://en.wikipedia.org/wiki/Dimension_(data_warehouse)#Dimension_table) gain the ability to inccur small updates to dimmension / fact tables. (Hive 0.14+)
3. **Data restatement** - Support for adjustment of collected data via INSERT, UPDATE, and DELETE (Hive 0.14+)

# Limitations

* For now, BEGIN, COMMIT, and ROLLBACK are not yet supported.  All language operations are auto-commit
* By default transactions are configured to be off (must be configured)
* Tables using transactions need to be [bucketed](http://hadooptutorial.info/bucketing-in-hive/), a technique fro decomposigin table data sets into more manageable parts. Tranditional partitioning most effective when there are limited numbers of partitions, and each is compartively the same size. Changes cannot be made to external tables
* Reading/writing to an ACID table from a non-ACID session is not allowed. In other words, the Hive transaction manager must be set to org.apache.hadoop.hive.ql.lockmgr.DbTxnManager in order to work with ACID tables.
*  No support for dirty read, read committed, repeatable read, or serializable, only snapshot-level when the query starts
* The existing ZooKeeper and in-memory lock managers are not compatible with transactions
* Using Oracle as the Metastore DB and "datanucleus.connectionPoolingType=BONECP" may generate intermittent "No such lock.." and "No such transaction..." errors.  Setting "datanucleus.connectionPoolingType=DBCP" is recommended in this case. 

# API

* Hive HCatalog Streaming API
* HCatalog Streaming Mutation API (available in Hive 2.0.0 and later)

See: "Steaming APIs" on the [original article](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions).

# Design elements

A high level overview (See [Apache](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions) for detailed descriptions):

* **Base and Delta Directories** - Since HDFS does not support in-place changes, base files are merged with delta files, written at each transaction
* **Compactor** - the background processes running in the Metastore to support ACID. Delta file compaction are done in major/minor sets
  * Minor compaction takes a set of existing delta files and rewrites them to a single delta file per bucket.
  * Major compaction takes one or more delta files and the base file for the bucket and rewrites them into a new base file per bucket. Major compaction is more expensive but is more effective.
  * **Compactor components**
    * Initiator - Handles whitch tables or partitions are possibly to be compacted based on thresholds and 
    * Worker - Handles a single compaction task in the form of a MapReduce job.
    * Cleaner - As it's name implies, cleans up leftover delta files if it is determined they are not needed
    * ACIDHouseKeeperService - Aborts stale transactions with no heartbeat
    * SHOW COMPACTIONS - command to display info about current and historical compact actions
* **Transaction/Lock Manager** - Builds on the previous lock manager/ZooKeeper, adding management of transaction locks. Previous behavior of locking in ZooKeeper is not present anymore when transactions are enabled
* **Configuration**
  * Parameters
  * Configuration Values to Set for INSERT, UPDATE, DELETE
  * Configuration Values to Set for Compaction
  * Table Properties

**Note:** See original article for configuration information. The detail is out of the intended scope of this page.

# References

Main confluence article from apache: [ACID and Transactions in Hive](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions).
