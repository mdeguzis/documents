# Checking when a password was last set (Windows)

```
PS C:\Users\user> get-aduser <USER> -properties PwdLastSet

DistinguishedName : CN=<user_or_group>,OU=<CONTAINER>,OU=<CONTAINER>,DC=<DOMAIN>,DC=<COM>
Enabled           : True
GivenName         :
Name              : <user_or_group>
ObjectClass       : user
ObjectGUID        : <redacted>
PwdLastSet        : 131263984814971646
SamAccountName    : <user_or_group>
SID               : <redacted>
Surname           :
UserPrincipalName : server@domain.com

PS C:\Users\user> w32tm.exe /ntte 131263984814971646
151925 21:48:01.4971646 - 12/16/2016 4:48:01 PM
```
