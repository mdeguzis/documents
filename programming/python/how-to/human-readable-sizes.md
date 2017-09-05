```
def sizeof_fmt(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f%s%s" % (num, 'Yi', suffix)
```

Supports:

* all currently known binary prefixes
* negative and positive numbers
* numbers larger than 1000 Yobibytes
* arbitrary units (maybe you like to count in Gibibits!)

Example:

```
>>> sizeof_fmt(168963795964)
'157.4GiB'
```

Credit: https://stackoverflow.com/questions/1094841/reusable-library-to-get-human-readable-version-of-file-size#
