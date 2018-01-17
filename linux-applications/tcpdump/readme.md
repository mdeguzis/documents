# About

notes on tcpdump

# Basic Usage To Capture TCP data

```
tcpdump -i <INTERFACE> port <PORT>
```

# Reading UDP data

configured it to listen on its default port 8125 and then used netcat to send UDP packets to see if it was working like so:

```
echo -n "blah:36|c" | nc -w 1 -u -4 localhost 8125
```

We used tcpdump to capture any UDP packets on port 8125 like so:

```
tcpdump -i lo udp port 8125 -vv -X
```

To briefly explain the options we passed to it:

* `-i` lo only captures packets on the local loopback i.e. packets sent to localhost
udp means that only UDP packets will be captured. Other types of packets we might capture could be tcp or icmp for example.
* `-vv` just gives us more verbose output
* `-X` prints out the data in the UDP packets in ASCII as well as hex. If we just wanted the latter we could use the -x option

This is what one of the messages received by tcpdump looks like:

```
13:16:40.317636 IP (tos 0x0, ttl 64, id 58103, offset 0, flags [DF], proto UDP (17), length 37)
    localhost.48358 > localhost.8125: [bad udp cksum 7c8f!] UDP, length 9
	0x0000:  4500 0025 e2f7 4000 4011 59ce 7f00 0001  E..%..@.@.Y.....
	0x0010:  7f00 0001 bce6 1fbd 0011 fe24 626c 6168  ...........$blah
	0x0020:  3a33 367c 63                             :36|c
```

The last three lines of this output detail the IP header, UDP header and the data in the packet.

Source: http://www.markhneedham.com/blog/2012/07/15/tcpdump-learning-how-to-read-udp-packets/
