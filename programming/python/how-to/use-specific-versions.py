# About 

How to specify lib/module versions and more.

# Specify a specific library version

Note: you **must** specify the path/requires before importing.


```
import pkg_resources
sys.path.append("/path/to/egg")
pkg_resources.require("requests_kerberos==0.11.0")

import requests_kerberos
```
