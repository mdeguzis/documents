<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)
- [Updating submodules](#updating-submodules)
  - [Pull in latest changes for all submodules](#pull-in-latest-changes-for-all-submodules)
  - [Pull in latest changes for all submodules (recursively)](#pull-in-latest-changes-for-all-submodules-recursively)
  - [Pull in latest changes for specific submodule](#pull-in-latest-changes-for-specific-submodule)
- [Creating a submodule](#creating-a-submodule)
- [Have a sudmodule always track the HEAD of a branch](#have-a-sudmodule-always-track-the-head-of-a-branch)
- [Removing submodule](#removing-submodule)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Tips and tricks for working with submodules

# Links
[Git Submofule (official)](https://git-scm.com/book/en/v2/Git-Tools-Submodules)


# Adding submodules

## Basic usage

```
git submodule add <URL>
```

## Add specific tag/revision

Step 1 : Add the submodule
Once the module is checked out, I need to add the QUnit submodule.  First grab the GitHub url for my QUnit fork (eventually this will be replaced with the main QUnit repo) and execute the “add” command from within your local repository root.

git submodule add git://github.com/asynchrony/qunit.git qunit
Afterward there will be two modified and staged objects in your repo: .gitmodules will contain the submodule’s local path and source URL and a new folder named qunit which contains a full clone of your source repository.

** Fraser Speirs has a good writeup on what is going on behind the scenes with the Git internals and how the key to all of this is in the index files of each repo and the modes the changes are committed with. **

Step 2 : Fix the submodule to a particular commit
By default the new submodule will be tracking HEAD of the master branch but will NOT be updated as you update your primary repo.  In order to change the submodule to track a particular commit or different branch change directory to the submodule folder and switch branches just like you would in a normal repo.

```
git checkout -b dev_branch origin/dev_branch
```

Now the submodule is fixed on the development branch instead of HEAD of master.  Just easily I could set it to specific commit or tag.

Step 3 : Commit everything
Now from your primary repository you still have two modified objects: .gitmodules file and qunit folder.  Commiting these changes will persist the new submodule tracking your desired branch.

Step 4 : Clone Recursive
The next time you (or someone else) clones this repo, they will need to do one of two things.

A) Add the –recursive flag to their git clone command
```
git clone REPO_URL --recursive
```
B) manually initialize and the submodules after the clone
```
git clone REPO_URL
git submodule update --init --recursive
```

See: https://twoguysarguing.wordpress.com/2010/11/14/tie-git-submodules-to-a-particular-commit-or-branch/

# Updating submodules

If submodules are not initialized from a recursive clone, isssue:
```
git submodule init
```

## Pull in latest changes for all submodules
```
# One module
git pull --recurse-submodules
git submodule update --remote <PATH/MODULE>

# recursively
git pull --recurse-submodules
git submodule update --remote --recursive

# All at once
git submodule update --init --recursive --remote
```

## Pull in latest changes for all submodules (recursively)
If `--recursive` is specified, this command will recurse into the registered submodules, and update any nested submodules within.

```
git submodule update --recursive
```

## Pull in latest changes for specific submodule
```
git submodule update --remote MODULE_NAME
```

# Creating a submodule

```
git submodule add https://github.com/chaconinc/DbConnector
git status
git commit -am 'added DbConnector module'
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

# Removing submodule

You have the git submodule deinit.

```
[submodule "path/folder]          <-- use full submodule name
        path = path/folder
        url = https://github.com/<user>/<repo>
```

Permanently remove
```
# Note: asubmodule (no trailing slash)

git submodule deinit <submodule>    
git rm <submodule>
rm -rf .git/modules/<submodule>
```

If you need to remove it from your working tree after a git add
```
git rm --cached <submodule>
```

If need be, remove the section from the .gitmodules modules

Finally, clean up the entry in the .gitmodules file

**[deinit](https://git-scm.com/docs/git-submodule)**

>Un-register the given submodules, i.e. remove the whole submodule.$name
section from .git/config together with their work tree.
>
>Further calls to git submodule update, git submodule foreach and git submodule sync will skip any unregistered submodules until they are initialized again, so use this command if you don’t want to have a local checkout of the submodule in your work tree anymore.
>
>If you really want to remove a submodule from the repository and commit that use git rm instead.
>
>If --force is specified, the submodule’s work tree will be removed even if it contains local modifications.

Source: [StackOverflow](https://stackoverflow.com/questions/29850029/what-is-the-current-way-to-remove-a-git-submodule)  

# Troubleshooting

## git command update of a submodule fails with "Failed to recurse into submodule path"

```
git submodule update --init --recursive somepath/some_submodule
Submodule path 'somepath/some_submodule': checked out '6cb356e7f7f2638c9b78a4aa0b0c9c35a0e4cb41'
No submodule mapping found in .gitmodules for path 'somepath/some_submodule'
Failed to recurse into submodule path 'somepath/some_submodule'
```

Git is referencing a path that has no .gitmodules mapping
 
Update your submodule(s) to the last commit after removing the offending folder:

```
# available since git 1.8
git submodule update --remote --merge

# check status
git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   somepath/some_submodule (new commits)
#
no changes added to commit (use "git add" and/or "git commit -a")

# commit the changes
git add somepath/some_submodule
git commit

```
git push


The cleanest thing to do then, is to reclone the repository so everything is fresh. If you cannot do that, you will likely need to clean up old folders that the error is referencing
