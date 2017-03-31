# How to

You can mount a tmpfs partititon and write the file there:

```
mount -t tmpfs -o size=500m tmpfs /mountpoint
```

This partition now is limited to 500 MB. If your temporary file grows larger than 500 MB an error will occur: no space left on device. But, it doesn't matter when you specify a larger amount of space than your systems RAM has. tmpfs uses swap space too, so you cannot force a system crash, as opposed to ramfs.

You can now write your file into /mountpoint:

```
command | tee /mountpoint/scriptnameYYYYMMDD.txt
```
