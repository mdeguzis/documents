# How do I set/source/add global vars?

You can add it to the file .profile or .bashrc or your current shell profile file (located in your home directory). Then, each time you open your shell it will be loaded.

To change the environmental variable "permanently" you'll need to consider at least these situations:

1. Login/Non-login shell
2. Interactive/Non-interactive shell

##bash

1. Bash as login shell will load /etc/profile, ~/.bash_profile, ~/.bash_login, ~/.profile in the order
2. Bash as non-login interactive shell will load ~/.bashrc
3. Bash as non-login non-interactive shell will load the configuration specified in environment variable $BASH_ENV

```
$EDITOR ~/.bashrc
#add lines at the bottom of the file:  
     export LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib
     export ORACLE_HOME=/usr/lib/oracle/11.2/client64
zsh
$EDITOR ~/.zshrc
#add lines at the bottom of the file:  
     export LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib
     export ORACLE_HOME=/usr/lib/oracle/11.2/client64
ksh
$EDITOR ~/.profile
#add lines at the bottom of the file:  
     export LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib
     export ORACLE_HOME=/usr/lib/oracle/11.2/client64
bourne
$EDITOR ~/.profile
#add lines at the bottom of the file:  
     LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib     
     ORACLE_HOME=/usr/lib/oracle/11.2/client64
     export LD_LIBRARY_PATH ORACLE_HOME
csh or tcsh
$EDITOR ~/.login
#add lines at the bottom of the file:  
     setenv LD_LIBRARY_PATH /usr/lib/oracle/11.2/client64/lib
     setenv ORACLE_HOME /usr/lib/oracle/11.2/client64
```   
  
If you want to make it permanent for all users, you can edit /etc/profile or /etc/environment.
In this case follow the syntax you see already present in your file.

Source: [stackexchange](http://unix.stackexchange.com/a/117470)
