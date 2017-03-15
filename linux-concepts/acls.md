# About
Adding/removing ACLs and other items

# Setting an ACL

user
```
setfacl -m u:<USER>:rwx "/path"
```

group
```
setfacl -m g:<GROUP>:rwx "/path"
```

recursively
```
setfacl -R -m u:<USER>:rwx "/path"
```

# Links

# Removing an ACL
