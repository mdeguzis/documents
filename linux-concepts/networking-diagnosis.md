# Processes and Ports

$# Linux Find Out Which Process Is Listening Upon a Port
You can the following programs to find out about port numbers and its associated process:

* netstat command or ss command – a command-line tool that displays network connections, routing tables, and a number of network interface statistics.
* fuser command – a command line tool to identify processes using files or sockets.
* lsof command – a command line tool to list open files under Linux / UNIX to report a list of all open files and the processes that opened them.
* /proc/$pid/ file system – Under Linux /proc includes a directory for each running process (including kernel processes) at /proc/PID, containing information about that process, notably including the processes name that opened port.
