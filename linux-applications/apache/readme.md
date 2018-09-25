<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [httpd](#httpd)
  - [Binding ports](#binding-ports)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

## ProxyPass vs ProxyPassReverse

The ProxyPassReverse is used to change the headers sent to Apache from a proxied app server, before Apache sends it to the browser. For example, if the app sits at Page on localhost:8080, and it tries to redirect the browser to, say, /new_path/, then it will respond with a redirect and location header of http://localhost:8080/new_path/, and Apache will take this and send it off to the browser. The issue is that the browser will then try to send a request to Page on localhost:8080and receive an error. 

What ProxyPassReverse can do is intercept those headers, and rewrite them to match the Apache proxy server . 

So if my apache server is hosting http://example.null/ and I have a ProxyPass that points / to http://localhost:8080/, if the application sitting at localhost:8080 returns a redirect to http://localhost:8080/new_location/, I'll need to use ProxyPassReverse so that it gets rewritten to http://example.null/new_path/ by Apache before sending the request back to the browser.

