<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
  - [History](#history)
  - [Where spark fits in](#where-spark-fits-in)
- [Highlights](#highlights)
- [Definitions](#definitions)
- [Some key points](#some-key-points)
- [Tips and tricks](#tips-and-tricks)
- [Basic configuration in Ambari](#basic-configuration-in-ambari)
- [Zeppelin](#zeppelin)
- [Interpreters](#interpreters)
- [RDD](#rdd)
  - [See also](#see-also)
- [Sample operations](#sample-operations)
- [Spark interactive shell](#spark-interactive-shell)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

## History

MapReduce has been useful, but the amount of time it takes for the jobs to run can at times be exhaustive. Also, MapReduce jobs only work for a specific set of use cases. There is a need for computing framework that works for a wider set of use cases.
Apache Spark was designed to be a fast, general-purpose, easy-to-use computing platform. It extends the MapReduce model and takes it to a whole other level. The speed comes from the in-memory computations. Applications running in memory allow for much faster processing and response.

## Where spark fits in

Apache Spark is a **fast, in-memory data processing engine** with elegant and expressive development APIs in Scala,Java, and Python and R that allow data workers to efficiently execute machine learning algorithms that 
require fast iterative access to datasets. Spark on Apache Hadoop YARN enables deep integration with Hadoop and other YARN enabled workloads in the enterprise.

# Highlights

* Batch applications
* Robust API (Scala,Java, and Python and R)
* Deep integration with Hadoop and YARN workloads
* Interactive queries
* Process streaming data 
* Can extend upwards into Machine Learning algorithms, SQL, straeming and graph processing
* Supports ORC file format (HDP 2.5+)

# Definitions

* **DF** - DF() creates a [DataFrame](https://ww2.coastal.edu/kingw/statistics/R-tutorials/dataframes.html), a table, or two-dimensional array-like structure, in which each column contains measurements on one variable, and each row contains one case
* **RDD** - Spark’s primary core abstraction is called a Resilient Distributed Dataset
* **sc** - Spark Context, the main entry point to Spark
* **val** - Stands for "value". Commonly used to store the result of an expression
* **var** - Variable
* **Zeppelin** - A web-based interpreter that enables interactive data analytics

# Some key points

* TThe SELECT operation is a RDD transformation and therefore does not return anything.
* A common way to query data from contexts, is to register it as a temporary table
* You can check the Spark version in a terminal window with `spark-submit --version`

# Tips and tricks

* ENTER operates as expected, but SHIFT+ENTER will processes the code

# Basic configuration in Ambari

1. Ambari Dashboard
2. Spark (left side services list)
3. Ensure Spark History Server and Spark Client are started\*
4. Start the Livy server (HDP 2.5+) by clicking on the Livy Server Link, then the name of the server (e.g "sandbox.hortonworks.com")
5. Locate the server/service and start it.
6. Go back to the Spark service and turn off maintenance mode (as we are not using Spark Thrift Server, which is down)

\* Livy Server is a new feature added to the latest Sandbox HDP Platform and it adds extra security while running spark jobs

# Zeppelin

In the sandbox environment from HDP, this is located at `andbox.hortonworks.com:9995` or `<IP_ADDRESS>:9995`. Create a new note. This in turn, loads the Spark Scala API.

# Interpreters

* **%spark** - default interpreter
* **%livy** - more secure

# RDD 

Spark’s primary core abstraction is called a Resilient Distributed Dataset or RDD. It is a distributed collection of elements that is parallelized across the cluster. In other words, a RDD is an immutable collection of objects that is partitioned and distributed across multiple physical nodes of a YARN cluster and that can be operated in parallel.

There are three methods for creating a RDD:

1. Parallelize an existing collection. This means that the data already resides within Spark and can now be operated on in parallel.
2. Create a RDD by referencing a dataset. This dataset can come from any storage source supported by Hadoop such as HDFS, Cassandra, HBase etc.
3. Create a RDD by transforming an existing RDD to create a new RDD.


## See also

* [Spark operations](https://spark.apache.org/docs/1.2.0/programming-guide.html#rdd-operations)
* [Spark transformations](https://spark.apache.org/docs/1.2.0/programming-guide.html#transformations)
* [Spark actions](https://spark.apache.org/docs/1.2.0/programming-guide.html#actions)


# Sample operations

See: [Hortonworks Lab 4 - Spark](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/labs/hortonworks-lab-4.md)

# Spark interactive shell

To access the Spark interactive shell, SSH into your sandbox/server and issue `spark-shell`. All commands used in Lab 4, noted above, can be issued in the interactive shell. Issuing `exit` will drop out of the shell.



# Links

* [Scala basics and tutorial](http://www.scala-lang.org/docu/files/ScalaTutorial.pdf)
- [Apache Spark](http://hortonworks.com/hadoop/spark/)
- [Apache Spark Welcome](http://spark.apache.org/)
- [Spark Programming Guide](http://spark.apache.org/docs/latest/programming-guide.html#passing-functions-to-spark)
- [Learning Spark](http://www.amazon.com/Learning-Spark-Lightning-Fast-Data-Analysis/dp/1449358624/ref=sr_1_1?ie=UTF8&qid=1456010684&sr=8-1&keywords=apache+spark)
- [Advanced Analytics with Spark](http://www.amazon.com/Advanced-Analytics-Spark-Patterns-Learning/dp/1491912766/ref=pd_bxgy_14_img_2?ie=UTF8&refRID=19EGG68CJ0NTNE9RQ2VX)
- [HDP DEVELOPER: APACHE SPARK USING SCALA](http://hortonworks.com/training/class/hdp-developer-apache-spark-using-scala/)
- [HDP DEVELOPER: APACHE SPARK USING PYTHON](http://hortonworks.com/training/class/hdp-developer-apache-spark-using-python/)
