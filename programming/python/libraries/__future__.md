<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Importing from future](#importing-from-future)
- [But why?](#but-why)
- [Links:](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

You can borrw from "[future](https://docs.python.org/2/library/__future__.html)" python. 

Syntax:
```
FeatureName = _Feature(OptionalRelease, MandatoryRelease,
                       CompilerFlag)
```

# Importing from future

**Example for print():**

In this example, the future print() is imported withouut arguments for the release. This imports print(), which is a required function under Python 3. See the table at the top of this section for more.

```
# import 'print()' from future to make this work with python 2
from __future__ import print_function

# example snippet
print("word[", start, ":", finish, "] is ", end= " ")

**Specify a final string to print***

# You can also work around this behaviro by using the 'strip()' funcion 
# on your strings.
```

# But why?

This servers 3 purposes:

* To avoid confusing existing tools that analyze import statements and expect to find the modules they’re importing.
* To ensure that future statements run under releases prior to 2.1 at least yield runtime exceptions (the import of __future__ will fail, because there was no module of that name prior to 2.1).
* To document when incompatible changes were introduced, and when they will be — or were — made mandatory. This is a form of executable documentation, and can be inspected programmatically via importing __future__ and examining its contents

# Links:

* [__future__ (python docs)](https://docs.python.org/2/library/__future__.html)

