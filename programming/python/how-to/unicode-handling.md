<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Testing](#testing)
  - [Creating test unicode](#creating-test-unicode)
- [Unicode with ASCII Characters](#unicode-with-ascii-characters)
- [Unicode handling with different types](#unicode-handling-with-different-types)
  - [dictionary](#dictionary)
    - [json.dumps()](#jsondumps)
  - [Unicode in dictionary example](#unicode-in-dictionary-example)
    - [actual unicode objects in the dictionary](#actual-unicode-objects-in-the-dictionary)
    - [dictionary made up of strings that look* like unicode](#dictionary-made-up-of-strings-that-look-like-unicode)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Dealing with unicode sucks. This page attempts to detail working with unicde objects in Python

# Testing

## Creating test unicode

```
>>> x = u"unicode_sucks"
>>> type(x)
<type 'unicode'>
```

# Unicode with ASCII Characters
If you have unicode without fancy non-ASCII characters, you can use encode/decode.

```
>>> a=u"aaaàçççñññ"
>>> type(a)
<type 'unicode'>
>>> a.encode('ascii','ignore')
'aaa'
>>> a.encode('ascii','replace')
'aaa???????'
>>>
```

# Unicode handling with different types

## dictionary

Consider this
```
>>> x = u"unicode_sucks"
>>> dict = {}
>>> dict[x] = x
{u'unicode_sucks': u'unicode_sucks'}
```

### json.dumps()
Well, I don't want to show that unicode representation, right? Use json.dumps
```
json.dumps(dict)
'{"unicode_sucks": "unicode_sucks"}'
```

## Unicode in dictionary example

But what happens if my dictionary is changed to a string? Long story short, you should not end up with this if you handled your code correctly. The change from pure unicode from string had to have come from somewhere. Ideally, you want to write your dictionary values as you'd expect then, not dump string types of unicde into your dictionary.

### actual unicode objects in the dictionary
Ideally, unicode in a dictionary can be handled like this:
```
import ast
import json
j = json.loads('{"one" : "two"}')
j
dd = {u'one': u'two'}
dd

# to get double quotes
json.dumps(j,  encoding='ascii')
json.dumps(dd, encoding='ascii')

# to get single quotes
ast.literal_eval(json.dumps(j,  encoding='ascii'))
ast.literal_eval(json.dumps(dd, encoding='ascii'))
```

### dictionary made up of strings that look* like unicode
If `dd` or `j` somehow has been turned into a string, turn it back into unicode
```
>>> x = "u'unicode_sucks'"
>>> type(x)
<type 'str'>
>>> print x
u'unicode_sucks'

>>> dict = {}
>>> dict[x] = x
>>> dict
{"u'unicode_sucks'": "u'unicode_sucks'"}

# Make use of literal evail
from ast import literal_eval

>>> y = x
>>> print y
u'unicode_sucks'
>>> type(y)
<type 'str'>

# test on one string
>>> literal_eval(y).encode('ascii','ignore')
'unicode_sucks'

# Now lets handle this from a diciontary standpoint
>>> literal_eval("".join(str(value) for value in dict.values())).encode('ascii','ignore')
'unicode_sucks'
```

If for some reason, you need to retain
```
>>> print dict
{"u'unicode_sucks'": "u'unicode_sucks'"}

for key,value in dict.iteritems():
  print str('{' + key + ", "  + value + '}').replace("u'","'")

# With a new dictionary retaining single quotes
# If you don't use literal_evail, you will need to strip the quotes from the string in the dictionary
new_dict = {}
for key,value in dict.iteritems():
  key = literal_eval(key.replace("u'","'"))
  value = literal_eval(value.replace("u'","'"))
  new_dict[key] = value
  
>>> new_dict
{'unicode_sucks': 'unicode_sucks'}
```
Combining this into one line is a bit nasty looking though.

# Links

* http://www.pgbovine.net/unicode-python.htm
