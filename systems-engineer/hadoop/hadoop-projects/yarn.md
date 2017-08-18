<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Yarn](#yarn)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Yarn

* The fundamental idea of YARN is to split up the two major responsibilities of the JobTracker i.e. resource management and job scheduling/monitoring, into separate daemons: a global **ResourceManager** and per-application **ApplicationMaster** (AM).
* The ResourceManager and per-node slave, the NodeManager (NM), form the new, and generic, system for managing applications in a distributed manner.
* ResourceManager and ApplicationMaster negotiate resources, while the per-node NodeManager keeps ResourceManager informed of that node's running resources (CPR, RAM, Disk, Network).
* YARN uses the existing MapReduce framework, providing compatibility with existing MapReduce users.
* Procedurally:
  * Application container is spawned
  * ApplicationMaster for container makes resource request to resource manager
  * ResourceManager is also aware of the node specifications from the NodeManager.
  * ResoureceManager allocates available resources via the pluggable Scheduler

# Use different version jar file with same name

To use different version jar file with same name, clear cache on all NodeManager hosts to prevent the application using old jar
Article

To clear local file cache and user cache for yarn, perform the following:

Find out the cache location by checking the value of the yarn.nodemanager.local-dirs property :
```
<property>       
<name>yarn.nodemanager.local-dirs</name>       
<value>/hadoop/yarn/local</value> 
</property>
```

Remove filecache and usercache folder located inside the folders that is specified in yarn.nodemanager.local-dirs.
```
[yarn@node2 ~]$ cd /hadoop/yarn/local/ 
[yarn@node2 local]$ ls filecache  nmPrivate  spark_shuffle  usercache 
[yarn@node2 local]$ rm -rf filecache/ usercache/
```
