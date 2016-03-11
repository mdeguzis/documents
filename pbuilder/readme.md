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
* [manual for debootstrap](http://linux.die.net/man/8/debootstrap)

### Variables to understand

* `PBUILDERSATISFYDEPENDSCMD`: Specifys which pbuilder helper will be used to satisfy build-time dependencies. See [pbuilderrc](manpages.ubuntu.com/manpages/precise/man5/pbuilderrc.5.html)
* `USENETWORK`: Allows use of network resources at build-time. Leave this off unless needed.
* `${DISTRIBUTION}_SUITES`: space-seperated list of distributions for a given suite.
* `${DISTRIBUTION}_MIRROR`: defines the mirror used for a given suite of distributions.
* `COMPONENTS`: Within a suite's configuration, list which components you wish to use from the pool.
* ` DEBOOTSTRAPOPTS` Defines optiosn for debootstrap. Use a quoted string, such as `("--arch" "$ARCH" "${DEBOOTSTRAPOPTS[@]}")`. Using `"${DEBOOTSTRAPOPTS[@]}"` allows previously set options not explicitly defined.

### Directories

You can set these how you see fit. This is not applicable if you use some sort of wrapper script that sets these for you. Not all of these fields are required, but in building packages, I have found these to be very useful. You can reference this information noted, from the SteamOS-Tools-Packaging [.pbuilderrc](https://github.com/ProfessorKaos64/SteamOS-Tools-Packaging/blob/brewmaster/setup-files/.pbuilderrc) file.

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

### Adding options for debuild
When building with debuild and pbuilder, these options (which can be appended to `.pbuilderrc`), can be useful:

```
#for pbuilder debuild (sudo -E keeps the environment as-is)
BUILDSOURCEROOTCMD="fakeroot"
PBUILDERROOTCMD="sudo -E"

# use cowbuilder for pdebuild
#PDEBUILD_PBUILDER="cowbuilder"

#Command-line option passed on to dpkg-buildpackage.
#DEBBUILDOPTS="-IXXX -iXXX"

# create sources only
#DEBBUILDOPTS="-S -sa"

# create binary AND sources
#DEBBUILDOPTS="-us -uc"

# always be verbose:
DH_VERBOSE=1
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
