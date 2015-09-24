# Proper workflow for cleaning fork and squashing commits (example from xbmc-packaging)

1reset your branch on our master
2. assuming you added xbmc-packaging as remote and origin is your own repo: 
```
git fetch xbmc-packaging; git rebase -i xbmc-packaging/master
```
3. during rebase make sure only your own commits are picked, then squash (s) all down to 1
4. Force push
```
git push -f origin yourbranch
```
