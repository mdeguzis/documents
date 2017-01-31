# About

The qaundry: Using update or subscribt:

Update method:
```
mydict.update({'newkey':'newvalue'})
```

subscript, iterative method:
```
mydict['newkey'] = 'newvalue'
```

# The science

A benchmark shows suspicions of the update method performance impact:

```
$ python -m timeit -s 'd = {"key": "value"}' 'd["key"] = "value"'
10000000 loops, best of 3: 0.0741 usec per loop
$ python -m timeit -s 'd = {"key": "value"}' 'd.update(key="value")'
1000000 loops, best of 3: 0.294 usec per loop
$ python -m timeit -s 'd = {"key": "value"}' 'd.update({"key": "value"})'
1000000 loops, best of 3: 0.461 usec per loop
```

That is, it's about six times slower on my machine. However, Python is already not a language you'd use if you need top performance, so I'd just recommend use of whatever is most readable in the situation. For many things, that would be the [] way, though update could be more readable in a situation like this:

```
configuration.update(
    timeout=60,
    host='example.com',
)
```

