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

# While loops

### A simple while loop
```
reponse = ""

while response != "that is the question.":
	response = input("Complete this phrase: To be or not to be, ")

print "\nYou are correctn"
```

# Sentry variables

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

# True false

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
