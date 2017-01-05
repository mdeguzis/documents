<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Strings](#strings)
- [Concepts](#concepts)
  - [Constants](#constants)
  - [Immutability](#immutability)
  - [Indexing](#indexing)
  - [Slicing strings](#slicing-strings)
  - [Tuples](#tuples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Strings

Notes on using string types in Python

# Concepts

## Constants

Variables in all CAPS have special meaning. Constants refer to a vaue tha tis nto meant ot change.

## Immutability 

Sequences can be mutable (changable) or immutable (cannot be changed). Strings themselves are immutable. This means you can't just alter a string thorugh indexing, otherwise you'll likely see this error:

```
>>> word = "game "
>>> word[0] = "l "
Type Error: 'str' object does not support item assignment.
```

## Indexing

A nice way to accsss elements of a sequence. 

See: [fundamenatals/random_access.py](https://github.com/mdeguzis/python/tree/python2/fundamenatals/random_access.py)

## Slicing strings

Make copies of continuous sections of elements (slices). This enables you to grab anything from a single character, to the entire range, or any combination thereof.

**Example:**
```
word = "pizza"
start = 0
finish = 4	

print("word[", start, ":", finish, "] is ", end= " ")
print(word[start:finish])
```

There is also a shorthand for slicing. Given the word being 'pizza', you can issue:
```
print word[0:4]
```

**Open ended ranges**

```
# Every letter up to, but not including <INDEX>
# Here, you are leaving the lower bound range empty, and just specifying the endjj
word = word[:<INDEX>]

# Every letter after word[<INDEX>]
# Here, you are saying, start the index at the next number, and give me everything after (no higher bound)
word((<INDEX> +1):)
```

See: [fundamentals/pizza-slicer.py](https://github.com/mdeguzis/python/blob/python2/fundamentals/pizza-slicer.py)

# Functions

## print()

* Seperate values with commas
* Concatenate strings with the '+' operator
* The line continuation character is '* x nn', where nn is a numerical value

### Note regarding slicing/indexing and print

The default value of end is `\n` meaning that after the print statement it will print a new line. So simply stated `end` is what you want to be printed after the print statement has been executed. This is a python 3 function, but can be used in python 2 by importing from "future":

```
# import 'print()' from python 3 to make this work with python2
from __future__ import print_function

# example snippet
print("word[", start, ":", finish, "] is ", end= " ")

**Specify a final string to print***

# You can also work around this behaviro by using the 'strip()' funcion 
# on your strings.
```
# Using a space at the tail end
>>> print("Here", end=" ")
>>> print("it is is...")

# Cutting of at the end of the string
>>> a = "hi"
>>> print a,
```

**Escape sequences**

```
# TAB - t
>>> print("\tThis is tabbed")

# Escaping the special sequence
>>> print("\\this is a sentice, beginning with a slash instead")

# Newline - n
p>>> rint("First line\nSecond line")

# Single quote - \'
>>> print ("\'This is in single quotes\'")

# Ring the system bell :)
>>> print("\a")

```

## len()

Check the length of a string

See: [fundamenatals/message_analyzer.py](https://github.com/mdeguzis/python/tree/python2/fundamenatals/message_analyzer.py)

```
print "The var 'message' is:", len(message), "in length"

```

