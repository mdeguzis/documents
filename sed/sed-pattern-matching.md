<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Pattern Matching](#pattern-matching)
  - [Shell globbing](#shell-globbing)
  - [Match three letter reversal patterns:](#match-three-letter-reversal-patterns)
  - [Match a line that starts with an indented [TAB] `#` character, that also contains the word "changelog"](#match-a-line-that-starts-with-an-indented-tab-#-character-that-also-contains-the-word-changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Source: [cs.miami.edu](http://www.cs.miami.edu/home/burt/learning/Csc322.052/notes/pattern-matching.html)

# Pattern Matching

## Shell globbing

Pattern matching in the shell against filenames has metacharacters defined differently from the rest of unix pattern matching prgorams. * is match any character except whitespace, ? is match one character except whitespace. so *.c is match any filename ending with the two characters .c (this will list out all c source files in the directory, assuming the directory's owner is sane).

**grep, sed**

Table of metacharacters:

```
^ (caret) match beginning of line. Anchors match.
$ (dollar sign) match end of line. Anchors match.
. (dot) match any character. Beware, command line globbing uses ? instead.
* (star) matches zero or more of preceding chracters. Beware, command line uses * as in .*.
[] (square braces) set of characters inside braces, match any one of.
[^ ] (carat at first character inside braces), match any character except those inside braces
[a-z] (use of dash inside braces) match a range. If - is to be matched, must be first character, to avoid misinterpretation as range operator.
() {parenthesis, must be escaped with backslash), save match for later use with \n, where n is a number.
{m}, {m,} and {m,n} (braces, which must be escaped with a backslash), matched m, more than m, or between m and n repretitions of preceeding character.
& (ampersand) expands to the matched string, used in sed.
```

Grep, sed Flags for grep of note:
````
-i, case insensitive
-v, invert, select non-matching lines
-c, give count of matching lines.
```

Flags for sed of note:
```
-n, print the line only if forced to
-f, commands from a file

Sed commands:
```
form is [address][,address][!]command [arguments] You tend to have to enclose this in single quotes of the shell will demolish it. Or double quotes if you want shell variables expanded inside the mess.
No address: all lines; one address: lines matching address are processed; two addresses: first address starts processing, second address ends processiong.
Addresses can be line numbers, the dollar sign or a reg. exp enclosed in //.
example: s/a/b/g, substitute b for a, globally. Drop the g and you only substitute the first occurrance of a on a line. Add p with the g to print out the line, especially if you are using sed -n.
example: /but/d, delete any line that says "but", not buts allowed!



## Match three letter reversal patterns:

```
grep '\(.\)\(.\)\(.\)\3\2\1' web2
Subsitution using sed:
sed 's/^.*:\*:\([^:]*\).*$/\1/' /etc/passwd
Try to save old files in a subdirectory.
```

## Match a line that starts with an indented [TAB] `#` character, that also contains the word "changelog"

```
sed 's/^\t#.*changelog.*/test/g' file.txt
```
