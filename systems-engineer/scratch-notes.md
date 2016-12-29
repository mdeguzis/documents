# stripping new lines

* strip
* rstrip
* lstrip

str.strip() returns a string with leading+trailing whitespace removed, .lstrip and .rstrip for only leading and trailing respectively.

grades.append(lists[i].rstrip('\n').split(','))
http://stackoverflow.com/questions/4319236/remove-the-newline-character-in-a-list-read-from-a-file


# HDFS

removing folder

```
sudo -u hdfs hdfs dfs -rm -r /user/testuser1
```

if you SOMEHOW (like me) created a user dir witha  new line...

find it
```
 sudo -u hdfs hdfs dfs -find /user -name "*testuser1\n"
```

remove it
```
sudo -u hdfs hdfs dfs -rm -r /user/"*testuser1\n"
```
