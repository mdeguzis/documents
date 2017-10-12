<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Data](#data)
  - [DDL](#ddl)
  - [DML](#dml)
  - [DCL](#dcl)
  - [Heap size](#heap-size)
  - [ORC](#orc)
  - [RDD](#rdd)
  - [TCL](#tcl)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Defintions for various topics

# Concepts

## Serialization and Deserialization

* serialization - Turn data into a stream of bytes
* deserialization - Turn a stream of bytes back into a copy of the original object.

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

`Heap Memory` means in programming, an area of memory reserved for data that is created at runtime that is, when the program actually executes. In contrast, the stack is an area of memory used for data whose size can be determined when the program is compiled. Java heap is the heap size allocated to JVM applications which takes care of the new objects being created. If the objects being created exceed the heap size, it will throw an error saying memoryOutof Bound.

As objects are allocated, they'll fill the heap. Many objects turn out to be short-lived and get garbage collected relatively quickly. For longer-lived objects, they might not get cleared until the heap is very highly consumed and the JVM decides to trigger a full garbage collection. As far as measurement of the heap usage, this can look like a sawtooth pattern if you can imagine a plot of heap usage over time.

**In terms of Hadoop**

See: [hadoop-projects/hdfs](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/hadoop-projects/hdfs.md)

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
