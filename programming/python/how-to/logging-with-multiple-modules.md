# Using Python logging with multiple modules

Best practice is, in each module, to have a logger defined like this:

```
import logging
logger = logging.getLogger(__name__)
```

near the top of the module, and then in other code in the module do e.g.

```
logger.debug('My message with %s', 'variable data')
```

If you need to subdivide logging activity inside a module, use e.g.

```
loggerA = logging.getLogger(__name__ + '.A')
loggerB = logging.getLogger(__name__ + '.B')
```
and log to loggerA and loggerB as appropriate.

In your main program or programs, do e.g.:

```
def main():
    "your program code"

if __name__ == '__main__':
    import logging.config
    logging.config.fileConfig('/path/to/logging.conf')
    main()
```

or

```
def main():
    import logging.config
    logging.config.fileConfig('/path/to/logging.conf')
    # your program code

if __name__ == '__main__':
    main()
```

See [here](http://docs.python.org/howto/logging.html#logging-from-multiple-modules) for logging from multiple modules, and here for logging configuration for code which will be used as a library module by other code.

# Important

When calling `fileConfig()`, you may want to specify `disable_existing_loggers=False` if you're using Python 2.6 or later (see the [docs](http://docs.python.org/2/library/logging.config.html#logging.config.fileConfig) for more information). The default value is `True` for backward compatibility, which causes all existing loggers to be disabled by `fileConfig()` unless they or their ancestor are explicitly named in the configuration. With the value set to `False`, existing loggers are left alone. If using Python 2.7/Python 3.2 or later, you may wish to consider the `dictConfig()` API which is better than `fileConfig()` as it gives more control over the configuration.
