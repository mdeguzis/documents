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
- [Shared references](#shared-references)
- [Using dictionaries](#using-dictionaries)
  - [Basics](#basics)
  - [Requirements](#requirements)
  - [Methods](#methods-1)
  - [Writing dictionaries](#writing-dictionaries)
    - [Typical use case](#typical-use-case)
    - [Writing a list to a dictionary value](#writing-a-list-to-a-dictionary-value)
  - [Accessing values](#accessing-values)
  - [Traversing a dictionary](#traversing-a-dictionary)
  - [Testing for keys](#testing-for-keys)
  - [Example](#example)
  - [Write dicitonary to json file](#write-dicitonary-to-json-file)
- [Sorting](#sorting)
  - [Sorting lists](#sorting-lists)
  - [Sort list of dictionay items](#sort-list-of-dictionay-items)
  - [Example Programs](#example-programs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Python notes on dictionaries.

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

## Writing dictionaries

### Typical use case

```
dictionary[key] = value
```

### Writing a list to a dictionary value

Check if the key exits, append to list or start new list
```
if dictionary.has_key(key):
  dictionary[key].append(value)
else:
  dictionary[key] = list()
  dictionary[key].append(value)
```

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

## Traversing a dictionary

Note:  
For Python 3.x, iteritems() has been replaced with simply items(), which returns a set-like view backed by the dict, like iteritems() but even better. This is also available in 2.7 as viewitems(). The operation items() will work for both 2 and 3, but in 2 it will return a list of the dictionary's (key, value) pairs, which will not reflect changes to the dict that happen after the items() call. If you want the 2.x behavior in 3.x, you can call list(d.items()).

**Python 2:**

object-based
```

dict = {'tom': 'tom', 'bonnie': 'bonnie'}
  for key, value in dict.iteritems()
    print key

print dict.iteritems()
<dictionary-itemiterator object at 0x7f3aabc26260> 
```

tuple-based
```
dict = {'tom': 'tom', 'bonnie': 'bonnie'}
  for key, value in dict.items()
    print key

print dict.items()
[('mtdeguzis', 'mtdeguzis'), ('fpoleski', 'fpoleski')]  
```

viewitems() - akin to items() in python 3, which returns a set-like view backed by the dict, like iteritems() but even better. 
```
dict = {'tom': 'tom', 'bonnie': 'bonnie'}
  for key, value in dict.viewitems()
    print key

print dict.viewitems()
dict_items([('mtdeguzis', 'mtdeguzis'), ('fpoleski', 'fpoleski')]) 
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

## Write dicitonary to json file

```
import json
with open('result.json', 'w') as fp:
    json.dump(dictionary_var, fp)
```

In vim, this will help you view it correctly:
```
%!python -m json.tool
```
See: linux-applications/vim/formatting.md

# Sorting

## Sorting lists

See: https://wiki.python.org/moin/HowTo/Sorting

## Sort list of dictionay items

```
# Sort based on single key
l.sort(key=lambda x:x['title'])

# To sort with multiple keys, assuming all in ascending order:
l.sort(key=lambda x:(x['title'], x['title_url'], x['id']))

# Using itemgetter
import operator
L.sort(key=operator.itemgetter('title','title_url','id'))
```

## Example Programs

See: [geek-translator.py](https://github.com/mdeguzis/python/blob/python2/fundamentals/geek-translator.py)
