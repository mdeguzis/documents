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

## DAG

Directed Acyclic Graph representing the data flow graph. In simple terms...

* graph = structure consisting of nodes, that are connected to each other with edges
* directed = the connections between the nodes (edges) have a direction: A -> B is not the same as B -> A 
* acyclic = "non-circular" = moving from node to node by following the edges, you will never encounter the same node for the second time.

Example uses of a directed acyclic graph in programming include more or less anything that represents **connectivity** and **causality**

For example, suppose you have a computation pipeline that is configurable at runtime. As one example of this, suppose computations A,B,C,D,E,F, and G depend on each other: A depends on C, C depends on E and F, B depends on D and E, and D depends on F. This can be represented as a DAG. Once you have the DAG in memory, you can write algorithms to:

For more see: https://en.wikipedia.org/wiki/Directed_acyclic_graph

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

## ORC

The Optimized Row Columnar (ORC) file format provides a highly efficient way to store Hive data. It was designed to overcome limitations of the other Hive file formats. Using ORC files improves performance when Hive is reading, writing, and processing data.

## RDD

Spark’s primary core abstraction is called a **Resilient Distributed Dataset** or RDD. It is a distributed collection of elements that is parallelized across the cluster. In other words, a RDD is an immutable collection of objects that is partitioned and distributed across multiple physical nodes of a YARN cluster and that can be operated in parallel.

## TCL

Transaction Control (TCL) statements are used to manage the changes made by DML statements. It allows statements to be grouped together into logical transactions.

  * COMMIT - save work done
  * SAVEPOINT - identify a point in a transaction to which you can later roll back
  * ROLLBACK - restore database to original since the last COMMIT
  * SET TRANSACTION - Change transaction options like isolation level and what rollback segment to use
