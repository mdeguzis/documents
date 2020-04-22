<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Logging](#logging)
- [Modules](#modules)
- [Configuration](#configuration)
  - [Basic configuration](#basic-configuration)
  - [Refined configuration](#refined-configuration)
  - [Advanced - Rotating logs](#advanced---rotating-logs)
  - [Advanced - Separated Console and log file](#advanced---separated-console-and-log-file)
    - [Approach 1](#approach-1)
    - [Logging class structure](#logging-class-structure)
    - [Approach 2](#approach-2)
  - [Advanced - Main logger and custom independent loggers in modules](#advanced---main-logger-and-custom-independent-loggers-in-modules)
  - [Seperate log handling by scope](#seperate-log-handling-by-scope)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Logging

How I setup logging in my python scripts. See the links for definitions on log levels and what how to output more log types.

# Modules

```
import logging
```

# Configuration

## Basic configuration

There are no changes needed to make use of basic logging:
```
import logging
logging.warning('Watch out!')  # will print a message to the console
logging.info('I told you so')  # will not print anything
```

## Refined configuration

Initial layout in global scope
```
# log config
# Reuse the same log file for now
# NOTE: This base logging level MUST be the "staring" point for other loggers like stdout below
# If you set this to INFO, and use DEBUG on your stdout logger, it will not work!
logging.basicConfig(filename='/tmp/script-log.txt', level=logging.DEBUG, filemode='w')

# Log to file and to stdout
# For the console logger, only show warnings, error, critical
stdoutLogger=logging.StreamHandler()
stdoutLogger.setLevel(logging.WARNING)
stdoutLogger.setFormatter(logging.Formatter('%(levelname)s - %(message)s'))
logging.getLogger().addHandler(stdoutLogger)
logging.info("\n-------------------------\nBEGIN LOG FILE\n-------------------------\n") 

# CODE HERE

# Note the end of the log
logging.info("\n-------------------------\nEND LOG FILE\n-------------------------\n") 
```

## Advanced - Rotating logs

```
import glob
import logging
import logging.handlers

LOG_FILENAME = 'logging_rotatingfile_example.out'

# Set up a specific logger with our desired output level
my_logger = logging.getLogger('MyLogger')
my_logger.setLevel(logging.DEBUG)

# Add the log message handler to the logger
handler = logging.handlers.RotatingFileHandler(
              LOG_FILENAME, maxBytes=20, backupCount=5)

my_logger.addHandler(handler)

# Log some messages
for i in range(20):
    my_logger.debug('i = %d' % i)

# See what files are created
logfiles = glob.glob('%s*' % LOG_FILENAME)

for filename in logfiles:
    print(filename)
```

The result should be 6 separate files, each with part of the log history for the application:

```
logging_rotatingfile_example.out
logging_rotatingfile_example.out.1
logging_rotatingfile_example.out.2
logging_rotatingfile_example.out.3
logging_rotatingfile_example.out.4
logging_rotatingfile_example.out.5
```

Source: [StackOverflow](https://stackoverflow.com/a/39349929)

## Advanced - Separated Console and log file

Python has a great integrated logging mechanism for developers. You don’t have to make complicated stuffs to activate logger and you can easily log to file or console with separating different kinds of log levels. In this writing, I will create a basic initialization method and use it to log my main program. More complicated implications are up to you.

### Approach 1

First, I want to give some basic concepts of logger for python. Logger has a 5 different level in python. These are:

* debug
* info
* warning
* error
* critical

Every output place is controlled by handlers. For example, if you want to console output, you need to define console related handler. After that, you can handle logging level or logging format via that handler.

Now, I will give you a basic example code for logging. My file structure will be like below:

### Logging class structure

``` 
def initialize_logger(output_dir):
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
     
    # create console handler and set level to info
    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter("%(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
 
    # create error file handler and set level to error
    handler = logging.FileHandler(os.path.join(output_dir, "error.log"),"w", encoding=None, delay="true")
    handler.setLevel(logging.ERROR)
    formatter = logging.Formatter("%(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
 
    # create debug file handler and set level to debug
    handler = logging.FileHandler(os.path.join(output_dir, "all.log"),"w")
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
```    
   
Line 5-6: Get main logger to add new specifications. Then set global log level to debug.

Line 9-13: In this area I add console logging mechanism to logger. In first line I get StreamHandler() and this means console for me. Then I said I only want output for INFO messages or higher level like errors or critical messages. For example Debug messages will not be printed out with this options. Then I give my own output format. There are a lot of options for this format and mine is very very simple. At the end, I add my console handler to my main logger.

Line 16-20: This area is nearly same as above except little differences. This time we get a FileHandler to write a file. In first parameter, we give the path for output file. Then we say we want to ‘write’ to file without any encoding specification. Last parameter puts some magic here. If no message is sent to this handler, no file will be created. The below lines are the same as above except that logger level is set to Error.

Line 23-27: In this area we create a new handler to log every message. We set level to debug, which is minimum, and let file be created every run.

After that, we can test this code with below code:

```
#!/usr/bin/env python3
 
from utils.loggerinitializer import *
 
initialize_logger('/home/aykut/Documents/blog')
 
logging.debug("debug message")
logging.info("info message")
logging.warning("warning message")
logging.error("error message")
logging.critical("critical message")
```

### Approach 2
This is a bit more simplified and allows scope adjustments. One log file, controlled by keyword arguments. This gives you the power to set things as you see fit, console only? Override the level? Override the scope?

```
def initialize_logger(log_level=logging.INFO, log_filename=None, scope=None):
    """ Initalizes a logger for both stdout and to-file
    Returns the logger incase a scope of non root is used

    Keyword arguments:
    log_level -- Allows the end-user to override the log file level by specifying a 
      compatible integer in the form of logging.SOMELEVEL (must be upperase)
      (default: logging.INFO)
    log_filename -- String to represent the log filename (Default: none)
    scope -- A string name for the logger to set it's scope (default: 'root')
    """

    # Set scope
    # At this level, filter what messages get passed from the scope
    # to the console/file handler beneath it.
    # For now, start with NOTSET to allow everything "in the door".
    # https://docs.python.org/2/howto/logging-cookbook.html
    # https://docs.python.org/3/howto/logging-cookbook.html
    logger = logging.getLogger(scope)
    logger.setLevel(logging.NOTSET)

    # create console handler and set level to info
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)

    # Set console handling formatting
    console_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)

    if log_filename != None:
        # create file handler for typical logs
        if len(log_filename) < 4 or log_filename[-4:] == ".log":
            this_log_filename = log_filename
        else:
            this_log_filename = log_filename + ".log"

        # Set file_handler to taret level
        file_handler = logging.FileHandler(this_log_filename,"w", encoding=None, delay="true")
        file_handler.setLevel(log_level)

        # Set formatting
        file_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        file_handler.setFormatter(file_formatter)
        logger.addHandler(file_handler)

    return logger
```

Source: [aykutakin.wordpress.com](https://aykutakin.wordpress.com/2013/08/06/logging-to-console-and-file-in-python/)

## Advanced - Main logger and custom independent loggers in modules
This is useful if you have a main script that instantiates other modules that also use logging. Turning off propogation keeps the handlers 
that are added in each phase from attaching to the root logger (avoiding in double messages)

```
def initialize_logger(log_level=logging.INFO, log_filename=None, scope=None, 
                     propagate=False, formatter="%(asctime)s - %(levelname)s - %(message)s"):
    """ Initalizes a logger for both stdout and to-file
    Returns the logger incase a scope of non root is used

    Keyword arguments:
    log_level:      Allows the end-user to override the log file level by 
                    specifying a compatible integer in the form of 
                    logging.SOMELEVEL (must be upperase)
                    (default: logging.INFO)
    log_filename -- String to represent the log filename (Default: none)
    propagate       Propagate this to the root logger
    scope -- A string name for the logger to set it's scope (default: 'root')
    formatter:      Allows Addjusting log message format
    """

    # Set scope
    logger = logging.getLogger(scope)
    logger.setLevel(log_level)
    # Do no propogate logger so that routines with multiple
    # loggers (modules, unittests), do not repeat messages
    # https://docs.python.org/3/library/logging.html#logging.Logger.propagate
    logger.propagate = propagate

    if not logger.handlers:
        # create console handler and set level to info
        console_handler = logging.StreamHandler()
        console_handler.setLevel(log_level)

        # Set console handling formatting
        console_formatter = logging.Formatter(formatter)
        console_handler.setFormatter(console_formatter)
        logger.addHandler(console_handler)

    if log_filename != None:
        # create file handler for typical logs
        if len(log_filename) < 4 or log_filename[-4:] == ".log":
            this_log_filename = log_filename
        else:
            this_log_filename = log_filename + ".log"

        # Set file_handler to taret level
        file_handler = logging.FileHandler(this_log_filename,"w", encoding=None, delay="true")
        file_handler.setLevel(log_level)

        # Set formatting
        file_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
        file_handler.setFormatter(file_formatter)
        logger.addHandler(file_handler)

    return logger
```

Add this to main/modules to scope them per the filename or given-string:
```
logger = initialize_logger(log_level=logging.WARNING, \
    log_filename=None, scope=os.path.basename(__file__))
```

If you are doing unit tests and want your normal modules to be suppressed to ERROR so that your tests are quiet, but STILL want to have your parent
runniner have its own logger, that's DOABLE!. Obviously this is not for every sitaution, but what you would do is this:

* Set the root logger before any imports of classes/modules
* Set a scoped-logger, non-propagate in your parent runner
* Set a scoped-logger, non-propagate in your test modules

```
# Before any imports
# Set a scoped logger for this parent runner
initialize_logger(log_level=logging.ERROR, \
    log_filename=None, scope=None, propagate=True, \
    formatter="%(message)s")

# Test runnner and any test module
logger = initialize_logger(log_level=logging.INFO, \
    log_filename=None, scope=os.path.basename(__file__), \
    propagate=False, formatter="%(message)s")
```

## Seperate log handling by scope

```
# Suppress INFO messages from requests here, no need to spam them
# This doesn't seem to interfere with any logging settings we set
#   with our library or otherwise (still respected)
# Example: "Resetting dropped connection: server.domain.com"
# See: https://github.com/psf/requests/issues/2913
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests") 
requests_log.setLevel(logging.WARN)
requests_log.propagate = True
```

# Links

* [Log file format](https://docs.python.org/2/library/logging.html#logrecord-attributes)
* [Inserting newlines in log](http://stackoverflow.com/questions/20111758/how-to-insert-newline-in-python-logging)
* [logging (doc)](https://docs.python.org/2/library/logging.html)
* [logging library (how to)](https://docs.python.org/2/howto/logging.html)
