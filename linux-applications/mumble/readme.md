<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Basic install process](#basic-install-process)
- [Basic configuration](#basic-configuration)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Notes on configuring and using Mumble

# Basic install process

```
sudo apt-get update
sudo apt-get install mumble-server
```

# Basic configuration

Run the Configuration Wizard:
```
dpkg-reconfigure mumble-server
```

The main configuration file (Advanced configuration):

```
vim /etc/mumble-server.ini
```

# Links

 * [Digital Ocean Guide for Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-mumble-server-murmur-on-ubuntu-14-04)
