# About 

Powershell information

# Getting informatino for users and groups

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

# Other

## Converting time stamps with w32tm.exe:

```
PwdLastSet        : 131263984814971646
  
PS C:\Users\user> w32tm.exe /ntte 131263984814971646
151925 21:48:01.4971646 - 12/16/2016 4:48:01 PM
```
