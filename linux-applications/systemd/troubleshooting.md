# systemd reservice reports bad; vendor preset

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
