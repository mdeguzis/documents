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
