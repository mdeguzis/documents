<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Basic setup.py](#basic-setuppy)
- [Including extra files](#including-extra-files)
- [Diagnositcs](#diagnositcs)
  - [Getting version infromation from setup.py in code](#getting-version-infromation-from-setuppy-in-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Document some setup.py / packaging practices

# Basic setup.py

TODO

# Including extra files

Example setup.py:

```
from setuptools import setup, find_packages

setup(
    name='mytest',
    version='1.0.0',
    description='A sample Python project',
    author='Test',
    zip_safe=False,
    author_email='test@test.com',
    keywords='test',
    packages=find_packages(),
    package_data={'': ['INFO.txt', 'moredata.txt'],
                  'somepackage':['data.txt']},
    data_files=[('.',['INFO.txt']),
                ('additionalstuff',['additionalstuff/moredata.txt'])],
    include_package_data=True,
)
```

Example MANIFEST.in:
```
include INFO.txt
graft additionalstuff
include somepackage/*.txt
```

# Diagnositcs

## Getting version infromation from setup.py in code

```
import pkg_resources
pkg_resources.get_distribution("PACKAGE").version
```
