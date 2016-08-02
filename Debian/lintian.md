# About

Some useful info about Lintian (which is annoying, but useful? ha)

# Overrides

FILES
Lintian looks for its configuration file in the following locations:

The file name given with the --cfg option

$LINTIAN_CFG
$LINTIAN_ROOT/lintianrc
$HOME/.lintianrc
/etc/lintianrc

Lintian uses the following directories:

/tmp
   If no lab location is specified via the LINTIAN_LAB environment
   variable, configuration, or the --lab command-line option, lintian
   defaults to creating a temporary lab directory in /tmp.  To change
   the directory used, set the TMPDIR environment variable to a
   suitable directory.  TMPDIR can be set in the configuration file.

/usr/share/lintian/checks
   Scripts that check aspects of a package.

/usr/share/lintian/collection
   Scripts that collect information about a package and store it for
   use by the check scripts.

For binary packages, Lintian looks for overrides in a file named
usr/share/lintian/overrides/<package> inside the binary package, where
<package> is the name of the binary package.  For source packages,
Lintian looks for overrides in debian/source/lintian-overrides and then
in debian/source.lintian-overrides if the first file is not found.  The
first path is preferred.  See the Lintian User's Manual for the syntax
of overrides.


# Links

* [Lintian manpage](http://man.he.net/man1/lintian)
