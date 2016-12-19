<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Hortonworks](#hortonworks)
  - [Hello World](#hello-world)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes around pracitce labs and exercises

# Hortonworks

Content of Labs is hosted at https://github.com/hortonworks/tutorials with content delivered and presented via hortonworks.com


# HDP Lab 2

Source: [Hortonworks.com (Hello World)](http://hortonworks.com/hadoop-tutorial/hello-world-an-introduction-to-hadoop-hcatalog-hive-and-pig/)

## Some commands from the lab

* `show tables;` - List the tables created in the database by looking up the list of tables from the metadata stored in HCatalogdescribe
* `describe {table_name};` - Provides a list of columns for a particular table (ie describe geolocation;)
* `show create {table_name};` - Provides the DDL to recreate a table (ie show create table geolocation_stage;)
* `describe formatted {table_name};` - Explore additional metadata about the table. For example you can verify geolocation is an ORC Table, execute the following query:
* `LOAD DATA INPATH '/user/maria_dev/data/trucks.csv' OVERWRITE INTO TABLE trucks;` - Load data in an existing tabe via command, not the GUI (note this will move data out of it's original location to /apps/hive/warehouse/\<folder\>/).

## Notes

* By default, when you create a table in Hive, a directory with the same name gets created in the /apps/hive/warehouse folder in HDFS. Using the Ambari Files View, navigate to the /apps/hive/warehouse folder. You should see both a geolocation and trucks directory:
* Double click Hive worksheet tabs to rename them
* Use `CTRL+SPACE` to pull up the command completion suggestions (called "command asist by HDP")

##  ORC table creation

```
CREATE TABLE trucks (table_headers...) STORED AS ORC;
CREATE TABLE ubnbdtmqeshjetuutijoveildwlbbf () ROW FORMAT DELIMITED FIELDS TERMINATED BY '1' STORED AS TEXTFILE;
INSERT INTO TABLE default.trucks SELECT fields [...] FROM default.ubnbdtmqeshjetuutijoveildwlbbf;
DROP TABLE default.ubnbdtmqeshjetuutijoveildwlbbf;

```

The following Hive command can be used to LOAD data into existing table from the command line
```
LOAD DATA INPATH '/user/maria_dev/data/trucks.csv' OVERWRITE INTO TABLE trucks;
```

*However*, notice the original file is gone. The LOAD DATA INPATH command moved the trucks.csv file from the /user/maria_dev/data folder to the /apps/hive/warehouse/trucks_stage folder.


### Breakdown / behind the scenes

1. Create table with defined files as ORC 
2. Create temp table with defined fields as TEXTFILE
3. Dump the data from the temp table into the ORC table
4. Drop the temp table

## Using Java Database Connectivity (JDBC) over CLI

Command in tutorial leaves out password for 'hive', but this works fine under 'maria_dev'

SSH in:

```
ssh maria_dev@127.0.0.1 -p 2222
```

Connect JDBC:
```
[maria_dev@sandbox ~]$ beeline -u jdbc:hive2://localhost:10000 -n maria_dev
Connecting to jdbc:hive2://localhost:10000
Connected to: Apache Hive (version 1.2.1000.2.5.0.0-1245)
Driver: Hive JDBC (version 1.2.1000.2.5.0.0-1245)
Transaction isolation: TRANSACTION_REPEATABLE_READ
Beeline version 1.2.1000.2.5.0.0-1245 by Apache Hive
0: jdbc:hive2://localhost:10000> show tables;
Error: Error while compiling statement: FAILED: ParseException line 1:0 cannot recognize input near 'quit' 'exit' 'show' (state=42000,code=40000)
0: jdbc:hive2://localhost:10000> show tables;
+--------------+--+
|   tab_name   |
+--------------+--+
| geolocation  |
| sample_07    |
| sample_08    |
| trucks       |
+--------------+--+

```

You can also connect in 2 commands (beeline, then connect):

```
[maria_dev@sandbox ~]$ beeline
Beeline version 1.2.1000.2.5.0.0-1245 by Apache Hive
beeline> show tables;
No current connection
beeline> !connect jdbc:hive2://localhost:10000 maria_dev
Connecting to jdbc:hive2://localhost:10000
Enter password for jdbc:hive2://localhost:10000: *********
Connected to: Apache Hive (version 1.2.1000.2.5.0.0-1245)
Driver: Hive JDBC (version 1.2.1000.2.5.0.0-1245)
Transaction isolation: TRANSACTION_REPEATABLE_READ
0: jdbc:hive2://localhost:10000> 

```

## Analyze the Trucks Data 

```
CREATE TABLE truck_mileage STORED AS ORC AS SELECT truckid, driverid, rdate, miles, gas, miles / gas mpg FROM trucks LATERAL VIEW stack(54, 'jun13',jun13_miles,jun13_gas,'may13',may13_miles,may13_gas,'apr13',apr13_miles,apr13_gas,'mar13',mar13_miles,mar13_gas,'feb13',feb13_miles,feb13_gas,'jan13',jan13_miles,jan13_gas,'dec12',dec12_miles,dec12_gas,'nov12',nov12_miles,nov12_gas,'oct12',oct12_miles,oct12_gas,'sep12',sep12_miles,sep12_gas,'aug12',aug12_miles,aug12_gas,'jul12',jul12_miles,jul12_gas,'jun12',jun12_miles,jun12_gas,'may12',may12_miles,may12_gas,'apr12',apr12_miles,apr12_gas,'mar12',mar12_miles,mar12_gas,'feb12',feb12_miles,feb12_gas,'jan12',jan12_miles,jan12_gas,'dec11',dec11_miles,dec11_gas,'nov11',nov11_miles,nov11_gas,'oct11',oct11_miles,oct11_gas,'sep11',sep11_miles,sep11_gas,'aug11',aug11_miles,aug11_gas,'jul11',jul11_miles,jul11_gas,'jun11',jun11_miles,jun11_gas,'may11',may11_miles,may11_gas,'apr11',apr11_miles,apr11_gas,'mar11',mar11_miles,mar11_gas,'feb11',feb11_miles,feb11_gas,'jan11',jan11_miles,jan11_gas,'dec10',dec10_miles,dec10_gas,'nov10',nov10_miles,nov10_gas,'oct10',oct10_miles,oct10_gas,'sep10',sep10_miles,sep10_gas,'aug10',aug10_miles,aug10_gas,'jul10',jul10_miles,jul10_gas,'jun10',jun10_miles,jun10_gas,'may10',may10_miles,may10_gas,'apr10',apr10_miles,apr10_gas,'mar10',mar10_miles,mar10_gas,'feb10',feb10_miles,feb10_gas,'jan10',jan10_miles,jan10_gas,'dec09',dec09_miles,dec09_gas,'nov09',nov09_miles,nov09_gas,'oct09',oct09_miles,oct09_gas,'sep09',sep09_miles,sep09_gas,'aug09',aug09_miles,aug09_gas,'jul09',jul09_miles,jul09_gas,'jun09',jun09_miles,jun09_gas,'may09',may09_miles,may09_gas,'apr09',apr09_miles,apr09_gas,'mar09',mar09_miles,mar09_gas,'feb09',feb09_miles,feb09_gas,'jan09',jan09_miles,jan09_gas ) dummyalias AS rdate, miles, gas;
```

* Lateral view: [link](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+LateralView)


## Tez practice

* Review query results with Tez enabled (Hive > Settings > add value set [hive.execution.engine, tez])
* Persist results into a table -  this is a fairly common pattern in Hive and it is called [Create Table As Select](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-CreateTableAsSelect(CTAS)) (CTAS).
