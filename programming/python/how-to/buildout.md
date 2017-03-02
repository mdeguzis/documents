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

# Topics

## Custom interpreters

The script recipe allows an interpreter script to be created.

```
[buildout]
parts = mypy

[mypy]
recipe = zc.recipe.egg:script
eggs = zope.component
interpreter = py
```

This will cause a bin/py script to created.

Custom interpreters can be used to get an interactive Python prompt with the specified eggs and and their dependencies on sys.path.

You can also use custom interpreters to run scripts, just like you would with the usual Python interpreter. Just call the interpreter with the script path and arguments, if any. 

**Note:** This is important, as this interpreter will allow you to import your built versions of modules that may supercede system versions. For example, I built included a newer version of requests_kerberos, and when using the custom interpreter, I get version 0.11.0, when with the system python interpreter, I get 0.8.0.

# Links

* [Buildout(pypi)](https://pypi.python.org/pypi/zc.buildout/2.8.0)
* [Buildout Tutorial (buildout.org)](http://www.buildout.org/en/latest/docs/tutorial.html)
* [Buildout basics](https://www.isotoma.com/blog/2011/08/16/buildout-basics-part-1/)
* [Easily creating repeatable buildouts](http://www.uwosh.edu/ploneprojects/docs/how-tos/how-to-use-buildout-to-pin-product-versions)
