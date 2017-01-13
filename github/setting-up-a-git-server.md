# About

Notes (WIP) on setting up a local git-server for GitHub use.

# Setup

## Required programs
```
sudo yum install git-core
```

## git user setup

Add the 'git' user
```
sudo useradd git
sudo passwd git
```

## SSH Keys

In order to ease access to the server, set-up a password-less ssh login. First create ssh keys on your local machine:
```
su - git
ssh-keygen -t rsa
```

Next, you need to add some developer SSH public keys to the authorized_keys file for that user. Let’s assume you’ve received a few keys by e-mail and saved them to temporary files. 

Via ssh-copy-id (user@destination)
```
ssh-copy-id key.pub user@server
```

Manually:
```
cat /tmp/id_rsa.john.pub >> ~/.ssh/authorized_keys
```

Key-based SSH authentication usually enforces security by requiring restricted rights on the involved files. To prevent SSH from refusing to work, type this:
```
chmod -R go= ~/.ssh
````

Now you have to copy these keys to the server so that the two machines can talk to each other. Run the following command on your local machine:
```
ssh-copy-id git@remote-server
```

## Repository setup

Now, you can set up an empty repository for your users by running git init with the --bare option, which initializes the repository without a working directory:

```
$ cd /opt/git
$ mkdir project.git
$ cd project.git
$ git --bare init
```

## Getting users access to the repository

Then, John, Josie, or Jessica can push the first version of their project into that repository by adding it as a remote and pushing up a branch. Note that someone must shell onto the machine and create a bare repository every time you want to add a project. Let’s use gitserver as the hostname of the server on which you’ve set up your 'git' user and repository. If you’re running it internally, and you set up DNS for gitserver to point to that server, then you can use the commands pretty much as is:

```
# on Johns computer
$ cd myproject
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin git@gitserver:/opt/git/project.git
$ git push origin master
```

At this point, the others can clone it down and push changes back up just as easily:

```
$ git clone git@gitserver:/opt/git/project.git
$ cd project
$ vim README
$ git commit -am 'fix for the README file'
$ git push origin master
```

# Restricting the 'git' user's actions

With this method, you can quickly get a read/write Git server up and running for a handful of developers.

As an extra precaution, you can easily restrict the 'git' user to only doing Git activities with a limited shell tool called git-shell that comes with Git. If you set this as your 'git' user’s login shell, then the 'git' user can’t have normal shell access to your server. To use this, specify git-shell instead of bash or csh for your user’s login shell. To do so, you’ll likely have to edit your /etc/passwd file:

```
$ sudo vim /etc/passwd
```

At the bottom, you should find a line that looks something like this:

```
git:x:1000:1000::/home/git:/bin/sh
```

Change /bin/sh to /usr/bin/git-shell (or run which git-shell to see where it’s installed). The line should look something like this:

```
git:x:1000:1000::/home/git:/usr/bin/git-shell
```

Now, the 'git' user can only use the SSH connection to push and pull Git repositories and can’t shell onto the machine. If you try, you’ll see a login rejection like this:

```
$ ssh git@gitserver
fatal: What do you think I am? A shell?
Connection to gitserver closed.
```

# Setting up public access

TODO

# Links

* [Git documentation (GitHub)](https://git-scm.com/doc)
* [Git on the server](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)
* [Setting up a git server (linux.com)](https://www.linux.com/learn/how-run-your-own-git-server)
