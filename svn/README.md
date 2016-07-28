# About

Some useful stuff about working with SVN.

# Quick commands

| command                  |         description           |
| -------------------------|-------------------------------|
|svn --help	               | List Subversion commands      |
|svn checkout URL          | clone/checkout source         |
|svn checkout -r [REV] URL | Checkout specific revision    |
|svn status	               | Show status of file changes in current directory and recursively in directories below.     |
|svn info	                 | Display information about directory / source tree     |
|svn update                | Migrate all updates from Subversion repository to your local copy      |


# Useful command combinations

Get the latest 5 revisions
```
svn log | grep -e ^r[0-9] | cut -d " " -f 1 | head -n 5
```

# Links

* [Man Page](http://svnbook.red-bean.com/en/1.4/svn.ref.svn.html)
* [Cheat Sheet (cheat-sheets.org)](http://www.cheat-sheets.org/saved-copy/subversion-cheat-sheet-v1.pdf)
