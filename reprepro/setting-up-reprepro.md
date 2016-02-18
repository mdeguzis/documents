# About
This document details how to setup reprepro from a basic standpoint. 
It also details certain things I believe to be helpful in my experiecnes with packaging thus far.

# Important areas of reprepro

* incoming - where we will process default incoming pacakges
* incoming - testing

# Installing reprepro

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

# 
