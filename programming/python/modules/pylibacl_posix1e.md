# About

Information on using POSIX.1e permissions with Python on Linux, using `pylibacl`.

# Reading ACLs

```
>>> import posix1e
>>> acl1 = posix1e.ACL(file="file.txt") 
>>> print acl1
user::rw-
group::rw-
other::r--
```

# Setting ACLS

Be careful, currently, the documenation for pylibacl does not note you need to explicitly have a mask entry after the POSIX user/group/others set. See the Troubleshooting section below for more.
```

```
# Simple
>>> b = posix1e.ACL(text="u::rx,g::-,o::-")
>>> print b
user::r-x
group::---
other::---

# Adding specific users or groups
# Note: the mask is required after the initial POSIX user/group/others assignment.
# This is in line with the ordering `getfacl` reports

# User only
>>> b = posix1e.ACL(text="u::rwx,g::-,o::-,m::rwx,u:user1:rwx")
>>> b.valid()
True
>>> b.applyto("/home/user1/file.txt")

# User and group
>>> b = posix1e.ACL(text="u::rwx,g::-,o::-,m::rwx,u:user1:rwx,g:user1:rwx")
>>> b.valid()
True
>>> b.applyto("/home/user1/file.txt")
```

# Troublehsooting

## "Invalid Argument" when applying an ACL

pylibacl requires a mask entry after the POSIX user/group/others set. This is in line with the entries `getfacl` would spit out. If you fail to do so, you will see this error:

```
b.applyto("file.txt")
Traceback (most recent call last):
   File "<stdin>", line 1, in <module>
IOError: [Errno 22] Invalid argument
b.valid()
False
```

# Links

* [pylibacl pypi](https://pypi.python.org/pypi/pylibacl)
* [pylibacl documentation](http://pylibacl.k1024.org/module.html)
