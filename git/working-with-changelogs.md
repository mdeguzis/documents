# Creating
Uses dch

Example creatin:
```
dch --create -v 1.0 -M --package voglperf -D brewmaster
```

This tells dch to create the changelog, with the 1.0 initial verion, name it voglperf, and set the distribution to brewmaster.


Example increment
```
dch -i -v 1.0 -M --package voglperf -D brewmaster
```

In this example we are applying most of the same options but just incrementing the version
