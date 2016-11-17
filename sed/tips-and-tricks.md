# About

One liners and examples that I have found useful

# Commenting a line matching/not matching a specific string AND that is not already commented out

Lines matching string
```
sudo sed -i.bak '/steamos/ s/^#*/#/!' "/etc/apt/sources.list"
```

Lines not matching string:
```
sudo sed -i.bak '/steamos/! s/^#*/#/!' "/etc/apt/sources.list"
```

Note: the `-i` usually replaces "in place," but adding `.bak` will backup the original file with said extension.

Source: [StackOverflow](http://stackoverflow.com/questions/17998763/sed-commenting-a-line-matching-a-specific-string-and-that-is-not-already-comme)
