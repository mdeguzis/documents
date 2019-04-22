<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Putting jobs in background](#putting-jobs-in-background)
- [bash for loop](#bash-for-loop)
- [GNU parallel](#gnu-parallel)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Putting jobs in background
The syntax is:

```
command &
command arg1 arg2 &
custom_function &

OR

prog1 &
prog2 &
wait
prog3
````

In above code sample, prog1, and prog2 would be started in the background, and the shell would wait until those are completed before starting the next program named progr3.


# bash for loop
```
#!/bin/bash
# Our custom function
cust_func(){
  echo "Do something $1 times..."
  sleep 1
}
# For loop 5 times
for i in {1..5}
do
	cust_func $i & # Put a function in the background
done
 
## Put all cust_func in the background and bash 
## would wait until those are completed 
## before displaying all done message
wait 
echo "All done"
```

# GNU parallel

```
$ cat list.txt | parallel -j 4 wget -q {}

OR

$ parallel -j 4 wget -q {} < list.txt
```

https://www.cyberciti.biz/faq/how-to-run-command-or-code-in-parallel-in-bash-shell-under-linux-or-unix/
