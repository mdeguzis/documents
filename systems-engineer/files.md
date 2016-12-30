# About

Notable files and what they contain/do.

# /etc/group file

It stores group information or defines the user groups i.e. it defines the groups to which users belong. There is one entry per line, and each line has the following format (all fields are separated by a colon (:)

```
cdrom:x:24:vivek,student13,raj
_____ _  _      _____
|    |  |        |
|    |  |        |
1    2  3        4
```

1. group_name: It is the name of group. If you run ls -l command, you will see this name printed in the group field.
2. Password: Generally password is not used, hence it is empty/blank. It can store encrypted password. This is useful to implement privileged groups.
3. Group ID (GID): Each user must be assigned a group ID. You can see this number in your /etc/passwd file.
4. Group List: It is a list of user names of users who are members of the group. The user names, must be separated by commas.
