<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Ater login to a Linux system, the command console will show up with a prompt label such as # or ~, a shell command can be typed after this prompt and the system can execute the command thereafter. All these operations are handled by shell.

Shell is a command language interpreter that executes commands read from the standard input device (keyboard) or from a file. There are different types of shells such as bash, ksh, csh etc. The most commonly used of them is bash and it's also the default one on most Linux distributions.

There are two very important configuration files for bash : bashrc and profile. These two configuration files can help initialize and customize the shell environment including set up environment variables, themes, they are similar to the Microsoft DOS/Windows autoexec.bat file. Both these files are shell script themselves.

# PATH

Standard $PATH on most systems:
```
/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
```

##For current user

.bashrc

```
# ~/.bashrc: executed by bash for non-login shells.
```

.profile

```
# ~/.profile: executed by Bourne-compatible login shells.
```

##For all users

/etc/bash.bashrc

````
# System-wide .bashrc file for interactive bash(1) shells.
```

/etc/profile

```
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1)
```

## Login shell and Non-login shell

Before understanding the differences between bashrc and profile, it's better to understand what login shell and non-login shell are.

###Login shell

A login shell is the first process that executes under your user ID when you log in for an interactive session. If you open a shell or terminal (or switch to one), and it asks you to log in (Username? Password?) before it gives you a prompt, it's a login shell.

###Non-login shell

A non-login shell is a process which doesn't require you to login(like gnome-terminal), you can directly use the shell. In a normal Linux, a non-login shell will be created when you start a shell on an already running shell. For example, when you type bash in a terminal.

To know whether your current shell is login or non-login, you can type below command.

````
prompt> echo $0
-bash # "-" is the first character. Therefore, this is a login shell.
prompt> echo $0
bash # "-" is NOT the first character. This is NOT a login shell.
```

##Differences between .bashrc and .profile

* **bashrc** will be executed after the system boot up and is for non-login shell. It is specific to bash
* **profile** will be executed after the user login. It's for login shell and can be read by different shells
source bashrc can be used to update bashrc and bash profile can be used to update profile
* **profile** has the stuff not specifically related to bash, such as environment variables (PATH etc)
* **bashrc** has anything you'd want at an interactive command line. Command prompt, EDITOR variable, bash aliases etc
* **bashrc** must not output anything
* Anything that should be available only to login shells should go in profile
* Anything that should be available to graphical applications must be in profile

# Links

* [bashrc vs profile](http://www.techug.com/linux-bashrc-profile)
* [PATH definition](http://www.linfo.org/path_env_var.html)
