### Summary

---

### Question 1

Build a HTTP admin server that can be accessed by remote team members, the server has confidential data and needs to be secured.

The hypothetical scenario starts off with a simple HTTP server, with additional requirements being added as candidate progresses:
- How can I allow access to only trusted entities?
- How do I setup ingress/outgress rules from this server?
- How would routing externally to the internet look like from this server?
- What about ingress rules? How do I limit access to only other team members that work remotely?
- What if I scale my admin server, how do I handle additional traffic?
- How would SSL termination work in this scenario? Do I have HTTPS on both LB and internal server?
- How do I triage and make sure I didn't blackhole inbound traffic to my server with my route table?
- How do I setup SSH access as well as HTTP access?
   - What do my other team members need to access this server via SSH?
   - How do I vend out my private keys in a secure fashion?
- Do I need a VPN in this scenario? How will remote colleagues access website?
- Why would you need a private subnet? What about a bastion host to access my admin server?

---

#### Candidate Response

| Topic | Candidate Knowledge |
| --- | --- |
| HTTPS | **STRONG** |
| Loadbalancer | **STRONG** |
| Private/Public Subnet | **STRONG** |
| VPC | **STRONG** |
| Bastion host | **STRONG** |
| Security group ingress/outgress | **STRONG** |
| NAT Gateway | **STRONG** |
| Internet Gateway | **STRONG** |
| SSH access | **STRONG** |
| Private Key | **STRONG** |
| Route Table | **STRONG** |
| TCP/IP | **STRONG** |
| DHCP | *MEDIUM* |

---

### Question 2

Given a DHCP lease file, create a script called `lease-search.sh` to search leases by IP, state, or MAC address:

```
lease 28.8.147.163 {
  starts 4 2020/05/14 01:01:18;
  ends 4 2020/05/14 01:01:34;
  tstp 4 2020/05/14 01:01:34;
  cltt 4 2020/05/14 01:01:18;
  binding state free;
  hardware ethernet 40:2c:76:2c:3b:78;
}
lease 28.6.45.190 {
  starts 4 2020/05/21 15:12:20;
  ends 4 2020/05/28 15:12:20;
  cltt 4 2020/05/21 15:12:20;
  binding state f;
  next binding state free;
  hardware ethernet 40:2c:76:27:55:55;
  client-hostname "ip-28-6-45-190";
}
```
---

#### Candidate Response

