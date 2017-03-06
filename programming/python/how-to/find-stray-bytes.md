# About

Somtimes you paste text between files and receive this message:

```
SyntaxError: Non-ASCII character '\xe2' in file <FILE>
... on line 7, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details
```

# Repairing

This is likely a stray byte floating around. You can find it by running:
```
with open("x.py") as fp:
    for i, line in enumerate(fp):
        if "\xe2" in line:
            print i, repr(line)
```
