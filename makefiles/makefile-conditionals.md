# About
Describes using conditional statments in Makefiles / Debain rules files that use make.

## ifeq formatting

Conditional statements should be written without indention .If there is no indention, Make will treat it as a directive for itself; otherwise, it's regarded as a shell script.

Example code:

Wrong:
```
target:
    ifeq (foo, bar)
        ...
    endif

Correct:
```
target:
ifeq (foo, bar)
    ...
endif
```

# Links:
* []()
