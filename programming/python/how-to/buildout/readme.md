<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Overview](#overview)
- [Features](#features)
- [Definitions](#definitions)
  - [Components](#components)
- [Basic steps](#basic-steps)
- [Topics](#topics)
  - [Sections](#sections)
  - [Custom interpreters](#custom-interpreters)
  - [Rapid trials of new dependencies](#rapid-trials-of-new-dependencies)
- [Links](#links)
- [Tutorial videos](#tutorial-videos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on using buildout

# Overview

Buildout allows you to define package sets with any multitude of python package versions. Simply put a buildout.cfg (or specified cfg from buildout.cfg) in a new folder, define some paramaters, and you have a completely different set of modules/libraries etc. 

# Features

* Isolation (each buildout directory is separate)
* Repeatability (try to include version numbers in setup.py and/or versions tag in buildout.cfg)
* Deployment
 * An application installed inside a buildout is protected because it has it's own copy of every egg it needs
 * Recipes already exist for creating configuration files and setting up databases, and you can learn to write your own.

# Definitions
Here is some nomenclature to keep in mind:

* `recipe` - which recipe to use. This can be from PyPi or custom defined
* `eggs` - Which eggs to build/fetch
* `scripts` - Define which scripts to include from the egg (if any)
* depedendent scripts (applies to: zc.recipe.egg) - If set to the string “true”, scripts will be generated for all required eggs in addition to the eggs specifically named.
* `${buildout:project-eggs}` - For this definition, see the [buildout] section, under the `project-eggs` sub-category.

Also see: http://www.buildout.org/en/latest/docs/tutorial.html

## Components

* source in src directory

Placing source in a separate src directory is a common convention. It violates “shallow is better than nested”. Smaller projects may benefit from putting sources in the root directory.

* setup.py for defining egg

Assuming that the project will eventually produce an egg, we have a setup file for the project. Changes to a setup.py will be immediately reflected in what buildout produces. Remove a dependency, it is removed from your buildout. This is crucial to the concept of buildout, as this automatically manages what is installed in, say `./bin/`. With `easy_install`, for instance, you must managed this all manually, and this is where buildout shines.

* README.txt

It is conventional to put a README.txt in the root of the project. distutils used to complain if this wasn’t available.

* bootstrap.py for bootstrapping buildout

The bootstrap script makes it easy to install the buildout software. We’ll see another way to do this later.

* buildout.cfg defines the buildout

# Basic steps

1. Get buildout.cfg
2. Run bootstrap.py
3. Run ./bin/buildout

# Topics

## Sections

Details details for buildout pieces.

See: [buildout/sections](https://github.com/mdeguzis/documents/tree/master/programming/python/how-to/buildout)

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

## Rapid trials of new dependencies

Auditing a new dependency:

* Add it to your setup.py
* Re-run buildout
* Try using the dependency from your application's code

If you want to undo this:

* Remove it from your setup.py
* Re-run buildout

# Links

* [Buildout (pypi)](https://pypi.python.org/pypi/zc.buildout/2.8.0)
* [Buildout Tutorial (buildout.org)](http://www.buildout.org/en/latest/docs/tutorial.html)
* [mdeguzis/python/buildout (example configs/scripts)](https://github.com/mdeguzis/python/tree/python2/buildout)
* [Buildout basics](https://www.isotoma.com/blog/2011/08/16/buildout-basics-part-1/)
* [Easily creating repeatable buildouts](http://www.uwosh.edu/ploneprojects/docs/how-tos/how-to-use-buildout-to-pin-product-versions)
* [Buildout tips/tricks/howto (rhodesmill)](http://rhodesmill.org/brandon/buildout)

# Tutorial videos

* [PyAtl presents: A Brief Introduction to Buildout](https://www.youtube.com/watch?v=HXvzzK9m2IA)
