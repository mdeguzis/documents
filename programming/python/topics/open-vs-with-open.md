# Why or why not?

Using with statement is not for performance gain, I do not think there are any performance gains or loss associated with using with statement, as long as, you perform the same cleanup activity that using with statement would perform automatically.

# The main difference

When you use with statement with open function, you do not need to close the file at the end, because with would automatically close it for you.

# Additional functionality

Also, with statement is not just for openning files, with is used in conjuction with context managers. Basically, if you have an object that you want to make sure it is cleaned once you are done with it or some kind of errors occur, you can define it as a [context manager](https://docs.python.org/2/library/contextlib.html) and with statement will call its `__enter__()` and `__exit__()` methods on entry to and exit from the with block. According to [PEP 0343](https://www.python.org/dev/peps/pep-0343/) -

# performance testing of using with and not using it

```
In [14]: def foo():
   ....:     f = open('a.txt','r')
   ....:     for l in f:
   ....:         pass
   ....:     f.close()
   ....:

In [15]: def foo1():
   ....:     with open('a.txt','r') as f:
   ....:         for l in f:
   ....:             pass
   ....:

In [17]: %timeit foo()
The slowest run took 41.91 times longer than the fastest. This could mean that an intermediate result is being cached
10000 loops, best of 3: 186 µs per loop

In [18]: %timeit foo1()
The slowest run took 206.14 times longer than the fastest. This could mean that an intermediate result is being cached
10000 loops, best of 3: 179 µs per loop

In [19]: %timeit foo()
The slowest run took 202.51 times longer than the fastest. This could mean that an intermediate result is being cached
10000 loops, best of 3: 180 µs per loop

In [20]: %timeit foo1()
10000 loops, best of 3: 193 µs per loop

In [21]: %timeit foo1()
10000 loops, best of 3: 194 µs per loop
```
