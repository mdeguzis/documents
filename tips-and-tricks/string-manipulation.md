# Tips and Tricks

## Pass results of find to command
Note: It is probably better to use `find PATH -name STRING -exec COMMAND \;` here, but the following should work fine.

```
find . -name "SEARCHSTRING" -print0 | xargs -0 COMMAND
```

## Replace line with contents of file

```
perl -pe 's/install_prereqs/`cat temp`/e'
```

## Replace line with block of text in file (perl)

```
# Test
perl -pe 's|OLD|`cat blockoftext`|e' 

# Replace in-place (e.g. sed -i)
perl -pe 's|OLD|`cat blockoftext`|e' -i
```

