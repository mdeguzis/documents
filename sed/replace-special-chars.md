# Replacing "|" pipe
Escape pipes with two slashes, `\\`

Original text
```
text with | command_here
```

command to replace "|" with this
```
sed "s|text with \\| command_here|text with this command_here|g"
```
