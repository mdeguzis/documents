<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
  - [JPG to PNG](#jpg-to-png)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Details some methods to convert images

## JPG to PNG
The package `imagemagick-6.q16` contains the command `mogrify`, which can convert image types. This is very useful for grabbing images off of, say /r/steamgrid, and you want the png version of the file.

```
mogrify -format png /path/*.jpg    
```
