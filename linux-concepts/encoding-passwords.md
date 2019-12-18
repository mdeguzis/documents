# Using a password in a script without exposing it to stdout
If you cannot use another secure vehicle (API, CLI command, etc...) to use a password in your command,
considuer using openssl to encode the password:

```
pw=$(openssl enc -base64 -d <<< 'some_password')
USRUID=$(id -u $USER)
USRGID=$(id -g $USER)
./some_command -u $USER -p $pw
```
