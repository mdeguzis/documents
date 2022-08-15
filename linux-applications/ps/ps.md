<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Note on syntax](#note-on-syntax)
- [How to use ps command](#how-to-use-ps-command)
  - [Display all processes](#display-all-processes)
  - [Display process by user](#display-process-by-user)
  - [Show process by name or process id](#show-process-by-name-or-process-id)
  - [Sort process by cpu or memory usage](#sort-process-by-cpu-or-memory-usage)
  - [Display process hierarchy in a tree style](#display-process-hierarchy-in-a-tree-style)
  - [Display child processes of a parent process](#display-child-processes-of-a-parent-process)
  - [Display threads of a process](#display-threads-of-a-process)
  - [Display processes by human readable start time](#display-processes-by-human-readable-start-time)
  - [Change the columns to display](#change-the-columns-to-display)
  - [Display elapsed time of processes](#display-elapsed-time-of-processes)
  - [Turn ps into an realtime process viewer](#turn-ps-into-an-realtime-process-viewer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Use /proc for capturing commands properly!

For example, run:
```
vim --cmd "set pythonthreehome=/usr/bin/python3" /tmp/a 
```

Then check ps:
```
 ps -auwwx | grep vim
deguzim  52230  0.3  0.0 164936 12452 pts/0    S+   17:47   0:00 vim --cmd set pythonthreehome=/usr/bin/python3 /tmp/a   
```

They ideally need to use /proc/<PID>/cmdline:
```
$ for i in /proc/5348*/ 
do
    basename "$i"
    < $i/cmdline xargs -0 zsh -c 'printf "\t%q" "$0" "$@"'
    printf '\n'
done
```

Or just one PID:
```
cat /proc/53482/cmdline | xargs -0 zsh -c 'printf "\t%q" "$0" "$@"
```

Output:
```
53482
        vim     --cmd   set\ pythonthreehome=/apollo/env/envImprovement/python3.8       /tmp/a
```

This is a valid command:
```
vim     --cmd   set\ pythonthreehome=/apollo/env/envImprovement/python3.8       /tmp/a
```
                                           
                                           ># man printf
>%q     ARGUMENT is printed in a format that can be reused as shell input, escaping non-print‐
>          able characters with the proposed POSIX $'' syntax.

# Note on syntax

The ps command comes with an unusual set of 2 syntax styles. That is BSD and UNIX both. New users are often confused with and mis-interpret the two styles. So here is some basic info to get it clear before moving on.

Note : "ps aux" is not the same as "ps -aux". For example "-u" is used to show process of that user. But "u" means show detailed information.

BSD style - The options in bsd style syntax are not preceded with a dash.
```
ps aux
```

UNIX/LINUX style - The options in linux style syntax are preceded by a dash as usual.
```
ps -ef
```

It is okay to mix both the syntax styles on linux systems. For example "ps ax -f".
But in this post we shall mostly focus on the unix style syntax.

# How to use ps command

## Display all processes
The following command will give a full list of processes
```
$ ps ax
$ ps -ef
```
Pipe the output to "less" to make it scrollable.

Use the "u" option or "-f" option to display detailed information about the processes
```
$ ps aux
$ ps -ef -f
```

Why is the USER column not displaying my username, but showing others like root, www-data etc ?

For all usernames (including yours) if the length is greater than 8 characters then ps will fall back to show only the UID instead of username.


## Display process by user

To filter the processes by the owning user use the "-u" option followed by the username. Multiple usernames can be provided separated by a comma.
```
$ ps -f -u www-data
UID        PID  PPID  C STIME TTY          TIME CMD
www-data  1329  1328  0 09:32 ?        00:00:00 nginx: worker process
www-data  1330  1328  0 09:32 ?        00:00:00 nginx: worker process
www-data  1332  1328  0 09:32 ?        00:00:00 nginx: worker process
www-data  1377  1372  0 09:32 ?        00:00:00 php-fpm: pool a.localhost                                               
www-data  1378  1372  0 09:32 ?        00:00:00 php-fpm: pool a.localhost                                               
www-data  4524  2359  0 10:03 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  4527  2359  0 10:03 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  4528  2359  0 10:03 ?        00:00:00 /usr/sbin/apache2 -k start
```

## Show process by name or process id

To search the processes by their name or command use the "-C" option followed by the search term.
```
$ ps -C apache2
  PID TTY          TIME CMD
 2359 ?        00:00:00 apache2
 4524 ?        00:00:00 apache2
 4525 ?        00:00:00 apache2
```

To display processes by process id, use the "-p" option and provides the process ids separated by comma.
```
$ ps -f  -p 3150,7298,6544
```

The "-C" must be provided with the exact process name and it cannot actually search with a partial name or wildcard. To search the process list more flexibly, the usual grep command has to be used

```
$ ps -ef | grep apache
```

## Sort process by cpu or memory usage

System administrators often want to find out processes that are consuming lots of memory or CPU. The sort option will sort the process list based on a particular field or parameter.

Multiple fields can be specified with the "--sort" option separated by a comma. Additionally the fields can be prefixed with a "-" or "+" symbol indicating descending or ascending sort respectively. There are lots of parameters on which the process list can be sorted. Check the man page for the complete list.

```
$ ps aux --sort=-pcpu,+pmem
```

Display the top 5 processes consuming most of the cpu.

```
$ ps aux --sort=-pcpu | head -5
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  2.6  0.7  51396  7644 ?        Ss   02:02   0:03 /usr/lib/systemd/systemd --switched-root --system --deserialize 23
root      1249  2.6  3.0 355800 30896 tty1     Rsl+ 02:02   0:02 /usr/bin/X -background none :0 vt01 -nolisten tcp
root       508  2.4  1.6 248488 16776 ?        Ss   02:02   0:03 /usr/bin/python /usr/sbin/firewalld --nofork
silver    1525  2.1  2.3 448568 24392 ?        S    02:03   0:01 /usr/bin/python /usr/share/system-config-printer/applet.py
```

## Display process hierarchy in a tree style
Many processes are actually forked out of some parent process, and knowing this parent child relationship is often helpful. The '--forest' option will construct an ascii art style tree view of the process hierarchy.

The following command will search for processes by the name apache2 and construct a tree and display detailed information.

```
$ ps -f --forest -C apache2
UID        PID  PPID  C STIME TTY          TIME CMD
root      2359     1  0 09:32 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  4524  2359  0 10:03 ?        00:00:00  \_ /usr/sbin/apache2 -k start
www-data  4525  2359  0 10:03 ?        00:00:00  \_ /usr/sbin/apache2 -k start
www-data  4526  2359  0 10:03 ?        00:00:00  \_ /usr/sbin/apache2 -k start
www-data  4527  2359  0 10:03 ?        00:00:00  \_ /usr/sbin/apache2 -k start
www-data  4528  2359  0 10:03 ?        00:00:00  \_ /usr/sbin/apache2 -k start
```

Try not to use any sorting with the tree style display, as they both effect the order of display in different ways.

## Display child processes of a parent process

Here is an example of finding all forked apache processes.

```
$ ps -o pid,uname,comm -C apache2
  PID USER     COMMAND
 2359 root     apache2
 4524 www-data apache2
 4525 www-data apache2
 4526 www-data apache2
 4527 www-data apache2
 4528 www-data apache2
```

The first process that is owned by root is the main apache2 process and all other apache2 processes have been forked out of this main process. The next command lists all child apache2 processes using the pid of the main apache2 process

```
$ ps --ppid 2359
  PID TTY          TIME CMD
 4524 ?        00:00:00 apache2
 4525 ?        00:00:00 apache2
 4526 ?        00:00:00 apache2
 4527 ?        00:00:00 apache2
 4528 ?        00:00:00 apache2
```

## Display threads of a process

The "-L" option will display the threads along with the processes. It can be used to display all threads of a particular process or all processes.

The following command shall display all the threads owned by the process with id 3150.

```
$ ps -p 3150 -L
```

## Display processes by human readable start time

```
ps -eo pid,lstart,cmd
```

## Change the columns to display

The ps command can be configured to show a selected list of columns only. There are a large number of columns to to show and the full list is available in the man pages.

The following command shows only the pid, username, cpu, memory and command columns.

```
$ ps -e -o pid,uname,pcpu,pmem,comm
```

It is possible to rename the column labels

```
$ ps -e -o pid,uname=USERNAME,pcpu=CPU_USAGE,pmem,comm
  PID USERNAME CPU_USAGE %MEM COMMAND
    1 root           0.0  0.0 init
    2 root           0.0  0.0 kthreadd
    3 root           0.0  0.0 ksoftirqd/0
    4 root           0.0  0.0 kworker/0:0
    5 root           0.0  0.0 kworker/0:0H
    7 root           0.0  0.0 migration/0
    8 root           0.0  0.0 rcu_bh
    9 root           0.0  0.0 rcuob/0
   10 root           0.0  0.0 rcuob/1
```

Quite flexible.

## Display elapsed time of processes

The elapsed time indicates, how long the process has been running for. The column for elapsed time is not shown by default, and has to be brought in using the "-o" option

```
$ ps -e -o pid,comm,etime
```

## Turn ps into an realtime process viewer

As usual, the watch command can be used to turn ps into a realtime process reporter. Simple example is like this

```
$ watch -n 1 'ps -e -o pid,uname,cmd,pmem,pcpu --sort=-pmem,-pcpu | head -15'
```
The output on my desktop is something like this.

```
Every 1.0s: ps -e -o pid,uname,cmd,pmem,pcpu --...  Sun Dec  1 18:16:08 2013

  PID USER     CMD                         %MEM %CPU
 3800 1000     /opt/google/chrome/chrome -  4.6  1.4
 7492 1000     /opt/google/chrome/chrome -  2.7  1.4
 3150 1000     /opt/google/chrome/chrome    2.7  2.5
 3824 1000     /opt/google/chrome/chrome -  2.6  0.6
 3936 1000     /opt/google/chrome/chrome -  2.4  1.6
 2936 1000     /usr/bin/plasma-desktop      2.3  0.2
 9666 1000     /opt/google/chrome/chrome -  2.1  0.8
 3842 1000     /opt/google/chrome/chrome -  2.1  0.8
 4739 1000     /opt/google/chrome/chrome -  1.8  1.0
 3930 1000     /opt/google/chrome/chrome -  1.7  1.0
 3911 1000     /opt/google/chrome/chrome -  1.6  0.6
 3645 1000     /opt/google/chrome/chrome -  1.5  0.4
 3677 1000     /opt/google/chrome/chrome -  1.5  0.4
 3639 1000     /opt/google/chrome/chrome -  1.4  0.4
```

The output would be updated every 1 second to refresh the stats. However do not think that this is similar to top.
You would notice that the output of top/htop command changes much more frequently compared to the above ps command.
This is because the top output sorts on a value that is a mix of cpu usage and memory usage. But the above ps command sorts in a more simpler manner, taking 1 column at a time (like school maths). So it would not update rapidly like top.

Source: http://www.binarytides.com/linux-ps-command/
