<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [General](#general)
- [Python shell](#python-shell)
- [Pseudocode](#pseudocode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Just some tips and tricks / basics

# General

* Indentation is very important
* Indentation is how conditional statments are read and terminated

# Python shell

* Clear the screen with CTRL+L (It works for all shells e.g. Python, Bash, MySQL, MATLAB, etc)
* Alternate clear screen `import os;os.system('clear')`

# Pseudocode

Pseudocode is a way of planning and writing out your program in "plain language." Instead of writing actual code, you write our what you want the code to do:

```
Start program

get a list of mailboxes
get a list of recipients

run the email_delivery function with the mailbox and recipent arguments passed

check that email was delieverd correctly:

if the email is delivered to the expected mailbox, do this
	report that the mail is delivered

if the email is not delivered to the expected mailbox do this:
	report an error
	Ask maybe to try resending the email
```

If you are stumped, or want to draft out added functionality, pseudocode is a great way to plan it out.
