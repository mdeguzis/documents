# For loops

* A for loop interates through a sequence one element at a time
* The loop uses a a variable that gets each suscessive element of the sequence

## A simple for loop

```
word = raw_input("Input a word: ")

print "\nHere's each letter in your word: "

# start the for loop
# letter is not a special directive below
# When the loop begins, letter is create and gets the first
# character in the word

for letter in word:
    print letter
```

# While loops

## A simple while loop
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

# Intentional infinite loops

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
