<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [$VAR vs. ${VAR}](#var-vs-var)
- [Setting default variables](#setting-default-variables)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information and help on working with variables in bash.

# $VAR vs. ${VAR}

`VAR=$VAR1` is a simplified version of `VAR=${VAR1}`. There are things the second can do that the first can't, for instance reference an array index (not portable) or remove a substring (POSIX-portable). See the [More on variables section](http://tldp.org/LDP/Bash-Beginners-Guide/html/chap_10.html) of the Bash Guide for Beginners and [Parameter](http://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html#tag_02_06_02) Expansion in the POSIX spec.

Using quotes around a variable as in `rm -- "$VAR1" or rm -- "${VAR}"` is a good idea. This makes the contents of the variable an atomic unit. If the variable value contains blanks (well, characters in the `$IFS` special variable, blanks by default) or globbing characters and you don't quote it, then each word is considered for filename generation (globbing) whose expansion makes as many arguments to whatever you're doing.

```
$ find .
.
./*r*
./-rf
./another
./filename
./spaced filename
./another spaced filename
./another spaced filename/x
$ var='spaced filename'
# usually, 'spaced filename' would come from the output of some command and you weren't expecting it
$ rm $var
rm: cannot remove 'spaced': No such file or directory
# oops! I just ran 'rm spaced filename'
$ var='*r*'
$ rm $var
# expands to: 'rm' '-rf' '*r*' 'another spaced filename'

$ find .
.
./another
./spaced filename
./another spaced filename
$ var='another spaced filename'
$ rm -- "$var"
$ find .
.
./another
./spaced filename
```
On portability: According to POSIX.1-2008 section 2.6.2, the curly braces are optional.

Source: [Stack Exchange](http://unix.stackexchange.com/a/4900)

# Setting default variables

```
# Setting var
foo="${foo:=bar}"

# Results
$ echo "${foo:=bar}"
bar
$ foo=baz
$ echo "${foo:=bar}"
baz
$ foo=
$ echo "${foo:=bar}"
bar
$ echo "${foo}"
bar
```

Let's break this down into pieces.
This code runs the command : with some arguments. The command : does nothing and ignores its arguments. Therefore the whole command line does nothing, except whatever side effects happen in the arguments.

The syntax ${parameter_name:=value} exists in all non-antique Bourne-style shells, including ash, bash, ksh and zsh. It sets the parameter to a default if necessary. It is equivalent to

```
if [ -z "$parameter_name" ]; then parameter_name=value; fi
… ${parameter_name}
```

In other words, if parameter_name is not set or is set to an empty value, then set it to the indicated value; and then run the command, using the new parameter value. There is a variant, ${parameter_name=value}, which leaves the parameter empty if it was empty, only using the indicated value if the parameter was unset.

You'll find this syntax documented under “parameter expansion” in the POSIX spec, and the dash, bash, ksh and zsh manuals.

There are variations on this syntax, in particular ${parameter_name:-value} which let you use a default value for this expansion only, without assigning to the parameter.

In summary, : ${parameter_name:=value} is a concise way of writing

```
if [ -z "$parameter_name" ]; then parameter_name=value; fi
```

Source: [Stack Exchange](http://unix.stackexchange.com/questions/25425/what-does-param-value-mean)

# 

Say I want to dynamically assign a variable based on changing conditions. A use case may be that you want to run the same code in Jenkins
in parallel or sequentially, without changing / copying a ton of code.

```
export PY2_RPM_DEPS='python-requests'
export PY3_RPM_DEPS='python36-requests'
export PY='2'
eval echo \${PY${PY}_RPM_DEPS}
python36-requests
```

Another simple example:
```
export X7='blah'
export X9='bleh'
export Y='7'
eval echo \${X${Y}}
blah

export Y='9'
eval echo \${X${Y}}
bleh
```
