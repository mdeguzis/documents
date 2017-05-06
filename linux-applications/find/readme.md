# About

Find command usage, tips, and tricks

# Finding files based on date or age

## mtime and ctime explanation
```
find . -mtime 0   # find files modified between now and 1 day ago
                  # (i.e., within the past 24 hours)
find . -mtime -1  # find files modified less than 1 day ago
                  # (i.e., within the past 24 hours, as before)
find . -mtime 1   # find files modified between 24 and 48 hours ago
find . -mtime +1  # find files modified more than 48 hours ago
```

## file age

Basic
```
# created older than 3 days
sudo find /tmp/dir/* -ctime +3

# created newer than 3 days
sudo find /tmp/dir/* -ctime -3

# created by date
sudo find /tmp/dir/* -ctime +3 -printf "%T+\t%p\n" | sort
```

## file age by date / time
```
# created older than <DATE>
sudo find /tmp/dir/* -not -newermt 2017-05-04 -printf "%T+\t%p\n" | sort

# created newer than <DATE>
sudo find /tmp/dir/* -newermt 2017-05-04 -printf "%T+\t%p\n" | sort
```
