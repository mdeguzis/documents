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
