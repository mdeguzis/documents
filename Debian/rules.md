# About
Some tips regarding debian/rules

## Determing theads/cores for make -j flags

```
NB_CORES=$(grep -c '^processor' /proc/cpuinfo)
export MAKEFLAGS="-j$((NB_CORES+1)) -l${NB_CORES}"
make
```
