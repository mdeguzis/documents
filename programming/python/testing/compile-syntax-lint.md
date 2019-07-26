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
