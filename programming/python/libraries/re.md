<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Regular expression operations (`re`) module information

# Tips and Tricks
## Using re in list comprehension
```
[m.group(1) for l in lines for m in [regex.search(l)] if m]
```
The "trick" is the for m in [regex.search(l)] part -- that's how you "assign" a 
value that you need to use more than once, within a list comprehension -- 
add just such a clause, where the object "iterates" over a single-item 
list containing the one value you want to "assign" to it. 
Some consider this stylistically dubious, but I find it practical sometimes.

Source: https://stackoverflow.com/a/2436623


# Links

* [Regular expression operations (docs.pythong.org)](https://docs.python.org/2/library/re.html)
