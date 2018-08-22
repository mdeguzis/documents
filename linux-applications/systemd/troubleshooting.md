<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [systemd service reports bad; vendor preset](#systemd-service-reports-bad-vendor-preset)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# systemd service reports bad; vendor preset

* `bad` : It shows Systemd Unit files status
* you will find this option in system which use systemd
* you can check this option using command:

```
sudo systemctl is-enabled <unit-name>
```

If that unit file support native systemd then it will give output enabled , disabled etc. if not support then it will give status with message like.

```
sudo systemctl is-enabled apache2
apache2.service is not a native service, redirecting to systemd-sysv-install
Executing /lib/systemd/systemd-sysv-install is-enabled apache2
enabled
```

but with command :

```
systemctl status apache2
```

or

```
service apache2 status
```

it gives status bad. ( may be it is because not able to print complete message or developer decided to print bad)

Long answer: https://askubuntu.com/questions/836059/sudo-service-status-includes-bad
