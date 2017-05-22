Python Packaging with Setuptools
++++++++++++++++++++++++++++++++

Python Packaging with Setuptools
================================

*Using and creating Python packages*

http://ianbicking.org/docs/setuptools-presentation

::

    Ian Bicking
    http://blog.ianbicking.org

Distutils
=========

* ``distutils`` in the standard library.
* Standard way of packaging and installing packages.


Installing with Distutils
=========================

::

    $ sudo python setup.py install

Global installation; for local installation (or if you don't have
root)::

    $ python setup.py --install-lib=./app-packages

Make sure you update ``$PYTHONPATH``!  Other ``--install-*`` options
control location of scripts, headers, etc.

Part 1: easy_install.py
=======================

* Part of ``setuptools``
* Installs any distutil-based package
* Can find packages on PyPI (now the "Cheese Shop")
* But many (most?) packages in PyPI don't include the necessary information

Installation: Normal
============================

Normal installation

::

    $ easy_install.py Package
    $ easy_install.py http://sample.host/Package-X.Y.tar.gz
    $ easy_install.py http://svn.sample.host/Package/trunk

Installation: Development
=================================

Development installation

::

    $ easy_install.py --editable --build <DIR> Package
    $ # or just download and unpack the package
    $ cd <DIR>/Package
    $ sudo python setup.py develop

Installation: Isolated
==============================

Isolated (version-specific) installation

::

    $ easy_install.py -m Package==X.Y
    $ python
    >>> import pkg_resources
    >>> require('Package==X.Y')


Using easy_install.py
=====================

.. comment:
   damn, it was surprisingly hard to find a package that would work

::

    $ easy_install.py kid
    Searching for kid
    Reading http://www.python.org/pypi/kid/
    Reading http://lesscode.org/projects/kid/
    Best match: kid 0.6.3
    Downloading http://lesscode.org/dist/kid/kid-0.6.3.tar.gz
    Running kid-0.6.3/setup.py -q bdist_egg --dist-dir /tmp/easy_install-gsePfU/kid-0.6.3/egg-dist-tmp-WojETA
    zip_safe flag not set; analyzing archive contents...
    kid.importer: module references __file__
    kid.test.__init__: module references __file__
    Adding kid 0.6.3 to easy-install.pth file
    Installing kid script to /usr/bin
    Installing kidc script to /usr/bin

    Installed /usr/lib/python2.4/site-packages/kid-0.6.3-py2.4.egg
    Processing dependencies for kid

Development
===========

::

    $ easy_install.py --editable \
      --build-directory ~/co \
      --find-links=http://pythonpaste.org/package_index.html \
      Paste
    Reading http://pythonpaste.org/package_index.html
    Searching for Paste
    Best match: Paste [unknown version]
    Downloading http://svn.pythonpaste.org/Paste/trunk#egg=Paste
    Doing subversion checkout from http://svn.pythonpaste.org/Paste/trunk to /tmp/easy_install-d75rz8/trunk
    Processing trunk

    Extracted editable version of Paste to /home/ianb/co/paste

    If it uses setuptools in its setup script, you can activate it in
    "development" mode by going to that directory and running::

	/usr/bin/python2.4 setup.py --develop

    See the setuptools documentation for the "develop" command for more info.

Development notes
=================

Things to note:

* ``--find-links`` points to a page where you list distributions

* A packages index is just a list of links

* ``--build-directory`` and ``--editable`` keep the files around, and
  don't do anything with them...

Development installation
========================

::

    $ cd ~/co/paste
    $ sudo python setup.py develop
    running develop
    running egg_info
    writing requirements to ./Paste.egg-info/requires.txt
    writing ./Paste.egg-info/PKG-INFO
    writing top-level names to ./Paste.egg-info/top_level.txt
    running build_ext
    Creating /usr/lib/python2.3/site-packages/Paste.egg-link (link to .)
    Adding Paste 0.0 to easy-install.pth file
    Installing paster script to /usr/bin

    Installed /home/ianb/co/paste

Development notes
=================

More things to note:

* ``develop`` installs a package without moving it into
  ``site-packages/``

* ``Paste.egg-link`` is the poor man's symlink to ``~/co/paste``

* ``easy-install.pth`` also points to ``~/co/paste``

* Python finds ``.pth`` files in ``site-packages`` and adds their
  contents to ``sys.path``

