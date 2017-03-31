<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Basic operation](#basic-operation)
  - [Starting postgres](#starting-postgres)
  - [Basic commands](#basic-commands)
  - [Common commands](#common-commands)
  - [command examples](#command-examples)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Info on using postgres. More detailed information should be sourced from additional pages in this directory.

# Basic operation

## Starting postgres

```
sudo -u postgres psql -d <OPTIONAL_DBNAME>
```

## Basic commands

Command | Actions
--------|----------------------
\l	| List all databases
\c | dbname	Connect to new database.
\dt	| To view list of relations/tables
\d | tablename	Describe the details of given table.
\h	| Get a help on syntax of SQL commands
\?	| Lists all psql slash commands.
\set	| System variables list.
\q	| Quit psql

## Common commands

Command | Actions
--------|----------------------
show all tables | \dt
List databases from within a pg shell | \\\|
describe table | \d \<TABLE_NAME\>
list system tables | select * from pg_tables where tableowner = 'postgres';
list all schemas | \dn
list all users | \du
quit postgres | \q

## command examples

Command | Example
--------|----------------
Load database | psql -W -U username -H hostname < file.sql 
Dump database | pg_dump -W -U username -h hostname database_name > file.sql 
Copy databse | CREATE DATABASE newdb WITH TEMPLATE originaldb;
Change DB owner | alter database database_name owner to new_owner;
View DB connections | SELECT * FROM pg_stat_activity;
Show data directory | show data_directory;
Show stored proc source | SELECT prosrc FROM pg_proc WHERE proname = 'procname'
Restore dump file | pg_restore --verbose --clean --no-acl --no-owner -h localhost -U myuser -d mydb latest.dump


# Links

* [Basic PSQL commands](https://manikandanmv.wordpress.com/tag/basic-psql-commands/)
* [postgresql login commands](http://jazstudios.blogspot.com/2010/06/postgresql-login-commands.html)
* Postgres operations
 * [Like clause](https://www.tutorialspoint.com/postgresql/postgresql_like_clause.htm)
