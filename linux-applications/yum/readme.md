<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful commands](#useful-commands)
  - [List OS info vars](#list-os-info-vars)
  - [List repos](#list-repos)
  - [Check packages for a specific repo](#check-packages-for-a-specific-repo)
- [How to Use 'Yum History' to Find Out Installed or Removed Packages Info](#how-to-use-yum-history-to-find-out-installed-or-removed-packages-info)
    - [View Complete YUM History](#view-complete-yum-history)
    - [Use Yum to Find Package Info](#use-yum-to-find-package-info)
    - [Use Yum History to Find Package Transaction Info](#use-yum-history-to-find-package-transaction-info)
    - [Use Yum to Rollback Packages](#use-yum-to-rollback-packages)
    - [Find Yum History Database and Sources Info](#find-yum-history-database-and-sources-info)
- [FAQ](#faq)
  - [@ symbol in package list sources](#-symbol-in-package-list-sources)
- [Documents](#documents)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Some notes about yum

# Useful commands

## List OS info vars
```
python -c 'import yum, pprint; yb = yum.YumBase(); pprint.pprint(yb.conf.yumvar, width=1)'
{'arch': 'ia32e',
 'basearch': 'x86_64',
 'releasever': '7Server',
 'uuid': '40eb2a6a-d8af-4141-99f0-ad74d72f7e9d'}
```

## List repos
```
sudo yum repolist
```

## Check packages for a specific repo
```
sudo yum --disablerepo="*" --enablerepo="SOME_REPO" list available
```


# How to Use 'Yum History' to Find Out Installed or Removed Packages Info

YUM is an interactive, rpm based, high level package manager for **RHEL/CentOS** systems, it enables users to install new packages, remove/erase old/unwanted packages. It can automatically run system updates  and does dependency analysis, and also perform queries on the installed packages  and/or available packages plus so much more.

In this article, we will explain how to view history of YUM transactions in order to find out information about installed packages and those that where removed/erased from a system.

Below are some examples of how to use the YUM history command.

### View Complete YUM History

To view a full history of **YUM** transactions, we can run the command below which will show us the: transaction id, login user who executed the particular action, date and time when the operation happened, the actual action and additional information about any thing wrong with the operation:
    
    
    # yum history 
    

View Yum History

### Use Yum to Find Package Info

The history sub-commands: **info/list/summary** can take a transaction ID or package name as an argument. Additionally, the list sub-command can take a special argument, all meaning – all transactions.

The previous history command is equivalent to running:
    
    
    # yum history list all
    

And, you can view details of transactions concerning a given package such as `httpd` web server with the `info` command as follows:
    
    
    # yum history info httpd
    

Yum – Find Package Info

To get a summary of the transactions concerning `httpd` package, we can issue the following command:
    
    
    # yum history summary httpd
    


Yum – Find Summary of Package

It is also possible to use a transaction **ID**, the command below will display details of the transaction ID `15`.
    
    
    # yum history info 15
    

Yum – Find Package Info Using ID

### Use Yum History to Find Package Transaction Info

There are sub-commands that print out transaction details of a specific package or group of packages. We can use `package-list` or `package_info` to view more info about `httpd` package like so:
    
    
    # yum history package-list httpd
    OR
    # yum history package-info httpd
    

Yum – Find Package Transaction Info

To get history about multiple packages, we can run:
    
    
    # yum history package-list httpd epel-release
    OR
    # yum history packages-list httpd epel-release
    

Yum – Find Multiple Packages Info

### Use Yum to Rollback Packages

Furthermore, there are certain history sub-commands that enable us to: **undo/redo/rollback** transactions.

1. **Undo** – will undo a specified transaction.
2. **redo** – repeat the work of a specified transaction
3. **rollback** – will undo all transactions up to the point of the specified transaction.

They take either a single transaction id or the keyword last and an offset from the last transaction.

For example, assuming we've done 60 transactions, "**last**" refers to transaction **60**, and "**last-4**" points to transaction **56**.

This is how the sub-commands above work: If we have 5 transactions: V, W, X, Y and Z, where packages where installed respectively.
    
    
    # yum history undo 2    #will remove package W
    # yum history redo 2    #will  reinstall package W
    # yum history rollback 2    #will remove packages from X, Y, and Z. 
    

In the following example, transaction 2 was a update operation, as seen below, the **redo** command that follows will repeat transaction 2 upgrading all the packages updated by that time:
    
    
    # yum history | grep -w "2"
    

Yum – Find Package Transaction ID
    
    
    # yum history redo 2
    

Yum Redo Package Update

The **redo** sub-command can also take some optional arguments before we specify a transaction:

1. **force-reinstall** – reinstalls any packages that were installed in that transaction (via yum install, upgrade or downgrade).
2. **force-remove** – removes any packages that were updated or downgraded.
    
    
    # yum history redo force-reinstall 16
    

Yum – Force Install Package

### Find Yum History Database and Sources Info

These sub-commands provide us information about the history DB and additional info sources:

1. **addon-info** – will provide sources of additional information.
2. **stats** – displays statistics about the current history DB.
3. **sync** – enables us to alter the the rpmdb/yumdb data stored for any installed packages.

Consider the commands below to understand how these sub-commands practically work:
    
    
    # yum history addon-info
    # yum history stats
    # yum history sync
    

To set a new history file, use the new sub-command:
    
    
    # yum history new
    

We can find a complete information about YUM history command and several other commands in the yum man page:
    
    
    # man yum
    
[Source](https://www.tecmint.com/view-yum-history-to-find-packages-info/ "Permalink to How to Use 'Yum History' to Find Out Installed or Removed Packages Info")


# FAQ

## @ symbol in package list sources

Man page for yum says this under List Options -
>name.arch [epoch:]version-release repo or @installed-from-repo. 

It means that the particular package is either available on that repo or installed from that repo.

# Documents

* https://access.redhat.com/sites/default/files/attachments/rh_yum_cheatsheet_1214_jcs_print-1.pdf
* https://access.redhat.com/articles/yum-cheat-sheet
*
