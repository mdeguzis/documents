# How to install an Intermediate CA cert in Apache?

You need to install an Intermediate CA certificate. How to do it in Apache?

## Standard one-way HTTPS

1. Backup up all involved files before manipulating them.
2. Locate the Apache configuration file where your Virtual Host is configured.
3. Locate the line "SSLCertificateChainFile". For example:
```
SSLCertificateChainFile /etc/pki/tls/certs/chain.crt
```
4. Copy and paste the contents of the Intermediate CA into your CA chain file (append to chain.crt ).
5. Restart Apache httpd:

```
service httpd restart
```

## Two-way SSL (Client Authentication)

1. Backup up all involved files before manipulating them.
2. Locate the Apache configuration file where your Virtual Host is configured.
3. Locate the line "SSLCACertificateFile". For example:
```
SSLCACertificateFile /etc/httpd/conf/ssl.crt/my_ca.crt
```
4. Copy and paste the contents of the Intermediate CA into your CA cert (append to my_ca.crt ).
5. Restart Apache httpd:
```
service httpd restart
```

Source: https://access.redhat.com/solutions/43575
