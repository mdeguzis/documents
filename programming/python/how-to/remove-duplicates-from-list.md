# Not keeping the order

The common approach to get a unique collection of items is to use a set. Sets are unordered collections of distinct objects. To create a set from any iterable, you can simply pass it to the built-in set() function. If you later need a real list again, you can similarly pass the set to the list() function.

The following example should cover whatever you are trying to do:

```
>>> t = [1, 2, 3, 1, 2, 5, 6, 7, 8]
>>> t
[1, 2, 3, 1, 2, 5, 6, 7, 8]
>>> list(set(t))
[1, 2, 3, 5, 6, 7, 8]
>>> s = [1, 2, 3]
>>> list(set(t) - set(s))
[8, 5, 6, 7]
```

As you can see from the example result, the original order is not maintained. As mentioned above, sets themselves are unordered collections, so the order is lost. When converting a set back to a list, an arbitrary order is created.

If order is important to you, then you will have to use a different mechanism.

# Keeping the order

>>> from collections import OrderedDict
>>> list(OrderedDict.fromkeys('abracadabra'))
['a', 'b', 'r', 'c', 'd']

# Links

* Source: [StackOverflow](http://stackoverflow.com/questions/7961363/removing-duplicates-in-lists)
