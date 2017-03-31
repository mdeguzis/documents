<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [firewall-cmd](#firewall-cmd)
- [Editing](#editing)
- [Service state changes](#service-state-changes)
- [Examples](#examples)
  - [re-attach a corrupted zone after fixing a problem.](#re-attach-a-corrupted-zone-after-fixing-a-problem)
  - [Enable portimmediately and permanently](#enable-portimmediately-and-permanently)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on firewalld

# firewall-cmd

Notable commands:

```
--get-default-zone
     Print default zone for connections and interfaces.
--list-all-zones
     List everything added for or enabled in all zones

--set-default-zone=zone
     Set default zone for connections and interfaces where no zone has been selected.
     Setting the default zone changes the zone for the connections or interfaces, that are
     using the default zone.

--get-active-zones
    Print currently active zones altogether with interfaces and sources used in these
    zones. Active zones are zones, that have a binding to an interface or source. The
    output format is:
```

# Editing

In general any action on the firewall you want to use `firewall-cmd`, but note some of those change the xml; some of those may be safe, other may mangle our files, so be sure to test what those do on non-server test instances. You can edit the XML files in `/etc/firewalld/` directly if you must.

# Service state changes

Always use `firewall-cmd --reload `. This will check the syntax of any XML files in `/etc/firewalld/` before restarting the firewall.
```
--reload  
    Reload firewall rules and keep state information. Current permanent configuration will
    become new runtime configuration, i.e. all runtime only changes done until reload are
    lost with reload if they have not been also in permanent configuration.
```

# Examples

## re-attach a corrupted zone after fixing a problem.

```
firewall-cmd --zone=<ZONE> --add-interface=<INTERFACE>
```

You can omit the zone, which then fall back on default zone. The default interface may based on a device ID pattern.

## Enable portimmediately and permanently

Enable port 443/tcp immediately and permanently in default zone. To make the change
effective immediately and also after restart we need two commands. The first command makes
the change in runtime configuration, i.e. makes it effective immediately, until restart.
The second command makes the change in permanent configuration, i.e. makes it effective
after restart.

```
firewall-cmd --add-port=443/tcp
firewall-cmd --permanent --add-port=443/tcp
```

# Links

* [firewall-cmd (man page)](http://www.unix.com/man-page/centos/1/firewall-cmd/)
