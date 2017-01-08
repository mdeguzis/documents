# When to use tuples or lists

## The case for tuples

* faster
* more for simple programs
* immutability is perfect for constants (safety and clarity)
* There are times when immutable values are required

## The case for lists

If you don't require any of the above, lists are better in every other scenario.

# Nested sequences

* lists of tuples can contain other lists or tuples
* These are called nested sequences
* Think, the movie "Inception" :)

## Accessing nested sequences

Example:
```
nested = ["first", ("second, "third"), ["fourth", "fifth", "sixth"]]
```

As seen above, any one of the elements can be a nested list or tuple. Due to the outer brackets, we are using a list overall. The number of elements above is only 3, indicated by the outer-most comma-delimited values.

1. "first
2. ("second, "third")
3. ["fourth", "fifth", "sixth"]

It is important to be consistant here and to have a pattern, otherwise, things can get messy, quick. Here is a simple example of names and scores:

```
scores = [("Moe", 1000), ("Larry", 1500), ("Curly", 3000)]
>>> print scores
[('Moe', 1000), ('Larry', 1500), ('Curly', 3000)
```

You can access individual elements just like an index

```
>>> print scores[0]
('Moe', 1000)
```

To access a specific value further down? The easiest way to do this, is by assigning the tupes (e.g. `('Moe', 1000)` a variable). In this way, you are drilling down further into the elements, but assigning the tuple/list to a new variable, then bisecting it.

```
>>> a_score = scores[2]
>>> print a_score
('Curly', 3000)
>>> print a_score[0]
Curly
```

A shorthand for this would be:

```
print scores[2][0]
```

Here, you are getting index 2 of the outermost element, then index 0 of the next level down. If you get the wrong index, you'll get a 'index out of range' error.

## Unpacking a sequence

If you know how many elements are in a sequence, you can assign them each itos own variable in a single line of code:

```
>>> name, score = ("Shemp", 175)
>>> print name
Shemp
>>> print score
175
```

This is called "unpacking". Just make sure to use the same number of variables and elements in the sequence.

To learn more, check out the "high-scores-2.0" program in the fundementals folder.
