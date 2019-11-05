<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Syntax Checking your python script without running it](#syntax-checking-your-python-script-without-running-it)
  - [One file](#one-file)
  - [multiple files](#multiple-files)
  - [pylint](#pylint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Syntax Checking your python script without running it

## One file
This is a neat little trick to test your python code on the command line without running the script.

```
$ python -m py_compile yourpythonscript.py
```

All that command does is compile your python script and create a .pyc file. If there are any errors, you will see the errors be spit out.

## multiple files

See: https://docs.python.org/3/library/compileall.html

```
$ python -m compileall yourpythonscript.py
```

## pylint

There is also pylint as well: https://docs.pylint.org/en/1.6.0/run.html. This is not a standard Python library. You will need to install the distirbution pacakge, pip package, or use a virtual environment.

```
pylint mymodule.py
```
