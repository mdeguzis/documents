# What is the reason for the try-except-else to exist?
A try block allows you to handle an expected error. The except block should only catch exceptions you are prepared to handle. If you handle an unexpected error, your code may do the wrong thing and hide bugs.

An else clause will execute if there were no errors, and by not executing that code in the try block, you avoid catching an unexpected error. Again, catching an unexpected error can hide bugs.

## Example
```
For example:

try:
    try_this(whatever)
except SomeException as the_exception:
    handle(the_exception)
else:
    return something
```

The "try, except" suite has two optional clauses, else and finally. So it's actually try-except-else-finally.

else will evaluate only if there is no exception from the try block. It allows us to simplify the more complicated code below:

```
no_error = None
try:
    try_this(whatever)
    no_error = True
except SomeException as the_exception:
    handle(the_exception)
if no_error:
    return something
```

so if we compare an else to the alternative (which might create bugs) we see that it reduces the lines of code and we can have a more readable, maintainable, and less buggy code-base.

## finally
finally will execute no matter what, even if another line is being evaluated with a return statement.

Broken down with pseudo-code
It might help to break this down, in the smallest possible form that demonstrates all features, with comments. Assume this syntactically correct (but not runnable unless the names are defined) pseudo-code is in a function.

For example:

```
try:
    try_this(whatever)
except SomeException as the_exception:
    handle_SomeException(the_exception)
    # Handle a instance of SomeException or a subclass of it.
except Exception as the_exception:
    generic_handle(the_exception)
    # Handle any other exception that inherits from Exception
    # - doesn't include GeneratorExit, KeyboardInterrupt, SystemExit
    # Avoid bare `except:`
else: # there was no exception whatsoever
    return something()
    # if no exception, the "something()" gets evaluated,
    # but the return will not be executed due to the return in the
    # finally block below.
finally:
    # this block will execute no matter what, even if no exception,
    # after "something" is eval'd but before that value is returned
    # but even if there is an exception.
    # a return here will hijack the return functionality. e.g.:
    return True # hijacks the return in the else clause above
```

It is true that we could include the code in the else block in the try block instead, where it would run if there were no exceptions, but what if that code itself raises an exception of the kind we're catching? Leaving it in the try block would hide that bug.

We want to minimize lines of code in the try block to avoid catching exceptions we did not expect, under the principle that if our code fails, we want it to fail loudly. This is a best practice.

>It is my understanding that exceptions are not errors
>In Python, most exceptions are errors.

We can view the exception hierarchy by using pydoc. For example, in Python 2:

```
$ python -m pydoc exceptions
```

or Python 3:
```
$ python -m pydoc builtins
```

Will give us the hierarchy. We can see that most kinds of Exception are errors, although Python uses some of them for things like ending for loops (StopIteration). This is Python 3's hierarchy:

```
BaseException
    Exception
        ArithmeticError
            FloatingPointError
            OverflowError
            ZeroDivisionError
        AssertionError
        AttributeError
        BufferError
        EOFError
        ImportError
            ModuleNotFoundError
        LookupError
            IndexError
            KeyError
        MemoryError
        NameError
            UnboundLocalError
        OSError
            BlockingIOError
            ChildProcessError
            ConnectionError
                BrokenPipeError
                ConnectionAbortedError
                ConnectionRefusedError
                ConnectionResetError
            FileExistsError
            FileNotFoundError
            InterruptedError
            IsADirectoryError
            NotADirectoryError
            PermissionError
            ProcessLookupError
            TimeoutError
        ReferenceError
        RuntimeError
            NotImplementedError
            RecursionError
        StopAsyncIteration
        StopIteration
        SyntaxError
            IndentationError
                TabError
        SystemError
        TypeError
        ValueError
            UnicodeError
                UnicodeDecodeError
                UnicodeEncodeError
                UnicodeTranslateError
        Warning
            BytesWarning
            DeprecationWarning
            FutureWarning
            ImportWarning
            PendingDeprecationWarning
            ResourceWarning
            RuntimeWarning
            SyntaxWarning
            UnicodeWarning
            UserWarning
    GeneratorExit
    KeyboardInterrupt
    SystemExit
```

A commenter asked:

>Say you have a method which pings an external API and you want to handle the exception at a class outside the API wrapper, do you simply return e from the method under the except clause where e is the exception object?

No, you don't return the exception, just reraise it with a bare raise to preserve the stacktrace.

```
try:
    try_this(whatever)
except SomeException as the_exception:
    handle(the_exception)
    raise
```

Or, in Python 3, you can raise a new exception and preserve the backtrace with exception chaining:

```
try:
    try_this(whatever)
except SomeException as the_exception:
    handle(the_exception)
    raise DifferentException from the_exception
```

I elaborate in my answer [here](https://stackoverflow.com/questions/2052390/manually-raising-throwing-an-exception-in-python)

Source: https://stackoverflow.com/questions/16138232/is-it-a-good-practice-to-use-try-except-else-in-python
