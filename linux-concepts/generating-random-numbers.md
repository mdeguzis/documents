# About
This page describes several methods of generating random numbers

# Using /dev/urandom

```
od -An -N4 -i < /dev/urandom | sed 's/ //g'
```
