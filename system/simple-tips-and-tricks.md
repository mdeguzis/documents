# About

Some simple tips and tricks for GNU/Linux

# Symbolic links

Using ls (provides verbose endpoint)
```
ls -la <DIRECTORY>
```

Using find (shows only symlinks) 
```
find / -maxdepth 1 -type l
```

Using find (provides verbose endpoint, shows only symlinks) 
```
find / -maxdepth 1 -type l -exec ls -la '{}' \;
```
