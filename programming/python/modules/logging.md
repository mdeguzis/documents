<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Logging](#logging)
- [Modules](#modules)
- [Configuration](#configuration)
  - [Basic configuration](#basic-configuration)
  - [Refined configuration](#refined-configuration)
  - [Advanced - Rotating logs](#advanced---rotating-logs)
  - [Advanced - console and log file](#advanced---console-and-log-file)
  - [Advanced - console handler only](#advanced---console-handler-only)
  - [Adanced - Log just stdout file](#adanced---log-just-stdout-file)
  - [Advanced - different levels of stdout logfile](#advanced---different-levels-of-stdout-logfile)
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

Source: [aykutakin.wordpress.com](https://aykutakin.wordpress.com/2013/08/06/logging-to-console-and-file-in-python/)

# Links

* [Log file format](https://docs.python.org/2/library/logging.html#logrecord-attributes)
* [Inserting newlines in log](http://stackoverflow.com/questions/20111758/how-to-insert-newline-in-python-logging)
* [logging (doc)](https://docs.python.org/2/library/logging.html)
* [logging library (how to)](https://docs.python.org/2/howto/logging.html)
