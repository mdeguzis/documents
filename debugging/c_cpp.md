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
