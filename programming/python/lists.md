# Main points

* Uses square brackets instead of parenthesis (used for tuples)
* len(), in operator, indexing, concatenating, and slicing are the same as they are with tuples.
* The major difference between lists and tuples, is lists are mutable (i.e. can be changed).

# Methods

Method          | Description
----------------|---------------------------
append(value) | Adds \<value\> to end of list
sort() | Sorts the elements, smallest value first. Optionally, you can pass a Boolean value to the parameter `reverse`. If you pass True, the list will be sorted with the largest value first.
reverse() | Reverses the order of a list
count(value) | Returns the number of occurences of a \<value\>
index(value) | Returns the first position number of where \<value\> occurs
insert(i, value) | Insertts \<value\> at position `i`
pop([i]) | Returns value at position `i` and removes value from the list. Providing the position number `i` is optional. Without it, the last element in the list is removed and returned.
remove(value) | Removes the first occurence of \<value\> from the list.

# Working with lists

## Deleting an element

```
print("\nIn a great battle, you shield is destroyed")
del inventory[2]
print("Your inventory is now:")
print(inventory)
```

## Removing Item From List during iteration

Improper example:
```
letters=['a','b','c','d','e','f','g','h','i','j','k','l']
for i in letters:
    letters.remove(i)
print letters
```

The Python language is designed to handle this use case differently. The [documentation makes it clear](http://docs.python.org/tutorial/controlflow.html):

>It is not safe to modify the sequence being iterated over in the loop (this can only happen for mutable sequence types, such as lists). If you need to modify the list you are iterating over (for example, to duplicate selected items) you must iterate over a copy.
Emphasis mine. See the linked page for more -- the documentation is copyrighted and all rights are reserved.

You could easily understand why you got what you got, but it's basically undefined behavior that can easily change with no warning from build to build. Just don't do it.

It's like wondering [why i += i++ + ++i does whatever the hell it is it that line does on your architecture on your specific build of your compiler for your language](https://stackoverflow.com/questions/949433/could-anyone-explain-these-undefined-behaviors-i-i-i-i-i-etc) -- including but not limited to trashing your computer and making demons fly out of your nose :)

How it could this be re-written to remove every item?

* `del letters[:]` (if you need to change all references to this object)
* `letters[:] = []` (if you need to change all references to this object)
* `letters = []` (if you just want to work with a new object)

Maybe you just want to remove some items based on a condition? In that case, you should iterate over a copy of the list. The easiest way to make a copy is to make a slice containing the whole list with the [:] syntax, like so:

```
#remove unsafe commands
commands = ["ls", "cd", "rm -rf /"]
for cmd in commands[:]:
  if "rm " in cmd:
    commands.remove(cmd)
```    
    
If your check is not particularly complicated, you can (and probably should) filter instead:

Source: https://stackoverflow.com/a/2897058
See also: http://docs.python.org/tutorial/controlflow.html

## Splitting a List by chunks

Source: https://www.geeksforgeeks.org/break-list-chunks-size-n-python

# Working with indexes

## Assiging a new list element by index

```
print("\nYou change your sword for a crossbow.")
inventory[0] = "crossbow"
print("Your inventory is now:")
print(inventory)
```

Note: You can assign an existing list element a new vlaue with indexing, but you can't create a new element in this way.

# Working with slices

## Assingn a new list slice

```
print("\nYou use your gold and gems to buy an orb of future tellling.")
inventory[4:6] = ["orb of future telling"]
print("Your inventory is now:")
print(inventory)
```

## Delete a list slice

```
print("\nYour crossbow and armor are stolen by thieves!")
del inventory[0:2]
print("Your inventory is now:")
print(inventory)
```

## Functions

### len()

Used the same way, as it is with tuples, `len(var)`. 

# Examples

See the following programs in the fundementals folder:

* Hero's Inventory programs
* High Scores program

# Shared references

Variables don't store a value, they technically refer to the place in the computers memory where the value is stored (more particular to Python). Think of it like a symlink. Even mutable objects, such as list, behave the same way. Even if you change a value in a mutable list, the rest of the variables will follow suit

```
>>> mike = ["khakis", "dress shirt", "jacket"]
>>> mr_dawson = mike
>>> honey = mike
>>> print mike
['khakis', 'dress shirt', 'jacket']
>>> print mr_dawson
['khakis', 'dress shirt', 'jacket']
>>> print honey
['khakis', 'dress shirt', 'jacket']
>>> honey[2] = "red sweater"
>>> print honey
['khakis', 'dress shirt', 'red sweater']
>>> print mike
['khakis', 'dress shirt', 'red sweater']
```

You can change this behavior by storing a copy of the list by slicing

```
>> mike = ["khakis", "dress shirt", "jacket"]
>>> honey = mike[:]
>>> honey[2] = "red sweater"
>>> print(honey)
['khakis', 'dress shirt', 'red sweater']
>>> print(mike)
['khakis', 'dress shirt', 'jacket']
```
