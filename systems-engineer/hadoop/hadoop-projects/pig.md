# Pig

Components

* Language called "Pig Latin" :)
* Grunt - interactive shell
* Piggbank - Shared repository for user defined functions (UDF)

Data Types

* Tuple - ordered set of values
```
("2012-09-22", "ERROR",404, "Page not found")
```

* Bag - unordered collection of tuples, e.g `("2012-09-22", "ERROR",404, "Page not found")`
```
{
  ("2012-09-22", "ERROR", 404, "Page not found")
  ("2012-09-22", "INFO", 200 "OK")
}
```

* Map - collection of key balue pairs
```
[firstName#Cary, lastName#Grant,id#123]
```

Features and info

* HiveQL similar to SQL (SQL92 spec)
* Multi-table inserts
* Vs. Hive, Pig is programmable, and can be used to build complexe data flows
* Supports many languages, such as Java, Python, Ruby, and others.
* Pig Latin describes a directed acyclic graph (DAG)
* Convert SQL queries into MapReduce jobs without user knowledge of MapReduce itself
* Allows plugging in custom MapReduce scripts as queries
* Use illustrate, explain, describe, and local mode to test your script

Uses

* ETL (Extract -> Transform -> Load)
* Preparing data for easier analysis
* Long series of steps to perform
