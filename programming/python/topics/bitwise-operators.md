# About 

Expanded explanation of bitwise operations


# Basics

Bitwise operator works on bits and performs bit by bit operation. They are operators that work on multi-bit values, but conceptually one bit at a time.

* AND is 1 only if both of its inputs are 1, otherwise it's 0.
* OR is 1 if one or both of its inputs are 1, otherwise it's 0.
* XOR is 1 only if exactly one of its inputs are 1, otherwise it's 0.
* NOT is 1 only if its input is 0, otherwise it's 0.

These can often be best shown as truth tables. Input possibilities are on the top and left, the resultant bit is one of the four (two in the case of NOT since it only has one input) values shown at the intersection of the inputs.

```
AND | 0 1     OR | 0 1     XOR | 0 1    NOT | 0 1
----+-----    ---+----     ----+----    ----+----
 0  | 0 0      0 | 0 1       0 | 0 1        | 1 0
 1  | 0 1      1 | 1 1       1 | 1 0
```

**See more:** 

 * https://wiki.python.org/moin/BitwiseOperators
 * http://stackoverflow.com/a/1746642
 * https://www.codecademy.com/courses/python-intermediate-en-KE1UJ/0/1
