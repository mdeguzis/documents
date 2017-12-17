<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Working In Development Mode](#working-in-development-mode)
  - [Install from local folder](#install-from-local-folder)
  - [Install from local folder (editable mode)](#install-from-local-folder-editable-mode)
- [Pipfile and Pipefile.lock](#pipfile-and-pipefilelock)
- [Documents and Links](#documents-and-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
pip is a package management system used to install and manage software packages written in Python. Many packages can be found in the Python Package Index (PyPI). ... pip is a recursive acronym that can stand for either "Pip Installs Packages" or "Pip Installs Python".

# Working In Development Mode
If you come from the traditional `python setup.py install` world, consider this with pip:

## Install from local folder

```
tar -zxvf requests-2.3.0.tar.gz
cd requests-2.3.0
pip install .
```

## Install from local folder (editable mode)
Although not required, it’s common to locally install your project in “editable” or “develop” mode while you’re working on it.
This allows your project to be both installed and editable in project form.

```
pip install -e .
```

Any changes you make to the code will immediately apply across the system.
This is useful if you are the package developer and want to test changes.
It also means you can't delete the folder without breaking the install.

**Comparison to develop**  
`install -e .` is like `python setup.py develop`

Note that `pip install -e` takes a directory as argument, not the `setup.py` file itself.

Although somewhat cryptic, -e is short for --editable, and . refers to the current working directory, so together, it means to install the current directory (i.e. your project) in editable mode. This will also install any dependencies declared with “install_requires” and any scripts declared with “console_scripts”. Dependencies will be installed in the usual, non-editable mode.

It’s fairly common to also want to install some of your dependencies in editable mode as well. For example, supposing your project requires “foo” and “bar”, but you want “bar” installed from VCS in editable mode, then you could construct a requirements file like so:

```
-e .
-e git+https://somerepo/bar.git#egg=bar
```
# Pipfile and Pipefile.lock

Pipfile is the replacement for requirements.txt. Pipfile and its sister Pipfile.lock are a replacement for the existing standard pip's requirements.txt file.

The Concept

Pipfile will be superior to requirements.txt file in a number of ways:

* TOML syntax for declaring all types of Python dependencies.
* One Pipfile (as opposed to multiple requirements.txt files).
  * Existing requirements files tend to proliferate into multiple files - e.g. dev-requirements.txt, test-requirements.txt, etc. - but a Pipfile will allow seamlessly specifying groups of dependencies in one place.
  * This will be surfaced as only two built-in groups (default & development). (see note below)
* Fully specified (and deterministic) environments in the form of Pipfile.lock. A deployed application can then be completely redeployed with the same exact versions of all recursive dependencies, by referencing the Pipfile.lock file.

The concrete requirements for a Python Application would come from Pipfile. This would include where the packages should be fetched from and their loose version constraints.

The details of the environment (all installed packages with pinned versions and other details) would be stored in Pipfile.lock, for reproducibility. This file will be automatically generated and should not be modified by the user.

Learn more at: https://github.com/pypa/pipfile (Example Pipfiles and more).

Note: If you primarily use a setup.py file, a minimal Pipefil is all that is needed if say, working with pipenv

# Documents and Links

* https://packaging.python.org/tutorials/distributing-packages/
