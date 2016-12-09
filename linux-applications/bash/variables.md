<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Setting default variables](#setting-default-variables)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information and help on working with variables in bash.

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
