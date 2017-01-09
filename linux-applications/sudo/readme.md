# About 

Notes about sudo usage.

# Assigning specific privledges

From the sudoers(5) man page:

The sudoers policy plugin determines a user's sudo privileges.
For the targetpw:

```
sudo will prompt for the password of the user specified by the -u option (defaults to root) instead of the password of the invoking user when running a command or editing a file.
sudo(8) allows you to execute commands as someone else
```

So, basically it says that any user can run any command on any host as any user and yes, the user just has to authenticate, but with the password of the other user, in order to run anything.

* The first ALL is the users allowed
* The second one is the hosts
* The third one is the user as you are running the command
* The last one is the commands allowed
