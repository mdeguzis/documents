<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Processes and Ports](#processes-and-ports)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Processes and Ports

$# Linux Find Out Which Process Is Listening Upon a Port
You can the following programs to find out about port numbers and its associated process:

* netstat command or ss command – a command-line tool that displays network connections, routing tables, and a number of network interface statistics.
* fuser command – a command line tool to identify processes using files or sockets.
* lsof command – a command line tool to list open files under Linux / UNIX to report a list of all open files and the processes that opened them.
* /proc/$pid/ file system – Under Linux /proc includes a directory for each running process (including kernel processes) at /proc/PID, containing information about that process, notably including the processes name that opened port.
