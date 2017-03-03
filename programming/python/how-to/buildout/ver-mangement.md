# Version management
Here are examples of utilizing verison management

##  automatic package-picking

```
newest = false
allow-picked-versions = false
allowed-eggs-from-site-packages = pyzmq
include-site-packages = false
```

## Specify used package versions in the [versions] section of versions.cfg
```
extends = versions.cfg
versions = versions
```

# Necessary for buildout not to mess up capitalization.
```
extensions = buildout-versions
```

## Uncomment below (and enable allow-picked-versions)
## to write out picked versions to a separate file
```
buildout_versions_file = picked_versions.cfg
```

## Uncomment to prevent downloading packages
```
offline = true
```