Installing in Isolation
=======================

* Libraries aren't always backward- or forward-compatible

* When dependencies are automatically installed, there's greater
  chance of conflict

Installing in Isolation
=======================

Use "multi-version"::

    $ sudo python setup.py easy_install --multi-version

* **Does not** add the package to ``sys.path``

* You must ``require`` the specific version; more on that later

* Doesn't effect anyone else on the machine (as long as you are using
  good version numbers)

Isolated Checkouts
==================

From a repository::

    $ svn co http://svn.saddi.com/flup/trunk flup
    $ cd flup
    $ # fix setup.py to use setuptools
    $ sudo python setup.py egg_info --tag-svn-revision \
      develop -m
                             .....
    Because this distribution was installed --multi-version or --install-dir,
    before you can import modules from this package in an application, you
    will need to 'import pkg_resources' and then use a 'require()' call
    similar to one of these examples, in order to select the desired version:

        pkg_resources.require("flup")  # latest installed version
        pkg_resources.require("flup==0.5-r1802")  # this exact version
        pkg_resources.require("flup>=0.5-r1802")  # this version or higher

Part 2: creating packages
=========================

Distutils features:

* Packages include standard installation script (``setup.py``)

* Installation script also builds archives for distribution

* Script can be registered and uploaded to PyPI automatically

* Included with Python; good and bad

Setuptools
==========

Setuptools' extra features:

* It's just like ``distutils``

* That ``develop`` command we saw

* Creates eggs: better because "Eggs" are a better visual than a
  "distutil package"

Setuptools
==========

Setuptools' extra features:

* Everything ``easy_install.py`` does, it does by tricking a package
  into using setuptools instead of distutils

* Dependencies!

Creating a Package
==================

Nevermind features...

Lay your files out like this::

    MyPackage/
        setup.py
        ez_setup.py
        mypackage/
            __init__.py
            other_stuff.py
            data/
                mydata.xml
        tests/
        docs/

Package Layout
==============

* Your "distribution" has a name: ``MyPackage``

* Not to be confused with your "package": ``mypackage`` (of course, 
  probably will be confused)

* Packages (and modules) all lower-case by convention

Package Layout
==============

* Documentation and (usually) tests go outside the package

* ``mypackage/`` is all that really gets "installed"

* ``setup.py`` describes the package

setup.py
========

A typical ``setup.py``::

    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

    setup(name="MyPackage",
          version="0.1dev",
          description="My Package, now featuring 10% more packaging!",
          long_description="""\
    This is a boxy package...
    """,
          author="Ian Bicking",
          author_email="ianb@colorstudy.com",
          url="http://sample.host/mypackage.html",
    ...

setup.py
========

More arguments::

    ...
          packages=find_packages(exclude='tests'),
          package_data={'': '*.xml'},
          install_requires=['Paper>=1.0', 'UPSCode'],
          )

setup.py: ez_setup
==================

This boilerplate installs setuptools when the user (who is running
``setup.py``) hasn't installed setuptools::

    from ez_setup import use_setuptools
    use_setuptools()

``ez_setup.py`` comes with setuptools, you include it directly in your
archive.

setup.py: an explanation
========================

* All the metadata goes in ``setup()``
* Some of this is used to install the package
* Some is used to create an archive of the package
* Some is used for dependencies
* Some is used for PyPI

setup.py: the arguments
=======================

``name``:
    The name of your distribution.  Don't put spaces in it.  Becomes
    the name of your archive.

``version``:
    The version.  Suffixes like ``a1`` and ``pre5`` are sorted as
    you'd expect.

``description``, ``long_description``:
    For use by PyPI.  ``long_description`` is in restructured-text
    format.

``author``, ``author_email``, ``url``:
    Also used by PyPI.

setup.py: the arguments
=======================

``download_url``:
    Important if you aren't uploading to PyPI; the location where 
    you'll upload your package.

These values can be edited through PyPI, if you need to correct the
information on a released version.

setup.py: more arguments
========================

``packages``:
    You list *all* the packages that should be installed, including
    subpackages, like ``['mypackage', ...]``.  

    ``find_packages()`` does this for you.  The ``exclude`` argument
    keeps it from auto-detecting things that look like packages.

``package_data``:
    For non-``.py`` files you want included.  This is a
    dictionary of package-name (``""`` for all packages) to globs
    (e.g., ``"*.txt"``).

