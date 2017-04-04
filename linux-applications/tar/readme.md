# About

GNU `tar' saves many files together into a single tape or disk archive, and can restore individual files from the archive.

# GZIP compression

You can specify either a number or the enviorment variable GZIP to specify compression/speed:

```
-# --fast --best
       Regulate the speed of compression using the specified digit #, where -1 or --fast indicates the fastest compression method (less compression) and -9 or --best indicates the slowest compression  method  (best  compres‐
       sion).  The default compression level is -6 (that is, biased towards high compression at expense of speed).
```

Example
```
# Using GZIP env var
env GZIP=-9 tar cvzf file.tar.gz /path/to/directory

# Using gzip # switch
tar cvf - /path/to/directory | gzip -9 - > file.tar.gz
```

# Links

* https://www.cyberciti.biz/howto/question/general/compress-file-unix-linux-cheat-sheet.php
