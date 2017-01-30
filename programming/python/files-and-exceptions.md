<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Reading from text files](#reading-from-text-files)
  - [The methods](#the-methods)
  - [File accesss modes](#file-accesss-modes)
  - [open](#open)
  - [with open](#with-open)
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

# Example programs

* [python/fundementals/trivia-challenge.py](s://github.com/mdeguzis/python/tree/python2/fundamentals/triva-challenge.py).
