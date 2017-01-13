<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Key points](#key-points)
  - [Shared references](#shared-references)
- [Special values](#special-values)
  - [None](#none)
- [Variable contraints](#variable-contraints)
- [Assignment operators](#assignment-operators)
- [Assignment statements](#assignment-statements)
  - [Strings](#strings)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on working with variables

# Key points

## Shared references

Variables don't store a value, they technically refer to the place in the computers memory where the value is stored (more particular to Python).

# Special values

## None

Given this example:
```
start = None
```

* 'None' is a special way of representing nothing, akin to 'NULL'
* The purpose here is to initialize 'start'
* It acts as a placeholder for a value later
* It will also evauluate to False, handy for loops

# Variable contraints

* Can only contain numbers, letters, and underscores
* Cannot start with a number

# Assignment operators

>a += b  
a -= b  
a *= b  
a /= b  
a //= b  
a %= b  
a **= b  
a &= b  
a |= b  
a ^= b  
a <<= b  
a >>= b  

# Assignment statements

## Strings
```
>>> name = "mike"
>>> print name
mike
```
