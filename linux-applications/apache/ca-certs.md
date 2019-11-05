<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How to install an Intermediate CA cert in Apache?](#how-to-install-an-intermediate-ca-cert-in-apache)
  - [Standard one-way HTTPS](#standard-one-way-https)
  - [Two-way SSL (Client Authentication)](#two-way-ssl-client-authentication)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
