<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Strings](#strings)
  - [print()](#print)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Strings

Notes on using string types in Python

# Concepts

## Indexing

A nice way to accsss elements of a sequence. 

See: [fundamenatals/random_access.py](https://github.com/mdeguzis/python/tree/python2/fundamenatals/random_access.py)

# Functions

## print()

* Seperate values with commas
* Concatenate strings with the '+' operator
* The line continuation character is '* x nn', where nn is a numerical value

**Specify a final string to print***

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

