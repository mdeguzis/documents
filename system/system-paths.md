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

## How dofiles are executed

The usual execution order typically goes something like this:

1. `/etc/profile/
2. etc/bash.bashrc` (often the default /etc/profile sources /etc/bash.bashrc)
3. `~/.bash_profile` The other files that could have been read here (`~/.profile` and `~/.bash_login`) are ignored because ~/.bash_profile exists

### Interactive shell

When  bash is invoked as an interactive login shell, or as a non-inter‐      active shell with the --login option, it first reads and executes  commands  from  the file /etc/profile, if that file exists.  After reading that file, it looks for ~/.bash_profile, ~/.bash_login, and ~/.profile,   in  that order, and reads and executes commands from the first one that  exists and is readable.  The --noprofile option may be  used  when  the   shell is started to inhibit this behavior.

### non-interactive shell

When an interactive shell that is not a login shell  is  started,  bash  reads  and  executes  commands  from /etc/bash.bashrc and ~/.bashrc, if  these files exist.  This may be inhibited by using the  --norc  option.  The  --rcfile  file option will force bash to read and execute commands  from file instead of /etc/bash.bashrc and ~/.bashrc.

### environment

You also have `/etc/environment` where you can set global environmental variables but that's read rather than sourced (commands inside it are not executed but variable definitions are set).

## What is my path

/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
```

You can check the entirety of your environment with the `env` command.

##For current user

.bashrc

```
Standard $PATH on most systems:
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

# Example default files

## CentOS 7

* [/etc/profile](https://gist.github.com/mdeguzis/963a6f8b387ba0c4c23e7dd14e7aa826)
* [~/.bash_profile](https://gist.github.com/mdeguzis/f7a00b28eb291a4bd196543c11ccfb65)
* [~/.bashrc](https://gist.github.com/mdeguzis/0ca46f525b3b84702f959d00db19f216)

# Links

* [bashrc vs profile](http://www.techug.com/linux-bashrc-profile)
* [PATH definition](http://www.linfo.org/path_env_var.html)
* [Debian's stance on dotfiles](http://wiki.debian.org/DotFiles)
