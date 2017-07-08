<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [The "code review workflow"](#the-code-review-workflow)
- [Git Stash Review](#git-stash-review)
- [disregard master in merge and take another branches changes](#disregard-master-in-merge-and-take-another-branches-changes)
- [Ignoring and filtering files on merge (advanced)](#ignoring-and-filtering-files-on-merge-advanced)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Some practices for handling fetch/merge/pull code review

# The "code review workflow" 

```
git merge --no-commit <branchname>
```

You can back out of that merge with

```
git reset --hard
```

Also, remember that it is always easy to back up in Git. You can do a full merge, including commit, inspect the complete result and if you change your mind you can

```
git reset --hard HEAD^
```

to throw away the merge and be back at the commit before the merge.

In fact, at any point during the merge resolution, you can do

```
git reset --merge
```

To abort the merge and throw away just the merge changes.

Source: [StackOverflow](http://stackoverflow.com/a/16778718)

# Git Stash Review

The modifications stashed away by this command can be listed with git stash list, inspected with git stash show

>`show [<stash>]`
       Show the changes recorded in the stash as a diff between the stashed state and
       its original parent. When no <stash> is given, shows the latest one. By default,
       the command shows the diffstat, but it will accept any format known to git diff
       (e.g., git stash show -p stash@{1} to view the second most recent stash in patch
       form).

So, to view the content of the most recent stash, run

```
git stash show -p
```

To view the content of an arbitrary stash, run something like
```
git stash show -p stash@{1}
```

Source [StackOverflow](http://stackoverflow.com/questions/10725729/git-see-whats-in-a-stash-without-applying-stash)

# disregard master in merge and take another branches changes

```
git merge master --strategy=ours
```

http://schacon.github.com/git/git-merge.html

As 'Computer Linguist' commented here, this will "ignore everything from 'master', even if it has changes to new, independent files". So if you are not the OP and want a more safe merge that does not as the OP says "forget the merging", then use this excellent safe command from 'Computer Linguist', and plus his comment up so he gets creds.

```
git merge -s recursive -X theirs branch
```

# Ignoring and filtering files on merge (advanced)

This is **very** useful for filtering out files when merging a staging branch.

This mechanism lets us map files or folders (we use globbing patterns such as secure/* or *.svg) to specific technical properties.

These mappings are usually versioned themselves, just like what we would put in .gitignore files, but these are stored in .gitattributes (and just like .gitignore has a strictly-local buddy at .git/info/exclude, we also have .git/info/attributes).

The format is simple: every line that neither is empty nor starts with a hash (#) sign to denote a comment uses a globbing-pattern = attribute-info format (the amount of whitespace being irrelevant).

An attribute can be set (present with no specific value), unset (present in negative form), set to a value or unspecified. For our purpose here, we’ll use a specific value.

The merge attribute lets us map files to a merge driver, a command responsible for the actual merging of files. Start by defining a merge driver that would always favor our current version of the file, by making use of the existing true command. We’ll call this driver ours, to keep in line with similar merge strategies.

```
git config --global merge.ours.driver true
```

Now let’s add a .gitattributes file at the root level of our repo, that would tell email.json to use that driver instead of the standard one:

```
echo 'email.json merge=ours' >> .gitattributes
git add .gitattributes
git commit -m 'chore: Preserve email.json during merges'
```

Git will perform a merge and pull in commit data, but not change the file. You should just see 'Merge branch 'master' into staging' if you have no other files to merge against.

Source: [medium.com](https://medium.com/@porteneuve/how-to-make-git-preserve-specific-files-while-merging-18c92343826b)

# Links

* [Git Fetch/Merge, not Pull](https://longair.net/blog/2009/04/16/git-fetch-and-merge/)
* [Git stash recover uncommitted changes](http://stackoverflow.com/questions/19003009/git-how-to-recover-stashed-uncommitted-changes)
* [Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
