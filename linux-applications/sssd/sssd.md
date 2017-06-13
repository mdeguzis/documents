<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Cache](#cache)
- [logs](#logs)
- [Debugging](#debugging)
  - [Clear sssd cache cleanup](#clear-sssd-cache-cleanup)
  - [Restart of the sssd service](#restart-of-the-sssd-service)
    - [ldb issues](#ldb-issues)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

The System Security Services Daemon (SSSD) is a software package originally developed for the Linux operating system (OS) that provides a set of daemons to manage access to remote directories and authentication mechanisms. The beginnings of SSSD lie in an open source project named FreeIPA (Identity, Policy and Audit). The purpose of SSSD is to simplify system administration of authenticated and authorised user access involving multiple distinct hosts. It is intended to provide single sign-on capabilities to networks based on Unix-like OSs that are similar in effect to the capabilities provided by Microsoft Active Directory Domain Services to Windows networks.

# Cache

Groups seen by getend are not 'updated' until a refresh is triggered by actual use, so it's expected for them not to be the same across all servers/nodes until that happens.

When a group is first loaded, any users which haven't been initialized by sssd yet are not looked up as that would impose extra load, so they are loaded as "ghost" instead. Then, as users are actually used by processes, the group's membership state is updated, cleaned if the user doesn't actually exist, or updated with the 'real' person if it does.

# logs

sssd log
```
/var/log/sssd/sssd_default.log
```

# Debugging

## Clear sssd cache cleanup

If an LDAP group/user was changed and you want to pull in the change faster (if this is even needed), do:
```
sudo sss_cache -E
```

This should resolve "ghost" entries. If this does not, try the following:

```
# Query the group via getent
sudo pdsh -w <NODES> getent group <GROUP> | dshbak -c
  
# Compile the user list from OpenLDAP
ldapsearch -H ldaps://<HOST> -D uid=<MY_USERNAME>,ou=people,dc=host,dc=com -W "(&(objectClass=posixGroup)(cn=<GROUP>))" memberUid | awk -F' ' '/memberUid:/ {print $2}' > ~/user-list-tmp.txt
  
# Loop over the users and query their groups
for user in `cat users-list-tmp.txt`; do sudo pdsh -w <HOSTS> groups $user | dshbak -c; done
  
# Clear the sssd cache
sudo pdsh -w <NODES> sss_cache | dshbak -c
rm ~/user-list-tmp.txt
```

## Restart of the sssd service

If this does not resolve the issue, you may need to restart the sssd service. As sssd restarts all user/group queries will fail. This is a high risk for active production servers. Additionally if sssd doesn't come back up, you'll have to manually fix each node via your Hyperisor/Managment service (such as HP iLO).

### ldb issues

[ldb](https://linux.die.net/man/3/ldb) may have issues updating as well. Old data may be retained for some reason.

```
sudo ldbsearch -H /var/lib/sss/db/cache_default.ldb -a | sed -n '/dn: name=<GROUP>/,/^$/p' -
```

Note the unix time stamp on "last updated"

```
date -d @<UNIX_TIME>
```

output may indicate ldb not detecting the difference between the stale ldb data and the in memory version, resulting in it destroying the 'correct' version and never pushing the new version into in memory cache or ldb. You may also see behavior that shows ldb is appending the old timestamp during the new group load.

Install `sss_debuglevel` to do some testing. See `man sss_debuglevel` for more.

```
# Enable debug level
sudo sss_debuglevel 6

# Query
getent group <GROUP_NAME>

# Clear cache
sudo sss_cache -g <GROUP_NAME>

# Query again
getent group <GROUP_NAME>

# Turn debug level back to default of 0
sudo sss_debuglevel 0
```

Now, parse the logged entries:
```
sudo grep -A3 <GROUP_NAME> /var/log/sssd/sssd_default.log
```
See also: [linux-applications/ldb/ldb.md](https://github.com/mdeguzis/documents/tree/master/linux-applications/ldb)

# Links

* [Troubleshooting sssd (Red Hat)](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/SSSD-Troubleshooting.html)

