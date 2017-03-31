<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The self variable](#the-self-variable)
  - [The class](#the-class)
- [Making a resturant](#making-a-resturant)
- [Tip](#tip)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# The self variable

A simple class :

## The class

```
class Restaurant(object):
    bankrupt = False
    def open_branch(self):
        if not self.bankrupt:
            print("branch opened")
```

First let me explain the above code without the technicalities. First of all we make a class Restaurant. Then we assign it a property “bankrupt” which is currently false. After that we assign it a function open_branch which can only occur if “bankrupt” is False which means that the Restaurant has some money.

# Making a resturant

Now that we have made a class for a Restaurant, lets actually make a resturant:

```
x = Restaurant()
```

Now x is a Restaurant which has a property bankrupt and a function open_branch. Now we can access the property bankrupt by typing:

```
x.bankrupt
```

The above command is same as:

```
Restaurant().bankrupt
```

Now you can see that self refers to the bound variable or object. In the first case it was x because we had assigned the Restaurant class to x whereas in the second case it referred to Restaurant(). Now if we have another Restaurant y, self will know to access the bankrupt value of y and not x. For example check this example:

```
>>> x = Restaurant()
>>> x.bankrupt
False

>>> y = Restaurant()
>>> y.bankrupt = True
>>> y.bankrupt
True

>>> x.bankrupt
False
```

The first argument of every class method, including __init__, is always a reference to the current instance of the class. By convention, this argument is always named self. In the __init__ method, self refers to the newly created object; in other class methods, it refers to the instance whose method was called. For example the below code is the same as the above code.

```
class Restaurant(object):
    bankrupt = False
    def open_branch(this):
        if not this.bankrupt:
            print("branch opened")
```

# Tip

However self is not a reserved keyword in python it’s just a strong convention. Many people say that why do we have to write self ? Why can’t we have it set automatically like in Java ? Someone also filed a PEP (improvement suggestion) in which he suggested to remove the explicit assignment of self keyword. However Guido Van Rossum (the maker of python) wrote a blogpost in which he told why explicit self has to stay.

# Links

* [Source: The self variable explained (pythontips)](https://pythontips.com/2013/08/07/the-self-variable-in-python-explained/)
