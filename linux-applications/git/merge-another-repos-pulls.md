You can do it manually quite easily:

add the other fork as a remote of your repo:

```
git remote add otherfork git://github.com/request-author/project.git
```

fetch his repo's commits

```
git fetch otherfork
```

You have then two options to apply the pull request (if you don't want to choose pick 1.)
If you don't care about applying also the eventual commits that have been added between the origin and the pull request, you can just rebase the branch on which the pull request was formed

```
git rebase master otherfork/pullrequest-branch
```

If you only want the commits in the pull request, identify their SHA1 and do
```
git cherry-pick <first-SHA1> <second-SHA1> <etc.>
```

Source: https://stackoverflow.com/questions/6022302/how-to-apply-unmerged-upstream-pull-requests-from-other-forks-into-my-fork
