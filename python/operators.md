# Arithmetic Operators

```
a + b Addition Sum of a and b  
a - b Subtraction Difference of a and b  
a * b Multiplication Product of a and b  
a / b True division Quotient of a and b  
a // b Floor division Quotient of a and b, removing fractional parts  
a % b Modulus Remainder after division of a by b  
a ** b Exponentiation a raised to the power of b  
-a Negation The negative of a  
+a Unary plus a unchanged (rarely used)  
```

# Boolean operators

```
and  
or  
not  
```

[XOR](https://en.wikipedia.org/wiki/Exclusive_or) operator:

XOR is thought of as "one or the other but not both". This could be written as "A or B, but not, A and B".

```
# (x > 1) xor (x < 10)
(x > 1) != (x < 10)
```

# Comparison operators

```
a == b a equal to b  
a != b a not equal to b  
a < b a less than b  
a > b a greater than b  
a <= b a less than or equal to b  
a >= b a greater than or equal to b  
```

# Identity and Membership Operators

The identity operators, is and is not, check for object identity. Specifically, is a actually b, not that the content of a is the same as b.

```
a is b True if a and b are identical objects
a is not b True if a and b are not identical objects
a in b True if a is a member of b
a not in b True if a is not a member of b
```

```
In [19]: a = [1, 2, 3]
b = [1, 2, 3]
In [20]: a == b
Out [20]: True
In [21]: a is b
Out [21]: False
In [22]: a is not b
Out [22]: True
What do identical objects look like? Here is an example:
In [23]: a = [1, 2, 3]
b = a
a is b
Out [23]: True
```

The difference between the two cases here is that in the first, a and b point to different objects, while in the second they point to the sameobject. Python variables are pointers.The is operator checks whether the two variables are pointing to the same container (object), rather than referring to what the container contains.

# Logical operators

```
>a & b Bitwise AND Bits defined in both a and b  
a | b Bitwise OR Bits defined in a or b or both  
a ^ b Bitwise XOR Bits defined in a or b but not both  
a << b Bit shift left Shift bits of a left by b units  
a >> b Bit shift right Shift bits of a right by b units  
~a Bitwise NOT Bitwise negation of a
```

# Membership operators

Membership operators check for membership within compound objects. 

```
print (1 in [1, 2, 3])
true
```
