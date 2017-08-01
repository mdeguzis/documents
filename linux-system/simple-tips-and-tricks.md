<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Symbolic links](#symbolic-links)
- [Web Links / Shortcuts](#web-links--shortcuts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

# Web Links / Shortcuts

Simply create a desktop file, such as the below:

```
[Desktop Entry]
Encoding=UTF-8
Name=Link to Stack Exchange
Type=Link
URL=http://www.stackexchange.com/
Icon=text-html
```
