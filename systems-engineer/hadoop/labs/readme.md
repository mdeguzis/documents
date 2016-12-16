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


## Hello World

Source: [Hortonworks.com (Hello World)](http://hortonworks.com/hadoop-tutorial/hello-world-an-introduction-to-hadoop-hcatalog-hive-and-pig/)

**Some commands from the lab:**

* `show tables;` - List the tables created in the database by looking up the list of tables from the metadata stored in HCatalogdescribe
* `describe {table_name};` - Provides a list of columns for a particular table (ie describe geolocation;)
* `show create {table_name};` - Provides the DDL to recreate a table (ie show create table geolocation_stage;)
* `describe formatted {table_name};` - Explore additional metadata about the table. For example you can verify geolocation is an ORC Table, execute the following query:
