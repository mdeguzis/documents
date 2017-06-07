# About

Lightweight Directory Access Protocol is the dominant database used by organisations around the world to manage their, well, organisation – eg all of their directory services (things such as person information, IT information (machine details, print services, etc), all information pertaining to the business that would need to be “directoried”). Many large companies use LDAP within their server and business tools, eg IBM, Oracle, HP, Novell to name but a few.

LDAP is an incredibly complex protocol, and there are many books and RFCs available to read about it. The RFC probably most of note is this one: RFC4511 – Lightweight Directory Access Protocol (LDAP): The Protocol

# Searching an ldb database

## Basic examples

default sssd cache
```
sudo ldbsearch -H /var/lib/sss/db/cache_default.ldb
```

By group and user:
```
# All output
sudo ldbsearch -H /var/lib/sss/db/cache_default.ldb "(&(objectClass=group)(memberUid=<USER>@default))"

# Only name and managedby
sudo ldbsearch -H /var/lib/sss/db/cache_default.ldb "(&(objectClass=group)(memberUid=<USER>@default))" name managedby
```

By objectClass and user

# Links

* [LDB (samba.org)](https://wiki.samba.org/index.php/LDB)
