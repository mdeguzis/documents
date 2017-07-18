<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Commands](#commands)
  - [Checkout](#checkout)
    - [Reset a file you deleted/modified](#reset-a-file-you-deletedmodified)
  - [clone](#clone)
  - [Log](#log)
    - [Committed changes to be pushed](#committed-changes-to-be-pushed)
  - [stash](#stash)
    - [Stash only a specific commit, or set of them.](#stash-only-a-specific-commit-or-set-of-them)
    - [Retrieve a stash](#retrieve-a-stash)
  - [rebase](#rebase)
    - [Squashing commits](#squashing-commits)
  - [revert](#revert)
  - [submodule](#submodule)
    - [Creating](#creating)
    - [Updating](#updating)
    - [Have a sudmodule always track the HEAD of a branch](#have-a-sudmodule-always-track-the-head-of-a-branch)
    - [Removal](#removal)
  - [Reviewing](#reviewing)
    - [Git logs](#git-logs)
    - [Checking git status items](#checking-git-status-items)
- [Tools / Utilities](#tools--utilities)
  - [dch](#dch)
- [Useful links for working with Git/GitHub](#useful-links-for-working-with-gitgithub)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 
Useful informatin about using git / GitHub. Also see [getting started with GitHub](https://github.com/ProfessorKaos64/documents/blob/master/git/getting-started-with-github.md).


# Commands

## Checkout

### Reset a file you deleted/modified

```
git checkout <COMMIT_TO_USE> -- file1/to/restore file2/to/restore
```

## clone

https
```
git clone https://github.com/username/repo
```

ssh
```
git clone ssh://git@github.com/username/
```

## Log

### Committed changes to be pushed

```
git log origin/<BRANCH>..HEAD
```

## stash

### Stash only a specific commit, or set of them. 
You can use`git stash -p`. This way you can select which hunks should be added to stash, whole files can be selected as well.

### Retrieve a stash

```
git stash list
git stash apply --index
```

See: https://git-scm.com/book/en/v1/Git-Tools-Stashing

## rebase

### Squashing commits

1. reset your branch on our master
```
git remote add upstream /url/to/original/repo
```
2. assuming you added xbmc-packaging as remote and origin is your own repo: 
```
git fetch xbmc-packaging; git rebase -i xbmc-packaging/master
```
3. during rebase make sure only your own commits are picked, then squash (s) all down to 1
4. Force push
```
git push -f origin yourbranch
```

## revert

Revert a branch back to specific commit:

```
git revert --no-commit 0766c053..HEAD
git commit
```

Source: [StackOverflow](http://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit)

If that proves to much trouble, you can try a hard reset:

```
git reset --hard <COMMIT>
git clean -f
git push origin <BRANCH> --force
```

Or
```
git reset --hard HEAD~
```

## submodule

### Creating

```
git submodule add https://github.com/<user>/<repo_name> <OPTIONAL_PATH_AND_MODULE_NAME>
```

### Updating

Pull in latest changes for submodule
```
git submodule update --remote <PATH_TO_WITH_MODULE_NAME>
```

### Have a sudmodule always track the HEAD of a branch

Note: This is dangerous and not recommended. Original source is [here](http://stackoverflow.com/a/31851819)

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
### Removal 

* Delete the relevant line from the .gitmodules file.
* Delete the relevant section from .git/config.
* Run git rm --cached path_to_submodule (no trailing slash).
* Commit and delete the now untracked submodule files.

## Reviewing

### Git logs

Entire log
```
git log
```

Per author
```
git log --author=root
```

Listing all authors *except* a set of authors

This uses the advanced "negative lookahead" feature available in PCRE, perl-based regex functionality. Your version of grep must support PCRE, so you'll need to check the way your vendor builds it. There are tips out there for how to rebuild or get other versions if needed.

```
$ git config --global grep.patternType perl
$ git log --author='^((?!pattern).*)$'

# Example
git log --perl-regexp --author='^((?!excluded-author1-regex)(?!excluded-author2-regex).*)$'
```

One line
```
git log --author=root --pretty=oneline --abbrev-commit
```

**See Also**

* https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
* https://coderwall.com/p/tzdzwa

### Checking git status items

simple
```
git status
```

Checking branch status info
```
# On branch master
# Your branch and 'origin/master' have diverged,
# and have 4 and 4 different commits each, respectively.
#   (use "git pull" to merge the remote branch into yours)

git log HEAD..origin/master
```

# Tools / Utilities

## dch

Example creation:
```
dch --create -v 1.0 -M --package voglperf -D brewmaster
```

This tells dch to create the changelog, with the 1.0 initial verion, name it voglperf, and set the distribution to brewmaster.

Example increment
```
dch -i -v 1.0 -M --package voglperf -D brewmaster
```
In this example we are applying most of the same options but just incrementing the version

# Useful links for working with Git/GitHub

* [Advanced Git usage](https://help.github.com/categories/advanced-git/)
* [Rebasing](https://help.github.com/articles/about-git-rebase/)
* [Git Submofule (official)](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* [Why you can't clone a specific commit](http://stackoverflow.com/a/26135822/2187024)
* [Undo almost anything in Git/GitHub](https://github.com/blog/2019-how-to-undo-almost-anything-with-git)
