<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [How to list files recursively with size and last access date](#how-to-list-files-recursively-with-size-and-last-access-date)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Working with files and directories.

# How to list files recursively with size and last access date

```
get-childitem D:\temp -rec | where {!$_.PSIsContainer} |
select-object FullName, LastWriteTime, Length | export-csv -notypeinformation -delimiter '|' -path file.csv
```

Source: [StackOverflow](https://stackoverflow.com/a/13345137)
