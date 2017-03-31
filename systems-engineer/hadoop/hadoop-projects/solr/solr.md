<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Structure](#structure)
- [Features](#features)
- [Indexing](#indexing)
- [Analysis](#analysis)
- [Solr config](#solr-config)
  - [solrconfig.xml](#solrconfigxml)
  - [solr.xml](#solrxml)
  - [core.properties](#coreproperties)
  - [schema.xml](#schemaxml)
- [Querying](#querying)
- [SolrCloud](#solrcloud)
- [Search](#search)
- [Scalability](#scalability)
- [Shards](#shards)
- [Links:](#links)
- [Videos](#videos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Rapid indexing & search on Hadoop

Apache Solr is the open source platform for searches of data stored in HDFS in Hadoop. Solr powers the search and navigation features of many of the world’s largest Internet sites, enabling powerful full-text search and near real-time indexing. Whether users search for tabular, text, geo-location or sensor data in Hadoop, they find it quickly with Apache Solr.

See the [diagrams](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/diagrams) directory for more.

# Structure

* Solr Core
 * Running instance of Lucene index (SolrConfigXML, SchemaXML, etc...)
 * A singe Solr application can contain 0 or more cores
 * Core are largely in isolation, but can communicate with each other if necessary vai the CoreContainer
 * Solr initially only supported one index, and the SolrCore class was a singleton for coordinating the low-level functionality at the "core" of Solr
 * Documents and fields
  * Basic unit of information is a "document," a set of data that descirbes something
  * Documents composed of fileds, which are more specific pieces of information
  * Fields can contain different kinds of data. A name field, for example, is text (character data)
  * The field type tells Solr how to interpret the field  and how it can be queried
* Indexing
 * A Solr index can accept data form many different sources, including XML files, CSV files, data extracted from tabes in a database, and files in common file formats such as Microsoft Word or PDFs

Architecture pieces (high-level):

* Request handlers
* Request Writers
* Update Handlers
* Search components
* Update processors

# Features

* Uses the [Lucene Search Libary](https://lucene.apache.org/core/)
* Exposes Lucene Java API's as REST-Full services
* Advanced full-text search
* Near real-time indexing
* Standards-based open interfaces like XML, JSON and HTTP
* Comprehensive HTML administration interfaces
* Server statistics exposed over JMX for monitoring
* Linearly scalable, auto index replication, auto failover and recovery
* Flexible and adaptable, with XML configuration
* Other features
 * Faceting -  Allows users to narrow search results in ways that are meaningful to your application
 * Highlighting
 * Spell checking
 * Query re-ranking
 * Transforming
 * Suggestors
 * "More like this"
 * Pagination
 * Group and clustering
 * Spatial search
 * components
 * real time (get and update)
 * LABS

# Indexing

You put documents in Solr via "indexing," using XML, JSON, CSV, or binary over http

Common indexing methods include

* Uploading XML files by sending HTTP requests to Solr
* Using Index Handles to import from databases
* Using the Solr Cell framework
* Writign custom Java appliation to ingest data through Solr's Java client

# Analysis

* 3 pieces - analyzers, tokenizers, and filters
* Analyzers - used both during, when a document is indexed, at at query time
 * The same analysis process need not be used for both operations
 * An analyzer examines the text fields and generates a token stream
 * Analyzers may be a single class or they may be composed of a sieres of tokenizer and filters classes
* Tokenizers - break field data into lexical units, or tokens
* Filters - examine a stream of tokens and keep them, transform or discard them, or create new ones.

All of the above elemeents can be then configured in you configuration file, `solrconfig.xml`.

# Solr config

See [solr-instances.png](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/diagrams/solr-instances.png)

* `solrconfig.xml` - configuration for all indexing and searching
* `solr.xml` - At the entire solr level
* `core.properties` - Define properties at the core level
* `schema.xml` - Core data strucuture level (data fields)
* `elevate.xml` - Elevated query results file determined by the config-file arguments

## solrconfig.xml

* `<config>` - Begginging of config file
* `<luceneMatchVersion>4.7</luceneMatchVersion>` - Activates version dependent features in Lucene
* `lib dir` - lib directives indicate where Solr can find JAR files and extensions
* Index management settings sections
 * `<lib dir>`
 * `<dataDir>`
 * `<directoryFactory name>`
 * `<indexConfig>`
 * `<jmx>`
* `<updateHandler class>` - Upate handler for indexing documents
* `<listener>`/`<listener event>` - Register event handlers for searcher events; for example queries to execute to warm new searchers
* `<query>`
 * Cache-management seettings
  * `<filtercache>`
  * `<queryResultCache>`
  * `<documentCache>`

See: [Solr-solconfig.xml.png](https://github.com/mdeguzis/documents/blob/master/systems-engineer/hadoop/diagrams/solr-solrconfig.xml.png)

## solr.xml

## core.properties

## schema.xml

# Querying

You query Solr via HTTP GET and receive XML, JSON, CSV, or binary results.

# SolrCloud

* Apache Solr includes the ability to set up a cluster of Solr servers that combines fault tolerance and high availability (distributed architecture) called SolrCloud
* SolrCloud is flexible distributed search and indexing without a master node to allocate nodes, shares, and replicas
* Solr uses ZooKeeper to manage these locations, depending on configuration files and schemas
* Documents can be sent to any server and ZooKeeper will figure it out

Features

* Horizonatal scaling
* Elastic scaling
* High availability
* Distributed indexing
* Distribution searching
* Central configuration for entire cluster
* Automatic load balancing
* Automatic failover for queries
* ZooKeeper integration for coordination and configurations

# Search

# Scalability

One technique available is to increase the "Replication Factor" of your collection, which allows you to add servers with additional copies of your collection to handle higher concurrent query load by spreading the requests around to multiple machines.  Sharding and Replication are not mutually exclusive, and together make Solr an extremely powerful and scalable platform.

# Shards

"Sharding" is a scaling technique in which a collection is split into multiple logical pieces called "shards" in order to scale up the number of documents in a collection beyond what could physically fit on a single server.  Incoming queries are distributed to every shard in the collection, which respond with merged results.  

# Links:

* [Solr (Apache)](https://hortonworks.com/apache/solr/)
* [Solr Client API Overview](https://cwiki.apache.org/confluence/display/solr/Client+APIs)
* [SolrCloud Overview](https://support.lucidworks.com/hc/en-us/articles/201298317-What-is-SolrCloud-And-how-does-it-compare-to-master-slave-)
* [Solr Wiki](https://wiki.apache.org/solr/FrontPage)

# Videos

* [What is Apache Solr? (udureka)](https://www.youtube.com/watch?v=TKcHFpJduOE)
