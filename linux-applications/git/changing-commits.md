<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Replacing and ammending commits](#replacing-and-ammending-commits)
  - [Method 1: `git replace` (clean, preferred)](#method-1-git-replace-clean-preferred)
  - [Method 2: `git rebase` (messy)](#method-2-git-rebase-messy)
- [Squash commits](#squash-commits)
- [Aborting a rebase](#aborting-a-rebase)
- [See also:](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information regarding rewriting commits in git. It is important to note here, you will still see entries with the 'git log --all' switch below until you reclone your repository. The history stays local for both commits. On GitHub.com you will only see the corrected entry.

# Replacing and ammending commits

This is useful if you accidentally committed a file under a different login or username. It happens :)

To show a specific author:
```
# Detailed
git log --author=root

# One line
git log --author=root --pretty=oneline --abbrev-commit

# Authors EXCEPT specified
git log --all --perl-regexp --author='^((?!My Full Name)(?!myusername)(?!My Full Name2)(?!myusername2).*)$' --pretty='%an %h %s'
```

Interactive rebase off of a point earlier in the history than the commit you need to modify (`git rebase -i <earliercommit>`). In the list of commits being rebased, change the text from pick to edit next to the hash of the one you want to modify. Then when git prompts you to change the commit, use this:


## Method 1: `git replace` (clean, preferred)

This method is preferred. It is more clean than doing a rebase, and easier to manage. However, it is tedious for multiple commits.

Checkout the commit we are trying to modify.
```
git checkout 03f482d6
```
Make the change. In this example, ammending the author
```
git commit --amend --author "New Author Name <New Author Email>"
```

Replace the old commit with the new one locally.
```
git replace 03f482d6 42627abe
```

Rewrite all future commits based on the replacement.
```
git filter-branch -- --all
```

Remove the replacement for cleanliness
```
git replace -d 03f482d6
```

Push the new history (after sanity checking with git log).
```
git push -f
```

When you are finished with out changes, checkout your original branch and update:
```
git checkout <original_branch>
git pull
```

## Method 2: `git rebase` (messy)
```
# Rebase and use "edit"
git rebase -i <earliercommit>

# Change author
git commit --amend --author="Author Name <email@address.com>"

# Satisfied with changes?
git rebase --continue
```

Source: http://stackoverflow.com/a/28845565

# Squash commits

The workflow of the Todo.txt Touch project says that the master branch of [ginatrapani/todo.txt-touch](https://github.com/ginatrapani/todo.txt-touch) is the golden branch from which all development is based off of.

In order to keep this easy to navigate, it is asked that you squash your commits down to a few, or one, discreet changesets before submitting a pull request. Fixing a bug will usually only need one commit, while a larger feature might contain a couple of separate improvements that is easier to track through different commits.

Once you have rebased your work on top of the latest state of the upstream master, you may have several commits related to the issue you were working on. Once everything is done, squash them into a single commit with a descriptive message, like "Issue #100: Retweet bugfix."

To squash four commits into one, do the following:

```
git rebase -i HEAD~4
```

In the text editor that comes up, replace the words "pick" with "squash" next to the commits you want to squash into the commit before it. Save and close the editor, and git will combine the "squash"'ed commits with the one before it. Git will then give you the opportunity to change your commit message to something like, "Issue #100: Fixed retweet bug."

_**Important: If you've already pushed commits to GitHub, and then squash them locally, you will have to force the push to your branch.

```
git push origin branch-name --force
```

Helpful hint: You can always edit your last commit message, before pushing, by using:

```
git commit --amend
```

# Aborting a rebase

```
git rebase --abort
```

You may need to reset your tree if it has diverged:
```
git reset --hard origin/master
```

# See also:

* [Git Book Chapter 6.4: Git Tools - Rewriting History](http://git-scm.com/book/en/Git-Tools-Rewriting-History)
* https://github.com/ginatrapani/todo.txt-android/wiki/Squash-All-Commits-Related-to-a-Single-Issue-into-a-Single-Commit
