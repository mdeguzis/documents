# About
Notes on apache projects

# httpd

## Binding ports

down vote
accepted
Some words about the errors you get which hopefully will save you from similar situations in future.

In Linux ports from 0 to 1024 are reserved for system use. This means that in order to use one, you must have the authority to change - access basic system settings. The root user has such privileges and can actually use a port from the range 0 - 1024.

In your problem as you can see, the system through Apache2 response indicates the root of the problem ([...]could not bind to address blah blah 80):

(13)Permission denied: make_sock: could not bind to address [::]:80
(13)Permission denied: make_sock: could not bind to address 0.0.0.0:80
When the Apache2 http daemon starts, it tries to bind the 80 port as it is the default port for use in HTTP see, which is a port within the system assigned ports and as such it can only be accessed by root.

You executed the start command as a typical user without root privileges and led to failure to do so.

In simple words:

You:

```
Hi Apache2 i am Kongthap and i am telling you to start (/etc/init.d/apache2 start)
```

Apache2:
```
Ok i am starting (Starting web server apache2)
System please give me port 80 to use and listen for connections
```

System:
```
OK one moment to check
ahh sorry Apache2 but i cannot let you run at 80 port, it is for personal use
and you do not have the correct privileges to bind it.(Operation not permitted)
```

Apache2:
```
Ohh, Kongthap i failed to start, the system did not let me do it ((13)Permission denied:[...])
```

**Conclusion**

There are mainly two solutions to this problem:

1. Run the Apache2 http daemon with root privileges using sudo:

````
sudo service apache2 start
```

or:

```
sudo /etc/init.d/apache2 start
```

2. Change the default port from 80 to something greater than 1024, say 2000, 2500, 9000, etc. A typical port to run when in such situation is 8080

```
sudo vi /etc/apache2/ports.conf
```

look for or if not there add:

```
Listen 8080
```

or any other port of your choice such as port > 1024 and the selected port is not used by another process.

Source: https://askubuntu.com/a/338239
