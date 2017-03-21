# About
Adding/removing ACLs and other items.

**Always remember**  
If you set a top level/parent permission wrong, it will cascade on down, despite any ACL. Always be aware of effective permissions, POSIX-level, and ACL-level. 

If you encounter an issue, take your time and *think*:

1. Where does this permission set start?
2. What are my POSIX permissions from the root level (`/`) on down?
3. What are my ACLs from the root level (`/`) on down?
4. What are my effective permissions (use `getfacl -e`)?
5. Are there any conflicting flags set?

# NFS ACLs

## POSIX ACLs and NFS mounts

* Linux NFS translates the posix ACLs to the closest NFS acls.
* Remember to use [nfs4_getfacl](https://linux.die.net/man/1/nfs4_getfacl) et. al. on the NFS side.

When you view a permission, it will show you in ACL format. An ACL format is made up of type flag principal permissions.

## NFS ACL overview

ACE = Access Control Entries

### Types

Type can be either 'A' for allow or 'D' for deny. So in the above example, A:g:GROUP@:rtncy is allowing GROUP to have the given permissions and D:g:GROUP@:waxTC is denying GROUP to have the given permissions.

ACE Type	| Meaning
----------|---------------------
A	| Allow - allow principal to perform actions requiring permissions. 
D	| Deny - prevent principal from performing actions requiring permissions
U | Audit - log any attempted access by principal which requires permissions
L | Alarm - generate a system alarm at any attempted access by principal which requires permissions

### Flags

Flag is on optional field. If you are changing permissions for a user, the flag is not needed. If you are changing permissions for a group, there are three different flags:

Inheritance flags	| Meaning
------------------|---------------------
d	| directory-inherit - newly-created subdirectories will inherit the ACE
f	| file-inherit - newly-created files will inherit the ACE, minus its inheritance flags
g	| group - indicates that principal represents a group instead of a user.
i | inherit-only - the ACE is not considered in permissions checks, but it is heritable; however, the inherit-only flag is stripped from inherited ACEs. 
n | no-propagate-inherit - newly-created subdirectories will inherit the ACE, minus its inheritance flags

Administrative flags	| Meaning
----------------------|---------------------
S | successful-access - trigger an alarm/audit when principal is allowed to perform an action covered by permissions. 
F | failed-access - trigger an alarm/audit when principal is prevented from performing an action covered by permissions. 

### Principal

Principal is either the users, OWNER@, GROUP@, or EVERYONE@. In the example, bob@IASTATE.EDU is an example of the users principal in the Iowa State Universities domain.

### Permissions

Permissions are the symbols that come at the end. The main ones have the following meanings:

ACE Permissions |Meaning
----------------|-------------------
a | append-data (files) / create-subdirectory (directories)
c | read-ACL - read the file/directory NFSv4 ACL. 
C | write-ACL - write the file/directory NFSv4 ACL. 
d | delete - delete the file/directory. Some servers will allow a delete to occur if either this permission is set in the file/directory or if the delete-child permission is set in its parent direcory. 
D | delete-child - remove a file or subdirectory from within the given directory (directories only) 
n | read-named-attributes - read the named attributes of the file/directory.
N | write-named-attributes - write the named attributes of the file/directory. 
o | write-owner - change ownership of the file/directory. 
r |	Has permission to read the file/directory.
t | read-attributes - read the attributes of the file/directory. 
T | write-attributes - write the attributes of the file/directory.
w	| Has permission to write (change) to the file/directory.
x	| Has permission to execute the file (program)
y | synchronize - allow clients to use synchronous I/O with the server. 

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

* [ACLs(linux-nfs.org)](http://wiki.linux-nfs.org/wiki/index.php/ACLs)
* [nfsv4 configuration](http://wiki.linux-nfs.org/wiki/index.php/Nfsv4_configuration)
* [nfs4_getfacl (man page)](https://linux.die.net/man/1/nfs4_getfacl)
* [nfs4 tool authors](http://www.citi.umich.edu/)
* [NFS4 Permissions and Ownership (iastate.edu)](http://www.cs.iastate.edu/nfs4-permissions-and-ownership)
* [umask](https://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html)
