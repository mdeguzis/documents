<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bash arrays](#bash-arrays)
- [Usage](#usage)
  - [Example1:](#example1)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bash arrays

Using arrays in Bash

# Usage

Note that you can append your variables into an existing string with `VAR+=("my_added_option")`. Otherwise, delcare you set of strings for the arrray, such as `declare -a ARRAY=("element1" "element2" "element3")`

## Example1:

```
## declare an array variable
declare -a arr=("element1" "element2" "element3")

## now loop through the above array
for i in "${arr[@]}"
do
   echo "$i"
   # or do whatever with individual element of the array
done

# You can access them using echo "${arr[0]}", "${arr[1]}" also
```

# Links

* [Building and using arrays (TLDP)](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html)
* [Arrays (TLDP)](http://tldp.org/LDP/abs/html/arrays.html)
