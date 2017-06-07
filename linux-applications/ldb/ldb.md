# About

LDB is the database engine used within Samba. LDB is an an embedded LDAP-Like database library, but not completely LDAP compliant. It can store its database in regular files (using TDB), or talk to a standard LDAP server. LDB is a core part of Samba4. There has been work using it for Samba3's group mapping database.

Raw LDB is not even close to LDAP compliant, we use modules to ensure compliance. We aim for LDAP compliance where possible, although Samba’s higher priority is Active Directory compliance. We do aim for LDAP compliance where it doesn’t conflict.

LDB is transactional (allowing multiple changes to be made to ensure that changes all are applied as expected prior to committing them to the database, if an error occurs all changes are backed out and the database is left “untouched”) and modular (allowing different information or functionality to be added or removed according to how a database is needed to perform).

# Searching an ldb database

Example: default sssd cache
```
sudo ldbsearch -H /var/lib/sss/db/cache_default.ldb
```

# Links

* [LDB (samba.org)](https://wiki.samba.org/index.php/LDB)
