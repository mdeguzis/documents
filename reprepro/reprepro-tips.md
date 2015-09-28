# Useful links
* [How to Use Reprepro for a Secure Package Repository on Ubuntu 14.04 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/how-to-use-reprepro-for-a-secure-package-repository-on-ubuntu-14-04)
* [Local corporate APT repositories (Vincent Bernat)](http://vincent.bernat.im/en/blog/2014-local-apt-repositories.html)

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
Ths is very destructive, and hsould only used if necessary!
```
reprepro removefilter release_testing 'Section'
```

# remove all pacakges matching name in the specified release.
This is very destructive, and hsould only used if necessary!

```
reprepro list RELEASE | grep PACKAGE_NAME | cut -d " " -f 2 | xargs reprepro remove RELEASE {}
```
