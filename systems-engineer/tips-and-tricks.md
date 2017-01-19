<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Checking when a password was last set (Windows)](#checking-when-a-password-was-last-set-windows)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
