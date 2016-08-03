<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Errors](#errors)
  - [format not a string literal and no format argument](#format-not-a-string-literal-and-no-format-argument)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful notes about debugging C/C++ programs

# Errors

## format not a string literal and no format argument

Issue:
```
/tmp/buildd/ftequake-0.1.0+20160727git+bsos/engine/common/common.c: In function 'Sys_ErrorThread':
/tmp/buildd/ftequake-0.1.0+20160727git+bsos/engine/common/common.c:5072:2: error: format not a string literal and no format arguments [-Werror=format-security]
  Sys_Error(data);
  ^
cc1: some warnings being treated as errors
```

Fix:
```
Sys_Error(data);
Sys_Error("%s", data);
```

See: [printf](http://linux.die.net/man/3/printf)
