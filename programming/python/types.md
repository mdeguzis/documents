<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Simple Values](#simple-values)
- [Integers](#integers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Simple Values

|  Type   |   Example   | Description|
|---------|-------------|------------|
|int      | x = 1       | Integers (i.e., whole numbers) |
|float    | x = 1.0     | Floating-point numbers (i.e., real numbers) |
|complex  | x = 1 + 2j  | Complex numbers (i.e., numbers with a real and imaginary part) |
|bool     | x = True    | Boolean: True/False values |
|str      |  x = 'abc'  | String: characters or text |
|NoneType | x = None    | Special object indicating nulls |

# Integers

Another convenient feature of Python integers is that by default, division upcasts to floating-point type:

```
In [3]: 5 / 2
Out [3]: 2.5
```

Note that this upcasting is a feature of Python 3; in Python 2, like in many statically typed languages such as C, integer division truncatesany decimal and always returns an integer:

Python 2 behavior
```
>>> 5 / 2
2
```

To recover this behavior in Python 3, you can use the floor-division operator:

```
In [4]: 5 // 2
Out [4]: 2
```

Finally, note that although Python 2.x had both an int and long type, Python 3 combines the behavior of these two into a single int
type.

# Type conversions

functions | description            | Example          | Returns
----------|------------------------|------------------|----------
float(x) | Returns a floating-point value by converting x | float("10.0") | 10.0
int(x) | Returns a string value by converting x | int("10") | 10
str(x) | Returns a string value by converting x | str(10) | '10'

