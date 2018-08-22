<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Getting informatino for users and groups](#getting-informatino-for-users-and-groups)
  - [Current Logged In User](#current-logged-in-user)
  - [Logging output to a file](#logging-output-to-a-file)
  - [Query a user](#query-a-user)
  - [Query a user's group memberships](#query-a-users-group-memberships)
  - [Querying a group](#querying-a-group)
  - [Querying group members](#querying-group-members)
  - [Query DN unit for group](#query-dn-unit-for-group)
- [Advanced](#advanced)
  - [Get upper range / schema](#get-upper-range--schema)
- [Other](#other)
  - [Converting time stamps with w32tm.exe:](#converting-time-stamps-with-w32tmexe)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Powershell information

version:
```
$PSVersionTable.PSVersion
```

# Getting informatino for users and groups

## Current Logged In User

```
Get-WmiObject -Class win32_computersystem -ComputerName HOST_OR_IP | selec
t username
```

## Logging output to a file

```
<POWERSHELL_COMMAND> | Out-File <PATH>\file.txt
```

## Query a user

```
PS C:\Users\user> Get-ADUser <USER>
```

## Query a user's group memberships

```
# Simple
Get-ADPrincipalGroupMembership <USER>| select name
  
# More detailed
get-adprincipalgroupmembership -Identity <USER>
```

## Querying a group

```
PS C:\Users\user> Get-ADGroup <GROUP>
```

## Querying group members

```
# Detailed
Get-ADGroupMember <GROUP>
  
# Simple
Get-ADGroupMember <GROUP> | select SamAccountName
  
# Sorted
Get-ADGroupMember <GROUP>| select SamAccountName | Sort-Object SamAccountName
```

## Query DN unit for group

```
Get-ADOrganizationalUnit -SearchBase "OU=Managed Users,DC=domain,DC=com" -Filter 'Name -like "group*"'

# Interactive filter (prompted)
Get-ADOrganizationalUnit -SearchBase "OU=Managed Users,DC=domain,DC=com"
```
# Advanced

## Get upper range / schema

```
# Need the Microsoft AD PS module
Import-Module ActiveDirectory

# Get the user class definition, include "allowedAttributes"
$userClass = Get-ADObject -SearchBase ((Get-ADRootDSE).schemaNamingContext) -Filter { Name -eq "User" } -Properties allowedAttributes

# Walk the allowedAttributes array and sort into a table with "name" and "rangeUpper"
$userClass.allowedAttributes | 
  ForEach-Object { Get-ADObject -SearchBase ((Get-ADRootDSE).schemaNamingContext) -Filter { LDAPDisplayName -eq $_ } -Property rangeUpper } |
    Sort-Object Name |
      Format-Table -Property Name, rangeUpper

# If you want to only see defined "rangeUpper" values
$userClass.allowedAttributes | 
  ForEach-Object { Get-ADObject -SearchBase ((Get-ADRootDSE).schemaNamingContext) -Filter { LDAPDisplayName -eq $_ } -Property rangeUpper } |
    Where-Object { $_.rangeUpper } |
      Sort-Object Name |
         Format-Table -Property Name, rangeUpper
```

**WIth dsquery**

All properties:
```
squery * "cn=Schema,cn=Configuration,dc=domain,dc=com" -Filter "(objectClass=attributeSchema)" -Attr LDAPDisplayName rangeUpper -Limit 0
```

One property:
```
dsquery * "cn=Schema,cn=Configuration,dc=domain,dc=com" -filter "(LDAPDisplayName=department)" -attr rangeUpper
```

# Other

## Converting time stamps with w32tm.exe:

```
PwdLastSet        : 131263984814971646
  
PS C:\Users\user> w32tm.exe /ntte 131263984814971646
151925 21:48:01.4971646 - 12/16/2016 4:48:01 PM
```
