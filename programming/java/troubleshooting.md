<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Threads](#threads)
  - [jstack](#jstack)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Topics about Java troubleshooting

# Threads

## jstack
Run jstack to gather thread debug information

Get the PID of <PROCESS>
```
ps -aux | grep <PROCESS>
hive      8592 18.0  2.7 23029232 7368308 ?    Sl   Jun23 9139:37 /etc/hadoop/java/bin/java -Xmx2048m -Dhdp.version=2.6.0.3-8 -Djava.net.preferIPv4Stack=true -Djavax.net.ssl.trustStore=/etc/pki/ja
```
  
sudo jstack -F 8592 > /tmp/hs2_jstack_1.txt
