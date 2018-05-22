In practice, the number of TCP/IP connections is currently limited only by Operating System implementation, and Computer Hardware capabilities.

The TCP/IP standard sets up unique connection identifiers as the tuple of local IP Address, local TCP port number, remote IP address, and remote TCP port number. In your example, the local numbers are both fixed, which leaves approximately 232232 remote IP (version 4) addresses, and 216216 TCP port numbers, or an approximate total potential simultaneous TCP connections of 281,474,976,710,656 (248248, or 2.81 * 10141014, or 281 trillion).

Odds are good you run out of RAM for the TCP state data structures, or the buffer RAM for the data being moved before you hit that limit.

In practice, it depends on"

* how much Computer Hardware Performance you have (processing power & RAM),
* how your Operating System processes connections, i.e. what's the overhead in operating system data structures (e.g. for UNIX, file descriptors, mbufs, TCP connection state structures) and processing to keep track of and move data through TCP connections; and
whatever the RAM/processing requirements are of your actual network Application.

It's all highly OS & application dependent, and it's not clear to me how examples from any given application/OS/hardware combination that someone might cite can reasonably inform you for your own particular application.

https://www.quora.com/What-is-the-maximum-number-of-simultaneous-TCP-connections-achieved-to-one-IP-address-and-port
