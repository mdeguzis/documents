<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [How to create and use Makefiles](#how-to-create-and-use-makefiles)
- [Determing theads/cores for make -j flags](#determing-theadscores-for-make--j-flags)
- [Variable assignments](#variable-assignments)
- [Setting targets](#setting-targets)
- [Printing vars in Makefiles](#printing-vars-in-makefiles)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
	
# Variable assignments

* [How to Use Variables (GNU)](https://ftp.gnu.org/old-gnu/Manuals/make-3.79.1/html_chapter/make_6.html)


**Lazy Set**

```
VARIABLE = value
Normal setting of a variable - values within it are recursively expanded when the variable is used, not when it's declared
```

**Immediate Set**

```
VARIABLE := value
Setting of a variable with simple expansion of the values inside - values within it are expanded at declaration time.
```

**Set If Absent**

```
VARIABLE ?= value
Setting of a variable only if it doesn't have a value
```

**Append**

```
VARIABLE += value
```

# Setting targets

General format to change prefix and destination directory:

```
$(MAKE) -C engine sv-rel -j4 DESTDIR=$(TOP) PREFIX=/usr install
```

`-C` tells `make` to run on a specific directory.


# Printing vars in Makefiles

```
$(info $$var is [${var}])
```

# Other Links

* [GNU Make](https://www.gnu.org/software/make/manual/make.html)
* [Automatic Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
* [Special Variables](https://www.gnu.org/software/make/manual/html_node/Special-Variables.html)
