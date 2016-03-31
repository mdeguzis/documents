# About
Use notes on using make for compiling

# Speeding up compile time

It should be noted that you can prefix `./configure` with a [make](http://linux.die.net/man/1/make) flag, where N is the number of parallel builds. This will significantly speed up compile time. It is [suggested](http://www.makelinux.net/books/lkd2/ch02lev1sec3) to use a number 1 to 2x the # of cores you have. For more, also see [this article](http://www.math-linux.com/linux/tip-of-the-day/article/speedup-gnu-make-build-and-compilation-process).

Example:

Standard usage:

```
./configure
make -jN
```

If supported within the build:
```
MAKEFLAGS="-jN" ./configure
```

# Links

* [make](http://linux.die.net/man/1/make)
* [Speeding up compile time (math-linux)]((http://www.math-linux.com/linux/tip-of-the-day/article/speedup-gnu-make-build-and-compilation-process))
