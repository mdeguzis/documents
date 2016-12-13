# About

Detailed information and examples for Hadoop Hive.

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
