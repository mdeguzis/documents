# About

systemctl command information

# Status commands

```
Query or send control commands to the systemd manager.

  -h --help           Show this help
     --version        Show package version
     --system         Connect to system manager
  -H --host=[USER@]HOST
                      Operate on remote host
  -M --machine=CONTAINER
                      Operate on local container
  -t --type=TYPE      List units of a particular type
     --state=STATE    List units with particular LOAD or SUB or ACTIVE state
  -p --property=NAME  Show only properties by this name
  -a --all            Show all loaded units/properties, including dead/empty
                      ones. To list all units installed on the system, use
                      the 'list-unit-files' command instead.
```

# Service preset files

Preset files may be used to encode policy which units shall be enabled by default and which ones shall be disabled. They are read by systemctl preset (for more information see systemctl(1)) which uses this information to enable or disable a unit according to preset policy. systemctl preset is used by the post install scriptlets of RPM packages (or other OS package formats), to enable/disable specific units by default on package installation, enforcing distribution, spin or administrator preset policy. This allows choosing a certain set of units to be enabled/disabled even before installing the actual package.

See: [systemd.preset(freedesktop.org)](https://www.freedesktop.org/software/systemd/man/systemd.preset.html)
