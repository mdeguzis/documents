# Comparing objects - is vs. =

For all built-in Python objects (like strings, lists, dicts, functions, etc.), if x is y, then x==y is *usually* also True. NaN is a counterexample. But usually, identity (is) implies equality (==). The converse is not true: Two distinct objects can have the same value. 

## Is it generally considered better to just use '==' by default, even when comparing int or Boolean values?

You use `==` when comparing values and is when comparing identities.

When comparing ints (or immutable types in general), you pretty much always want the former. There's an optimization that allows small integers to be compared with is, but don't rely on it.

For boolean values, you shouldn't be doing comparisons at all. Instead of:

```
if x == True:
    # do something
```

write:

```
if x:
    # do something
```

## For comparing against None, is None is preferred over == None.

I've always liked to use 'is' because I find it more aesthetically pleasing and pythonic (which is how I fell into this trap...), but its intended to just be reserved for when you care about finding two objects with the same id.
