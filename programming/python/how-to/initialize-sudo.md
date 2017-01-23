# About

Initilizing sudo should be take care of with an try in sudoers (if required at all). The below method is historical use only, as I did not want to lose the example.
Method =2 below is considered bad form, and insecure.

# Method 1 (proper form)
Use a command in sudoers to initialize the user sudo:

```
# Style
<INITIATING_USER> ALL=(<USER_TO_IMPERSONATE>) NOPASSWD: /usr/bin/ls

# Example
system_prod ALL=(mike) NOPASSWD: /usr/bin/echo ''
```


# Method 2 (bad form)

```
# Initialize sudo if we have a credentials file
if (args.creds is not None):
	sudo_init = subprocess.Popen(['sudo', '-S', ''], stdin=subprocess.PIPE, stderr=subprocess.PIPE, stdout=open('/dev/null'))
	sudo_init.communicate(SUDO_PASSWORD + '\n')
```
