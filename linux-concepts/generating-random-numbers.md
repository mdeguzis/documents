# About
This page describes several methods of generating random numbers

# Using bash shell $RANDOM

To generate a random integer we can use the internal bash function $RANDOM.
This functions returns integer between and 32767.

Example:

```
$ i=$RANDOM
$ echo $i
23770
```

To generate a random integer between 1 and 1000, you can use $RANDOM like below:

```
$(((RANDOM%1000+1)))
```


# Using /dev/urandom and /dev/random

For bigger integer random generation we can use /dev/random and /dev/urandom which can interact with kernel’s random number generator. We will use the od command for that :

od : dump files in octal and other formats

we will use arguments :
* `-A` or `–address-radix=RADIX` : output format for file offsets; RADIX is one of [doxn], for Decimal, Octal, Hex or None
* `-N` or `–read-bytes=BYTES` : limit dump to BYTES input bytes
* `-t` or `–format=TYPE` : select output format or formats
* `-i` : select decimal ints

Example 1
```
od -An -N4 -i < /dev/urandom | sed 's/ //g'
```

Example 2
```
$ od  -An -N8 -tu8 < /dev/urandom
11055529178234849100

$ od -An -N4 -tu4 < /dev/random
3202521020
```
