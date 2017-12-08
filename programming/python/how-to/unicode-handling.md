# About

Dealing with unicode sucks. This page attempts to detail working with unicde objects in Python

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
