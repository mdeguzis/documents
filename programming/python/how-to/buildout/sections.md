<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [[buildout]](#buildout)
- [Extensions](#extensions)
- [Versions](#versions)
- [Pinning](#pinning)
- [Show versions being picked](#show-versions-being-picked)
- [Sources](#sources)
  - [Basic example](#basic-example)
  - [Private repo (SSH)](#private-repo-ssh)
  - [Config switching with a python flag](#config-switching-with-a-python-flag)
- [Mr. Developer options](#mr-developer-options)
- [parts](#parts)
- [Define any develop egg directories](#define-any-develop-egg-directories)
- [Custom sections](#custom-sections)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# [buildout]

Parent section: None  
Required - yes

# Extensions
Parent section: [buildout]  
Required: no  
Define extensions you may want to use

* Mr developer allows some neat tricks, including working with revision control sources

Example:
```
extensions = mr.developer
```

# Versions
Parent section: [buildout]  
Required: No  
Tell buildout to look for pinned versions in the [versions tag]

example:
```
versions = versions
```

# Pinning
Parent section: [buildout]  
Required: No
Don't assume we want the newest version of a package. This stops existing eggs from being auto-upgraded

example:
```
newest = false
```

# Show versions being picked
Parent section: [buildout]  
Required: No
show-picked-versions = true

# Sources
Parent section: [buildout]  
Required: No
Tell buildout to look for external sources in the [sources] tag (requires mr. developer). Note that if your GitHub respository is private, you will need to automate access to the repository so git clone can function inside buildout.cfg with Mr. Developer. To achieve this, generate and/or add the [SSH key](https://help.github.com/articles/generating-an-ssh-key/) of the initiating user. When you initially clone down the repo, login with the actual GitHub user account, even if you are using a service account with buildout (i.e. clone with jsmith, use buildout with sys_acct).

If you are using develop eggs, ensure your relative path is correct to the path reported by`.egg-link`:

## Basic example
```
sources = sources
```

## Private repo (SSH)
```
git clone ssh://git@github.com/<USER>/<REPO>
opstools = git ssh://git@github.com/<USER>/<REPO>
```

## Config switching with a python flag
```
# Load config file
config = ConfigParser.RawConfigParser()
# Handle develop egg use and packaged use here
if args.develop:
    logging.warning("Using opstools develop egg")
    configfile = str(os.environ['HOME']) + '/python-opstools/opstools/hdp-env.ini'
else:
    logging.info("Using opstools packaged version")
    configfile = 'buildout/src/opstools/hdp-env.ini'

# Ensure file is loaded
if not config.read(configfile):
    logging.error("Configuration file " + configfile + " could not be loaded!")
    sys.exit("Configuration file load error")
```

# Mr. Developer options
Parent section: [buildout]  
Required: No
The next 2 lines define the control for Mr. Developer sources

```
always-checkout = force
auto-checkout = *
```
# parts
Parent section: [buildout]
Required - yes  

Example:
```
parts =
    python
    scripts
    test
```

# Define any develop egg directories
Parent section: [buildout]
Required - no

Example:
```
#develop = 
#    my-module
```

# Custom sections
These may related to parts or other defined items. There is no requirement beyond the tag format and python assignment conventions.

examples:

```
[paster]
recipe = z3c.recipe.scripts
eggs = pastescript
dependent-scripts = true

[ipython]
recipe = z3c.recipe.scripts
eggs = 
    ipython
    ${buildout:project-eggs}
dependent-scripts = true
scripts = ipython

[sphinx]
recipe = z3c.recipe.scripts
# Sphinx needs to be able to import our packages
eggs = 
    Sphinx
    ${buildout:project-eggs}
scripts = sphinx-apidoc sphinx-autogen sphinx-quickstart sphinx-build

[pytest]
recipe = z3c.recipe.scripts
eggs =
    pytest
    ${buildout:project-eggs}
scripts = py.test
```
