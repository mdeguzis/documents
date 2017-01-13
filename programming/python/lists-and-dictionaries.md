<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Main points](#main-points)
- [Methods](#methods)
- [Working with list elements](#working-with-list-elements)
  - [Deleting an element](#deleting-an-element)
- [Working with indexes](#working-with-indexes)
  - [Assiging a new list element by index](#assiging-a-new-list-element-by-index)
- [Working with slices](#working-with-slices)
  - [Assingn a new list slice](#assingn-a-new-list-slice)
  - [Delete a list slice](#delete-a-list-slice)
  - [Functions](#functions)
    - [len()](#len)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Python notes on lists.

# Main points

* Uses square brackets instead of parenthesis (used for tuples)
* len(), in operator, indexing, concatenating, and slicing are the same as they are with tuples.
* The major difference between lists and tuples, is lists are mutable (i.e. can be changed).

# Methods

Method          | Description
----------------|---------------------------
append(value) | Adds \<value\> to end of list
sort() | Sorts the elements, smallest value first. Optionally, you can pass a Boolean value to the parameter `reverse`. If you pass True, the list will be sorted with the largest value first.
reverse() | Reverses the order of a list
count(value) | Returns the number of occurences of a \<value\>
index(value) | Returns the first position number of where \<value\> occurs
insert(i, value) | Insertts \<value\> at position `i`
pop([i]) | Returns value at position `i` and removes value from the list. Providing the position number `i` is optional. Without it, the last element in the list is removed and returned.
remove(value) | Removes the first occurence of \<value\> from the list.

# Working with list elements

## Deleting an element

```
print("\nIn a great battle, you shield is destroyed")
del inventory[2]
print("Your inventory is now:")
print(inventory)
```

# Working with indexes

## Assiging a new list element by index

```
print("\nYou change your sword for a crossbow.")
inventory[0] = "crossbow"
print("Your inventory is now:")
print(inventory)
```

Note: You can assign an existing list element a new vlaue with indexing, but you can't create a new element in this way.

# Working with slices

## Assingn a new list slice

```
print("\nYou use your gold and gems to buy an orb of future tellling.")
inventory[4:6] = ["orb of future telling"]
print("Your inventory is now:")
print(inventory)
```

## Delete a list slice

```
print("\nYour crossbow and armor are stolen by thieves!")
del inventory[0:2]
print("Your inventory is now:")
print(inventory)
```

## Functions

### len()

Used the same way, as it is with tuples, `len(var)`. 

# Examples

See the following programs in the fundementals folder:

* Hero's Inventory programs
* High Scores program

# Shared references

Variables don't store a value, they technically refer to the place in the computers memory where the value is stored (more particular to Python). Think of it like a symlink. Even mutable objects, such as list, behave the same way. Even if you change a value in a mutable list, the rest of the variables will follow suit

```
>>> mike = ["khakis", "dress shirt", "jacket"]
>>> mr_dawson = mike
>>> honey = mike
>>> print mike
['khakis', 'dress shirt', 'jacket']
>>> print mr_dawson
['khakis', 'dress shirt', 'jacket']
>>> print honey
['khakis', 'dress shirt', 'jacket']
>>> honey[2] = "red sweater"
>>> print honey
['khakis', 'dress shirt', 'red sweater']
>>> print mike
['khakis', 'dress shirt', 'red sweater']
```

You can change this behavior by storing a copy of the list by slicing

```
>> mike = ["khakis", "dress shirt", "jacket"]
>>> honey = mike[:]
>>> honey[2] = "red sweater"
>>> print(honey)
['khakis', 'dress shirt', 'red sweater']
>>> print(mike)
['khakis', 'dress shirt', 'jacket']
```

# Using dictionaries

## Basics

* Dictionaries store things in pairs.
* They are mutable objects
* Each element is called an "item".
* The left value is the key, the right, the value
* Test for keys (and keys only) with the `in` operator
* You *cannot* reference a key with a value.

## Requirements

* A dictionary can’t contain multiple items with the same key. Think again about a real dictionary. It becomes pretty meaningless if you can keep adding the same word with totally new definitions whenever you want.
* A key has to be immutable. It can be a string, a number, or a tuple, which gives you lots of possibilities. A key has to be immutable because, if it weren’t, you could sneak into a dictionary later and change its keys, possibly ending up with two identical keys. And you just learned you can’t have that!
* Values don’t have to be unique. Also, values can be mutable or immutable. They can be anything you want.

## Methods

Method | Description
-------|--------------------------------
get(`key`, [default]) | Returns the value of **key**. If **key** doesn’t exist, then the optional default is returned. If **key** doesn’t exist and **default** isn’t specified, then `None` is returned.
keys() | Returns a view of all the keys in a dictionary.
values() | Returns a view of all the values in a dictionary.
items() Returns a view of all the items in a dictionary. Each item is a two-elementtuple, where the first element is a key and the second element is the key’svalue.


## Accessing values

There are a number of ways you can do this.

```
# Dicttionary name[KEY]
# This is not to be confused with an index
# Indexes use a positon number, dictionaries use a key.

geek["404"]
'clueless. From the web error message 404, meaning page not found. '

# Using the get() method
# Format: <dictionary>.get("Expected value", "default return value set")
# If a default value is not* set, you will get back 'None'

>>> print(geek.get("Dancing Baloney", "I have no idea."))
I have no idea.

>>> print(geek.get("Dancing Baloney"))
None
```

## Testing for keys

```
if "Dancing Baloney" in geek:
    print("I know what Dancing Baloney is. ")
else:
    print("I have no idea what Dancing Baloney is. ")
```

## Example
```
geek = {"404": "clueless.From the web error message 404, meaning page not found."}
```

## Example Programs

See: [geek-translator.py](https://github.com/mdeguzis/python/blob/python2/fundamentals/geek-translator.py)
