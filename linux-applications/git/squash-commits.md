<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Source:](#source)
    - [See also:](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Source:
https://github.com/ginatrapani/todo.txt-android/wiki/Squash-All-Commits-Related-to-a-Single-Issue-into-a-Single-Commit

The workflow of the Todo.txt Touch project says that the master branch of [ginatrapani/todo.txt-touch](https://github.com/ginatrapani/todo.txt-touch) is the golden branch from which all development is based off of.

In order to keep this easy to navigate, it is asked that you squash your commits down to a few, or one, discreet changesets before submitting a pull request. Fixing a bug will usually only need one commit, while a larger feature might contain a couple of separate improvements that is easier to track through different commits.

Once you have rebased your work on top of the latest state of the upstream master, you may have several commits related to the issue you were working on. Once everything is done, squash them into a single commit with a descriptive message, like "Issue #100: Retweet bugfix."

To squash four commits into one, do the following:

    $ git rebase -i HEAD~4

In the text editor that comes up, replace the words "pick" with "squash" next to the commits you want to squash into the commit before it. Save and close the editor, and git will combine the "squash"'ed commits with the one before it. Git will then give you the opportunity to change your commit message to something like, "Issue #100: Fixed retweet bug."

_**Important: If you've already pushed commits to GitHub, and then squash them locally, you will have to force the push to your branch.

    $ git push origin branch-name --force

Helpful hint: You can always edit your last commit message, before pushing, by using:

    $ git commit --amend

### See also:
[Git Book Chapter 6.4: Git Tools - Rewriting History](http://git-scm.com/book/en/Git-Tools-Rewriting-History)
