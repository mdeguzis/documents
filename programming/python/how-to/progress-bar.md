<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Simple count of items](#simple-count-of-items)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Simple count of items

This is useful for for loops in which you don't know where the "end" is. Say you are scanning the root directory for UID and GID, you at least
want to see how many items or what is going on, right?

```
# above the for loop:
i = 0

# Inside the for loop
i += 1                                                                                                                        │
print('\rItems: {}'.format(i)), 
```

* {} is a place holder for the variable to get inserted
* [format string](https://docs.python.org/2/library/string.html#formatstrings)

or ...

```
'\rItems: {: 3}'.format(i)``

* The ' 3' pads with spaces to a width of 3 characters.
* Then the 1's place stays in the same spot

# Using the 'progressbar' lib

TODO
