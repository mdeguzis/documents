# About
***

This document details how to setup reprepro from a basic standpoint. 
It also details certain things I believe to be helpful in my experiecnes with packaging thus far.

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
* `UDebComponents`:
* `Contents`:
* `Update`:
* `Log`: $HOME/packaging/SteamOS-Tools/log/brewmaster.log
* `SignWith`: 00000000




