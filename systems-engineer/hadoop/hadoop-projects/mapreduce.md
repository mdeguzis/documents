<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [MapReduce](#mapreduce)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MapReduce

* The Map function divides the input into ranges by the InputFormat and creates a map task for each range in the input. The JobTracker distributes those tasks to the worker nodes. The output of each map task is partitioned into a group of key-value pairs for each reduce. 
* The Reduce function then collects the various results and combines them to answer the larger problem that the master node needs to solve. Each reduce pulls the relevant partition from the machines where the maps executed, then writes its output back into HDFS. Thus, the reduce is able to collect the data from all of the maps for the keys and combine them to solve the problem.
* The phases are input, map, shuffle and sort, reduce, and output. For Unix geeks, this is analogous to `cat`, `grep`, `sort`, `unique`, and `output`.
* In a simplistic view, this process entails eating input and flipping keys around.
