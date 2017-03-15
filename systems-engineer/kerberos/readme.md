<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Keytabs and principals](#keytabs-and-principals)
  - [Headless and Service principals.](#headless-and-service-principals)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
General info on using Kerberos

# Keytabs and principals

In a secured cluster you have two types of keytabs or principals.

## Headless and Service principals.

Headless principals are not bound to a specific host or node, they have the syntax: - @ EXAMPLE.COM

Service princiapsl are bound to a specific service and host or node, they have the syntax: / @ EXAMPLE.COM

For Example:

```
Headless: hdfs-mycluster@EXAMPLE.COM
Service: nn/c6601.ambari.apache.org@EXAMPLE.COM
Here is some more info https://docs.oracle.com/cd/E21455_01/common/tutorials/kerberos_principal.html
```

Make sure you use the right principal when you use kinit, you can see the principals of a keytab with

```
klist -k <keytab file>
```

# Authentication

Show the encryption type that you get when you run kinit using a password:
```
Etype (skey, tkt): aes256-cts-hmac-sha1-96, aes256-cts-hmac-sha1-96
```

This will help identify a compatible encryption type for your keytab. A list of authentcatin types can be foudn int he MIT documentation in the links below. This is found on [For administrators > Encryption types](http://web.mit.edu/~kerberos/krb5-latest/doc/admin/enctypes.html)

## Generating keytabs

Example AES256 encryption
```
ktutil: addent -password -p user@REAM -k 1 -e aes256-cts-hmac-sha1-96
```

## Authenticate with generated keytab

```
kinit -kt /home/user/file.keytab user@REALM
```

# Administration

## List keytabs from keytab file

```
klist -ket ~/file.keytab
```

## Removing Principals from Keytabs

```
ktutil
read_kt ~/file.keytab
list
delent <ENTRY_NUM>
```

# Links

* [Kerberos (MIT docs)](http://web.mit.edu/~kerberos/krb5-latest/doc/)
* [Keytabs (Indiana University)](https://kb.iu.edu/d/aumh)
