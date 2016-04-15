# Monitor progress with `[pv](http://linux.die.net/man/1/pv)`
This is a simple example:

```
pv -p archive.tar.gz | tar -xzf - -C /dir/to/extract/to
```

There are other ways to do this, but this will get you a simple progress bar. If you want more info, consider this example:

```
pv -s $(du file/folder) -p archive.tar.gz | tar -xzf - -C /dir/to/extract/to
```

-s is for the specific size
