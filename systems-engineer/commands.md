<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Linux](#linux)
  - [getent](#getent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Just notable commands that I have ran into so far.

# Linux

## getent

`getent` is Unix command which helps you query one of the following administrative databases in Unix: passwd, group, hosts, services, protocols, or networks. The config file is held in `/etc/nsswitch.conf`. 

**key points**

For example, the `passwd` line in `/etc/nsswitch.conf` will point to what databases hold the information:

```
passwd:     files ldap
```

Based on the above, getent will first run down the /etc/passwd list and then go through every user in LDAP. You can specify the service to use:

```
getent group -s files
```

The above command will query only the local files database, `/etc/group`

* [getent (man page)](http://man7.org/linux/man-pages/man1/getent.1.html)
* [command-line foo examples](http://www.commandlinefu.com/commands/using/getent)