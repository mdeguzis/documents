<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Variables](#variables)
  - [Get basename of filepath](#get-basename-of-filepath)
  - [Strip dir trailing slash if user adds one](#strip-dir-trailing-slash-if-user-adds-one)
- [Makefiles](#makefiles)
  - [Setting variables](#setting-variables)
- [Tips and tricks](#tips-and-tricks)
  - [Filtering out a CFLAG/CXXFLAG](#filtering-out-a-cflagcxxflag)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Use info for GNU 'make'

# Variables

 * [Assignment and definition](http://www.gnu.org/software/make/manual/html_node/Flavors.html#Flavors)

## Get basename of filepath
```
CONFIG_BASENAME = $(addsuffix .cfg, $(basename $(notdir $(CONFIG))))
```

## Strip dir trailing slash if user adds one
```
TARGET_DIR := $(patsubst %/,%,$(TARGET_DIR))
```

# Makefiles

## Setting variables

Setting variables can be done a few ways, via shell, directly or expansion.

```
?=
:
::=
```

Documentation

* https://www.gnu.org/software/make/manual/html_node/Setting.html


# Tips and tricks

## Filtering out a CFLAG/CXXFLAG

In the Makefile where you want to overrides for the -Werror part of CFLAGS that will be removed in that Makefile, you can make use of the `filter-out` directive. aYou can even use this to override flags for a single target by using [target-specific variable values](http://www.gnu.org/software/make/manual/make.html#Target_002dspecific):

Example:
```
CFLAGS = -Werror

all: foo bar

foo:
        echo cc $(CFLAGS) -o $@

bar: CFLAGS := $(filter-out -Werror,$(CFLAGS))

bar:
        echo cc $(CFLAGS) -o $@
```
foo will be built with the default CFLAGS containing -Werror, but bar will be built without.