setup.py: requirements
======================

``install_requires``:
    This is a list of requirements for this package.  Each is a
    package a string like you would give to ``easy_install.py``.

If you have optional requirements, you can use "features", which are
not explained here.

Your New Package
================

What fun you and your new package will have!

::

    $ python setup.py --help-commands
    Standard commands:
      build            build everything needed to install
      build_py         "build" pure Python modules (copy to build directory)
      build_ext        build C/C++ extensions (compile/link to build directory)
      build_clib       build C/C++ libraries used by Python extensions
      build_scripts    "build" scripts (copy and fixup #! line)
      clean            clean up output of 'build' command
      ...

Commands: build*
================

The ``build*`` commands build C code.  C is not Python.  These are not
the codes you are looking for.

Or really: I write Python, and building C code isn't broken, and
``install`` runs these commands for you, so I know nothing of this.

Your New Package
================

::

    $ python setup.py --help-commands
    Standard commands:
      ...
      install          install everything from build directory
      install_lib      install all Python modules (extensions and pure Python)
      install_headers  install C/C++ header files
      install_scripts  install scripts (Python or otherwise)
      install_data     install data files
      ...

Install the library; more on that later.  The other ``install*``
commands are for installing just pieces of the package, which is used
in intermediate steps you are unlikely to use independently.

Your New Package
================

::

    $ python setup.py --help-commands
    Standard commands:
      ...
      sdist            create a source distribution (tarball, zip file, etc.)
      register         register the distribution with the Python package index
      bdist            create a built (binary) distribution
      bdist_dumb       create a "dumb" built distribution
      bdist_rpm        create an RPM distribution
      bdist_wininst    create an executable installer for MS Windows
    ...

Commands: distributing
======================

``sdist``:
    Creates a ``.tar.gz`` or ``.zip`` file that contains your package.
    This is what you give other people.

``register``:
    Takes your package information and uploads it to PyPI (aka Cheese 
    Shop).

``bdist``, ``bdist_dumb``, ``bdist_rpm``, ``bdist_wininst``:
    I've never seen ``bdist`` or ``bdist_dumb`` packages.  These might 
    be nice for Windows or RPM users.  But ``sdist`` packages can be 
    turned into ``bdist*`` packages by the user (you need a compiler
    if there's C code; for this reason a Windows installer is nice,
    but it's not as important for other users).

Your New Package
================

::

    $ python setup.py --help-commands
    ...
    Extra commands:
      rotate           delete older distributions, keeping N newest files
      develop          install package in 'development mode'
      setopt           set an option in setup.cfg or another config file
      saveopts         save supplied options to setup.cfg or other config file
      egg_info         create a distribution's .egg-info directory
      upload           upload binary package to PyPI
      alias            define a shortcut to invoke one or more commands
      bdist_egg        create an "egg" distribution
      test             run unit tests after in-place build
      easy_install     Find/get/install Python packages

Commands: setuptools
====================

All these commands come from setuptools.

``rotate``:
    Use this to keep a limited number of nightly snapshots around.

``develop``:
    Talked about this earlier; installs a package without copying it 
    into ``site-packages``.

Commands: options
=================

Command-line options to ``setup.py`` can also go in ``setup.cfg``,
``distutils.cfg``, and other locations.

``setopt``:
    Save options, without finding the file or translating the 
    command-line options to the configuration options.

``saveopts``:
    Same idea, slightly different interface.

``alias``:
    Take a bunch of commands and options, and give it one name.

Commands: eggs
==============

``egg_info``:
    Eggs put metadata in ``MyPackage.egg-info`` directory.  This 
    metadata is used from the outside.  You can modify the version 
    string from outside with this (like adding a Subversion 
    revision).

``bdist_egg``:
    Creates a ``.egg`` file.  This is a zip file you can put right 
    in ``site-packages``, amongst other things.  Good for plugins,
    used for ``install``, but mostly you can ignore these.

Commands: manage
================

``upload``:
    PyPI Is CPAN: upload your package(s) directly to PyPI.

``easy_install``:
    Two frontends to the Same Thing

``test``:
    Run unit tests.  Limited to ``unittest`` currently.
    
    
# Source

http://www.ianbicking.org/docs/setuptools-presentation/setuptools-slides.txt
