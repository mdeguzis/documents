# About 

Notes about using sudo

# Editing

**NEVER** edit sudo files with an editor directly. **ALWAYS** use visudo!

From: http://www.courtesan.com/sudo/man/1.7.10/visudo.man.html:

>visudo parses the sudoers file after the edit and will not save the changes if there is a syntax error. Upon finding an error, visudo will print a message stating the line number(s) where the error occurred and the user will receive the “What now?” prompt. At this point the user may enter ‘e’ to re-edit the sudoers file, ‘x’ to exit without saving the changes, or ‘Q’ to quit and save changes. The ‘Q’ option should be used with extreme care because if visudo believes there to be a parse error, so will sudo and no one will be able to sudo again until the error is fixed. If ‘e’ is typed to edit the sudoers file after a parse error has been detected, the cursor will be placed on the line where the error occurred (if the editor supports this feature).

**Syntax Checking**

Note: for whatever reason, issuing "e" after an initial syntax check throws an error works **one** time. If your mistake is still present the 2nd time, or a new one is introduced, visudo does not check this. For this reason, it is best to keep the file open, perform a write, but do not exit the file. You can also choose "x" (see `?` at prompt) to discard changes and re-evaluate you additions.

# Syntax

```
User Host = (Runas) Command
```

See: http://toroid.org/sudoers-syntax

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

# Using sudo over ssh connections

If you get an error reading "sudo requries a tty..." then this probably is because your `/etc/sudoers file` (or any file it includes) has `Defaults requiretty`

...which makes sudo require a TTY. Red Hat systems (RHEL, Fedora...) have been known to require a TTY in default sudoers file. That provides no real security benefit and can be safely removed.

Red Hat have acknowledged the problem and it will be removed in future releases.

If changing the configuration of the server is not an option, as a work-around for that mis-configuration, you could use the `-t` or `-tt` options to ssh which spawns a pseudo-terminal on the remote side, but beware that it has a number of side effects.

**-tt**

`-tt` is meant for interactive use. It puts the local terminal in raw mode so that you interact with the remote terminal. That means that if ssh I/O is not from/to a terminal, that will have side effects. For instance, all the input will be echoed back, special terminal characters (^?, ^C, ^U) will cause special processing; on output, LFs will be converted to CRLFs... (see this answer to Why is this binary file being changed? for more details.

To minimise the impact, you could invoke it as:

```
ssh -tt host 'stty raw -echo; sudo ...' < <(cat)
```

The < <(cat) will avoid the setting of the local terminal (if any) in raw mode. And we're using stty raw -echo to set the line discipline of the remote terminal as pass through (effectively so it behaves like the pipe that would be used instead of a pseudo-terminal without -tt, though that only applies after that command is run, so you need to delay sending something for input until that happens).

Note that since the output of the remote command will go to a terminal, that will still affect its buffering (which will be line-based for many applications) and bandwidth efficiency since TCP_NODELAY is on. Also with -tt, ssh sets the IPQoS to lowdelay as opposed to throughput. You could work around both with:

```
ssh -o IPQoS=throughput -tt host 'stty raw -echo; sudo cmd | cat' < <(cat)
```

Also, note that it means the remote command cannot detect end-of-file on its stdin and the stdout and stderr of the remote command are merged into a single stream.

So, not so good a work around after all.

If you've a got a way to spawn a pseudo-terminal on the remote host (like with expect, zsh, socat, perl's IO::Pty...), then it would be better to use that to create the pseudo-terminal to attach sudo to (but not for I/O), and use ssh without -t.

For example, with expect:

```
ssh host 'expect -c "spawn -noecho sh -c {
     exec sudo cmd >&4 2>&5 <&6 4>&- 5>&- 6<&-}
 exit [lindex [wait] 3]" 4>&1 5>&2 6<&0'
```

(here assuming the login shell of the remote user is Bourne-like)

FOr more usage of `expect`, see: http://www.admin-magazine.com/Articles/Automating-with-Expect-Scripts

**See also***

See: http://unix.stackexchange.com/a/122624 
See: https://bugzilla.redhat.com/show_bug.cgi?id=1020147

# Troubleshooting


## Recovering from a broken sudo file


If you edited /etc/sudoers or a file in /etc/sudoers.d/ with vim and made an error, you can recover this as root with:

```
pkexec visudo -f /etc/sudoers
```

## If you still have issues

Another way to recover from this mishap, provided you have another host and ssh access, is to sent remote commands.

Example:

```
# Check the offending line
 sudo echo
sudo: >>> /etc/sudoers.d/file: syntax error near line 7 <<<
sudo: parse error in /etc/sudoers.d/file near line 7
sudo: no valid sudoers sources found, quitting
sudo: unable to initialize policy plugin

# Check the contents of the file
sudo ssh HOST "cat /etc/sudoers.d/file"

# Remove the offending line or comment it out

# Deletion
sudo ssh HOST "sed -i '/usergroup/d' /etc/sudoers.d/file"

# Commenting out
sudo ssh HOST "sed -i '/string/s/^/#/' /etc/sudoers.d/file"
```

