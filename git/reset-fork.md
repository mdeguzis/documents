# Source Link:
# http://stackoverflow.com/a/6103022/2187024

## add Remote
git remote add upstream /url/to/original/repo

## Pull upstream changes
git pull --rebase upstream master

## (Optional) Merge your commits into 1 commit
git reset --soft upstream/master

## commit all your changes in a single commit.
git commit -a

## Force push
git push -f origin master
