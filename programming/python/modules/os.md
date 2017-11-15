# About

Notes on using the OS module

# Walking directories

## Get a recurive list

```
for dirpath, dirs, files in os.walk('/my/path'):
  path = dirpath.split(os.sep)
  for f in files:
    filename =  dirpath + os.sep + f
    print filename
```

# Links

* https://docs.python.org/2/library/os.html
* http://www.bogotobogo.com/python/python_traversing_directory_tree_recursively_os_walk.php
