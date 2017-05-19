# About

Information for using SSH/OpenSSH

# SSH Key Generation

Open Git Bash.

Paste the text below, substituting in your GitHub email address.

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

This creates a new ssh key, using the provided email as a label.

```
Generating public/private rsa key pair.
```

When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.

```
Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]
```

At the prompt, type a secure passphrase. For more information, see "Working with SSH key passphrases".

```
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

# Adding SSH key to ssh-agent

Ensure the ssh-agent is running:

If you are using the Git Shell that's installed with GitHub Desktop, the ssh-agent should be running. 
If you are using another terminal prompt, such as Git for Windows, you can use the "Auto-launching the ssh-agent" instructions in 
"[Working with SSH key passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases)", or start it manually: 

```
# start the ssh-agent in the background
eval $(ssh-agent -s)
Agent pid 59566
```

Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_rsa in the command with the name of your private key file.

```
ssh-add ~/.ssh/id_rsa
```

Add the SSH key to your applicable account

# GitHub and SSH

* [Generating an SSH Key](https://help.github.com/articles/generating-an-ssh-key/)
* [SSH common problems](https://help.github.com/ssh-issues/)

# Handling ssh-agent on login

```
#
# Handle ssh-agent intelligently
#
# This version is especially nice since it will see if you've already started ssh-agent 
# and, if it can't find it, will start it up and store the settings so that they'll be 
# usable the next time you start up a shell.
# Source: http://stackoverflow.com/a/18915067
# See also: http://mah.everybody.org/docs/ssh
SSH_ENV="$HOME/.ssh/environment"

function start_agent {
    echo "Initialising new SSH agent..."
    /usr/bin/ssh-agent | sed 's/^echo/#echo/' > "${SSH_ENV}"
    echo succeeded
    chmod 600 "${SSH_ENV}"
    . "${SSH_ENV}" > /dev/null
    /usr/bin/ssh-add;
}

# Source SSH settings, if applicable

if [ -f "${SSH_ENV}" ]; then
    . "${SSH_ENV}" > /dev/null
    #ps ${SSH_AGENT_PID} doesn't work under cywgin
    ps -ef | grep ${SSH_AGENT_PID} | grep ssh-agent$ > /dev/null || {
        start_agent;
    }
else
    start_agent;
fi
```
