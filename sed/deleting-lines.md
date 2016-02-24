# About
Tips and tricks to remove lines, using `sed`

## Delete Nth line(s) after match

```
sed -e '/pattern/,+1d' file.txt
```
