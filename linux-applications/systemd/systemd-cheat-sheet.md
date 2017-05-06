<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Unit and service commands](#unit-and-service-commands)
  - [Start a unit immediately](#start-a-unit-immediately)
  - [Stop a unit immediately](#stop-a-unit-immediately)
  - [Restart a unit](#restart-a-unit)
  - [Ask a unit to reload its configuration](#ask-a-unit-to-reload-its-configuration)
  - [Show the status of a unit, including whether it is running or not](#show-the-status-of-a-unit-including-whether-it-is-running-or-not)
  - [Check whether a unit is already enabled or not](#check-whether-a-unit-is-already-enabled-or-not)
  - [Enable a unit to be started on bootup](#enable-a-unit-to-be-started-on-bootup)
  - [Disable a unit to not start during bootup](#disable-a-unit-to-not-start-during-bootup)
  - [Mask a unit to make it impossible to start it](#mask-a-unit-to-make-it-impossible-to-start-it)
  - [Unmask a unit](#unmask-a-unit)
  - [Show the manual page associated with a unit (this has to be supported by the unit file)](#show-the-manual-page-associated-with-a-unit-this-has-to-be-supported-by-the-unit-file)
  - [Reload systemd, scanning for new or changed units:](#reload-systemd-scanning-for-new-or-changed-units)
- [Replacment unit files](#replacment-unit-files)
- [Drop-in files](#drop-in-files)
  - [Revert to vendor version](#revert-to-vendor-version)
- [Power management](#power-management)
  - [Shut down and reboot the system](#shut-down-and-reboot-the-system)
  - [Shut down and power-off the system](#shut-down-and-power-off-the-system)
  - [Suspend the system](#suspend-the-system)
  - [Put the system into hibernation](#put-the-system-into-hibernation)
  - [Put the system into hybrid-sleep state (or suspend-to-both)](#put-the-system-into-hybrid-sleep-state-or-suspend-to-both)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Unit and service commands

## Start a unit immediately
```
systemctl start unit
```

## Stop a unit immediately
```
systemctl stop unit
```

## Restart a unit
```
systemctl restart unit
```

## Ask a unit to reload its configuration
```
systemctl reload unit
```

## Show the status of a unit, including whether it is running or not
```
systemctl status unit
```

## Check whether a unit is already enabled or not
```
systemctl is-enabled unit
```

## Enable a unit to be started on bootup
```
systemctl enable unit
```

## Disable a unit to not start during bootup
```
systemctl disable unit
```

## Mask a unit to make it impossible to start it
```
systemctl mask unit
```

## Unmask a unit
```
systemctl unmask unit
```

## Show the manual page associated with a unit (this has to be supported by the unit file)
```
systemctl help unit
```

## Reload systemd, scanning for new or changed units:
```
systemctl daemon-reload
```

# Replacment unit files
To replace the unit file /usr/lib/systemd/system/unit, create the file /etc/systemd/system/unit and reenable the unit to update the symlinks

```
systemctl reenable unit
```

Alternatively, run
```
systemctl edit --full unit
```

# Drop-in files
To create drop-in files for the unit file /usr/lib/systemd/system/unit, create the directory /etc/systemd/system/unit.d/ and place .conf files there to override or add new options. systemd will parse these .conf files and apply them on top of the original unit.

The easiest way to do this is to run:
```
systemctl edit unit
```

This opens the file `/etc/systemd/system/unit.d/override.conf` in your text editor (creating it if necessary) and automatically reloads the unit when you are done editing.

## Revert to vendor version
To revert any changes to a unit made using systemctl edit do:

```
systemctl revert unit
```

See the Arch Linux wiki for examples.

# Power management
polkit is necessary for power management as an unprivileged user. If you are in a local systemd-logind user session and no other session is active, the following commands will work without root privileges. If not (for example, because another user is logged into a tty), systemd will automatically ask you for the root password.

## Shut down and reboot the system
```
systemctl reboot
```

## Shut down and power-off the system
```
systemctl poweroff
```

## Suspend the system
```
systemctl suspend
```

## Put the system into hibernation
```
systemctl hibernate
```

## Put the system into hybrid-sleep state (or suspend-to-both)
```
systemctl hybrid-sleep
```

Sourced from: [Arch Linux wiki: systemd](https://wiki.archlinux.org/index.php/systemd)
