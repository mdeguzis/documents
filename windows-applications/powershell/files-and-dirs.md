# About
Working with files and directories.

# How to list files recursively with size and last access date

```
get-childitem D:\temp -rec | where {!$_.PSIsContainer} |
select-object FullName, LastWriteTime, Length | export-csv -notypeinformation -delimiter '|' -path file.csv
```

Source: [StackOverflow](https://stackoverflow.com/a/13345137)
