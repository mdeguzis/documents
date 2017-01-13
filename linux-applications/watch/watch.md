
watch is used to run any designated command at regular intervals. It displays its output on a console (i.e., all-text mode display) or terminal window (i.e., a window in a GUI that emulates a console) that is temporarily cleared of all other content (i.e., prompts, commands and results of commands). This makes it easy to observe the changing output of a command over time.

The basic syntax of watch is

```
watch [option(s)] command
```

When used without any of its few options, watch executes the specified command every two seconds. The command can include any options and arguments (i.e., file names or other input data) that would normally be used with it. The top line in the output includes the frequency of the reports, the command inclusive of any options and arguments, and the current date and time.

The time interval between reports can be changed from its default two seconds by using the -n option followed by an integer which represents the desired number of seconds. For example, memory usage in megabytes can be monitored with the free command using its -m option and the latest values will reported every five seconds:

```
watch -n 5 free -m
```

The `-d`, or `--difference`, option will highlight the differences between successive updates. Following this by =cumulative makes the highlighting sticky; that is, all positions that have ever changed remain highlighted.

Thus, for example, watch could be used with the ls command and its `-l` (i.e., long or verbose) option in either of the following to monitor changes in a directory named clients:

```
watch -d ls -l clients

watch -d=cumulative ls -l clients
```

watch can also be employed for finer grained monitoring by using it with a pipeline of commands (i.e., two or more commands connected by pipes). The pipeline needs to be enclosed in quotes (either single or double) so that watch will act on the output of the entire pipeline (rather than act just on the first command in it and then pipe its output to the next command).

Thus, for example, the following could be used to monitor the creation and deletion of files which are owned by a user named janis and are in the current directory:

```
watch -d 'ls -l | fgrep janis'
```

Source: http://www.linfo.org/watch.html

watch will continue to run until it is terminated by simultaneously pressing the C and Control keys or by closing the terminal window or console.
