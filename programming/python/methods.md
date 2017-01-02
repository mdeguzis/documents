<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Methods](#methods)
    - [Common string methods](#common-string-methods)
    - [Converting values](#converting-values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Methods

```
quote = "Hi, my name is mike"
print quote.<method>()
```

### Common string methods

**Some common string methods**

method | description            
-------|-------------------------
upper() | Returns the uppercase version of the string
lower() | Returns the lowercase version of the string
swapcas() | Retruns a new string where the case of each letter is switched
capitalize() | Returns a new string where the first letter is capitalized and the rest are lowercase
title() | Returns a new string where the frist letter of each word is capitalized and all others are lowercase
strip() | Returns a string where all the white space (tabs, spaces, and newlines) at the beginning and end are removed
repalce(old, new [,max]) | Returns a string where occurences of the string old are replaced with the string new. The optional max limits the number of replacements

### Converting values

A common reason to do this is when gathering input that is intended to be another type, such as numbers. This is an issue with python3, but not python2. Python3 is more explicit with the input method. One common attribute, is input() will always return a string when not modified otherwise.

**Note:**

Python 2 has both the `input()` and `raw_input()` functions. Python 2 `raw_input()` treats the input as a string, and input() treats it as a Python expression. Python 3 deprecates use of `raw_input()`, essentially renaming `raw_input()` to `input()` that treats the input itself as a string. Most times the intention was to work with a string anyway. If you want to make use of the old expression-based Python 2 `input()` behavior in Python 3, you can use `eval(input())`. 

If you use Python 2 input() on a fake enter statment such as `input("Press enter to continue: ")`, you will encounter an EOF error due to the inpreter expecting actual Python input. Instead, you want to use `raw_input("Press enter to continue...")`.

```
# python 2
num1 = raw_input("Enter num1: ")
10
num1 = raw_input("Enter num1: ")
20
total = num1 + num2

>>> print total
30

# python 3
num1 = input("Enter num1: ")
10
num2 = input("Enter num2: ")
20
total = num1 + num2

>>> print total
1020
```

Fix this by converting the string to the intended type, int.

```
num1 = int(num1)
num2 = int(num2)
total = num1 + num2
>>> print total
30
```

Combine this routine with nested functions:
```
num1 = int(input("Enter num1: "))
num2 = int(input("Enter num2: "))
```

Again, be aware of the differences in Python 2 and Python 3
