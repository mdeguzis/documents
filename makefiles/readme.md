# About
Some tips regarding debian/rules

# How to create and use Makefiles
* [Using make and writing Makefiles (Sourceforge)](http://makepp.sourceforge.net/1.19/makepp_tutorial.html)
* [GNU make manual](https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents)
* [Using phony targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html)

# Determing theads/cores for make -j flags

Note:  
See [this article](http://www.math-linux.com/linux/tip-of-the-day/article/speedup-gnu-make-build-and-compilation-process) for more

Above override_dh_auto_configre:
```
# Set number of jobs explicitly
NB_CORES ?= $(shell grep -c '^processor' /proc/cpuinfo)
TOTAL_THREADS=$(shell expr $(NB_CORES) + 1 )
```

Inside the configure override:

```
override_dh_auto_configure:
	MAKEFLAGS="-j$(TOTAL_THREADS) -l$(TOTAL_THREADS)" ./configure
	```
