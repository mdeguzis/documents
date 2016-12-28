<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Pig](#pig)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Pig

# Components

* Language called "Pig Latin" :)
* Grunt - interactive shell
* Piggbank - Shared repository for user defined functions (UDF)

# Topics

* [Pig Latin Basics - load](http://pig.apache.org/docs/r0.14.0/basic.html#load)
* [Pig Latin Basics - filter](http://pig.apache.org/docs/r0.14.0/basic.html#filter)
* [Pig Latin Basics - foreach](http://pig.apache.org/docs/r0.14.0/basic.html#foreach)
* [Pig Latin Basics - group](http://pig.apache.org/docs/r0.14.0/basic.html#group)
* [Pig Latin Basics - join](http://pig.apache.org/docs/r0.14.0/basic.html#join)
* [Pig Latin Basics - store](http://pig.apache.org/docs/r0.14.0/basic.html#store)

# Data Types

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

# Features and info

* Pig works with data from many sources, including structured and unstructured data,
* HiveQL similar to SQL (SQL92 spec)
* Effectively reads sperate value formats
* Multi-table inserts
* Vs. Hive, Pig is programmable, and can be used to build complexe data flows
* Supports many languages, such as Java, Python, Ruby, and others (via UDF).
* Pig Latin describes a directed acyclic graph (DAG)
* Convert SQL queries into MapReduce jobs without user knowledge of MapReduce itself
* Allows plugging in custom MapReduce scripts as queries
* Use illustrate, explain, describe, and local mode to test your script

# Uses

* ETL (Extract -> Transform -> Load)
* Preparing data for easier analysis
* Long series of steps to perform

# Working with data

If the data is in HCatalog, you can use the `HCatLoader() function` to load it.

Example:

**IMPORTANT**: You need to configure the Pig Editor to use HCatalog so that the Pig script can load the proper libraries. In the Pig arguments text box, enter -useHCatalog and click the Add button. Make sure to check the box to "Execute on Tez."

* [hadoop/examples/pig/ig-risk-factor.md](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/examples/pig/pig-risk-factor.md)

The script does not output any result – it stores the result into a Hive table – so your Results section will be empty. Click on the Logs section for Debugging. There is quite a lot of output here, but it is good review to review it. Some notable log entries to look for:

* The "Success" result text
* "Sucessfully read nnnnn recods" entries
* "Sucessfully stored nnnnn recods" entries

# Tipcs and tricks

* There is a syntax check from the drop down arrow in the top right where "Execute" lies.
* TAB will jump fields in PIG Helper templates. Annoying so, once you replace the field you highlighted, this does not work and the next generic field will have to be manually selected.
