# About

Some practices for handling fetch/merge/pull code review

# The "code review workflow" 

```
git merge --no-commit --no-ff branchname
```

Without the `--no-ff flag`, if Git can do a fast-forward then it will do that. (As expected, as in the case of a fast forward, there's no merge commit to create.)

I have this alias setup in .gitconfig for convenience:

```
rev = merge --no-ff --no-commit
```

So that I can simply do:

```
git rev branchname
```

The idea is that all features are developed in separate branches, and each feature is reviewed and merged by somebody other than the author. As other answers pointed out you can abort the merge with:

```
git reset --merge
```

and ask the author to make more changes.

To view the log with only the merge commits I use this other alias:

```
revlog = log --first-parent
```

This way the log becomes a timeline of the large steps: feature by feature rather than commit by commit.

Source: [StackOverflow](http://stackoverflow.com/a/16778871)
