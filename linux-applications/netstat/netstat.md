<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Checking for service and port status](#checking-for-service-and-port-status)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Options

| options | description |
| ------- | ------------|
|-a | Listing all ports (both TCP and UDP)|
|-at | Listing only TCP (Transmission Control Protocol) port connections|
|-au | Listing only UDP (User Datagram Protocol ) port connections|
|-l | Listing all active listening ports connections |
|-lt | Listing all active listening TCP ports |
|-lu | Listing all active listening UDP |
|-lx|Listing all active UNIX listening port|
|-s|Displays statistics by protocol. By default, statistics are shown for the TCP, UDP, ICMP, and IP protocols.|
|-st|Showing statistics of only TCP protocol|
|-su|Showing Statistics by UDP Protocol|
|-tp|Displaying service name with their PID number|
|ac NUM| Displaying Promiscuous mode. print the selected information or refresh screen every NUM seconds|
|-g|Displays multicast group membership information for both IPv4 and IPv6.|
|-c|Print Netstat Information Continuously|
|--verbose|Finding un-configured address families with some useful information.|
|-ap|Find out how many listening programs running on a port.|
|--statistics --raw|Displaying RAW Network Statistics|

# Checking for service and port status

There's a few parameters to netstat that are useful for this :

* `-l` or `--listening` shows only the sockets currently listening for incoming connection.
* `-a` or `--all` shows all sockets currently in use.
* `-t` or `--tcp` shows the tcp sockets.
* `-u` or `--udp` shows the udp sockets.
* `-n` or `--numeric` shows the hosts and ports as numbers, instead of resolving in dns and looking in `/etc/services`. Without `-n`, /etc/services may resolve to an incorrect host or service.

You use a mix of these to get what you want. To know which port numbers are currently in use, use one of these:

```
netstat -atn           # For tcp
netstat -aun           # For udp
netstat -atun          # For both
```

Source: [askubuntu](https://askubuntu.com/questions/538208/how-to-check-opened-closed-port-on-my-computer)

# Documentation

* https://www.tecmint.com/20-netstat-commands-for-linux-network-management/
