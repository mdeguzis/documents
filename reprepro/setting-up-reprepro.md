<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Important](#important)
- [Important areas of reprepro](#important-areas-of-reprepro)
- [Installing reprepro](#installing-reprepro)
- [GPG configuration](#gpg-configuration)
  - [Installing the required software](#installing-the-required-software)
  - [GPG configuration](#gpg-configuration-1)
- [Configuring reprepro](#configuring-reprepro)
  - [conf/distributions](#confdistributions)
  - [conf/options](#confoptions)
  - [conf/incoming](#confincoming)
- [Using reprepro](#using-reprepro)
  - [Process an incoming directory](#process-an-incoming-directory)
  - [Include binary packages _only_](#include-binary-packages-_only_)
  - [Processing all mentioned files in package](#processing-all-mentioned-files-in-package)
- [Extra useful scripts](#extra-useful-scripts)
  - [process-packages.sh](#process-packagessh)
  - [sync-pool.sh](#sync-poolsh)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
***

This document details how to setup reprepro from a basic standpoint. 
It also details certain things I believe to be helpful in my experiecnes with packaging thus far.

# Important
Please bookmark and try to read/parse the [man page](https://mirrorer.alioth.debian.org/reprepro.1.html) for this software.

# Important areas of reprepro
***

* `incoming/` - This is where we will process default incoming pacakges.
* `incoming/` - This is where our testing packages will be stored.
* `conf/` - Where reprepro configurations are stored.
* `dists/` - This is wehre information regarding your distrubtions setup in `conf/distributions` is stored upon processing packages.
* `log/` - (Optional) Folder where our logs are stored.
* `process-packages.sh` - (optional) Wrapper-script that handles both default and testing package processing.
* `sync-pool.sh` - (Optional) - Utility-script that sync reprepro's changes with our remote server hosting the repository.

# Installing reprepro
***

From a Debian-derivitive:
```
sudo apt-get install reprepro
```

Manually build
```
git clone git://git.debian.org/mirrorer/reprepro.git
sudo dnf install gcc libdb-devel zlib-devel gpgme-devel libarchive-devel
cd reprepro
./configure --with-libarchive
make
sudo make install
```

# GPG configuration
***

You will need a GPG agent and proper GPG key setup to sign your packages with reprepro. I highly suggest [exporting](http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/) your private key to an external device and storing this securely in a fire-proof safe or other safe location. You don't want to lose the private key! I also suggest hosting your public key (as a copy even) on a well-known key-server (Such as [SKS](https://sks-keyservers.net/i/)).

## Installing the required software

```
sudo apt-get install gnupg gnupg-agent
```


## GPG configuration

Generate a new GPG key if there is no key availble

```
gpg --gen-key
```

Add the following to ~/.profile so gpg-agent will be invoked automatically when it is not running

```
if test -f $HOME/.gpg-agent-info && kill -0 `cut -d: -f 2 $HOME/.gpg-agent-info` 2> /dev/null; then
	GPG_AGENT_INFO=`cat $HOME/.gpg-agent-info`
	export GPG_AGENT_INFO
else
	eval `gpg-agent --daemon --write-env-file ~/.gpg-agent-info`
fi

if [ -f "${HOME}/.gpg-agent-info" ]; then
	. "${HOME}/.gpg-agent-info"
	export GPG_AGENT_INFO
	export SSH_AUTH_SOCK
	export SSH_AGENT_PID
fi
```

Add the following line to your .bash_profile. It is highly annoying (at least for me, personally) to have your distro's GUI-based GPG agent (such as [GNOME Seahorse](https://wiki.gnome.org/Apps/Seahorse)) interfere with entering your passphrase. You will likley be working ina  terminal emulator anyway, and this breaks you out of the terminal window.

```
export GPG_TTY=`tty`
```

Export the gpg key

```
gpg --list-keys
gpg --export -a 6A9E1B52 > public_key.gpg
```


Add the gpg key to the apt keyring

```
sudo apt-key add public_key.gpg
```

If you're so inclined, you can also [make a proepr Debian package](https://github.com/ProfessorKaos64/libregeek-archive-keyring) out of your keyring setup.

# Configuring reprepro
***

Ok, so this is where things get more technical in how most of this process works. While reprepro is indeed one of the easier ways to maintain your own Debian repository, you still should be aware of key files and configurations. In my below examples, I will be using my [packaging repository](https://github.com/ProfessorKaos64/SteamOS-Tools-Packaging) for SteamOS as an example.

## conf/distributions
This is the meat of your setup. You define key areas of where your packages originate from, their codename, among other settings.

Given this example:
```
Origin: steamos-tools
Codename: brewmaster
Description: Custom SteamOS-Tools Debian repository
Architectures: i386 amd64 source
Components: main games
#UDebComponents:
#Contents:
#Update:
Log: $HOME/packaging/SteamOS-Tools/log/brewmaster.log
SignWith: 00000000
```

**Explanations**

* `Origin`: The specific name / tag for this repository (key in `/etc/apt/preferences` pinning).
* `Codename`: The codename (such as `jessie` for current Debian stable) of the distribution you are targeting.
* `Description`: Custom SteamOS-Tools Debian repository
* `Architectures`: i386 amd64 source (self explanatory)
* `Components`: main games
* `Log`: $HOME/packaging/SteamOS-Tools/log/brewmaster.log
* `SignWith`: 00000000


## conf/options
This is a simple file with few things required. At the minimum, specify your base directory, so reprepro knows where it is looking for files.

```
basedir $HOME/packaging/SteamOS-Tools

# Tell reprepro to always be verbose (optional)
verbose
```

## conf/incoming
This is acutally an optional step, but I highly suggest it. Using an incoming "ruleset" will handle packages appropriately, and deal with fallout and processing. 

```
Name: default
IncomingDir: incoming
TempDir: /tmp
Allow: alchemist brewmaster
Cleanup: unused_files
MorgueDir: $HOME/packaging/incoming-old
```

**Explanations**

* `Name`: The name for the ruleset
* `IncomingDir`: The directory where reprepro will  search for files with this particular rule.
* `TempDir`: A directory where the files listed in the processed .changes files are copied into before they are read.
* `Allow`: Specify which distributions are allow with this rule (useful for multiple distibutions, testing dists)
* `Cleanup`: What should we do after processing? (unused_files, on_error, on_deny)
* `MorgueDir`: If files are to be deleted by Cleanup, they are instead moved to a subdirectory of the directory given as value to this field (very useful).

# Using reprepro
***

Here are some useful commands I use frequently

## Process an incoming directory

```
reprepro processincoming [RULE]
```

## Include binary packages _only_ 
This works with multiple files, i.e. *.deb

```
reprepro includedeb [distribution] [pacakge] [/path/to/package.deb]
```

## Processing all mentioned files in package
If you wish to include all proper files when packaging source code, you can specify a .changes files produced by your build. This does not work with wildcards, i.e. *.changes

```
reprepro include [distribution] [pacakge] [/path/to/package.changes]
```

# Extra useful scripts
***

If you push packages to a testing distribution, some of these notes may help you. Unless told different, or I discover otherwise, dpkg does not seem to like a distibribution (e.g. brewmaster_testing) with an underscore. Because of this, I created this script which processes my packages, and outputs a file list. When packaging, I direct my packages to the proper folder.


## process-packages.sh
```
# Process default packages

reprepro processincoming default

# Process any testing packages
# This use the \< and \> before and after anchors for exact matches

if grep brewmaster incoming_testing/*.changes &> /dev/null; then

	# replace exact string (in case this is ran more than once)
	sed -i "s|\<brewmaaster\>|brewmaster_testing|g" incoming_testing
	
fi

# Now process the testing packages

reprepro processincoming testing

```

## sync-pool.sh
This script syncs the repository to the remove server using an exclusion list to hide sensitive folders and files that should not be shared with the public

```
# Remove old packages more than 3 months old (optional)

find ../incoming-old -mtime +90 -exec rm {} \:

# Generate package listings (optional)

reprepro list brewmaster | grep "brewmaster|main" > package_lists/brewmaster_main.txt
reprepro list brewmaster | grep "brewmaster|games" > package_lists/brewmaster_games.txt
reprepro list brewmaster_testing | grep "brewmaster|main" > package_lists/brewmaster_testing_main.txt
reprepro list brewmaster_testing | grep "brewmaster|games" > package_lists/brewmaster_testing_games.txt

# Push keyring / repo package files to root for constant link

cp ./pool/main/....my_keyring.deb /main/folder/keyring_latest.deb
cp ./pool/main/....my_repo.deb /main/folder/repo_latest.deb

# sync local to remote 
# delete is optional, I use this to ensure my server is synced with my local, no extra files)

rsync -avz --delete --exclude-from=$HOME/packaging/exclude.txt

# Backup files not included publicly
cp *.sh /path/to/backups

```

Your exclude.txt file may look something like this:

```
notes.txt
*.ico
my_repo/db
my_repo/incoming
my_repo/incoming_testing
my_repo/*.sh
backups
exclude.txt
tools
```

_Remember_, this file listing is _relative_ to the location of the exclude.txt file placement. In this example, my exclusion list is in the previous directory of my SteamOS-Tools repository, so it servers a global purpose for other folders in my pacakaging directory.

# Resources
***

Official
* http://mirrorer.alioth.debian.org/
* http://nginx.org/
* http://www.gnupg.org/

Lists with official Mirrors* http://www.debian.org/mirror/list
* http://www.ubuntu.com/getubuntu/downloadmirrors

Reprepro
* http://davehall.com.au/blog/dave/2010/02/06/howto-setup-private-package-repository-reprepro-nginx
* http://www.jejik.com/articles/2006/09/setting_up_and_managing_an_apt_repository_with_reprepro/
* http://www.debianx.org/repo.html
* http://www.porcheron.info/setup-your-debianubuntu-repository-with-reprepro/
* http://www.lostwebsite.net/2008/10/partial-debian-mirrors/

GnuPG
* http://www.gentoo.org/doc/en/gnupg-user.xml
* http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/gpg-cs.htm


