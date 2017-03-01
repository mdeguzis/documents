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


# Links

* [Git Fetch/Merge, not Pull](https://longair.net/blog/2009/04/16/git-fetch-and-merge/)
