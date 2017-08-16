<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [How to](#how-to)
  - [List rpm installed size](#list-rpm-installed-size)
  - [List files inside an RPM package file using the rpm command](#list-files-inside-an-rpm-package-file-using-the-rpm-command)
  - [List files inside of an already installed RPM package](#list-files-inside-of-an-already-installed-rpm-package)
  - [Extract cpio archive from RPM packages](#extract-cpio-archive-from-rpm-packages)
  - [Extract files from an RPM package’s cpio archive](#extract-files-from-an-rpm-packages-cpio-archive)
  - [Show RPM package preinstall and postinstall scripts](#show-rpm-package-preinstall-and-postinstall-scripts)
  - [View contents of RPM packages on remote repositories using repoquery](#view-contents-of-rpm-packages-on-remote-repositories-using-repoquery)
- [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
How to unpack and inspect RPM packages

# How to

## List rpm installed size

The following command queries (-q) all packages (-a) and returns the result in the format defined by “–queryformat”. The format below says to print the size as the first element of each result line:
```
rpm -qa --queryformat '%10{size} - %-25{name} \t %{version}\n' | sort -n
```

Top 10 (right aligned size)
```
rpm -qa --queryformat "%-50{NAME} %10{SIZE}\n"
```

See: http://rpm5.org/docs/api/queryformat.html  
See: http://rpm.org/user_doc/query_format.html

## List files inside an RPM package file using the rpm command

The RPM package manager rpm comes with various utilities to interact with packages. The following command will list all the files inside an RPM package:

```
$ rpm -qlp ./path/to/test.rpm
```

For example:
```
$ rpm -qlpv ./packagecloud-test-1.1-1.x86_64.rpm

-rwxr-xr-x   1   root    root    8286 Jul 16  2014 /usr/local/bin/packagecloud_hello
```

In this example, the rpm command is used with the flag -q to specify it as a query command, -l to list the files in the package, and -p so it knows to query the uninstalled package file. The -v flag (verbose) just provides additional information (permissions, owner, etc.) for the sake of this example. As we can see, the package installs an executable binary called packagecloud_hello into /usr/local/bin/.

## List files inside of an already installed RPM package

Use the rpm command with -q and -l flags to list the files from an installed RPM package:

```
$ rpm -ql packagecloud-test
```

NOTE the use of a package’s name in the previous command and not the path to a specific RPM package.

## Extract cpio archive from RPM packages

To extract files from an RPM package you must first extract a cpio archive from the package itself. RedHat provides a utility called `rpm2cpio` which does exactly that:

```
$ rpm2cpio ./packagecloud-test-1.1-1.x86_64.rpm
```

## Extract files from an RPM package’s cpio archive

The `rpm2cpio` command will output (to stdout) a cpio archive from the RPM package. To extract the package files we’ll use the output from `rpm2cpio` and then use the cpio command to extract and create the files we need.

For example:

```
$ rpm2cpio ./packagecloud-test-1.1-1.x86_64.rpm | cpio -idmv
./usr/local/bin/packagecloud_hello
17 blocks
```

The cpio command copies files to and from archives. In the example above, we use `cpio` with the `-i` flag to extract the files from the archive, `-d` to create the leading directories where needed, and -m to preserve the file modification times when creating files. The `-v` flag (verbose) is to list the files processed for the sake of this example.

The result of our previous example is the creation of a `./usr/` folder in our working directory containing the files from the RPM package `packagecloud-test-1.1-1.x86_64.rpm`.

```
$ file usr/local/bin/packagecloud_hello
usr/local/bin/packagecloud_hello: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.24, BuildID[sha1]=0x77fe4f2fa02ee973bf4d74867729e950fcde7107, not stripped
```

NOTE that simply extracting package files to the root directory does NOT properly install a package. Use the yum or rpm tools to correctly install RPM packages.

## Show RPM package preinstall and postinstall scripts

To show the scripts that will run when a package is installed or uninstalled from a system, use the `--scripts` flag when querying a package using rpm. The following command will show the scripts for an uninstalled package `test-1.1-1.el6.x86_64.rpm`:

```
$ rpm -qp --scripts ./packagecloud-test-1.1-1.x86_64.rpm
```

This will output something like:

```
preinstall scriptlet (using /bin/sh):
# Do something

postinstall scriptlet (using /bin/sh):

if [ $1 -eq 1 ] ; then
    # Do another thing

fi
preuninstall scriptlet (using /bin/sh):

if [ $1 -eq 0 ] ; then
    # Do something else

fi
postuninstall scriptlet (using /bin/sh):

# Do things here, too
To view the scriptlets of an already installed package, you can use the following syntax when using  rpm

$ rpm -q --scripts <packagename>
```

## View contents of RPM packages on remote repositories using repoquery

`repoquery` is provided by the `yum-utils` package, make sure it’s installed:

```
$ yum install yum-utils
```

The `repoquery` command is used to query information from Yum repositories installed on the system. By default, the `repoquery` command will download the Yum repo metadata and update the cache. To run repoquery entirely from the Yum cache, use the `-C` or `--cache` flag. To list the contents of a package, pass the `--list` flag to the `repoquery` command:

```
$ repoquery --list <packagename>
```

For example:

```
$ repoquery --list packagecloud-test
/usr/local/bin/packagecloud_hello
```

This can be useful when viewing the contents of packages that aren’t downloaded or installed on your the system. `repoquery` will only provide information on packages avaliable in the configured Yum repositories.

# Conclusion

Understanding how packages interact with the systems they’re installed on can be helpful in day-to-day operations. By knowing that the RPM package is comprised of a cpio archive and header data, we can extract the information needed with already existing tools (`rpm2cpio` and `cpio`) and use the RPM toolchain to query, inspect, and view the contents of an RPM package.

Source: [packagecloud](https://blog.packagecloud.io/eng/2015/10/13/inspect-extract-contents-rpm-packages/)
