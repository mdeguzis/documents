<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful notes about pbuilder](#useful-notes-about-pbuilder)
  - [Bulding on distros other than the one you are packaging for](#bulding-on-distros-other-than-the-one-you-are-packaging-for)
  - [Your user environment](#your-user-environment)
  - [The .pbuilderrc setup file](#the-pbuilderrc-setup-file)
  - [How does pbuilder evaluate .pbuilderrc?](#how-does-pbuilder-evaluate-pbuilderrc)
    - [Environment](#environment)
  - [Understanding core variables and parameters](#understanding-core-variables-and-parameters)
    - [Variables to understand](#variables-to-understand)
    - [Directories](#directories)
    - [Adding options for debuild](#adding-options-for-debuild)
    - [Arch-independent packages](#arch-independent-packages)
- [Links](#links)
- [i386 building](#i386-building)
- [Building from a .dsc file](#building-from-a-dsc-file)
- [Buidling from a standalone script](#buidling-from-a-standalone-script)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful info for pbuilder

# Useful notes about pbuilder
This section has some useful info not found in the links below

## Bulding on distros other than the one you are packaging for

A good hint, and practice, if say, using Arch Linux with pbuilder, is to use `-nc` with debbuildopts to avoid running dh_clean ahead of the chroot being unpacked. dh_auto_clean and dh_clean run ahead of pbuilder and* of course inside the build environment.

Example:

```
--debbuildopts -nc
```

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
BUILDRESULT="$BUILD_TMP"                        # (optinal) custom var used for SteamOS-Tools-Packaging
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

### Arch-independent packages

Packages like Qt have lines such as `build-indep` and `build-arch` in them. To build these packages, you will often need to build a set of arch-dependent packages first, to satisfy requirements to build the entire list of packages. If you fail to do so, the build often will not even commence.

Pbuiler handles this a bit differently. Normally, you would pass `-B` or `--debbuildopts -B` to dpkg-buildpackage. However, pbuilder handles this via a different flag to properly implement this. For Pbuilder, you would pass `-- --binary-arch` at the **end** of your build options.  You must pass the `--` to indicate you are done passing options to the previous command (dpkg-buildpackage):

>-- [pbuilder options]

>After the -- symbol, an arbitrary number of pbuilder options can
be specified.  See pbuilder(8) for a full list of options.

>There is an exception that --buildresult and --debbuildopts need
to be specified as pdebuild options before the -- in order to be
effective.

See [arch-and-indep-target](https://github.com/ProfessorKaos64/documents/blob/master/Debian/arch-and-indep-target.md) and [man pbuilder](http://manpages.ubuntu.com/manpages/trusty/man8/pbuilder.8.html) for more.

**Note:**  

To avoid rebuilding/uploading the first pass (arch-dep) of packages to a repository, you'll want to make use of the OTHERMIRROR option. This way, you can build the first pass, and then include the built debs for when you make your second pass that will be uploaded to your repository.

```
# Path to your local repo to be used as a mirror written as apt source line.
OTHERMIRROR="deb /home/user/qt-arch/debs"

# Path to your local repo. This tells pbuilder to mount this directory so it is available in the chroot.
BINDMOUNTS="/home/andrew/pbuilder/local_repo"
```

You also need a pbuilder hook (e.g. "D5update-local-repo file"):

```
# Path to the local repo.
LOCAL_REPO="/home/user/pbuilder/local_repo"

# Generate a Packages file.
(cd $LOCAL_REPO ; apt-ftparchive packages . > Packages)

# Update to include any new packages in the local repo.
apt-get update
```

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

# Building from a .dsc file

example (with full source) using the pbuilder command:
```
DSC_URL="http://http.debian.net/debian/pool/main/l/llvm-toolchain-3.8/llvm-toolchain-3.8_3.8-2.dsc"
dget ${DSC_URL} && rm -rf result/* && mkdir result && sudo -E DIST=brewmaster STEAMOS_TOOLS_BETA_HOOK="true" pbuilder --build --distribution brewmaster --buildresult result  --debbuildopts -sa --debbuildopts -nc llvm-toolchain-3.8_3.8-2.ds
```


example (with full source) using the pdebuild command inside the source dir:
```
DSC_URL="http://http.debian.net/debian/pool/main/l/llvm-toolchain-3.8/llvm-toolchain-3.8_3.8-2.dsc"
dget ${DSC_URL} && rm -rf result/* && mkdir result 
sudo -E DIST=brewmaster STEAMOS_TOOLS_BETA_HOOK="true" BUILD_TMP=result pdebuild --debbuildopts -sa --debbuildopts -nc
```

Ignore the steamos-tools beta line (for general building). This also depends on your `.pbuilderrc` setup. You only need `-nc` above if you are building on other distributions and you don't want dh_clean running before the build.

**Do not** set BUILD_DIR above manually, as this conflicts with some packages, such as "llvm-toolchain". Instead, use `--buildresult /path/to/result_dir`.

# Buidling from a standalone script


```
mkdir RESULT_DIR && pbuilder --distribution brewmaster --buildresult RESULT_DIR --execute my_script.sh
```
