<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Data](#data)
  - [DDL](#ddl)
  - [DML](#dml)
  - [DCL](#dcl)
  - [ORC](#orc)
  - [RDD](#rdd)
  - [TCL](#tcl)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Defintions for various topics

# Data

## DDL
Data Definition Language (DDL) statements are used to define the database structure or schema. Some examples:

  * CREATE - to create objects in the database
  * ALTER - alters the structure of the database
  * DROP - delete objects from the database
  * TRUNCATE - remove all records from a table, including all spaces allocated for the records are removed
  * COMMENT - add comments to the data dictionary
  * RENAME - rename an object

## DML

Data Manipulation Language (DML) statements are used for managing data within schema objects. Some examples:

  * SELECT - retrieve data from the a database
  * INSERT - insert data into a table
  * UPDATE - updates existing data within a table
  * DELETE - deletes all records from a table, the space for the records remain
  * MERGE - UPSERT operation (insert or update)
  * CALL - call a PL/SQL or Java subprogram
  * EXPLAIN PLAN - explain access path to data
  * LOCK TABLE - control concurrency

## DCL

Data Control Language (DCL) statements. Some examples:

  * GRANT - gives user's access privileges to database
  * REVOKE - withdraw access privileges given with the GRANT command

## Heap size

The `Runtime `documents these as:

**Oveview**

`Heap Memory` means in programming, an area of memory reserved for data that is created at runtime that is, when the program actually executes. In contrast, the stack is an area of memory used for data whose size can be determined when the program is compiled.Java heap is the heap size allocated to JVM applications which takes care of the new objects being created. If the objects being created exceed the heap size, it will throw an error saying memoryOutof Bound

`Java's default heap size limit is 128MB`. If you need more than this, you should use the -Xms and -Xmx command line arguments when launching your program: `java -Xms -Xmx`.

**In terms of Hadoop**

* `totalMemory()` Returns the total amount of memory in the Java virtual machine.
* `maxMemory()` Returns the maximum amount of memory that the Java virtual machine will attempt to use
Max is going to be the `-Xmx` parameter from the service start command. The total memory main factor is the number of blocks in your HDFS cluster. The namenode requires ~150 bytes for each block, +16 bytes for each replica, and it must be kept in live memory. So a default replication factor of 3 gives you 182 bytes, and you have 7534776 blocks gives about 1.3GB. Plus all other non-file related memory in use in the namenode, 1.95GB sounds about right. I would say that your HDFS cluster size requires a bigger namenode, more RAM. If possible, increase namenode startup -Xmx. If maxed out, you'll need a bigger VM/physical box.

See: [Configuring Heap Size (Hortonworks)](https://docs.hortonworks.com/HDPDocuments/HDP2/HDP-2.4.2/bk_installing_manually_book/content/ref-80953924-1cbf-4655-9953-1e744290a6c3.1.html)

## ORC

ORC is a self-describing type-aware columnar file format designed for Hadoop workloads. It is optimized for large streaming reads and with integrated support for finding required rows fast. Storing data in a columnar format lets the reader read, decompress, and process only the values required for the current query. Because ORC files are type aware, the writer chooses the most appropriate encoding for the type and builds an internal index as the file is persisted.

ORC supports the complete set of types in Hive, including the complex types: structs, lists, maps, and unions.

## RDD

Spark’s primary core abstraction is called a **Resilient Distributed Dataset** or RDD. It is a distributed collection of elements that is parallelized across the cluster. In other words, a RDD is an immutable collection of objects that is partitioned and distributed across multiple physical nodes of a YARN cluster and that can be operated in parallel.

## TCL

Transaction Control (TCL) statements are used to manage the changes made by DML statements. It allows statements to be grouped together into logical transactions.

  * COMMIT - save work done
  * SAVEPOINT - identify a point in a transaction to which you can later roll back
  * ROLLBACK - restore database to original since the last COMMIT
  * SET TRANSACTION - Change transaction options like isolation level and what rollback segment to use
