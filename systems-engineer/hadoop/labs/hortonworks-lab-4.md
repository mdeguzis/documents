<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Hortonworks](#hortonworks)
- [HDP Lab 4](#hdp-lab-4)
- [Lab commands](#lab-commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# About

Notes around pracitce labs and exercises. This lab is aimed at Apache Spark

# Hortonworks

Content of Labs is hosted at https://github.com/hortonworks/tutorials with content delivered and presented via hortonworks.com

# HDP Lab 4

Source: [Hortonworks.com (Hello World)](http://hortonworks.com/hadoop-tutorial/hello-world-an-introduction-to-hadoop-hcatalog-hive-and-pig/)

# Lab commands

**Import hive and sql libraries**
```
%spark
import org.apache.spark.sql.hive.orc._
import org.apache.spark.sql._

val hiveContext = new org.apache.spark.sql.hive.HiveContext(sc)
```

**Shows tables in the default hive database**
```
hiveContext.sql("show tables").collect.foreach(println)

Select all rows and columns from tables, stores hive script into variable and registers variables as RDD

val geolocation_temp1 = hiveContext.sql("select * from geolocation")

val drivermileage_temp1 = hiveContext.sql("select * from drivermileage")

geolocation_temp1.registerTempTable("geolocation_temp1")
drivermileage_temp1.registerTempTable("drivermileage_temp1")

val geolocation_temp2 = hiveContext.sql("SELECT driverid, count(driverid) occurance from geolocation_temp1  where event!='normal' group by driverid")

geolocation_temp2.registerTempTable("geolocation_temp2")
```

**Load first 10 rows from geolocation_temp2, which is the data from drivermileage table**
```
geolocation_temp2.take(10).foreach(println)
```

**Create joined to join 2 tables by the same driverid and register joined as a RDD**
```
val joined = hiveContext.sql("select a.driverid,a.occurance,b.totmiles from geolocation_temp2 a,drivermileage_temp1 b where a.driverid=b.driverid")

joined.registerTempTable("joined")
```

**Load first 10 rows and columns in joined**
```
joined.take(10).foreach(println)
```

**Initialize risk_factor_spark and register as an RDD**
```
val risk_factor_spark=hiveContext.sql("select driverid, occurance, totmiles, totmiles/occurance riskfactor from joined")

risk_factor_spark.registerTempTable("risk_factor_spark")
```

**Print the first 10 lines from the risk_factor_spark table**
```
risk_factor_spark.take(10).foreach(println)
```

**Create table finalresults in Hive, save it as ORC, load data into it, and then create the final table called riskfactor using CTAS**
```
hiveContext.sql("create table finalresults( driverid String, occurance bigint,totmiles bigint,riskfactor double) stored as orc").toDF()

risk_factor_spark.write.format("orc").save("risk_factor_spark")

hiveContext.sql("load data inpath 'risk_factor_spark' into table finalresults")

hiveContext.sql("create table riskfactor as select * from finalresults")
```
