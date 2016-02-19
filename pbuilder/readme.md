# About
Useful info for pbuilder

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
