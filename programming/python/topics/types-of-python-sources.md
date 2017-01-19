<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [API, Package, Module, Library or script?](#api-package-module-library-or-script)
  - [API](#api)
  - [Library](#library)
  - [Package](#package)
  - [Module](#module)
  - [Script](#script)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API, Package, Module, Library or script?

## API

An [API](https://en.wikipedia.org/wiki/Application_programming_interface) is not a collection of code per se - it is more like a "protocol" specification how various parts (usually libraries) communicate with each other. There are a few notable "standard" APIs in python. E.g. the DB API

## Library

In my opinion, a library is anything that is not an application - in python, a library is a module - usually with submodules. The scope of a library is quite variable - for example the [python standard library](http://docs.python.org/2/library/) is vast (with quite a few submodules) while there are lots of single purpose libraries in the PyPi, e.g. a [backport of collections.OrderedDict for py < 2.7](https://pypi.python.org/pypi/ordereddict/1.1)

## Package

A [package](http://docs.python.org/2/tutorial/modules.html#packages) is a collection of python modules under a common namespace. In practice one is created by placing multiple python modules in a directory with a special `__init__.py` module (file).

## Module

A [module](http://docs.python.org/2/tutorial/modules.html#modules) is a single file of python code that is meant to be imported. This is a bit of a simplification since in practice quite a few modules [detect when they are run as script](http://ibiblio.org/g2swap/byteofpython/read/module-name.html) and do something special in that case.

## Script

A **script** is a single file of python code that is meant to be executed as the 'main' program.
If you have a set of code that spans multiple files, you probably have an application instead of script.
