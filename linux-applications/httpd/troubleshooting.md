# Startup Issues
## X509_check_private_key: key values mismatch

Problem Detail:
httpd fails to startup due to key mismatch:

```
[Wed Aug 07 09:42:54.157034 2019] [ssl:emerg] [pid 17551] AH02238: Unable to configure RSA server private key
[Wed Aug 07 09:42:54.157073 2019] [ssl:emerg] [pid 17551] SSL Library Error: error:0B080074:x509 certificate routines:X509_check_private_key:key values mismatch
```

Cause: 
Public key and private key has did not match:

```
$ openssl rsa -in /etc/pki/tls/private/HOST.key.pem  -noout -modulus | openssl sha1
(stdin)= cc38a4c5d6da2e94ea0d06bd128a44469d5aee03
 
$ openssl rsa -in /etc/pki/tls/private/HOST.key.pem  -noout -modulus | openssl sha1
(stdin)= a1e5ef4ac12164311cd5f6a64bed0ae6f0008f2d
```

Resolution:  
Double check your provided certs from Geisinger/Enturst and reapply them.

See also: https://knowledge.digicert.com/solution/SO5519.html
