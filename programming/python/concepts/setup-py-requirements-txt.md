<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [setup.py, requirements.txt or a combination?](#setuppy-requirementstxt-or-a-combination)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# setup.py, requirements.txt or a combination?

The main difference:

 "pip install" does not look at a requirements.txt, only at install_requires in setup.py. Source: http://python-packaging-user-guide.readthedocs.org/en/latest/requirements/ . Specifically:
Whereas install_requires metadata is automatically analyzed by pip during an install, requirements files are not, and only are used when a user specifically installs them using pip install -r.

So: if you're distributing your package via PyPI and "pip install my-funky-package" should install "foo" and "bar" as dependencies, put them in setup.py. If you want to document exactly which packages should be installed for a testing or development venv, put them in a requirements.txt file.
Also: if you're expecting people to install your package via "pip install git+https://path.to.git.host/funky-package ", put dependencies in setup.py.

tl;dr if you want other packages to be installed automatically when yours is installed via pip, put them in setup.py.
