# Boolean 

Boolean values are the two constant objects False and True. They are used to represent truth values (although other values can also be considered false or true). In numeric contexts (for example when used as the argument to an arithmetic operator), they behave like the integers 0 and 1, respectively. The built-in function bool() can be used to cast any value to a Boolean, if the value can be interpreted as a truth value (see section Truth Value Testing above).

# Test case

literal
```
>>> True
True
>>> 0 == True
False
>>> 1 == True
True
>>> 2 == True
False
```

is operator
```
>>> 0 is False
False
>>> 1 is True
False
>>> 0 is 0
True
>>> True is True
True
```

# Links

http://docs.python.org/library/stdtypes.html#boolean-values
