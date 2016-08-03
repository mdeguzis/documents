<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [SSH](#ssh)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 
Lists some nice vars to know when dealing with GNU/Linux systems. Most of these are environment variables.

# SSH

Upon a successful connection, OpenSSH sets several environment variables.

`SSH_CONNECTION`  
Shows the address of the client, the outgoing port on the client, the address of the server and the incoming port on the server.

`SSH_TTY`  
Names the pseudo-terminal device, abbreviated Ppty, on the server used by the connection.

For example:
```
SSH_CONNECTION='192.168.223.17 36673 192.168.223.229 22'
SSH_TTY=/dev/pts/6
```
