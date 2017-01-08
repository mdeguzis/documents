<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Main points](#main-points)
- [Methods](#methods)
- [Working with list elements](#working-with-list-elements)
  - [Deleting an element](#deleting-an-element)
- [Working with indexes](#working-with-indexes)
  - [Assiging a new list element by index](#assiging-a-new-list-element-by-index)
- [Working with slices](#working-with-slices)
  - [Assingn a new list slice](#assingn-a-new-list-slice)
  - [Delete a list slice](#delete-a-list-slice)
  - [Functions](#functions)
    - [len()](#len)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Python notes on lists.

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

# Working with list elements

## Deleting an element

```
print("\nIn a great battle, you shield is destroyed")
del inventory[2]
print("Your inventory is now:")
print(inventory)
```

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
