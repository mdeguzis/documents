<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Multiple logical operators, `((A || B) && C)`](#multiple-logical-operators-a--b--c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Multiple logical operators, `((A || B) && C)`

The syntax of bash is not C-like, even if a little part of it is inspired by C. You can't simply try to write C code and expect it to work.

The main point of a shell is to run commands. The open-bracket command [ is a command, which performs a single test¹. You can even write it as test (without the final closing bracket). The || and && operators are shell operators, they combine commands, not tests.

So when you write

```
[ [ "$A" -eq "0" ] || [ "$B" -ne "0" ] ] && [ "$C" -eq "0" ]
```

that's parsed as

```
[ [ "$A" -eq "0" ] ||
[ "$B" -ne "0" ] ] &&
[ "$C" -eq "0" ]
```

which is the same as

```
test [ "$A" -eq "0" ||
test "$B" -ne "0" ] &&
test "$C" -eq "0"
```

Notice the unbalanced brackets? Yeah, that's not good. Your attempt with parentheses has the same problem: spurious brackets.

The syntax to group commands together is braces. The way braces are parsed requires a complete command before them, so you'll need to terminate the command inside the braces with a newline or semicolon.

```
if { [ "$A" -eq "0" ] || [ "$B" -ne "0" ]; } && [ "$C" -eq "0" ]; then …
```
There's an alternative way which is to use double brackets. Unlike single brackets, double brackets are special shell syntax. They delimit conditional expressions. Inside double brackets, you can use parentheses and operators like && and ||. Since the double brackets are shell syntax, the shell knows that when these operators are inside brackets, they're part of the conditional expression syntax, not part of the ordinary shell command syntax.

```
if [[ ($A -eq 0 || $B -ne 0) && $C -eq 0 ]]; then …
```
If all of your tests are numerical, there's yet another way, which delimit artihmetic expressions. Arithmetic expressions perform integer computations with a very C-like syntax.

```
if (((A == 0 || B != 0) && C == 0)); then …
```
You may find my bash bracket primer useful.

`[` can be used in plain sh. `[[` and `((` are specific to bash (and ksh and zsh).

¹ It can also combine multiple tests with boolean operators, but this is cumbersome to use and has subtle pitfalls so I won't explain it.

Source: https://unix.stackexchange.com/a/290296
