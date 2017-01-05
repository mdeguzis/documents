#About Tuples

Types are a type of sequence, like stings. However, unlike strings, which can only contain characters, tuples can contian elements of any type. This could be Names, numbers, and so on. Tuples can even contain images, sound files, and much more. Tuples are immutable.

# Tuples vs Arrays

* With tuples, you have the ability to return a collection type consisting of different data types.
* With arrays, all the items in the collection type must be of the same data type.

See: [fundamentals/heros-inventory](https://github.com/mdeguzis/python/blob/python2/fundamentals/heros-inventory.py)

# Using functions with tupes

## len()

This works the same was as it does with stings.

```
if "healing potion" in intentory:      
  print "You will live to fight another day.
```

# Indexing

Works much the same way as with strings

````
# display one item through an index 
index = int(raw_input("Enter the item number from the inventory: "))    
print "At index", index, "is the item", inventory[index]
```

# Slicing with tuples

Same as with strings.

# Concatenating tuples

```
# Concatenating tuples    
chest = ("gold", "gems")
print("you find a chest. It contains:") 
print(chest)   
print("You add these to your inventory.")   
inventory += chest  
            
# show new inventory                    
print("You inventory is now:")
dotprint(inventory)
 ```
 
 # Example exercises
 
 See: [fundamentals](https://github.com/mdeguzis/python/tree/python2/fundamentals)
 
 The `world-jumble.py` program is an amalgamation of all execerses and topics within loops, strings, and tuples.
