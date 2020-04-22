<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Using a password in a script without exposing it to stdout](#using-a-password-in-a-script-without-exposing-it-to-stdout)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Using a password in a script without exposing it to stdout
If you cannot use another secure vehicle (API, CLI command, etc...) to use a password in your command,
considuer using openssl to encode the password:

```
pw=$(openssl enc -base64 -d <<< 'some_password')
USRUID=$(id -u $USER)
USRGID=$(id -g $USER)
./some_command -u $USER -p $pw
```
