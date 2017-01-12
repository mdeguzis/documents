# getent

`getent` is Unix command which helps you query one of the following administrative databases in Unix: passwd, group, hosts, services, protocols, or networks. The config file is held in `/etc/nsswitch.conf`. 

# key points

For example, the `passwd` line in `/etc/nsswitch.conf` will point to what databases hold the information:

```
passwd:     files ldap
```

Based on the above, getent will first run down the /etc/passwd list and then go through every user in LDAP. You can specify the service to use:

```
getent group -s files
```

The above command will query only the local files database, `/etc/group`

* [getent (man page)](http://man7.org/linux/man-pages/man1/getent.1.html)
* [command-line foo examples](http://www.commandlinefu.com/commands/using/getent)

# Databases

If the LDAP bindings are processed into an ldb databse, you may find them in a simliar location to the below:

```
/var/lib/sss
/var/lib/sss/mc/group
/var/lib/sss/mc/passwd
```

* files is /etc/passwd and /etc/group, not ldb files.
* User/group id's greater than 2000 are in Linux LDAP, below in local files.
