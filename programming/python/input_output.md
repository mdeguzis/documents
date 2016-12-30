<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Examples](#examples)
  - [Simple string request](#simple-string-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Handling user input/output

# Examples

## Simple string request

```
# Python 2
# Use raw_input() instead of input():
# input() actually evaluates the input as Python code. 
# raw_input() returns the verbatim string entered by the user.

testVar = raw_input("Ask user for something.")

>>> name = raw_input("Hi, What's your name? ")
>>> print name

# Python 3
# Python 3 'input' functions the same way as raw_input (now removed)

>>> name = input("Hi, What's your name? ")
>>> print name
```
