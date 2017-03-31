<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Boolean](#boolean)
- [Is it generally considered better to just use '==' by default, even when comparing int or Boolean values?](#is-it-generally-considered-better-to-just-use--by-default-even-when-comparing-int-or-boolean-values)
- [For comparing against None, is None is preferred over == None.](#for-comparing-against-none-is-none-is-preferred-over--none)
- [Comparing objects - is vs. =](#comparing-objects---is-vs-)
  - [Example](#example)
- [Test cases](#test-cases)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Boolean 

Boolean values are the two constant objects False and True. They are used to represent truth values (although other values can also be considered false or true). In numeric contexts (for example when used as the argument to an arithmetic operator), they behave like the integers 0 and 1, respectively. The built-in function bool() can be used to cast any value to a Boolean, if the value can be interpreted as a truth value (see section Truth Value Testing above).

# Is it generally considered better to just use '==' by default, even when comparing int or Boolean values?

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

# For comparing against None, is None is preferred over == None.

I've always liked to use 'is' because I find it more aesthetically pleasing and pythonic (which is how I fell into this trap...), but its intended to just be reserved for when you care about finding two objects with the same id.

# Comparing objects - is vs. =

For all built-in Python objects (like strings, lists, dicts, functions, etc.), if x is y, then x==y is *usually* also True. NaN is a counterexample. But usually, identity (is) implies equality (==). The converse is not true: Two distinct objects can have the same value. 

## Example

Here is a little example on how is and == are involved in immutable types. Try that:

```
a = 19998989890
b = 19998989889 +1
>>> a is b
False
>>> a == b
True
```

**The takeaway***

`is` compares two objects in memory, `==` compares their values. For example, you can see that small integers are cached by Python:

c = 1
b = 1
>>> b is c
True

You should use `==` when comparing values and is when comparing identities. (Also, from an English point of view, "equals" is different from "is".)

# Test cases

literal
```
>>> True
True
>>> 0 == True
False
>>> 1 == True
True
>>> 2 == True
False
```

is operator
```
>>> 0 is False
False
>>> 1 is True
False
>>> 0 is 0
True
>>> True is True
True
```

# Links

http://docs.python.org/library/stdtypes.html#boolean-values
