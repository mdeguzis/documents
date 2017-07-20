# About 

This page describes usage of 'raise', often seen with try/except.

# raise vs raise from

The difference is that when you use from, the `__cause__` attribute is set and the message states that the exception was directly caused by. If you omit the from then no `__cause__` is set, but the `__context__` attribute may be set as well, and the traceback then shows the context as during handling something else happened.

Setting the `__context__` happens if you used raise in an exception handler; if you used raise anywhere else no `__context__` is set either.

If a `__cause__` is set, a `__suppress_context__ = True` flag is also set on the exception; when `__suppress_context__` is set to True, the `__context__` is ignored when printing a traceback.

When raising from a exception handler where you don't want to show the context (don't want a during handling another exception happened message), then use `raise ...` from None to set `__suppress_context__` to True.

In other words, Python sets a context on exceptions so you can introspect where an exception was raised, letting you see if another exception was replaced by it. You can also add a cause to an exception, making the traceback explicit about the other exception (use different wording), and the context is ignored (but can still be introspected when debugging). Using `raise ...` from None lets you suppress the context being printed.

*See more:* [raise statement documenation](https://docs.python.org/3/reference/simple_stmts.html#raise):

>The from clause is used for exception chaining: if given, the second expression must be another exception class or instance, which will then be attached to the raised exception as the __cause__ attribute (which is writable). If the raised exception is not handled, both exceptions will be printed:

```
>>> try:
...     print(1 / 0)
... except Exception as exc:
...     raise RuntimeError("Something bad happened") from exc
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: int division or modulo by zero
```

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
RuntimeError: Something bad happened
```

A similar mechanism works implicitly if an exception is raised inside an exception handler: > the previous exception is then attached as the new exception’s __context__ attribute:

```
>>> try:
...     print(1 / 0)
... except:
...     raise RuntimeError("Something bad happened")
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: int division or modulo by zero

During handling of the above exception, another exception occurred:

```
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
RuntimeError: Something bad happened
```

Also see the [Built-in Exceptions documentation](https://docs.python.org/3/library/exceptions.html#built-in-exceptions) for details on the context and cause information attached to exceptions.

Source: [StackOverflow](https://stackoverflow.com/a/24752607)
