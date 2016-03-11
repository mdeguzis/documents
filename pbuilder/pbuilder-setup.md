# The SteamOS-Tools way

When using packaging under [SteamOS-Tools-Packaging](https://github.com/ProfessorKaos64/SteamOS-Tools-Packaging), 
the primary configuration script [configure-packaging-env.sh](https://github.com/ProfessorKaos64/SteamOS-Tools-Packaging/blob/brewmaster/setup-files/configure-packaging-env.sh)
sets a number of things:

* Supports Debian distributions and Arch Linux
* Adds multirarch if missing
* Installs a few base packages needed for pbuilder environment setup
* Installs keyrings that may be missing
* Setup GitHub user information globally, as well in $HOME/.bashrc
* Adds quilt config files
* Adds pbuilder config files
* Adds exclusion/inclusion lists for rsync when using build scripts
* Configures the pbuilder environment

If you do not use this script, take note of the `.pbuilderrc` file

# Also see:

* [devscripts/dch](http://manpages.ubuntu.com/manpages/precise/man1/dch.1.html)
