# About
Tips and tricks for perl

# Text manipulation

## Removing not-ASCII characters
Ever hit an annoying box in your code (typically a diamond with a question mark in a GUI program)?

Try:
```
perl -p -e 's/[^[:ascii:]]//g' ~/testfile
```

Add `i` to replace as well in-place
```
perl -pi -e 's/[^[:ascii:]]//g' ~/testfile
```
