<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes on tracing/debugging on Linux

* Data sources:
  * kprobes
  * uprobes
  * Tracepoints
  * lttng-ust
  * USDT / dtrace probes
  
* Mechanisms for collecting your delicious data:
  * ftrace
  * perf_events
  * eBPF
  * sysdig
  * Systemtap kernel module
  * LTTng
  
* User frontends:
  * perf
  * Various ftrace frontends (trace-cmd, catapult, kernelshark, perf-tools)
  * The bcc frontend for eBPF
  * LTTng & SystemTap frontends

# Links

* [Linux tracing systems & how they fit together](https://jvns.ca/blog/2017/07/05/linux-tracing-systems/)
* [Linux tracing systems & how they fit together (arhive.is)](http://archive.is/h0Hia)
