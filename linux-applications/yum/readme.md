<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful commands](#useful-commands)
- [FAQ](#faq)
  - [@ symbol in package list sources](#-symbol-in-package-list-sources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Some notes about yum

# Useful commands

## List repos
```
sudo yum repolist
```

## Check packages for a specific repo
```
sudo yum --disablerepo="*" --enablerepo="SOME_REPO" list available
```

# FAQ

## @ symbol in package list sources

Man page for yum says this under List Options -
>name.arch [epoch:]version-release repo or @installed-from-repo. 

It means that the particular package is either available on that repo or installed from that repo.

# Documents

* https://access.redhat.com/sites/default/files/attachments/rh_yum_cheatsheet_1214_jcs_print-1.pdf
* https://access.redhat.com/articles/yum-cheat-sheet
* 
