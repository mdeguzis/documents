<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Method 1 (proper form)](#method-1-proper-form)
- [Method 2 (bad form)](#method-2-bad-form)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
