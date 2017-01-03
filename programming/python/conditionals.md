<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [if statements](#if-statements)
- [While loops](#while-loops)
    - [A simple while loop](#a-simple-while-loop)
- [Sentry variables](#sentry-variables)
- [True false](#true-false)
  - [Intentional infinite loops](#intentional-infinite-loops)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# if statements
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

# True false

The statement:
```
# Simplier
if money:

# More expression-based
if money != 0:
```

Both statements amount to the same condition check and are interpreted as being True or False. When no condition follows the variable, it is interpred as such. The basic rule is that any empty or zero value is False, and everything else is True. Testing for an empty value is a common task for many programs.
