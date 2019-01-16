# Write `jq` output to fill

Just calling jq will throw errors if stdout isn't a terminal

````
$ curl https://jsonplaceholder.typicode.com/posts/1 | jq > test.txt
jq - commandline JSON processor [version 1.5-1-a5b5cbe]
Usage: jq [options] <jq filter> [file...]

        jq is a tool for processing JSON inputs, applying the
        given filter to its JSON text inputs and producing the
[...]
```

Try `jq '.'` (i.e: pretty-print the input JSON):

```
$ curl https://jsonplaceholder.typicode.com/posts/1 | jq '.' > test.txt
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   292  100   292    0     0   1698      0 --:--:-- --:--:-- --:--:--  1707
```
