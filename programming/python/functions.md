# About

Python functions

* Abstract code
* reusable
* create your own modules for easier reusability

# Basics

## Defining a function

This line tells the computer that the block of code that follows is to be used together as the function instructions(). is means that whenever I call the function instructions() in this program, the block of code runs. This line and its block are a "function definition". They define what the function does, but don’t run the function

```
def instructions():
```

## Documenting a function

Functions have a special mechanism that allows you to document them with what’s called a docstring (or documentation string). I created the following docstring for instructions() :

```
"""Display game instructions."""
```

## Calling a function

```
instructions()
```

You can pass values to the function inside the parenthesis. Those values must align and be declared in the `def <function>(var1 var2):` area. Make sure to have enough variables to catch all the return values of a function. If you don’t have the right number when you try to assign them, you’ll generate an error.

```
def display(message):
    print(message)
    
display("Here's a message for you")
```

## Returning values

```
def ask_yes_no(question):
        """Ask a yes or no question."""
        response = None
        while response not in ("y", "n"):
                response = raw_input(question).lower()
                return response

answer = ask_yes_no("\nPlease enter 'y' or 'n': ")
print "Thanks for entering: ", answer
```

**Note:** You can pass more than one value back from a function. Just list all the values you want to
return, separated by commas.

## Encapsulation

Encapsulation means no variable you create in a function, including its parameters, can be directly accessed outside its function. Encapsulation is a principal of abstraction. Abstraction saves you from worrying about the details. Encapsulation hides details from you. 

##  Keyword arguments and default parameter values

Passing values through arguments to parameters allows you to give information to a function.

If you just list out a series of variable names in a function’s header, you create positional
parameters:

```
def birthday1(name, age):
```

If you call a function with just a series of values, you create positional arguments. Using positional parameters and positional arguments means that parameters get their values based solely on the position of the values sent. The first parameter gets the first value sent, the second parameter gets the second value sent, and so on.

```
birthday1("Jackson", 1)
```

You can combine keyword arguments and positional arguments in a single function call, but this can get tricky. Once you use a keyword argument, all the remaining arguments in the call must be keyword arguments, too. To keep things simple, try to use all keyword or all positional arguments in your function calls.

Once you assign a default value to a parameter in the list, you have to assign default values to all the parameters listed after it. So, this function header is perfectly fine:

```
def monkey_around(bananas = 100, barrel_of = "yes",
uncle = "monkey’s"):
```

Default parameter values are great if you have a function where almost every time it’s called, some parameter gets sent the same value. To save programmers using your function the trouble of typing this value every time, you could use a default parameter value instead.

But this isn’t:

```
def monkey_around(bananas = 100, barrel_of, uncle):
```

The above header will generate an error.

## Global variables

Through the magic of encapsulation, the functions you’ve seen are all totally sealed off and independent from each other and the main part of your program. The only way to get information into them is through their parameters, and the only way to get information out of them is from their return values. Well, that’s not completely true. There is another way that you can share information among parts of your program: through global variables.

## Scopes

Scopes represent different areas of your program that are separate from each other. For example, each function you define has its own scope. That’s why the functions you’ve seen can’t directly access each other’s variables

Ilustration:
```
def func1()
    variable1
    
def func2()
    variable2
    
variable0
```

* The first is defined by function func1()
* The second is defined by function func2()
* The third is the global scope (which all programs automatically have)

Any variable that you create in the global scope is called a global variablewhile any variable you create inside a function is called a local variable (it’s local to that function).

# Examples

See the following examples at [mdeguzis/python](https://github.com/mdeguzis/python)

* fundementals/tic-tac-toe.py
* fundementals/receive-and-return.py
* fundementals/global-reach.py
