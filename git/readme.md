# About 
Useful informatin about using git / GitHub. Also see [getting started with GitHub](https://github.com/ProfessorKaos64/documents/blob/master/git/getting-started-with-github.md).


# Commands
***

## stash

### Stash only a specific commit, or set of them. 
You can use`git stash -p`. This way you can select which hunks should be added to stash, whole files can be selected as well.

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

## submodule

### Updating

Pull in latest changes for submodule
```
git submodule update --remote MODULE_NAME
```

### Have a sudmodule always track the HEAD of a branch

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
### Removal 

* Delete the relevant line from the .gitmodules file.
* Delete the relevant section from .git/config.
* Run git rm --cached path_to_submodule (no trailing slash).
* Commit and delete the now untracked submodule files.

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
