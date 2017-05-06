<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [user sync](#user-sync)
  - [AD groups](#ad-groups)
- [Unix Group Manual sync](#unix-group-manual-sync)
- [JSON file Group sync](#json-file-group-sync)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes for Ranger. 

# user sync

## AD groups

A ranger group using an AD group needs to exactly match the group name as created in Linux LDAP. Ranger is just an authorization manager, it maps to groups at the OS level which must exist, groups created in it arbitrarily don't exist at the application level.

# Unix Group Manual sync

Yes try in a chron job run for Unix:

```
java -Dlogdir=/var/log/ranger/usersync -cp "/usr/hdp/current/ranger-usersync/dist/unixusersync-0.6.0.2.5.0.0-1245.jar:/usr/hdp/current/ranger-usersync/lib/*:/etc/ranger/usersync/conf" org.apache.ranger.unixusersync.process.UnixUserGroupBuilder
```

For LDAP
```
java -Dlogdir=/var/log/ranger/usersync -cp  "/usr/hdp/current/ranger-usersync/dist/unixusersync-0.6.0.2.5.0.0-1245.jar:/usr/hdp/current/ranger-usersync/lib/*:/etc/ranger/usersync/conf" org.apache.ranger.unixusersync.process.PolicyMgrUserGroupBuilder
```

# JSON file Group sync

```
java -Dlogdir=/var/log/ranger/usersync -cp /usr/hdp/current/ranger-usersync/dist/*:/usr/hdp/current/ranger-usersync/lib/*:/usr/hdp/current/ranger-usersync/conf org.apache.ranger.unixusersync.process.FileSourceUserGroupBuilder /tmp/UserGroupSyncFile.json
```
