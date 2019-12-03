#!/bin/python
# https://docs.python.org/2/tutorial/controlflow.html

def make_incrementor(n):
    return lambda x: x + n

num = 42
print("Num is " + str(num))
print("Adding 1")
f = make_incrementor(42)
print("Num is now: " + str(f(1)))
