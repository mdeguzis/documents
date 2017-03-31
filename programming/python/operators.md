<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Arithmetic Operators](#arithmetic-operators)
- [Boolean operators](#boolean-operators)
- [Comparison operators](#comparison-operators)
- [Identity and Membership Operators](#identity-and-membership-operators)
  - ['not' Logical Operator](#not-logical-operator)
  - ['and' Logical Operator](#and-logical-operator)
  - ['or' Logical Operator](#or-logical-operator)
- [Bitwise logical operators](#bitwise-logical-operators)
- [Membership operators](#membership-operators)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

condition | result
----------|---------
a is b | True if a and b are identical objects
a is not b | True if a and b are not identical objects
a in b | True if a is a member of b
a not in b | True if a is not a member of b

## 'not' Logical Operator

This is a useful operator to ensure simple things like user input are actually entered, and "not false". In a simple passwrd entry program, this would ensure "Enter your username: " is displayed until it is actually entered (given username is initialized as blank). Obviously in a real-world situation, such items would be stored in a secure datbase, not as direct input.

## 'and' Logical Operator

As with the user/password example above, you want to ensure both the user 'and' password parameters match expected values. This is referred to as a "compound condition."

```
if username == "Bob" and password == "mypassword":
	// CODE
```

## 'or' Logical Operator

Continuing the example above, say we have a guest login. The username "guest," or password, "guest" would both be acceptable.

```
if username == "guest" or password == "guest":
	// CODE
```

General comparisons
```
In [19]: a = [1, 2, 3]
b = [1, 2, 3]
In [20]: a == b
Out [20]: True
In [21]: a is b
Out [21]: False
In [22]: a is not b
Out [22]: True
```

What do identical objects look like? Here is an example:
```
In [23]: a = [1, 2, 3]
b = a
a is b
Out [23]: True
```

The difference between the two cases here is that in the first, a and b point to different objects, while in the second they point to the sameobject. Python variables are pointers.The is operator checks whether the two variables are pointing to the same container (object), rather than referring to what the container contains.

# Bitwise logical operators

```
>a & b Bitwise AND Bits defined in both a and b  
a | b Bitwise OR Bits defined in a or b or both  
a ^ b Bitwise XOR Bits defined in a or b but not both  
a << b Bit shift left Shift bits of a left by b units  
a >> b Bit shift right Shift bits of a right by b units  
~a Bitwise NOT Bitwise negation of a
```

More on the bitwise operator: [documents/programming/python/topics/bitwise-operators.md](https://github.com/mdeguzis/documents/blob/master/programming/python/topics/bitwise-operators.md)


# Membership operators

Membership operators check for membership within compound objects. 

```
print (1 in [1, 2, 3])
true
```
