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

# Links

* [Git Fetch/Merge, not Pull](https://longair.net/blog/2009/04/16/git-fetch-and-merge/)
* [Git stash recover uncommitted changes](http://stackoverflow.com/questions/19003009/git-how-to-recover-stashed-uncommitted-changes)
