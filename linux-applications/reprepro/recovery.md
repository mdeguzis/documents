<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Sourced from: https://github.com/esc/reprepro/blob/master/docs/recovery](#sourced-from-httpsgithubcomescrepreproblobmasterdocsrecovery)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Sourced from: https://github.com/esc/reprepro/blob/master/docs/recovery

Some tips what to do if (hopefully never), your database gets
corrupted:

First there are three different databases used, residing in three
files in your --dbdir (normally db/):

1) references.db
This file only contains the information which file in the pool/
is needed by which target (i.e. which type/distribution/
component/architecture quadruple). This is simply repairable by
deleting references.db and running "rereference".

The current state of this database can be seen with "dumpreferences".
All references from some specific target can be removed with
"_removereferences".

2) files.db and checksums.db
These files contain the information about which files in the pool/ dir
are known and what checksums they have. Files not in here will not be
deleted with "deleteunreferenced". Files being wrong here will not realized
(and thus not corrected even if told to be newly included)

If both files exist, files.db is the canonical information and checksums.db
can be regenerated with a call to collectnewchecksums.
If only checksums.db is there, only that it used. (This means: if you
have called collectnewchecksums since you last used a version prior to 3.3
with this repository, you can just delete files.db. But make sure to
never ever use a version prior to 3.0 on this repository after that.)

To get this database in text form use "_listchecksums" without argument,
to add items manually pipe it into "_addchecksums". (Filenames
are handled as strings, so be careful).

If the database is completely lost or broken, you can regain it by moving
files.db and checksums.db out of the way and running:
find $BASEDIR/pool -type f -printf "pool/%P\n" | reprepro -b $BASEDIR _detect
(or cd $BASEDIR && find pool -type f -print | reprepro -b . _detect)

Also single files can be removed or added by "_forget" and "_detect".
(Again note filekeys will be handled as strings, so leading "./", double
 slashes, "/./", symlinks  and the like make them differ).

4) packages.db
This file contains multiple databases, one for each target, containing
the chunks from the Packages or Sources files, indexed by package name.

This one is the hardest to reconstruct. If you have still an uncorrupted
"dists/" directory around, (e.g. you just deleted db/ accidentally),
it can be reconstructed by moving your dists/ directory to some other place, 
moving the packages.db file (if still existent) away, and set every distribution 
in conf/distributions a "Update: localreadd" with localreadd in conf/updates like:
Name: localreadd
Suite: *
Method: copy:/<otherplace>

with otherplace being the place you moved the dists/ directory too.

If the packages database is corrupt, the described way can at least reconstruct
the Packages still landing in the Packages.gz and Sources.gz files.
If references.db is still accessible via dumpreferences, it can give hints
where the other files belong to. Otherwise removing references.db and calling
"rereference" and then "dumpunreferenced" will give you a list of files not
yet anywhere.

Last but not least, there are also the "check" and "checkpool" commands, which
can give some hints about inconsistencies. (Check will also read files missing
from files.db+checksums.db if they are needed by packages but in the pool).
