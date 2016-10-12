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
