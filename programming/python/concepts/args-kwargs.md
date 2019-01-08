

The *args and **kwargs is a common idiom to allow arbitrary number of arguments to functions as described in the section more on defining functions in the Python documentation.

The *args will give you all function parameters as a tuple:


In [1]: def foo(*args):
   ...:     for a in args:
   ...:         print a
   ...:         
   ...:         

In [2]: foo(1)
1


In [4]: foo(1,2,3)
1
2
3
The **kwargs will give you all keyword arguments except for those corresponding to a formal parameter as a dictionary.

In [5]: def bar(**kwargs):
   ...:     for a in kwargs:
   ...:         print a, kwargs[a]
   ...:         
   ...:         

In [6]: bar(name='one', age=27)
age 27
name one
Both idioms can be mixed with normal arguments to allow a set of fixed and some variable arguments:

def foo(kind, *args, **kwargs):
   pass
Another usage of the *l idiom is to unpack argument lists when calling a function.

In [9]: def foo(bar, lee):
   ...:     print bar, lee
   ...:     
   ...:     

In [10]: l = [1,2]

In [11]: foo(*l)
1 2
In Python 3 it is possible to use *l on the left side of an assignment (Extended Iterable Unpacking), though it gives a list instead of a tuple in this context:

first, *rest = [1,2,3,4]
first, *l, last = [1,2,3,4]
Also Python 3 adds new semantic (refer PEP 3102):

def func(arg1, arg2, arg3, *, kwarg1, kwarg2):
    pass
Such function accepts only 3 positional arguments, and everything after * can only be passed as keyword arguments.

https://stackoverflow.com/questions/36901/what-does-double-star-asterisk-and-star-asterisk-do-for-parameters
