<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Loading External Module Data During PyInstaller Bundling](#loading-external-module-data-during-pyinstaller-bundling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Loading External Module Data During PyInstaller Bundling
This annoyed me quite a bit. One pitfall of "automagic" tools like PyInstaller, is corner-cases. While many of them, PyInstaller included, have ways around this, it's often a hunt for the right answer. Below is a method for loading data in a single-file PyInstaller binary bundle, wherein the external libaries "getopsconfig()" expects this normally under the package folder some_data:

```
import os
import pkgutil
import PyInstaller.__main__
import shutil
import sys


# Get mypkg data not imported automagically
if not os.path.exists('mypkg'):
    os.mkdir('mypkg')


with open ('mypkg' + os.sep + 'some-env.ini', 'w+') as f:
    data = pkgutil.get_data( 'mypkg', 'some-env.ini' ).decode('utf-8', 'ascii')
    f.write(data)


PyInstaller.__main__.run([
    '--name=%s' % 'myprogram',
    '--onefile',
    '--add-data=%s:mypkg' % os.path.join('mypkg/some-env.ini'),
    os.path.join('cli.py'),
])


# Cleanup
shutil.rmtree('mypkg')
```

cli.py to load my program for PyInstall to discover all the imports (useful for setuptools folks):

```
from mypkg.__main__ import main

if __name__ == '__main__':

    main()
```
This allows PyInstaller to discover all imports normally sucked in by setuptools.

Normally, my Python library performs the following:

```
def getopsconfig():
    # Set config object
    opsconfig = configparser.RawConfigParser()
    scriptdir = os.path.dirname(os.path.abspath(__file__))
    configfile = scriptdir + os.sep + 'some-env.ini'
    if not opsconfig.read(configfile):
        logging.error('Configuration file ' + configfile + ' could not be read')
    else:
        logging.debug('Loaded config file: ' + configfile)
        return opsconfig
```

Injecting the data file this way allows interoperability:

```
$ dist/myprogram --debug -ls /user/myname
2019-12-31 15:32:23,682 - DEBUG - Knox enabled: True
2019-12-31 15:32:23,682 - DEBUG - __main__.py: Loading configuration from mypkg
2019-12-31 15:32:23,684 - DEBUG - Loaded config file: /tmp/_MEIzSpc5B/mypkg/some-env.ini
2019-12-31 15:32:23,684 - DEBUG - Fetching username/password
2019-12-31 15:32:23,685 - DEBUG - Getting username via prompt
```
