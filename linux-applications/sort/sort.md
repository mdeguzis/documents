# sort string of words

This works for me:

```
$ echo "zebra ant spider spider ant zebra ant" | xargs -n1 | sort -u | xargs
ant spider zebra
```

You can transform a list of words in a single row to a single column with xargs -n1 , use sort -u and transform back to a single row with xargs.
