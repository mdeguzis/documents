# About
Tips and tricks to remove lines, using `sed`

## Delete Nth line(s) after match

```
sed -e '/pattern/,+1d' file.txt
```

## delete n lines after match not including
```
sed -i '/match1/,+2d' filex
```
