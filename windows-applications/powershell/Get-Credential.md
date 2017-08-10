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
