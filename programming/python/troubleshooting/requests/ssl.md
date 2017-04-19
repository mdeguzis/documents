# Error: requests.exceptions.SSLError: EOF occurred in violation of protocol (_ssl.c:765) 

This may occur if you are using buldout/virutalenv and missing some SSL components. When I tested this, `/usr/bin/python` was able to make the request, 
but not `buildout/bin/python`.

https://github.com/kennethreitz/requests/issues/3608 

Making request to Ambari

Newer requests are too restrictive?
Buildout latest: requests = 2.13.0
System ver: requests = 2.6.0

See: https://github.com/kennethreitz/requests/issues/3006#issuecomment-274058323
