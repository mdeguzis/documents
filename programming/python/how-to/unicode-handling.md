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

Well, I don't want to show that unicode representation, right? Use json.dumps
```
json.dumps(dict)
'{"unicode_sucks": "unicode_sucks"}'
```

But what happens if my dictionary is changed to a string? Long story short, you should not end up with this if you handled your code correctly. The change from pure unicode from string had to have come from somewhere. Ideally, you want to write your dictionary values as you'd expect then, not dump string types of unicde into your dictionary.
```
>>> x = str(dict)
>>> print type(x)
<type 'str'>

>>> print x
{u'unicode_sucks': u'unicode_sucks'}
```

However, if you must work with the unicode representation in your dict, consider this:
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

# Links

* http://www.pgbovine.net/unicode-python.htm
