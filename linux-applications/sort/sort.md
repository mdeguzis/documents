<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [sort string of words](#sort-string-of-words)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# sort string of words

This works for me:

```
$ echo "zebra ant spider spider ant zebra ant" | xargs -n1 | sort -u | xargs
ant spider zebra
```

You can transform a list of words in a single row to a single column with xargs -n1 , use sort -u and transform back to a single row with xargs.
