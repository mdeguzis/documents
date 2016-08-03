<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Useful links](#useful-links)
- [Common reprepro errors/warnings](#common-reprepro-errorswarnings)
  - [DSC file does not match expectations](#dsc-file-does-not-match-expectations)
- [Listing pacakge by format](#listing-pacakge-by-format)
- [sync to remove remote site, delete packages not found in remote.](#sync-to-remove-remote-site-delete-packages-not-found-in-remote)
- [Adding deb package to pool](#adding-deb-package-to-pool)
- [Adding deb package to pool, but specify the component (such as main, games, etc)](#adding-deb-package-to-pool-but-specify-the-component-such-as-main-games-etc)
- [remove all packages from the testing pool](#remove-all-packages-from-the-testing-pool)
- [remove all pacakges matching name in the specified release.](#remove-all-pacakges-matching-name-in-the-specified-release)
- [Remove packages that are unreferced](#remove-packages-that-are-unreferced)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Useful links
* [How to Use Reprepro for a Secure Package Repository on Ubuntu 14.04 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/how-to-use-reprepro-for-a-secure-package-repository-on-ubuntu-14-04)
* [Local corporate APT repositories (Vincent Bernat)](http://vincent.bernat.im/en/blog/2014-local-apt-repositories.html)

# Common reprepro errors/warnings

## DSC file does not match expectations

You can still typically run `reprepro export && reprepro dumpunrefernced` This likely is caused by `dpkg-genchanges` being run ahead of the build, typically due to `dh_clean` doing some things before pbuilder kicks off the build. If this happens, try using `--debbuildopts -nc` to tell dpkg not to clean the build before hand. dh_clean will still occur inside the build as expected.

# Listing pacakge by format

See 'man reprepro' for more.

```
reprepro --list-format '${$identifier} ${package} ${version}\n' list
```

# sync to remove remote site, delete packages not found in remote.
```
rsync -avz --delete /home/user/packaging/my_repository/ user@host.com:/path/to/directory
```

# Adding deb package to pool
* dir can be any location
* Jessie is your release, defined in conf/distributions
```
reprepro -V includedeb jessie dir/package.deb
```

# Adding deb package to pool, but specify the component (such as main, games, etc)
Say you have have the components main, contriby, mystuff, and games in your pool/ directory. Reprepro will try to guess where to send the package. If it is not guessed automatically, your package will end up in main. Below is how you would specify the component manually. This is very useful for source builds or when you would reather your package reside in a different component.

* dir can be any location
* Jessie is your release, defined in conf/distributions
```
reprepro -C games -V includedeb jessie dir/super-mario.deb
```

# remove all packages from the testing pool
This is very destructive, and should only used if necessary!
```
reprepro removefilter release_testing 'Section'
```

# remove all pacakges matching name in the specified release.
This is very destructive, and hsould only used if necessary!

```
reprepro list RELEASE | grep PACKAGE_NAME | cut -d " " -f 2 | xargs reprepro remove RELEASE {}
```

# Remove packages that are unreferced

This is very useful when you have incorrectly added a package, and a now there are 2 package deb files in a folder, when only one is really active and refenced by the database. It's a good command to know when you "dun goofed" :) This will not delete debian files added via 'includedeb'. 

Show unerefenced files
```
reprepro dumpunreferenced
```

Delete unerefenced files
```
reprepro deleteunreferenced
```
