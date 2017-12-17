<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Written Examples](#written-examples)
- [Fundementals](#fundementals)
  - [Basics](#basics)
  - [Creating a Class](#creating-a-class)
  - [Using Constructors](#using-constructors)
    - [parameterized constructor](#parameterized-constructor)
    - [Attributes](#attributes)
    - [Class Attributes](#class-attributes)
    - [parameterized constructor (ini file)](#parameterized-constructor-ini-file)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



# About

Compared with other programming languages, Python’s class mechanism adds classes with a minimum of new syntax and semantics. It is a mixture of the class mechanisms found in C++ and Modula-3. Python classes provide all the standard features of Object Oriented Programming: the class inheritance mechanism allows multiple base classes, a derived class can override any methods of its base class or classes, and a method can call the method of a base class with the same name. Objects can contain arbitrary amounts and kinds of data. As is true for modules, classes partake of the dynamic nature of Python: they are created at runtime, and can be modified further after creation.

# Written Examples

* [critter-caretaker.py](https://github.com/mdeguzis/python/blob/python2/games/critter-caretaker.py)
* [Python For The Absolute Beginner eBook examples](https://github.com/mdeguzis/python/tree/python3/ebook_examples/python-for-the-absolute-beginner/chapter08)

# Fundementals

## Basics

* Objects are instantiated from a definition called a class
* This isn't an object, per se, but a blueprint for one

## Creating a Class

* Use a capital letter for your class name, per conventions
* `object` below is what the class is based on, a built-in type. You can base a class on another if you like
* The function definition below describes a method, a function associated with the object
* Every method that every object of a class has—must have a special first parameter, that is why self is defined here 
* `self` isn't actually used here, but a convention for classes. This parameter provides a way for a method to refer to the object itself.

```
class Critter(object):
	"""A virtual pet"""
	
	def talk(self):
		print("Hi.'m an instance of class Critter.")
	
# main
crit = Critter()

crit.talk()
input("\n\nPress the enter key to exit.")

```

## Using Constructors

### parameterized constructor

* Invoked right after an object is created from a class
* Usually used to set up the initial attribute values of an object
* As a constructor method, `__init__()` is automatically called by any newly created object
* `__init__` is one of many special python methods
* 

Implementing a class with a parameterized constructor:
```
class Critter(object):
	"""A virtual pet"""

	def __init__(self):
		print("A new critter has been born!")
		
	def talk(self):
		print("\nHi. I'm an instance of class Critter.")

# main
crit1 = Critter()
crit2 = Critter()

crit1.talk()
crit2.talk()
```

### Attributes

* Usually, you want to avoid directly accessing an object’s attributes outside of its class definition
* Using `__str__()` in a class definition, you can create a string representation for your objects that will be displayed whenever one is printed. Whatever string you return from the method will be the string that’s printed for the object

```
<class_truncated>
def __str__(self):
	rep = "Critter object\n"
	rep += "name: " + self.name + "\n"
	return rep
	
def talk(self):
	print("Hi. I'm", self.name, "\n")

# main
crit1 = Critter("Poochie")
crit1.talk()
crit2 = Critter("Randolph")
crit2.talk()
print("Printing crit1:")
print(crit1)
print("Directly accessing crit1.name:")
print(crit1.name)
```

### Class Attributes

* Meant to describe more high-level attributes of the class (e.g. total number of critters made)
* Although you can use an object of a class to access a class attribute, you can’t ssign a new value to a class attribute through an object
* decorator — something you can imagine as decorating or modifying a function or method—right before the definition. In this example, `@staticmethod`. Read more [here](http://jfine-python-classes.readthedocs.io/en/latest/decorators.html) and on [stackoverflow](https://stackoverflow.com/a/1669524)

```
class Critter(object):
	"""A virtual pet"""
	
	# Executed only once
	total = 0

	# decorator—something you can imagine as decorating or modifying a function or method—right before the definition.
	# This decorator ultimately creates a static method with the same name
	@staticmethod
	# Notice that the definition doesn’t ave self in its parameter list. That’s because, like all static methods, it’s 
	# designed to be nvoked through a class and not an object
	def status():
		print("\nThe total number of critters is", Critter.total)

	def __init__(self, name):
		print("A critter has been born!")
		self.name = name
		Critter.total += 1
		
print("Accessing the class attribute Critter.total:", end=" ")
print(Critter.total)

Critter.status()

# you can access a class attribute through an object of that class
# You can read the value of a class attribute through any object that belongs to that class
print("\nAccessing the class attribute through an object:", end= " ")
print(crit1.total)
```

### parameterized constructor (ini file)

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
* [Python Data Models](https://docs.python.org/2/reference/datamodel.html)
