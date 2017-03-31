<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [IFS](#ifs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# IFS

IFS stands for "internal field separator". It is used by the shell to determine how to do word splitting, i. e. how to recognize word boundaries.

Try this in a shell like bash (other shells may handle this differently, for example zsh):

```
mystring="foo:bar baz rab"
for word in $mystring; do
  echo "Word: $word"
done
```

The default value for IFS consists of whitespace characters (to be precise: space, tab and newline). Each character can be a word boundary. So, with the default value of `IFS`, the loop above will print:

```
Word: foo:bar
Word: baz
Word: rab
```

In other words, the shell thinks that whitespace is a word boundary.

Now, try setting `IFS=:` before execting the loop. This time, the result is:

```
Word: foo
Word: bar baz rab
```

Now, the shell splits mystring into words as well -- but now, it only treats a colon as the word boundary.

The first character of `IFS` is special: It is used to delimit words in the output when using the special `$*` variable (example taken from the Advanced Bash Scripting Guide, where you can also find more information on special variables like that one):

```
$ bash -c 'set w x y z; IFS=":-;"; echo "$*"'
w:x:y:z
```

Compare to:

```
$ bash -c 'set w x y z; IFS="-:;"; echo "$*"'
w-x-y-z
```

Note that in both examples, the shell will still treat all of the characters `:,` `-` and `;` as word boundaries. The only thing that changes is the behaviour of $*.

Another important thing to know is how so-called "IFS whitespace" is treated. Basically, as soon as IFS includes whitespace characters, leading and trailing whitespace is stripped from the string to be split before processing it and a sequence of consecutive whitespace characters delimits fields as well. However, this only applies to those whitespace characters which are actually present in IFS.

For example, let's look at the string `"a:b:: c  d "` (trailing space and two space characters between `c` and `d`).

* With `IFS=:` it would be split into four fields: `"a"`, `"b", `""` (empty string) and `" c  d "` (again, two spaces between ``c and `d`). Note the leading and trailing whitespace in the last field. 
* With `IFS=' :'`, it would be split into five fields: `"a"`, `"b"`, `""` (empty string), `"c"` and `"d"`. No leading and trailing whitespace anywhere.

Note how multiple, consecutive whitespace characters delimit two fields in the second example, while multiple, consecutive colons don't (since they are not whitespace characters).

As for `IFS=$'\n'`, that is a `ksh93` syntax also supported by `bash`, `zsh`, `mksh` and FreeBSD `sh` (with variations between all shells). Quoting the bash manpage:

> Words of the form $'string' are treated specially. The word expands to "string", with backslash-escaped characters replaced as specified by the ANSI C standard.

`\n` is the escape sequence for a newline, so IFS ends up being set to a single newline character.


Source: [Stack Exchange](http://unix.stackexchange.com/a/184867)
