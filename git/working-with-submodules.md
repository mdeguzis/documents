<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)
- [Quick reminders](#quick-reminders)
  - [Pull in latest changes for submodule](#pull-in-latest-changes-for-submodule)
- [Have a sudmodule always track the HEAD of a branch](#have-a-sudmodule-always-track-the-head-of-a-branch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Tips and tricks for working with submodules

# Links
[Git Submofule (official)](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

# Quick reminders

## Pull in latest changes for submodule
```
git submodule update --remote MODULE_NAME
```

# Have a sudmodule always track the HEAD of a branch

Note: This is dangerous and not reccomended. Original source is [here](http://stackoverflow.com/a/31851819)

As I mention in "git submodule tracking latest", you can since git 1.8.2 (March 2013) make a submodule track the HEAD of branch:

```
git submodule add -b <branch> <repository> [<path>]
```

A submodule SHA1 is still recorded in the parent repo as a gitlink (special entry in the index).
But a git submodule update --remote will update that entry to the SHA1 matching the HEAD of a branch of the submodule remote repo.

If you have an existing submodule, you can make it follow a branch with:
```
cd /path/to/your/parent/repo
git config -f .gitmodules submodule.<path>.branch <branch>

cd path/to/your/submodule
git checkout -b branch --track origin/branch
  # if the master branch already exist:
  git branch -u origin/master master

cd /path/to/your/parent/repo
git add path/to/your/submodule
git commit -m "Make submodule tracking a branch"
```
