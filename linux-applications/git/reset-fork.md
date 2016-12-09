<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Source Link:](#source-link)
- [http://stackoverflow.com/a/6103022/2187024](#httpstackoverflowcoma61030222187024)
  - [add Remote](#add-remote)
  - [Pull upstream changes](#pull-upstream-changes)
  - [(Optional) Merge your commits into 1 commit](#optional-merge-your-commits-into-1-commit)
  - [commit all your changes in a single commit.](#commit-all-your-changes-in-a-single-commit)
  - [Force push](#force-push)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
