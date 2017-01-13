<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Keytabs and principals](#keytabs-and-principals)
  - [Headless and Service principals.](#headless-and-service-principals)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
