<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Checking inode consumption by proces ID](#checking-inode-consumption-by-proces-id)
- [Get inode usage by directory](#get-inode-usage-by-directory)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Checking inode consumption by proces ID

```
for dir in /proc/*/fd;
do
    echo -n "$dir "; #need a space to get real columns for the sort
    ls $dir 2>/dev/null | wc -l;
done | sort -n -k 2
```

# Get inode usage by directory

This will dump a list of every directory on the filesystem prefixed with the number of files (and subdirectories) in that directory. Thus the directory with the largest number of files will be at the bottom.
```
find / -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n
```

This does have three caveats that I can think of. It does not properly handle anything with newlines in the path. I know my filesystem has no files with newlines, and since this is only being used for human consumption, the potential issue isn't worth solving (and one can always replace the \n with \0 and use sort -z above). It also does not handle if the files are spread out among a large number of directories. This isn't likely though, so I consider the risk acceptable. It will also count hard links to a same file (so using only one inode) several times. Again, unlikely to give false positives
