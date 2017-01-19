# Logging

How I setup logging in my python scripts. See the links for definitions on log levels and what how to output more log types.

# Modules

```
import logging
```

# Configuration

Initial layout in global scope
```
# log config
# Reuse the same log file for now
logging.basicConfig(filename='/tmp/script-log.txt', level=logging.DEBUG, filemode='w')

# Log to file and to stdout
stderrLogger=logging.StreamHandler()
stderrLogger.setFormatter(logging.Formatter(logging.BASIC_FORMAT))
logging.getLogger().addHandler(stderrLogger)
logging.info("\n-------------------------\nBEGIN LOG FILE\n-------------------------\n") 

# Note the end of the log
logging.info("\n-------------------------\nEND LOG FILE\n-------------------------\n") 
```

# Sample logging

```
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
```

# Links

* [logging (doc)](https://docs.python.org/2/library/logging.html)
* [logging library (how to)](https://docs.python.org/2/howto/logging.html)
