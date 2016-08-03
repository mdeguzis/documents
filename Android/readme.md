<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Juice SSH](#juice-ssh)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Some useful iformation for working with Android and GNU/Linux systems

# Juice SSH

* [X-forwarding](http://sonelli.freshdesk.com/support/solutions/articles/182200-how-to-tunnel-x-over-ssh-using-port-forwarding)

Example after port is forwarded correctly (SteamOS):

```
env DISPLAY=:1 glxinfo | grep -i opnegl
```
