# About
Useful info about apt

# Recursive listing of packages, listing only installed

Show complete list
```
apt-rdepends -r apache2 > rdepends_apache2.txt
```

Show only installed packages in the same manner:

```
apt-cache --recurse rdepends apache2 --installed
```
