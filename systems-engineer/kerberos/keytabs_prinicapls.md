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
