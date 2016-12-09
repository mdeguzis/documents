<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Guides](#guides)
- [Video Guides](#video-guides)
- [General workflow](#general-workflow)
  - [Make sure I'm up to date with remote commits first to avoid conflicts](#make-sure-im-up-to-date-with-remote-commits-first-to-avoid-conflicts)
  - [Add those files](#add-those-files)
  - [Review your work before pushing to the remote repository](#review-your-work-before-pushing-to-the-remote-repository)
  - [Commit the files with a message](#commit-the-files-with-a-message)
  - [Push the changes](#push-the-changes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

The purpose of this page, is to layout the basics of using GitHub. Remember,  you _don't have to use GitHub to work with Git_. GitHub is social way to work with Git projects.

# Guides

I've come across a few very excellent guides for beginners. Rather than reinvent the wheel, here are some that I think are rather excellent at getting you aquainted to GitHub.

* [GitHub Guides (official)](https://guides.github.com/)
* [GitHub Guides - Hello World (official)](https://guides.github.com/activities/hello-world/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [git - the simple guide [PDF]](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)

# Video Guides

* [GitHub Guides Videos](https://www.youtube.com/user/GitHubGuides)

# General workflow

## Make sure I'm up to date with remote commits first to avoid conflicts
```
git fetch && git merge 
git pull works as well, but the former is better
```
You then change files you want, test, etc.

## Add those files
```
git add <FILE>
```
or 
```
git add .
```
The latter adds all files (if in the base directory of the repository, just be careful)
 
## Review your work before pushing to the remote repository
```
git status
```
## Commit the files with a message
```
git commit -m "MESSAGE"
```
## Push the changes
```
git push origin <BRANCH>
```
Usually the branch is "master," the default, but it could be any current branch you are working on. 
