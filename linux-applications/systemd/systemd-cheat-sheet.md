# Core commands

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
