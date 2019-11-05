<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [postgresql - VACUUM returning disk space to operating system](#postgresql---vacuum-returning-disk-space-to-operating-system)
    - [Prepare empty pages at the end of a table for testing](#prepare-empty-pages-at-the-end-of-a-table-for-testing)
    - [Disk full](#disk-full)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


[Source](https://dba.stackexchange.com/questions/37028/vacuum-returning-disk-space-to-operating-system "Permalink to postgresql - VACUUM returning disk space to operating system")

# postgresql - VACUUM returning disk space to operating system

To return space to the OS, use **[`VACUUM FULL`**][1]. While being at it, I suppose you run `VACUUM FULL ANALYZE`. [I quote the manual][1]:

> `FULL`
> 
> Selects "full" vacuum, **which can reclaim more space**, but takes much longer and exclusively locks the table. This method also requires extra disk space, since it writes a new copy of the table and doesn't release the old copy until the operation is complete. Usually this should only be used when a significant amount of space needs to be reclaimed from within the table.

Bold emphasis mine.

[`CLUSTER`][2] achieves that, too, as a collateral effect.

Plain `VACUUM` does not normally achieve your goal (_"one or more pages at the end of a table entirely free"_). It does not reorder rows and only prunes empty pages from the physical end of the file when the opportunity arises - like your quote from the manual instructs.

You can get empty pages at the end of the physical file when you `INSERT` a batch of rows and `DELETE` them before other tuples get appended. Or it can happen by coincidence if enough rows are deleted.

There are also special settings that might prevent `VACUUM FULL` from reclaiming space. See:

### Prepare empty pages at the end of a table for testing

The system column `ctid` represents the physical position of a row. You need to understand that column:

We can work with that and prepare a table by deleting all rows from the last page:
    
    
    DELETE FROM tbl t
    USING (
       SELECT (split_part(ctid::text, ',', 1) || ',0)')::tid     AS min_tid
            , (split_part(ctid::text, ',', 1) || ',65535)')::tid AS max_tid
       FROM   tbl
       ORDER  BY ctid DESC
       LIMIT  1
       ) d
    WHERE t.ctid BETWEEN d.min_tid AND d.max_tid;
    

Now, the last page is empty. This ignores concurrent writes. Either you are the only one writing to that table or you need to to take a write lock to avoid interference.

The query is optimized to identify qualifying rows quickly. The second number of a `tid` is the tuple index stored as unsigned `int2`, and `65535` is the maximum for that type (`2^16 - 1`), so that's the safe upper bound.

[**SQL Fiddle**][3] (reusing a simple table from a different case.)

Tools to measure row / table size:

### Disk full

You need wiggle room on disk for any of these operations. There is also the community tool **[`pg_repack`**][4] as replacement for `VACUUM FULL` / `CLUSTER`. It avoids exclusive locks but needs free space to work with as well. [The manual:][5]

> Requires free disk space twice as large as the target table(s) and indexes.

As a last resort, you can run a dump/restore cycle. That removes all bloat from tables and indexes, too. Closely related question:

The answer over there is pretty radical. If your situation allows for it (no foreign keys or other references preventing row deletions), and no concurrent access to the table), you can just:

Dump the table to disk connecting from a **remote computer** with **plenty of disk space** (`-a` for `\--data-only`):

From remote shell, dump table data:
    
    
    pg_dump -h  -p  -t mytbl -a mydb > db_mytbl.sql
    

In a pg session, `TRUNCATE` the table:
    
    
    -- drop all indexes and constraints here for best performance
    TRUNCATE mytbl;
    

From remote shell, restore to same table:
    
    
    psql -h  -p  mydb -f db_mytbl.sql
    -- recreate all indexes and constraints here
    

It is now free of any dead rows or bloat.

But maybe you can have that simpler?

* Can you make enough space on disk by deleting (moving) unrelated files?
* Can you `VACUUM FULL` smaller tables first, one by one, thereby freeing up enough disk space?
* Can you run [`REINDEX TABLE`][6] or `REINDEX INDEX` to free disk space from bloated indexes?

Whatever you do, **don't be rash**. If in doubt, backup everything to a secure location first.

[1]: https://www.postgresql.org/docs/current/sql-vacuum.html
[2]: https://www.postgresql.org/docs/current/sql-cluster.html
[3]: http://sqlfiddle.com/#!15/f22e5/30
[4]: https://github.com/reorg/pg_repack
[5]: https://reorg.github.com/pg_repack/
[6]: https://www.postgresql.org/docs/current/sql-reindex.html

  
