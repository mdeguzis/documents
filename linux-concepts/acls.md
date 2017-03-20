# About
Adding/removing ACLs and other items

# Basic vs. Extended ACLs

ACLs, or Access Control Lists, are available for a variety of Linux filesystems including ext2, ext3, and XFS. With XFS, ACL support is available pretty much "out of the box" and with ext2/ext3, it's available via a kernel patch that most Linux vendors have applied to the binary kernels they provide. In all cases, the SGI acl and attr tools are required; most Linux vendors provide these as well.

Filesystem ACLs are extremely handy in that they allow you to extend access controls to files and directories beyond the simple user/group/other ownership. With extended ACLs, you can assign multiple users, rather than just one, as owners to a certain file.

Source: [techrepublic](http://www.techrepublic.com/article/learn-to-use-extended-filesystem-acls/)

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
