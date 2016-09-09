# About

Python tips and tricks

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

* [Packaging style guide](https://packaging.python.org/distributing/)
* [Minimal module packaging](http://python-packaging.readthedocs.io/en/latest/minimal.html)
* [Nice sample project](https://github.com/pypa/sampleproject/tree/master/sample)
