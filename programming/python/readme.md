<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Python projects](#python-projects)
- [Python 2 vs. Python 3](#python-2-vs-python-3)
- [Listing all modules](#listing-all-modules)
- [Listing PYTHONPATH](#listing-pythonpath)
- [Links](#links)
- [Videos](#videos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Python tips and tricks

# Python projects

Repository for python code and examples:

https://github.com/ProfessorKaos64/python

# Python 2 vs. Python 3

Many projects still use python 2, but be aware of the syntax. Fortunately, there is some interoperability in python 2. For instace, in python 2.7.x, both the python 3 syntax of  `print (x)` and the python 2 syntax of `print x` will work.

Example:

```
print bin(4)
print (bin(4))
```

# Listing all modules

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

# Or search a specific module
modules <MODULE_NAME>

#CTRL+D press these key to exit from python prompt
```

# Listing PYTHONPATH

You would probably also want this:

```
import sys
print(sys.path)
```

Or as a one liner from the terminal:

```
python -c "import sys; print '\n'.join(sys.path)"
```

# Links

* [Installing data files](https://docs.python.org/3/distutils/setupscript.html#installing-additional-files)
* [Online IDE for practice](https://repl.it/languages)
* [Python code sytle guide](https://www.python.org/dev/peps/pep-0008/)
* [Packaging style guide](https://packaging.python.org/distributing/)
* [Minimal module packaging](http://python-packaging.readthedocs.io/en/latest/minimal.html)
* [Nice sample project](https://github.com/pypa/sampleproject/tree/master/sample)


# Videos

* [Packaging tips and tricks](https://ep2015.europython.eu/conference/talks/less-known-packaging-features-and-tricks)
