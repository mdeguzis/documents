<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Overview](#overview)
- [Comparisons](#comparisons)
- [ODBC vs JDBC](#odbc-vs-jdbc)
  - [What is ODBC?](#what-is-odbc)
  - [What is JDBC?](#what-is-jdbc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Details OBBC and JDBC

# Overview

ODBC is an open interface which can be used by any application to communicate with any database system, while JDBC is an interface that can be used by Java applications to access databases. Therefore, unlike JDBC, ODBC is language independent. But by using JDBC-to-ODBC bridge Java applications can also talk to any ODBC compliant database.

# Comparisons

* **Multithread:** JDBC is multi-threaded - ODBC is not multi-threaded (at least not thread safe)
* **Flexibility:** ODBC is a windows-specific technology - JDBC is specific to Java, and is therefore supported on whatever OS supports Java
* **Power:** You can do everything with JDBC that you can do with ODBC, on any platform.
* **Language:** ODBC is procedural and language independent - JDBC is object oriented and language dependent (specific to java).
* **Heavy load:** JDBC is faster - ODBC is slower
* **ODBC limitation:** It is a relational API and can only work with data types that can be expressed in rectangular or two-dimensional format. (it will not work with data types like Oracle’s spatial data type)
* **API:** JDBC API is a natural Java Interface and is built on ODBC, and therefore JDBC retains some of the basic feature of ODBC

# ODBC vs JDBC

Typically, software applications are written in a specific programming language (such as Java, C#, etc.), while databases accept queries in some other database specific language (such as SQL). Therefore, when a software application needs to access data in a database, an interface that can translate languages to each other (application and database) is required. Otherwise, application programmers need to learn and incorporate database specific languages within their applications. ODBC (Open Database Connectivity) and JDBC (Java DatabBase Connectivity) are two interfaces that solve this specific problem. ODBC is a platform, language and operating system independent interface that can be used for this purpose. Similarly, JDBC is a data API for the Java programming language. Java programmers can use JDBC-to-ODBC bridge to talk to any ODBC compliant database.

## What is ODBC?

ODBC is an interface to access database management systems (DBMS). ODBC was developed by SQL Access Group in 1992 at a time there were no standard medium to communicate between a database and an application. It does not depend on a specific programming language or a database system or an operating system. Programmers can use ODBC interface to write applications that can query data from any database, regardless of the environment it is running on or the type of DBMS it uses.

Because ODBC driver acts as a translator between the application and the database, ODBC is able to achieve the language and platform independence. This means that the application is relieved of the burden of knowing the database specific language. Instead it will only know and use the ODBS syntax and the driver will translate the query to the database in a language it can understand. Then, the results are returned in a format that can be understood by the application. ODBC software API can be used with both relational and non relational database systems. Another major advantage of having ODBC as a universal middleware between an application and a database is that every time the database specification changes, the software does not need to be updated. Only an update to the ODBC driver would be sufficient.

## What is JDBC?

JDBC is a Data API developed for Java programming language. It was released with JDK 1.1 by Sun Microsystems (Java’s initial owners). And its current version is JDBC 4.0 (currently distributed with JAVA SE6). Java.sql and javax.sql packages contain the JDBC classes. It is an interface that helps a client to access a database system, by providing methods to query and update data in the databases. JDBC is more suitable for object oriented databases. You can access any ODBC-compliant database by using the JDBC-to-ODBC bridge.
