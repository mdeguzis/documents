<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [ini files](#ini-files)
  - [Reading ini files](#reading-ini-files)
  - [Storing and reading lists from ini files](#storing-and-reading-lists-from-ini-files)
    - [Preferred method](#preferred-method)
    - [Alterantive methods](#alterantive-methods)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on reading configuration files in python

# ini files

## Reading ini files

Example:
```
import ConfigParser

config = ConfigParser.RawConfigParser()
config.read('example.cfg')

# getfloat() raises an exception if the value is not a float
# getint() and getboolean() also do this for their respective types
a_float = config.getfloat('Section1', 'a_float')
an_int = config.getint('Section1', 'an_int')
print a_float + an_int

# Notice that the next output does not interpolate '%(bar)s' or '%(baz)s'.
# This is because we are using a RawConfigParser().
if config.getboolean('Section1', 'a_bool'):
    print config.get('Section1', 'foo')
```

## Storing and reading lists from ini files

Given this example:
```
[offices]
location_nyc =
    marketing
    finance
    information_technology
```

Normally, the output of the get method would produce:
```
config.get('offices', 'location_nyc')
'\nmarketing\nfinance\ninformation_technology'
```
### Preferred method

What I prefer is to keep the first examples format, and just use the `split()` method. This produces a list type object *and* looks clean in the .ini file:

```
config.get('offices', 'location_nyc').split()
['nmarketing', 'finance', 'information_technology']
```

### Alterantive methods

Because the examples format is clean looking, I personally prefer to store it that way. Alternatives are:

Seperate items
```
[offices]
office1 = marketing
office2 = finance
office3 = information_technology
```

The JSON "hacky" approach (produces native list type)
```
fibs: [1,1,2,3,5,8,13]
just read it with:

>>> json.loads(config.get("Foo","fibs"))
[1, 1, 2, 3, 5, 8, 13]

# You can even break lines if your list is long (thanks @peter-smit):

[Bar]
files_to_check = [
     "/path/to/file1",
     "/path/to/file2",
     "/path/to/another file with space in the name"
     ]
```

# Links

* [configparser](https://docs.python.org/2/library/configparser.html)
