<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Decoding Performance](#decoding-performance)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Decoding Performance

There are some simple routines out there to benchmark JSON encoding/decoding with different libaries out there. 

I took 2 of these that had some nice tests and combined them into a Makefile:

```
git clone https://github.com/mdeguzis/python/tree/python2/json-benchmark
cd json-benchmark && make
make run
```

Most tests show that ujson is extremely fast, but chews up more memory on huge JSON datasets (simple structure):

Monitor:
```
watch "ps -p $(pgrep -f har-archiver.py) -o %cpu,%mem,cmd"
```
