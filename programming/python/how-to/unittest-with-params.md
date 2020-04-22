<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Why?](#why)
- [Simple approach](#simple-approach)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Why?
There are times when you want to use the unittset framework for dynamic testing
or use the unittest framework for integration testing. In my case, I wanted
to use this for my integration tests. I only needed to pass username/password at
frist.

# Simple approach

This can be achieved using class attributes.
```

class TestOdd1(unittest.TestCase):
    NUMBER=1
    def runTest(self):
        """Assert that the item is odd"""
        self.assertTrue( self.NUMBER % 2 == 1, "Number should be odd")

class TestOdd2(TestOdd1):
    NUMBER=2

if __name__ == '__main__':
    unittest.main()

```

The unittesting will discover them automatically, so no need to create a suite.
If you want to avoid using a TestCase for base class, you can use multiple inheritance:
```
from unittest import TestCase, main

class TestOdd:
    def runTest(self):
        """Assert that the item is odd"""
        self.assertTrue( self.NUMBER % 2 == 1, "Number should be odd")

class TestOdd1(TestOdd, TestCase):
    NUMBER=1
class TestOdd2(TestOdd, TestCase):
    NUMBER=2

if __name__ == '__main__':
    main()
```

If you have aruments from argparse of variables you have set dynamically, usage is something like this:
```
if x == 1:
    var = 'hi'
else:
    var = 'hello'

class TestOdd1(TestOdd, TestCase):
    var=var
```
This kind of "scoping" in a way seems to work fine for most use-cases

# Links
* https://stackoverflow.com/questions/17260469/instantiate-python-unittest-testcase-with-arguments
