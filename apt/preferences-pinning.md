# About
Some useful knowledge about pinning pacakges with apt-pinning

# Pin-level explanations


```
How APT Interprets Priorities
   Priorities (P) assigned in the APT preferences file
   must be positive or negative integers. They are
   interpreted as follows (roughly speaking):

   P >= 1000
       causes a version to be installed even if this
       constitutes a downgrade of the package

   990 <= P < 1000
       causes a version to be installed even if it does
       not come from the target release, unless the
       installed version is more recent

   500 <= P < 990
       causes a version to be installed unless there is a
       version available belonging to the target release
       or the installed version is more recent

   100 <= P < 500
       causes a version to be installed unless there is a
       version available belonging to some other
       distribution or the installed version is more
       recent

   0 < P < 100
       causes a version to be installed only if there is
       no installed version of the package

   P < 0
       prevents the version from being installed
       
```
