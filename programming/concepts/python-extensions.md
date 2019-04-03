* `.py`: This is normally the input source code that you've written.
* `.pyc`: This is the compiled bytecode. If you import a module, python will build a *.pyc file that contains the bytecode to make importing it again later easier (and faster).
* `.pyo`: This is a *.pyc file that was created while optimizations (-O) was on.
* `.pyd`: This is basically a windows dll file. http://docs.python.org/faq/windows.html#is-a-pyd-file-the-same-as-a-dll

Also for some further discussion on .pyc vs .pyo, take a look at: http://www.network-theory.co.uk/docs/pytut/CompiledPythonfiles.html (I've copied the important part below)

* When the Python interpreter is invoked with the -O flag, optimized code is generated and stored in ‘.pyo’ files. The optimizer currently doesn't help much; it only removes assert statements. When -O is used, all bytecode is optimized; .pyc files are ignored and .py files are compiled to optimized bytecode.
* Passing two -O flags to the Python interpreter (-OO) will cause the bytecode compiler to perform optimizations that could in some rare cases result in malfunctioning programs. Currently only __doc__ strings are removed from the bytecode, resulting in more compact ‘.pyo’ files. Since some programs may rely on having these available, you should only use this option if you know what you're doing.
* A program doesn't run any faster when it is read from a ‘.pyc’ or ‘.pyo’ file than when it is read from a ‘.py’ file; the only thing that's faster about ‘.pyc’ or ‘.pyo’ files is the speed with which they are loaded.
When a script is run by giving its name on the command line, the bytecode for the script is never written to a ‘.pyc’ or ‘.pyo’ file. Thus, the startup time of a script may be reduced by moving most of its code to a module and having a small bootstrap script that imports that module. It is also possible to name a ‘.pyc’ or ‘.pyo’ file directly on the command line.

Source: https://stackoverflow.com/questions/8822335/what-do-the-python-file-extensions-pyc-pyd-pyo-stand-for
