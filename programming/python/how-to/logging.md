<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Logging](#logging)
- [Modules](#modules)
- [Configuration](#configuration)
  - [Basic configuration](#basic-configuration)
  - [Refined configuration](#refined-configuration)
  - [Advanced - console and log file](#advanced---console-and-log-file)
  - [Avanced - console handler only](#avanced---console-handler-only)
- [Sample logging](#sample-logging)
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

## Advanced - console and log file

The approach below is desirable for fine-grain control. The code set a console handler, and file handler. One handles what you see when the script is ran, the other, for the actual log file.

```
import logging

logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)

# create file handler which logs even debug messages
fh = logging.FileHandler('spam.log')
fh.setLevel(logging.DEBUG)

# create console handler with a higher log level
ch = logging.StreamHandler()
ch.setLevel(logging.ERROR)

# create formatter and add it to the handlers
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
fh.setFormatter(formatter)

# add the handlers to logger
logger.addHandler(ch)
logger.addHandler(fh)

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error('error message')
logger.critical('critical message')
```

## Avanced - console handler only

```
import logging

# create logger
logger = logging.getLogger(_name_)
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error('error message')
logger.critical('critical message')
```

# Sample logging

```
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
```

# Log just stdout file

```
# Log stdout to file with this handy class
log_filename = str(os.environ['HOME']) + '/user-audit.log'
class Logger(object):
    def __init__(self, filename=log_filename):
        self.terminal = sys.stdout
        self.log = open(filename, "w")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)

# Push to log
sys.stdout = Logger(log_filename)
```

Source: https://stackoverflow.com/a/5916874

# Links

* [Log file format](https://docs.python.org/2/library/logging.html#logrecord-attributes)
* [Inserting newlines in log](http://stackoverflow.com/questions/20111758/how-to-insert-newline-in-python-logging)
* [logging (doc)](https://docs.python.org/2/library/logging.html)
* [logging library (how to)](https://docs.python.org/2/howto/logging.html)
