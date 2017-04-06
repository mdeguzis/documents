<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Reading from text files](#reading-from-text-files)
  - [The methods](#the-methods)
  - [File accesss modes](#file-accesss-modes)
  - [open](#open)
  - [with open](#with-open)
- [Writing to text files](#writing-to-text-files)
  - [object methods](#object-methods)
- [Storing complex data in files](#storing-complex-data-in-files)
  - [Binary fie access modes](#binary-fie-access-modes)
- [Pickling and shelving](#pickling-and-shelving)
  - [picking functions](#picking-functions)
  - [Shelving pickled data](#shelving-pickled-data)
  - [Shelving explained](#shelving-explained)
  - [Syncing](#syncing)
  - [Shelve access modes](#shelve-access-modes)
  - [Real world application](#real-world-application)
- [Handling exceptions](#handling-exceptions)
  - [Exception types](#exception-types)
  - [Getting an exceptions arguement](#getting-an-exceptions-arguement)
  - [Adding an else Clause](#adding-an-else-clause)
  - [Multiple except clauses on one line](#multiple-except-clauses-on-one-line)
- [Example programs](#example-programs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

* Read from text files
* Write to text files
* Read and write more complex data with files
* Intercept and handle errors during a program’s execution

# Reading from text files

When you use with statement with open function, you do not need to close the file at the end, because with would automatically close it for you. For more, see [open vs. with open](https://github.com/mdeguzis/documents/blob/master/programming/python/topics/open-vs-with-open.md).

## The methods

Here are some examples to help understand how to read the file. `readline()` may seem no different than `read()`, but `readline()` reads characters from the current line only, while read() reads characters from the entire file. Because of this, `readline()` is usually invoked to read one line of text at a time.

Method example | Description
---------------|--------------------
file.read | read the entire file
file.readline | read the next line available
file.readline(1) | read the first character from the line
lines = file.readlines() | read lines into a list (loop to print them on seperate lines)
file.read(1) | read the first character
file.read(5) | read the next five characters
file.close | close the file against further access

## File accesss modes

Mode | Description
-----|---------------------
"r" | Read from a text file. If the file doesn’t exist, Python will complain with an error.
"w" | Write to a text file. If the file exists, its contents are overwritten. If the file doesn’t exist, it’s created.
"a" | Append a text file. If the file exists, new data is appended to it. If the file doesn’t exist, it’s created.
"r+" | Read from and write to a text file. If the file doesn’t exist, Python will complain with an error.
"w+" | Write to and read from a text file. If the file exists, its contents are overwritten. If the file doesn’t exist, it’s created.
"a+" | Append and read from a text file. If the file exists, new data is appended to it. If the file doesn’t exist, it’s created.

## open

```
print "\nReading one line at a time."
text_file = open("read_it.txt", "r")
lines = text_file.readlines()
print(lines)
print(len(lines))
for line in lines:
  print(line)
text_file.close()
```

## with open

Reading the file. With example 2, notice how you assign the contents of the file to variable so lines are expanded. This is not how <FILE>.read() functions, so you must assign the contents of what it returns.
```
# example 1 - read entire file
with open('read_it.txt', 'r') as file:
  file.read()
  
Result: 
'Line 1\nThis is line 2\nThat makes this line 3\n'

  
# example 2 - read entire file, expand newlines etc..
with open('read_it.txt', 'r') as file:
  entire_file = file.read()
  print entire_file
  
Result:
Line 1
This is line 2
That makes this line 3
```

Reading the lines
```
# example 2 - read each line

with open('read_it.txt', 'r') as file:
  for element in file:
    print element

# example 3 - read each line and do more
with open ('text-file.txt, 'r') as file: 
  for user in file:
    # important to strip the newline here, otherwise you will end up with a directory
    # name in /user that contains the newline. Very annoying to remove...
    user = user.rstrip('\n')
     path = "/home" + user
     os.mkdir(path, 0755)
```

# Writing to text files

**Using open:**
```
print "\nCreating a text file with the write() method."
text_file = open("write_it.txt", "w")
 
text_file.write("Line 1\n")
text_file.write("This is line 2\n")
text_file.write("That makes this line 3\n")
text_file.close()
```

**with open**
```
print "\nCreating a text file with the write() method using 'with open'."
with open("write_it.txt", 'w') as text_file:
  text_file.write("Line 1\n")
  text_file.write("This is line 2\n")
  text_file.write("That makes this line 3\n")

# read the new file
with open("write_it.txt", 'r') as text_file:
  print text_file.read()

```

## object methods

Method | Description
-------|------------------------
close() | Closes the file. A closed file cannot be read from or written to until opened again.
read([size]) | Reads size characters from a file and returns them as a string. If size is not specified, the method returns all of the characters from the current position to the end of the file.
readline([size]) | Reads size characters from the current line in a file and returns them as a string. If size is not specified, the method returns all of the characters from the current position to the end of the line.
readlines() | Reads all of the lines in a file and returns them as elements in a list.
write(output) | Writes the string output to a file.
writelines(output) | Writes the strings in the list output to a file.

# Storing complex data in files

## Binary fie access modes

Mode | Description
-----|------------------
"rb" |  Read from a binary file. If the file doesn’t exist, Python will complain with an error.
"wb" | Write to a binary file. If the file exists, its contents are overwritten. If the file doesn’t exist, it’s created.
"ab" | Append a binary file. If the file exists, new data is appended to it. If the file doesn’t exist, it’s created.
"rb+" | Read from and write to a binary file. If the file doesn’t exist, Python will complain with an error.
"wb+" | Write to and read from a binary file. If the file exists, its contents are overwritten. If the file doesn’t exist, it’s created.
"ab+" | Append and read from a binary file. If the file exists, new data is appended to it. If the file doesn’t exist, it’s created.

# Pickling and shelving

* Pickling means to preserve
* You can pickle a complex piece of data, like a list or dictionary, and save it in its entirety to a file.
* The shelve module allows you to store and randomly access pickled objects in a file
* Pickling is straightforward. 
* Instead of writing characters to a file, you can write a pickled object to a file. 
* Pickled objects are stored in files much like characters; you can store and retrieve them sequentially

## picking functions

Function | Description
---------|-----------------
dump(object, file, [,bin]) | Writes pickled version of object to file. If bin is True, object is written in binary format. If bin is False, object is written in less efficient, but more human- readable, text format. The default value of bin is equal to False.
load(file) | Unpickles and returns the next pickled object in file.

## Shelving pickled data

* shelving acts like a dictionary, which provides random access to the lists.
* The `shelve.open()` function works a lot like the file `open()` function. However, the `shelve.open ()` function works with a file that stores pickled objects and not characters. 
* When you call `shelve.open()` , Python may add an extension to the file name you specify. Python may also create additional files to support the newly created shelf.
* The shelve.open() function requires one argument: a file name.


```
print "\nShelving lists."
s = shelve.open("pickles2.dat")
s["variety"] = ["sweet", "hot", "dill"]
s["shape"] = ["whole", "spear", "chip"]
s["brand"] = ["Claussen", "Heinz", "Vlassic"]
```

## Shelving explained

* pickles works like a dictionary. 
* The e key "variety" is paired with the value ["sweet","hot", "dill"]. 
* The key "shape" is paired with the value ["whole", "spear", "chip"] . And the key "brand" is paired with the value ["Claussen", "Heinz", "Vlassic"] 
* One important thing to note is that *a shelf key can only be a string*.

## Syncing

* Python writes changes to a shelf file to a buffer and then periodically writes the buffer to the file.
* To make sure the file reflects all the changes to a shelf, you can invoke a shelf’s `sync()` method. 
* A shelf file is also updated when you close it with its `close()` method.
* While you could simulate a shelf by pickling a dictionary, the shelve module is more memory efficient. 
# So, if you need random access to pickled objects, create a shelf.

## Shelve access modes

Mode | Description
-----|----------------
"c" | Open a file for reading or writing. If the file doesn’t exist, it’s created.
"n" | Create a new file for reading or writing. If the file exists, its contents are overwritten.
"r" | Read from a file. If the file doesn’t exist, Python will complain with an error.
"w" | Write to a file. If the file doesn’t exist, Python will complain with an error.

## Real world application

Pickling and unpickling are good ways to store and retrieve structured information, but more complex information can require even more power and flexibility. Databases and XML are two popular methods for storing and retrieving more complex data, and Python has modules that can work with either. To learn more, visit the  Python language website at http://www.python.org.

# Handling exceptions

* It’s good programming practice to specify exception types so that you handle each individual case. In fact, it’s dangerous to catch all exceptions the way I did in the first except clause of the program. Generally, you should avoid that type of catchall.
* You shoudl implement exceptoins for any point of external interaction with your program (e.g. reading files, converting data).
* Use the python shell interpreter to test for exception types if you are unsure of what error could be thrown.
* Mulitple exception types can be seperated with commas

## sys.exit vs raise

sys.exit in python apparently defaults to sys.exit(0) which is 'completed normally'. If you're just using 'raise SystemExit(1)', then using raise is stupid vs 'sys.exit(1)' as you're doing the same thing in a much less clean way. sys.exit does indeed support error message text:

To me where to use these would depend on the code use case; although the end is technically the same the functions themselves are documentation as to programmer intent. Exceptions should be thrown where the developer expects a possibility of interception and use by parent code wrapping it, i.e. libraries. Use sys.exit in endpoint driver code and shell script replacements where you explicitly mean for the code to exit at that point and it not to be possible to be intercepted.

Using raise is more useful if you expect that you want the traceback of what went wrong. If you don't it's cleaner and quicker to just log the error if you are using Python's logging module, and perform a `sys.exit(1)` to kill the script (if that is your intention).

See:

* https://docs.python.org/2/library/sys.html#sys.exit
* https://docs.python.org/2/library/exceptions.html

## Exception types

Exception Type | Description
---------------|-------------------------
IOError |  Raised when an I/O operation fails, such as when an attempt is made to open a nonexistent file in read mode.
IndexError | Raised when a sequence is indexed with a number of a nonexistent element.
KeyError | Raised when a dictionary key is not found.
NameError | Raised when a name (of a variable or function, for example) is not found.
SyntaxError | Raised when a syntax error is encountered.
TypeError |Raised when a built-in operation or function is applied to an object of inappropriate type.
ValueError | Raised when a built-in operation or function receives an argument that has the right type but an inappropriate value.
ZeroDivisionError | Raised when the second argument of a division or modulo operation is zero.

## Getting an exceptions arguement

When an exception occurs, it may have an associated value, the exception’s argument. The argument is usually an official message from Python describing the exception. You can receive the argument if you specify a variable after the exception type, preceded by the keyword `as`.

```
# get an exception's argument
try:
  num = float(input("\nEnter a number: "))
except ValueError as e:
  print("That was not a number! Or as Python would say...")
  print(e)
```

## Adding an else Clause

You can add a single else clause after all the except clauses in a try statement. The else block executes only if no exception is raised in the try block.

```
# try/except/else
try:
  num = float(raw+input("\nEnter a number: "))
except ValueError:
  print("That was not a number!")
else:
  print("You entered the number", num)
  raw_input("\n\nPress the enter key to exit.")
```

## Multiple except clauses on one line

This is useful if you want to catch certain situations, but run the same code against it. A try statement may have more than one except clause, to specify handlers for different exceptions. At most one handler will be executed. Handlers only handle exceptions that occur in the corresponding try clause, not in other handlers of the same try statement. An except clause may name multiple exceptions as a parenthesized tuple, for example:

```
except (RuntimeError, TypeError, NameError):
  <CODE>
```

## Some exception examples

sys.exit vs raise
```
import sys

try:
    sys.exit(1) # Or something that calls sys.exit()
except SystemExit as e:
    sys.exit(e)
except:
    # Cleanup and reraise. This will print a backtrace.
    # (Insert your cleanup code here.)
    raise
```

# Example programs

* [python/fundementals/trivia-challenge.py](s://github.com/mdeguzis/python/tree/python2/fundamentals/triva-challenge.py)
* [python/fundementals/write-it.py](s://github.com/mdeguzis/python/tree/python2/fundamentals/write-it.py)
* [python/fundementals/handle-it.py](s://github.com/mdeguzis/python/tree/python2/fundamentals/handle-it.py)

# Links

* https://docs.python.org/2/library/exceptions.html
