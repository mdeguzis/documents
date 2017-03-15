# About

Notes for using `du`

# Show top level sizes

```
# Using --max-depth
sudo du -h /var/* --max-depth=0 | sort -h

# Using wildcard expansion
sudo du -hs /var/* | sort -h
```
