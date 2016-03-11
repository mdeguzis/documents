# About
Useful info for pbuilder

# Useful notes about pbuilder
This section has some useful info not found in the links below

## Your user environment
The first thing pbuilder does is activate `set -e` which means that your .pbuilderrc has to be written in a way so that any commands that fail are handled so that they don't cause bash to exit. 

## The .pbuilderrc setup file

## How does pbuilder evaluate .pbuilderrc?
There are some key things to know about invoking pbuilder:

### Environment
Since pbuilder sets the environment, you must prepend all commands as a normal user, with `sudo`, or `sudo -E`. This has the following effects

This command creates a 64-bit Jessie pbuilder environment, but uses environment variables from the 'root' user:
```
sudo DIST=jessie ARCH=amd64 pbuilder create
```

This command creates a 64-bit Jessie pbuilder environment, but uses environment variables from the current user invoking the command:
```
sudo -E DIST=jessie ARCH=amd64 pbuilder create
```
This is especially important if you use vars in `.pbuilderrc`, such as `$HOME`.

## Understanding core variables and parameters

First, please take the time to read these documents:

* [manual page for pbuilder](http://manpages.ubuntu.com/manpages/lucid/man8/pbuilder.8.html)
* [manual for pbuilderrc](manpages.ubuntu.com/manpages/precise/man5/pbuilderrc.5.html)

### Directories

You can set these how you see fit. This is not applicable if you use some sort of wrapper script that sets these for you. Not all of these fields are required, but in building packages, I have found these to be very useful.

```
# Set locations
ARCHITECTURE="${ARCH}"                          # Sets the chroot environment to $ARCH
DISTRIBUTION="${DIST}"                          # Sets the chroot distribution to $DIST
BASEDIR="$HOME/pbuilder"                        # This is the base directory invoked for pbuilder
BASETGZ="${BASEDIR}/${DIST}-${ARCH}-base.tgz"   # The directory for your base chroot 
BUILDRESULT="$build_dir"                        # (optinal) custom var used for SteamOS-Tools-Packaging
BUILDPLACE="${BASEDIR}/build"                   # The directory where in-progress chroot builds go
APTCACHE="${BASEDIR}/${DIST}/aptcache/"         # The directory where apt package cache is stored
HOOKDIR="${BASEDIR}/hooks"                      # (optional) Directory where scripts hooks are stored
```

### 

# Links
* [Manual](http://pbuilder.alioth.debian.org/)
* [Why ues sbuild over pbuilder](http://askubuntu.com/questions/53014/why-use-sbuild-over-pbuilder)
* [Example distribution script](http://apt-browse.org/browse/ubuntu/trusty/main/all/pbuilder/0.215ubuntu7/file/usr/share/doc/pbuilder/examples/pbuilder-distribution.sh)
* [Frequently asked questions](https://pbuilder-docs.readthedocs.org/en/latest/faq.html)
* [Pbuilder how-to (ubuntu)](https://wiki.ubuntu.com/PbuilderHowto)

# i386 building

```
# Create a base environment for Debian sid
sudo DIST=sid pbuilder create

# Create a base environment for Ubuntu saucy under
# the i386 architecture
sudo DIST=precise ARCH=i386 pbuilder create

# Create a base environment for Ubuntu saucy
sudo DIST=saucy pbuilder create

# Update a base environment for Ubuntu saucy
sudo DIST=saucy pbuilder update

# Build a package using Ubuntu saucy as the base
# environment
DIST=saucy pdebuild

# Build a package using Ubuntu saucy as the base
# environment under the i386 architecture
DIST=saucy ARCH=i386 pdebuild
```
