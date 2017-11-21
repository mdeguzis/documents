<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Getting help for python libs/modules](#getting-help-for-python-libsmodules)
- [Python projects](#python-projects)
- [Python 2 vs. Python 3](#python-2-vs-python-3)
- [Modules](#modules)
  - [\_\_future\_\_ module](#%5C_%5C_future%5C_%5C_-module)
- [Libraries](#libraries)
  - [Listing all modules](#listing-all-modules)
- [Listing PYTHONPATH](#listing-pythonpath)
- [Links](#links)
- [books and ebooks](#books-and-ebooks)
- [Documentation](#documentation)
- [Videos](#videos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Python tips and tricks. You can check your python version with `python --version` or `import sys; sys.version` in a python shell prompt.

# Getting help for python libs/modules

## list help for module/lib

```
help(posix1e)
```

## list help/docstring from function

If the developer was kind enough to list helpful info in the docstring of a function, you can list that as so:
```
obj.__doc__
```

## list  methods

You can use the below command to see all available methods/attributes.
```
dir(<MODULE>) 
```

You may have to build the object you are using a method first:
```
import posix1e
b = posix1e.ACL(text="u:user:rwx,g:group:r,o::-")
print b.applyto.__doc__
```

# Python projects

Repository for python code and examples:

https://github.com/ProfessorKaos64/python

# Python 2 vs. Python 3

Many projects still use python 2, but be aware of the syntax. Fortunately, there is some interoperability in python 2. For instace, in python 2.7.x, both the python 3 syntax of  `print (x)` and the python 2 syntax of `print x` will work.

Example:

```
print bin(4)
print(bin(4))
```

# Modules

Below are some notable modules to keep in mind. The rest can be found in the modules/ folder or referenced from docs.python.org (see links).

## \_\_future\_\_ module

See: [modules/future.md](https://github.com/mdeguzis/documents/blob/master/programming/python/modules/__future__.md)

# Libraries

See: https://docs.python.org for a listing of what is included in the Python Standard Library. You can swap Python versions with the dropdown box at the top of the screen. This is an important resource to bookmark.

## Listing all standard modules

Short way:

```
python -c "help('modules')"
```

Long way

```
#Login into system.
#Type the command python to get the python prompt

python

#Now you will get the python prompt like this >>>, type the command help(“modules”) and press enter key

help(“modules”)
```

For example:
```
# Code line
conn = hive.Connection(this, then, that)

# Getting the docstring help
from pyhive import hive
help(hive.Connection)
```

# Listing PYTHONPATH

You would probably also want this:

```
import sys
print(sys.path)
```

Or as a one liner from the terminal:

```
# Python2
python -c "import sys; print '\n'.join(sys.path)"

# Python 3
python -c "import sys; print('\n'.join("sys.path"))"
```

# Links

* [Key Python Projects](https://packaging.python.org/key_projects/)
* [Installing data files](https://docs.python.org/3/distutils/setupscript.html#installing-additional-files)
* [Online IDE for practice](https://repl.it/languages)
* [Python code sytle guide](https://www.python.org/dev/peps/pep-0008/)
* [Packaging style guide](https://packaging.python.org/distributing/)
* [Minimal module packaging](http://python-packaging.readthedocs.io/en/latest/minimal.html)
* [Nice sample project](https://github.com/pypa/sampleproject/tree/master/sample)

# books and ebooks

* [Python Programming for the Absolute Beginner, 3rd Edition](https://www.amazon.com/Python-Programming-Absolute-Beginner-3rd/dp/1435455002) - **Bookmark status:** - page 217

# Documentation

See [docs/master-list.md](https://github.com/mdeguzis/documents/tree/master/programming/python/docs). Notable snippets will be kept as separate files in the docs/ folder, with notable links documented under the master list.

# Videos

* [Packaging tips and tricks](https://ep2015.europython.eu/conference/talks/less-known-packaging-features-and-tricks)
