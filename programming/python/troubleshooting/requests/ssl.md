<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Error: requests.exceptions.SSLError: EOF occurred in violation of protocol (_ssl.c:765)](#error-requestsexceptionssslerror-eof-occurred-in-violation-of-protocol-_sslc765)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Error: requests.exceptions.SSLError: EOF occurred in violation of protocol (_ssl.c:765) 

This may occur if you are using buldout/virutalenv and missing some SSL components. When I tested this, `/usr/bin/python` was able to make the request, 
but not `buildout/bin/python`.

https://github.com/kennethreitz/requests/issues/3608 

Making request to Ambari

Newer requests are too restrictive?
Buildout latest: requests = 2.13.0
System ver: requests = 2.6.0

See: https://github.com/kennethreitz/requests/issues/3006#issuecomment-274058323
