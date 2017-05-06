<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Loading data](#loading-data)
- [The curl Utility for Transferring Files](#the-curl-utility-for-transferring-files)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

A Solr index can accept data from many different sources, including XML files, comma-separated value (CSV) files, data extracted from tables in a database, and files in common file formats such as Microsoft Word or PDF.

# Loading data

* Using the Solr Cell framework built on Apache Tika for ingesting binary files or structured files such as Office, Word, PDF, and other proprietary formats.
* Uploading XML files by sending HTTP requests to the Solr server from any environment where such requests can be generated.
* Writing a custom Java application to ingest data through Solr's Java Client API (which is described in more detail in Client APIs. Using the Java API may be the best choice if you're working with an application, such as a Content Management System (CMS), that offers a Java API.

The common basic data structure for data being fed into a Solr index is a document containing multiple fields, each with a name and containing content, which may be empty. 

# The curl Utility for Transferring Files

Many of the instructions and examples in this section make use of the curl utility for transferring content through a URL. curl posts and retrieves data over HTTP, FTP, and many other protocols. Most Linux distributions include a copy of curl
