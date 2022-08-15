<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Obtain UNIX epoch time using bash](#obtain-unix-epoch-time-using-bash)
- [Converting UNIX epoch time to human readable time](#converting-unix-epoch-time-to-human-readable-time)
- [Converting EPOCH timestamp](#converting-epoch-timestamp)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Obtain UNIX epoch time using bash

Obtaining the UNIX epoch time using bash is easy. Use the build-in date command and instruct it to output the number of seconds since `1970-01-01 00:00:00 UTC`. You can do this by passing a format string as parameter to the date command. The format string for UNIX epoch time is `%s`.

```
lode@srv-debian6:~$ date "+%s"
1234567890
```

To convert a specific date and time into UNIX epoch time, use the `-d` parameter. The next example shows how to convert the timestamp "February 20th, 2013 at 08:41:15" into UNIX epoch time.

```
lode@srv-debian6:~$ date "+%s" -d "02/20/2013 08:41:15"
1361346075
```

# Get date with milliseconds:

```
date +%s%3N
```

On other OS's, like OSX, `%N` may not work, so you can use:
```
python -c 'import time; print(int(time.time() * 1000))'
```
https://serverfault.com/questions/151109/how-do-i-get-the-current-unix-time-in-milliseconds-in-bash

# Converting UNIX epoch time to human readable time
Even though I didn't find it in the date manual, it is possible to use the date command to reformat a UNIX epoch time into a human readable time. The syntax is the following:

```
lode@srv-debian6:~$ date -d @1234567890
Sat Feb 14 00:31:30 CET 2009
```

The same thing can also be achieved using a bit of perl programming:

```
lode@srv-debian6:~$ perl -e 'print scalar(localtime(1234567890)), "\n"'
Sat Feb 14 00:31:30 2009
```

Please note that the printed time is formatted in the timezone in which your Linux system is configured. My system is configured in UTC+2, you can get another output for the same command.

Source: [vanstechelman.eu](https://www.vanstechelman.eu/linux/time-conversion-using-bash)

# Converting EPOCH timestamp

This particular timestamp is in milliseconds since the epoch, not the standard seconds since the epoch. Divide by 1000:

For example, "1516134388611"
```
date -d @$((1516134388611/1000))
```

Explanation:

```
$ date
Tue Jan 16 18:48:38 EST 2018

# This will give you the number of milliseconds since the epoch - current seconds plus the left three of the nanoseconds.
$ date +%s%N | cut -b1-13
1516146530679

# Or this (dividing by 1000 only brings to microseconds)
echo $(($(date +%s%N)/1000000))
1516146530679

$ date -d @$((1516146530679/1000))
Tue Jan 16 18:48:50 EST 2018
```

Source: https://serverfault.com/a/151112
