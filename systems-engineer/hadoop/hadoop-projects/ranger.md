# About

Notes for Ranger

# Manual sync

Yes try in a chron job run for Unix:

```
java -Dlogdir=/var/log/ranger/usersync -cp "/usr/hdp/current/ranger-usersync/dist/unixusersync-0.6.0.2.5.0.0-1245.jar:/usr/hdp/current/ranger-usersync/lib/*:/etc/ranger/usersync/conf" org.apache.ranger.unixusersync.process.UnixUserGroupBuilder
```

For LDAP
```
java -Dlogdir=/var/log/ranger/usersync -cp  "/usr/hdp/current/ranger-usersync/dist/unixusersync-0.6.0.2.5.0.0-1245.jar:/usr/hdp/current/ranger-usersync/lib/*:/etc/ranger/usersync/conf" org.apache.ranger.unixusersync.process.PolicyMgrUserGroupBuilder
```
