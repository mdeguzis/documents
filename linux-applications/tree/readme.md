<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Permissions with tree](#permissions-with-tree)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
