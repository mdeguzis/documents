<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Basics](#basics)
- [Types, variables, and Simple I/O](#types-variables-and-simple-io)
  - [Methods](#methods)
    - [Common string methods](#common-string-methods)
    - [Converting values](#converting-values)
    - [Type conversions](#type-conversions)
  - [Asignment operators](#asignment-operators)
  - [Duplication](#duplication)
- [Branching, while loops, a program planning](#branching-while-loops-a-program-planning)
  - [Comparison operators](#comparison-operators)
  - [if statements](#if-statements)
  - [While loops](#while-loops)
    - [A simple while loop](#a-simple-while-loop)
  - [Sentry variable](#sentry-variable)
  - [True false](#true-false)
  - [Intentional infinite loops](#intentional-infinite-loops)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Basics

* Indentation is very important
* Indentation is how conditional statments are read and terminated

# Types, variables, and Simple I/O

## Methods

quote = "Hi, my name is mike"
print quote.<method>()

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


### Type conversions

functions | description            | Example          | Returns
----------|------------------------|------------------|----------
float(x) | Returns a floating-point value by converting x | float("10.0") | 10.0
int(x) | Returns a string value by converting x | int("10") | 10
str(x) | Returns a string value by converting x | str(10) | '10'


## Asignment operators

operator | example   | is equivalent to              
---------|-----------|--------------------
*= | x *= 5 | x = x * 5
/= | x /= 5 | x = x / 5
%= | x %= 5 | x = x % 5
+= | x += 5 | x = x + 5
-= | x -+ 5 | x = x - 5


## Duplication

```
msg = "The force is with you, always"
print("This message is called once:", msg)
```

If you want things to output nice, one msg per line, add a newline character:
```
msg2 = (msg + "\n") * 5
print msg2

# combined
msg = "The force is with you, always"

# Python 2
print "\nThis message repeats five times, one on each line\n\n" + (msg + "\n") * 5

# Python 3
print("\nThis message repeats five times, one on each line\n\n" + (msg + "\n") * 5)
```

# Branching, while loops, a program planning

## Comparison operators

operator | meaning | example   | evaluates to              
---------|---------|-----------|--------------
== | equal to | 5 == 5 | True
!= | not equal to | 8 != 5 | True
> | greater than | 3 > 10 | false
< | less than | 5 < 8 | True
>= | more than or equal to | 5 >= 10 | False
<= | less than or equal to | 5 <= 5 | True


## if statements
```
if <condition1>:	# if <condition1> is true, run code in <block1>
	<block1>


if <condition2>:	#  if <condition2> is true, run <block2>, if false, run else code <block3>
	<block2>
else:
	<block3>

if <conditiion3>:	# if <condition3> is true, run <block4>		
	<block4>	# if <condition3> is false, try <condition4>

elif <condition4>:	# if <condition4> is true, run <block5>
	<block5>
else:			# if no above conditions evaluate to true, run <block6>
	<block6>

```

## While loops

### A simple while loop
```
reponse = ""

while response != "that is the question.":
	response = input("Complete this phrase: To be or not to be, ")

print "\nYou are correctn"
```

## Sentry variable

If the response above was already set to "that is the question.", the block would never run. To correct this behavior, use a sentry variable. A sentry variable is one that keeps track of interation.

incorrect example:
```
counter = 0

while counter <= 10:
	print counter
```

correct example:
```
counter = 0

while counter = 0
	print counter
	counter++
```

## True false

The statement:
```
# Simplier
if money:

# More expression-based
if money != 0:
```

Both statements amount to the same condition check and are interpreted as being True or False. When no condition follows the variable, it is interpred as such. The basic rule is that any empty or zero value is False, and everything else is True. Testing for an empty value is a common task for many programs.

## Intentional infinite loops

A simple example here is counter program. You want the loop to keep going and going, but at some point if a break statment is hit, exit the loop.

```
count = 0 

while True:

	count ++ 1

	# end the loop if count great than 10
	if count > 10:
		# Break the loop
		break

	# skip 5
	if count == 5:
		# Keep going with the loop
		continue

``

As you can see, instead of a simple while loop, you can handle conditions (is it 10 or 5?, do I continue or break?). The key takeaways are break and continue. They can be used anywhere, but should be used sparingly. The obfuscate the flow of the loop, and are not truly required to break loops. In the end, infinite loops are usually reserved for occasions where a regular loop is less clear than the intention infinite loop.


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


## Pseudocode

Pseudocode is a way of planning and writing out your program in "plain language." Instead of writing actual code, you write our what you want the code to do:

```
Start program

get a list of mailboxes
get a list of recipients

run the email_delivery function with the mailbox and recipent arguments passed

check that email was delieverd correctly:

if the email is delivered to the expected mailbox, do this
	report that the mail is delivered

if the email is not delivered to the expected mailbox do this:
	report an error
	Ask maybe to try resending the email
```

If you are stumped, or want to draft out added functionality, pseudocode is a great way to plan it out.




