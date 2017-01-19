# Subprocess vs Popen

There are two ways to do the redirect. Both apply to either `subprocess.Popen` or `subprocess.call`.

1. Set the keyword argument `shell = True` or `executable = /path/to/the/shell` and specify the command just as you have it there.
2. Since you're just redirecting the output to a file, set the keyword argument

```
stdout = an_open_writeable_file_object
```

...where the object points to the output file.

# Popen

[subprocess.Popen](http://docs.python.org/library/subprocess.html#subprocess.Popen)  is more general than [subprocess.call](http://docs.python.org/library/subprocess.html#subprocess.call).

`Popen` doesn't block, allowing you to interact with the process while it's running, or continue with other things in your Python program. The call to Popen returns a Popen object.

# Call

`call` **does** block. While it supports all the same arguments as the Popen constructor, so you can still set the process' output, environmental variables, etc., your script waits for the program to complete, and call returns a code representing the process' exit status.

```
returncode = call(*args, **kwargs) 
```

....is basically the same as calling

```
returncode = Popen(*args, **kwargs).wait()
```

`call` is just a convenience function. It's implementation in CPython is in [subprocess.py](http://hg.python.org/cpython/file/e0df7db13d55/Lib/subprocess.py#l459):

```
def call(*popenargs, timeout=None, **kwargs):
    """Run command with arguments.  Wait for command to complete or
    timeout, then return the returncode attribute.

    The arguments are the same as for the Popen constructor.  Example:

    retcode = call(["ls", "-l"])
    """
    with Popen(*popenargs, **kwargs) as p:
        try:
            return p.wait(timeout=timeout)
        except:
            p.kill()
            p.wait()
            raise
```

As you can see, it's a thin wrapper around Popen.


Source: [StackOverflow](http://stackoverflow.com/questions/7681715/whats-the-difference-between-subprocess-popen-and-call-how-can-i-use-them)
