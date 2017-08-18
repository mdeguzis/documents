<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Getting username/pw](#getting-usernamepw)
- [Decryption](#decryption)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting username/pw

```
PS C:\> $C = Get-Credential
```

https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Security/Get-Credential?view=powershell-5.1

# Decryption

If I need only the password, I simply retrieve the Password property as shown here.

````
PS C:\> $credential.GetNetworkCredential().password

SomeUsersPassword
```

https://blogs.technet.microsoft.com/heyscriptingguy/2013/03/26/decrypt-powershell-secure-string-password/
