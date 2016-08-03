<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Git](#git)
- [Other notes](#other-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Git

Revert a commit:
```
git revert --no-commit [COMMIT]..HEAD
git revert --continue
```

# Other notes
* Some folders here may be a [sub-module](https://git-scm.com/book/en/v2/Git-Tools-Submodules). If you clone this repository, ensure you add the --recursive option flag. You can also use

```
git pull --recurse-submodules
git submodule update --recursive
```
