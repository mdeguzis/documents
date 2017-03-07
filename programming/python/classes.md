# About

Compared with other programming languages, Python’s class mechanism adds classes with a minimum of new syntax and semantics. It is a mixture of the class mechanisms found in C++ and Modula-3. Python classes provide all the standard features of Object Oriented Programming: the class inheritance mechanism allows multiple base classes, a derived class can override any methods of its base class or classes, and a method can call the method of a base class with the same name. Objects can contain arbitrary amounts and kinds of data. As is true for modules, classes partake of the dynamic nature of Python: they are created at runtime, and can be modified further after creation.

## Constructors

### parameterized constructor

Implementing a class with a parameterized constructor:
```
  import my_module
  
  a = MyClass("value")
  a.fetchAll('field')
```

### ini file

Using an ini file:
```

  [section1]
  url = https://host.com
```

Within the main program:
```
  import MyClass as a
  
  a.fetchAll('field')
````

Use a parameterized constructor if you want to be able to instantiate multiple versions of the object with different values, use the ini file approach if you want one global configuration to apply across all uses. Both should be created as python classes with constructors; one has a parameterized constructor, the other as constructor that uses the ini to create the dependencies. 

Or even more advanced, you can actually support both with one init class; although you can't use multiple constructors as with Java you can define defaults if they aren't passed by the constructor call then act based on whether they are set or not to populate them from an ini.

# Links

* [Python Classes](https://docs.python.org/2/tutorial/classes.html)
