# About
Details some methods to convert images

# JPG to PNG
The package `imagemagick-6.q16` contains the command `mogrify`, which can convert image types. This is very useful for grabbing images off of, say /r/steamgrid, and you want the png version of the file.

```
mogrify -format png /path/*.jpg    
```
