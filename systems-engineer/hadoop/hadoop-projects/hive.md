<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Managing tables](#managing-tables)
- [Key points](#key-points)
- [HiveQL (Hive Query Language)](#hiveql-hive-query-language)
  - [Examples](#examples)
    - [Creating table](#creating-table)
    - [Loading data](#loading-data)
    - [Inserting data](#inserting-data)
    - [Overwrite data](#overwrite-data)
    - [Subquery](#subquery)
    - [Full example of a complete simple query](#full-example-of-a-complete-simple-query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Detailed information and examples for Hadoop Hive.

Hive is an SQL like query language that enables those analysts familiar with SQL to run queries on large volumes of data.  Hive has three main functions: data summarization, query and analysis. Hive provides tools that enable easy data extraction, transformation and loading (ETL). Hive is comprised of yables (think RDMS) made up of partitions. Hive is not suited for real-time queries and row-level updates. It is more designed for assesing immutable objects, such as logs.

Hive consists of Data (located in HDFS as file(s)) and Schema (representation of a plan or theory in the form of an outline or model). Schema and data are seperate, as data can be removed or added independently. Think of Schema as layout that provides direction on where Hive can be "pointed" or what defintions Hive should adhere to. Schema is required if you have existing data in HDFS that you want to use in Hive.

There are several runtimes Hive can use when executing SQL queries:

* Hadoop MapReduce
* Tez
* Spark

Also take note of:

* ORC - A fast columnar storage file format for Hadoop workloads. The Optimized Row Columnar file format provides a highly efficient way to store Hive data. It was designed to overcome limitations of the other Hive file formats. Using ORC files improves performance when Hive is reading, writing, and processing data.

Components:

* HCatalog - table and storage management layer that enables users with different data processing tools  to more easily read and write data on the grid
* WebHCat - service that you can use to run Hadoop MapReduce (or YARN), Pig, Hive jobs or perform Hive metadata operations using an HTTP (REST style) interface.

Uses:

* Query data
* Specific Questions


# Managing tables

operation| syntax
---------|-----------
See current tables | hive> SHOW TABLES
Check the schema | hive> ALTER TABLE mytable RENAME to mt;
Add a column | hive> ALTER TABLE mytable ADD COLUMNS (mycol STRING);
Drop a partition | hive> ALTER TABLE mytable DROP PARTITION (age=17)


# Key points

* Interface is SQL-like
* Files are not modified by hive when loaded
* Use OVERWRITE to write over a file of the same name
* Default Hive warehouse location: `/hive/warehouse`
* Hive can read all files in a particular directory
* Schema is checked when data is queried
  * If row does not match the schema, is read as NULL
* Supports subqueries, but only in the FROM clause
  * Columns in the subquery SELECT list are available in the outer query

# HiveQL (Hive Query Language)

HiveQL is similar to many operations you'd use in SQL. As you can see below, manyt SQL, or SQL-like operations are supported.

Some of the supported query operations:
* SELECT
* WHERE
* UNION ALL
* DISTINCT
* JOIN
* GROUP BY
* ORDER BY
* SORT BY
* HAVING
* LIMIT
* REGEX expressions such as `SELECT '(ds|hr) ?+.+' FROM mytable;`

## Examples

###Creating table
```
CREATE TABLE mytable (name string, age int);
```

###Loading data
```
# Load data local inpath
hive> LOAD DATA LOCAL INPATH 'path_to/mydata/data.txt' INTO TABLE myTable;

# Load data inpath
hive> LOAD DATA INPATH 'path_to/mydata/data.txt' INTO TABLE myTable;
```

###Inserting data
```
INSERT INTO mytable SELECT fname, lname, date 
WHERE data IS NOT NULL;
```

###Overwrite data
```
# Overwrite in table
INSERT OVERWRITE TABLE mytable 
  SELECT age, COUNT(age) 
  FROM mytable;
  
# Write to HDFS directory
INSERT OVERWRITE DIRECTORY `/hdfs/myresult`
SELECT *
FROM mytable;

# Local directory
INSERT OVERWRITE LOCAL DIRECTORY...
```

###Subquery
IN the below example, the piece in parenthesis is the subquery. `my_query` is the subquery name.
```
SELECT total FROM
  (SELECT c1 + c2 AS total FROM mytable) my_query
```

###Full example of a complete simple query

```
SELECT * FROM customers ; 
COUNT (1) FROM customers; 

SELECT firstName, lastName, address , zip 
FROM customers WHERE order-ID > O 
GROUP BY zip; 

SELECT customers .* , orders.* 
FROM customers 
JOIN orders ON 
(customers.customerID = orders.customerID) 

SELECT customers.*, orders.*
FROM customers 
LEFT OUTER JOIN orders ON 
(customers.customerID = orders.customerID) 
```
