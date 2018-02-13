# About
Useful commands for tree

# Permissions with tree

```
$ tree -pufid apps/glassfish3/ | less
apps/glassfish3
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/bin
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/bin
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/config
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/doc-files
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax/annotation
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax/annotation/security
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax/annotation/sql
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax/decorator
[drwxr-xr-x saml    ]  apps/glassfish3/glassfish/docs/api/javax/ejb
[drwxr-xr-x saml samlgroup   ]  apps/glassfish3/glassfish/docs/api/javax/ejb/embeddable
```

-p - permissions
-u - username/userid
-g - group
-f - full path
-i - don't print indentation lines
-d - print directories only
