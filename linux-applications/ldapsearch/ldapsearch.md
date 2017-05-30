# About

Using ldapsearch to query ADLDAP or OpenLDAP.

## Setting a password for automatic password entry

Keep in mind that ldapsearch will use the entire contents of the file for the password--which means it WILL include a terminating newline character if one exists. To verify if this is in fact your problem, try creating a file without one:

```
echo -n ThisIsaBadPassword > .pass.txt
```

Use `read -s` to set a password to a variable instead if you don't want it seen in bash history:
```
read -s password
echo -n $password > .pass.txt
unset password
```

## Users
```
# adldap
$ ldapsearch -H ldaps://adldapserver -D user@host.com -W "(sAMAccountName=bsmith)" employeeNumber employeeID | grep "\(dn\|employee\)"
Enter LDAP Password:
# requesting: employeeNumber employeeID
dn: CN=Bob\, Smith,OU=Non-Employee,OU=Managed Users,DC=host,DC=com
employeeNumber: 00111000 

# openldap
ldapsearch -H ldaps://ldaphost -D uid=user1,ou=people,dc=domain,dc=com -W "(&(objectClass=posixAccount)(uid=username))"
```

## Groups
```
# adldap
$ ldapsearch -H ldaps://adldapserver -D user@host.com -W "(cn=mygroup)"

# openldap
ldapsearch -H ldaps://ldaphost -D uid=user1,ou=people,dc=domain,dc=com -W "(&(objectClass=posixGroup)(cn=groupname))"
```
