<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Basics](#basics)
- [Working with bitwise](#working-with-bitwise)
- [Bitwise shift](#bitwise-shift)
- [Bitwise AND](#bitwise-and)
- [Bitwise OR](#bitwise-or)
- [Bitwise XOR](#bitwise-xor)
- [Bitwise NOT](#bitwise-not)
- [bit mask](#bit-mask)
  - [Turning a mask on](#turning-a-mask-on)
  - [Flipping bits](#flipping-bits)
  - [Shifting bits](#shifting-bits)
- [See more](#see-more)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

# Working with bitwise

You can utilize bitwise operations using integers or binary:

```
# Print integer result with integer input
>>> 14 & 5
4

# Print binary result with integer input
>>> bin(14 & 5)
'0b100'

# Print integer result with binary input
>>> 0b1110 & 0b101
4

# Print binary result with binary input
>>> print bin(0b1110 & 0b101)
0b100
```

# Bitwise shift

```
# Left Bit Shift (<<)  
0b000001 << 2 == 0b000100 (1 << 2 = 4)
0b000101 << 3 == 0b101000 (5 << 3 = 40)       

# Right Bit Shift (>>)
0b0010100 >> 3 == 0b000010 (20 >> 3 = 2)
0b0000010 >> 2 == 0b000000 (2 >> 2 = 0)
```

# Bitwise AND

The bitwise AND (`&`) operator compares two numbers on a bit level and returns a number where the bits of that number are turned on if the corresponding bits of **both** numbers are 1. For example:

```
a:   00101010   42
b:   00001111   15       
===================
a & b:   00001010   10
```

As you can see, the 2's bit and the 8's bit are the only bits that are on in both `a` and `b`, so `a & b` only contains those bits. Note that using the `&` operator can only result in a number that is less than or equal to the smaller of the two values.

So remember, for every given bit in a and b:

```
0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1
```

# Bitwise OR

The bitwise OR (|) operator compares two numbers on a bit level and returns a number where the bits of that number are turned on if either of the corresponding bits of **either** number are 1. For example:

```
a:  00101010  42
b:  00001111  15       
================
a | b:  00101111  47
```

Note that the bitwise | operator can only create results that are greater than or equal to the larger of the two integer inputs.

So remember, for every given bit in a and b:

```
0 | 0 = 0
0 | 1 = 1 
1 | 0 = 1
1 | 1 = 1
```

Meaning:
```
110 (6) | 1010 (10) = 1110 (14)
```

# Bitwise XOR

The XOR (`^`) or exclusive or operator compares two numbers on a bit level and returns a number where the bits of that number are turned on if **either** of the corresponding bits of the two numbers are 1, **but not both**.

```
a:  00101010   42
b:  00001111   15       
================
a ^ b:  00100101   37
```

Keep in mind that if a bit is off in both numbers, it stays off in the result. Note that XOR-ing a number with itself will always result in 0.

So remember, for every given bit in a and b:

```
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

Therefore:
```
111 (7) ^ 1010 (10) = 1101 (13)
```

# Bitwise NOT

The bitwise NOT operator (`~`) just flips all of the bits in a single number. What this actually means to the computer is actually very complicated, so we're not going to get into it. Just know that **mathematically, this is equivalent to adding one to the number and then making it negative**.

```
>>> print ~1
-2
>>> print ~2
-3
>>> print ~3
-4
>>> print ~42
-43
>>> print ~123
-124
```

# bit mask

A bit mask is just a variable that aids you with bitwise operations. A bit mask can help you turn specific bits on, turn others off, or just collect data from an integer about which bits are on or off. This is similiar to masking with Linux permissions

```
num  = 0b1100
mask = 0b0100
desired = num & mask
if desired > 0:
    print "Bit was on"
```

## Turning a mask on

You can also use masks to turn a bit in a number on using `|`. For example, let's say I want to make sure the rightmost bit of number `a` is turned on. I could do this:

```
a = 0b110 # 6
mask = 0b1 # 1
desired =  a | mask # 0b111, or 7
```

Say I want to use a bitmask on the value for `a` below, and achieve a mask where the third bit from the right is on. Using the bitwise | operator will turn a corresponding bit on if it is off and leave it on if it is already on.

```
a = 0b10111011
mask = 0b10111111

print bin(a | mask)

# The result
0b10111111
```

## Flipping bits

Using the XOR (`^`) operator is very useful for flipping bits. Using `^` on a bit with the number one will return a result where that bit is flipped.

For example, let's say I want to flip all of the bits in `a`. I might do this:

```
a = 0b110 # 6
mask = 0b111 # 7
desired =  a ^ mask # 0b1
```

As you can see, the first bit of a is flipped to 1, and the remainding two are flipped to 0, resulting in 001.

Example:  
Use bitmask and the value a in order to achieve a result where all of the bits in a are flipped.
```
a = 0b11101110
mask = 0b11111111

print bin(a ^ mask)
```

In the above exampe, we flip the all bits by specifying all 1's in our mask.

## Shifting bits

Finally, you can also use the left shift (`<<`) and right shift (`>>`) operators to slide masks into place.

```
a = 0b101 
# Tenth bit mask
mask = (0b1 << 9)  # One less than ten 
desired = a ^ mask

# result:
0b1000000101
```
Notice the 10th bit is now on.

Let's say that I want to turn on the 10th bit from the right of the integer `a`. Instead of writing out the entire number, we slide a bit over using the `<<` operator. We use 9 because we only need to slide the mask nine places over from the first bit to reach the tenth bit.

Excercise:

* Define a function called flip_bit that takes the inputs (number, n).
* Flip the nth bit (with the ones bit being the first bit) and store it in result.
* Return the result of calling bin(result

```
def flip_bit(number, n):
		# start at the first bit, shift over n - 1 (since we are already at 1)
    mask = (0b1 << (n - 1))
		# Get the bit shift
    result = number ^ mask
    return bin(result)
```

# See more

 * https://wiki.python.org/moin/BitwiseOperators
 * http://stackoverflow.com/a/1746642
 * https://www.codecademy.com/courses/python-intermediate-en-KE1UJ/0/1 (great course to understand bitwise)
