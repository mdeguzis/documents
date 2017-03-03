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
Tell buildout to look for external sources in the [sources] tag (requires mr. developer)

example:
```
sources = sources
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

**Definitions**

* `recipe` - which recipe to use. This can be from PyPi or custom defined
* `eggs` - Which eggs to build/fetch
* `scripts` - Define which scripts to include from the egg (if any)
* depedendent scripts (applies to: zc.recipe.egg) - If set to the string “true”, scripts will be generated for all required eggs in addition to the eggs specifically named.
* `${buildout:project-eggs}` - For this definition, see the [buildout] section, under the `project-eggs` sub-category.

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
