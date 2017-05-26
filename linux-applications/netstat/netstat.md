# Checking for service and port status

There's a few parameters to netstat that are useful for this :

* `-l` or `--listening` shows only the sockets currently listening for incoming connection.
* `-a` or `--all` shows all sockets currently in use.
* `-t` or `--tcp` shows the tcp sockets.
* `-u` or `--udp` shows the udp sockets.
* `-n` or `--numeric` shows the hosts and ports as numbers, instead of resolving in dns and looking in `/etc/services`.

You use a mix of these to get what you want. To know which port numbers are currently in use, use one of these:

```
netstat -atn           # For tcp
netstat -aun           # For udp
netstat -atun          # For both
```

Source: [askubuntu](https://askubuntu.com/questions/538208/how-to-check-opened-closed-port-on-my-computer)
