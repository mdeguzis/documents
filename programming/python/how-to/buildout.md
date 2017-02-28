# About

Notes on using buildout

# Overview

* source in src directory

Placing source in a separate src directory is a common convention. It violates “shallow is better than nested”. Smaller projects may benefit from putting sources in the root directory,

* setup.py for defining egg

Assuming that the project will eventually produce an egg, we have a setup file for the project. As we’ll see later, this can be very minimal to start.

* README.txt

It is conventional to put a README.txt in the root of the project. distutils used to complain if this wasn’t available.

* bootstrap.py for bootstrapping buildout

The bootstrap script makes it easy to install the buildout software. We’ll see another way to do this later.

* buildout.cfg defines the buildout

# Links

* [Buildout(pypi)](https://pypi.python.org/pypi/zc.buildout/2.8.0)
* [Buildout Tutorial (buildout.org)](http://www.buildout.org/en/latest/docs/tutorial.html)
* [Buildout basics](https://www.isotoma.com/blog/2011/08/16/buildout-basics-part-1/)
