<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Note regarding -e option of sed](#note-regarding--e-option-of-sed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Note regarding -e option of sed
Give the example:

```
Command ...

find . -name "build*.sh" -print0 | xargs -0 sed -ie "s|changelog|test|g"


Files modified...

        modified:   steamos-tools-achive-keyring/build-steamos-tools-archive-keyring.sh
        modified:   steamos/build-steamos-xpad-dkms.sh
        modified:   syncthing/build-syncthing.sh
        modified:   typhoon2001/build-typhoon2001.sh
        modified:   vbam/build-vbam.sh
        modified:   xwiimote/build-xwiimote.sh

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        antimicro/build-antimicro.she
        cmake/build-cmake.she
        ds4drv/build-ds4drv.she
        ds4drv/build-python-evdev.she
        
```


If you pass 'sed -ie ...' to this use of xargs, you get the results you want, but I also get a plethora of new files, all ending in .she. Presumably, this is adding "e" to all the build scripts as a second argument/command to what you are doing. I assume as well, that this use of xargs just won't pass the extended expressions flag to sed.
