<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Informational metrics](#informational-metrics)
  - [Get service states](#get-service-states)
  - [Set service states](#set-service-states)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful SELinux notes

# Informational metrics

## Get service states

```
sudo getsebool -a | grep httpd_can_network_connect
```

## Set service states

```
setsebool -P httpd_can_network_connect=on
```

# Links

* [Working with SELinux (RedHat)](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/chap-Security-Enhanced_Linux-Working_with_SELinux.html)
