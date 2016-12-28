<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Login shell and Non-login shell](#login-shell-and-non-login-shell)
  - [Login shell](#login-shell)
  - [Non-login shell](#non-login-shell)
- [PATH](#path)
  - [How dotfiles are executed](#how-dotfiles-are-executed)
    - [Interactive shell](#interactive-shell)
    - [non-interactive shell](#non-interactive-shell)
    - [environment](#environment)
    - [/etc/profile.d](#etcprofiled)
    - [Other env vars](#other-env-vars)
  - [What is my path](#what-is-my-path)
  - [Differences between .bashrc and .profile](#differences-between-bashrc-and-profile)
- [Example default files](#example-default-files)
  - [CentOS 7](#centos-7)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Ater login to a Linux system, the command console will show up with a prompt label such as # or ~, a shell command can be typed after this prompt and the system can execute the command thereafter. All these operations are handled by shell.

Shell is a command language interpreter that executes commands read from the standard input device (keyboard) or from a file. There are different types of shells such as bash, ksh, csh etc. The most commonly used of them is bash and it's also the default one on most Linux distributions.

There are two very important configuration files for bash : bashrc and profile. These two configuration files can help initialize and customize the shell environment including set up environment variables, themes, they are similar to the Microsoft DOS/Windows autoexec.bat file. Both these files are shell script themselves.

# Login shell and Non-login shell

Before understanding the differences between bashrc and profile, it's better to understand what login shell and non-login shell are.

## Login shell

A login shell is the first process that executes under your user ID when you log in for an interactive session. If you open a shell or terminal (or switch to one), and it asks you to log in (Username? Password?) before it gives you a prompt, it's a login shell.

## Non-login shell

A non-login shell is a process which doesn't require you to login(like gnome-terminal), you can directly use the shell. In a normal Linux, a non-login shell will be created when you start a shell on an already running shell. For example, when you type bash in a terminal.To know whether your current shell is login or non-login, you can type below command.

```
prompt> echo $0-bash 
# "-" is the first character. Therefore, this is a login shell.

prompt> echo $0bash 
# "-" is NOT the first character. This is NOT a login shell.```
```

# PATH

## How dotfiles are executed

The usual execution order after a sucessful login typically goes something like this:

1. User perform log in
2. `/bin/login` reads `/etc/profile/` 
3. `/bin/login` reads its equivalent `/etc/bash_bashrc`

Many distributions use `/etc/bashrc` for system wide initialization of non-login shells. This file is usually called from the user's `~/.bashrc` file and is not built directly into bash itself

### Interactive shell

When  bash is invoked as an interactive login shell, or as a non-interactive shell with the `--login` option, it first reads and executes  commands  from  the file `/etc/profile`, if that file exists.  After reading that file, it looks for `~/.bash_profile`, `~/.bash_login`, and `~/.profile`,   in  that order, and reads and executes commands from the first one that  exists and is readable.  The `--noprofile` option may be used when the shell is started to inhibit this behavior.

### non-interactive shell

When an interactive shell that is not a login shell is started, bash reads and executes commands from `/etc/bash.bashrc` and `~/.bashrc`, if these files exist. This may be inhibited by using the `--norc` option.  The `--rcfile` file option will force bash to read and execute commands from file instead of `/etc/bash.bashrc` and `~/.bashrc`.

### environment

You also have `/etc/environment` where you can set global environmental variables but that's read rather than sourced (commands inside it are not executed but variable definitions are set).

### /etc/profile.d

`/etc/profile.d` is a directory where the individual initialization scripts are placed.

### Other env vars

Lastly, if something, such as the SSH daemon is sourcing files, you may end up with other results. For example, the the SSH daemon, via the `pam_motd` module of the PAM library, displays the contents of `/etc/motd`. Via the `pam_env` module, it sets the environment variables from `/etc/environment` and `~/.pam_environment`.
## What is my path

Example:
```
$ echo $PATH
/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
```

You can check the entirety of your environment with the `env` command.


## Differences between .bashrc and .profile

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
* [/etc/bashrc](https://gist.github.com/mdeguzis/f98f0b2a1d4b5c16c4de7797d9133833)
* [~/.bash_profile](https://gist.github.com/mdeguzis/f7a00b28eb291a4bd196543c11ccfb65)
* [~/.bashrc](https://gist.github.com/mdeguzis/0ca46f525b3b84702f959d00db19f216)

# Links

* [bashrc vs profile](http://www.techug.com/linux-bashrc-profile)
* [PATH definition](http://www.linfo.org/path_env_var.html)
* [Debian's stance on dotfiles](http://wiki.debian.org/DotFiles)
* [Linux from scratch: Bash Shell startup files](http://www.linuxfromscratch.org/blfs/view/svn/postlfs/profile.html)
