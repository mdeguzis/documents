<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Compare two release numbers](#compare-two-release-numbers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Compare two release numbers
Compare if they are greater / less than etc..

```
$ python
Python 2.7.5 (default, May 31 2018, 09:41:32) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-28)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> from distutils.version import StrictVersion
>>> StrictVersion('1.10.0') > StrictVersion('1.9.0')
True
>>> StrictVersion('1.10.7') > StrictVersion('1.8.2')
True
```

https://stackoverflow.com/questions/1714027/version-number-comparison-in-python
