# Revert Commits

Simple approach:
```
git revert --no-commit 0766c053..HEAD
git commit
```

This will revert everything from the `HEAD` back to the commit hash, meaning it will recreate that commit state in the working tree as if every commit 
after `0766c053` had been walked back. You can then commit the current tree, and it will create a brand new commit essentially equivalent to the commit 
you "reverted" to.

(The `--no-commit` flag lets git revert all the commits at once- otherwise you'll be prompted for a message for each commit in the range, 
littering your history with unnecessary new commits.)

* This is a safe and easy way to rollback to a previous state. No history is destroyed, so it can be used for commits that have already been made public.
* If you really do want to have individual commits (instead of reverting everything with one big commit), then you can pass 
`--no-edit` instead of `--no-commit`, so that you don't have to edit a commit message for each reversion.
* If one of the commits between 0766c053..HEAD is a merge then there will be an error popping up (to do with no `-m` specified). 
* To see the diffs before you commit use `git diff --cached`

[Source link](https://stackoverflow.com/questions/4114095/how-do-i-revert-a-git-repository-to-a-previous-commit)
