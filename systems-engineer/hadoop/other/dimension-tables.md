<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Fact Table](#fact-table)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

In data warehousing, a dimension table is one of the set of companion tables to a fact table.
The fact table contains business facts (or measures), and foreign keys which refer to candidate keys 
(normally primary keys) in the dimension tables.

Contrary to fact tables, dimension tables contain descriptive attributes (or fields) that are typically textual fields
(or discrete numbers that behave like text). These attributes are designed to serve two critical purposes: 
query constraining and/or filtering, and query result set labeling.

# Fact Table

In data warehousing, a Fact table consists of the measurements, metrics or facts of a business process. 
It is located at the center of a [star schema](https://en.wikipedia.org/wiki/Star_schema) or a snowflake schema surrounded by dimension tables. Where multiple 
fact tables are used, these are arranged as a fact constellation schema. A fact table typically has two types of columns: 
those that contain facts and those that are a foreign key to dimension tables. 

The primary key of a fact table is usually a composite key that is made up of all of its foreign keys. 
Fact tables contain the content of the data warehouse and store different types of measures like additive, 
non additive, and semi additive measures.

# Links

* [Dimension table](https://en.wikipedia.org/wiki/Dimension_(data_warehouse)#Dimension_table) 
* [Fact Table](https://en.wikipedia.org/wiki/Fact_table)
* [Star Schema](https://en.wikipedia.org/wiki/Star_schema)
