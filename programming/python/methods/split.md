# About

Split method

```
str.split(str="", num=string.count(str)).

str -- This is any delimeter, by default it is space.
num -- this is number of lines minus one
```


# Example

Example 1
```
>>> testfile = '/home/me/test.txt'
>>> testfile.split('/')
['', 'home', 'me', 'test.txt']
>>> testfile.split('/')[-1]
'test.txt'
>>> testfile.split('/')[-2]
'me'
```

If all you're after is the basename, you can achieve that with `os` as well:

```
>>> os.path.basename(testfile)
'test.txt'
```

# Links

* [split() method (Tutorials Point)](https://www.tutorialspoint.com/python/string_split.htm)
