ACID stands for four traits of database transactions:

1. **A**tomicity (an operation either succeeds completely or fails, it does not leave partial data)\
2. **C**onsistency (once an application performs an operation the results of that operation are visible to it in every subsequent operation)
3. **I**solation (an incomplete operation by one user does not cause unexpected side effects for other users)
4. **D**urability (once an operation is complete it will be preserved even in the face of machine or system failure).  

The addition of transactions in Hive 0.13 privded these components directly, rather than using other components in roundabout ways. This can allow operations such as adding rows to a table while another user reads from the same partition without interference. This way, locking mechanisms will not interfere with other users performing operations.

**Use cases**

1. **Streaming ingest of data** (e.g. Apache Flume, Apache Storm, or Apache Kafka) - Allows use case of rapid ingestion to partitions without high congestion (Hive 0.14+)
2. **Slow changing dimensions** - [dimension tables](https://en.wikipedia.org/wiki/Dimension_(data_warehouse)#Dimension_table) gain the ability to inccur small updates to dimmension / fact tables. (Hive 0.14+)
3. **Data restatement** - Support for adjustment of collected data via INSERT, UPDATE, and DELETE (Hive 0.14+)

**Limitations**

TODO

**API**

TODO

**Design elements**

A high level overview:

* Base and Delta Directories
* Compactor
  * Delta File Compaction
  * Initiator
  * Worker
  * Cleaner
  * AcidHouseKeeperService
  * SHOW COMPACTIONS
* Transaction/Lock Manager
* Configuration
  * Parameters
  * Configuration Values to Set for INSERT, UPDATE, DELETE
  * Configuration Values to Set for Compaction
  * Table Properties

TODO - finish out

Main confluence article from apache: [ACID and Transactions in Hive](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions).
