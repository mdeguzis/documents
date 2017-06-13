<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Examples](#examples)
  - [Basic connectivity on a certain port](#basic-connectivity-on-a-certain-port)
  - [Listen for certain ports](#listen-for-certain-ports)
  - [Scan ports](#scan-ports)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Ncat is a feature-packed networking utility which reads and writes data across networks from the command line. Ncat was written for the Nmap Project and is the culmination of the currently splintered family of Netcat
incarnations. It is designed to be a reliable back-end tool to instantly provide network connectivity to other applications and users. Ncat will not only work with IPv4 and IPv6 but provides the user with a virtually
limitless number of potential uses.

Among Ncat's vast number of features there is the ability to chain Ncats together; redirection of TCP, UDP, and SCTP ports to other sites; SSL support; and proxy connections via SOCKS4 or HTTP proxies (with optional proxy
authentication as well). Some general principles apply to most applications and thus give you the capability of instantly adding networking support to software that would normally never support it.

# Examples

## Basic connectivity on a certain port

```
nc <hostname> 10000
```

Add `-v` to get verbose output

```
nc -v <hostname> 10000
Ncat: Version 6.40 ( http://nmap.org/ncat )
Ncat: Connected to <hostname> 10000
```

## Listen for certain ports

On one machine, you can tell netcat to listen to a specific port for connections. We can do this by providing the -l parameter and choosing a port:

```
netcat -l 4444
```

This will tell netcat to listen for TCP connections on port 4444. As a regular (non-root) user, you will not be able to open any ports under 1000, as a security measure.

On a second server, we can connect to the first machine on the port number we choose. We do this the same way we've been establishing connections previously:

```
netcat domain.com 4444
```

It will look as if nothing has happened. However, you can now send messages on either side of the connection and they will be seen on either end. Type a message and press ENTER. It will appear on both the local and remote screen. This works in the opposite direction as well.

## Scan ports

For instance, we can scan all ports up to 1000 by issuing this command:
```
netcat -z -v domain.com 1-1000
```

This is NOT a good idea if using an enterprise network that monitoring for port scanning.

# Links

* https://www.digitalocean.com/community/tutorials/how-to-use-netcat-to-establish-and-test-tcp-and-udp-connections-on-a-vps
