<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Text manipulation](#text-manipulation)
  - [Removing not-ASCII characters](#removing-not-ascii-characters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Tips and tricks for perl

# Text manipulation

## Removing not-ASCII characters
Ever hit an annoying box in your code (typically a diamond with a question mark in a GUI program)?

Try:
```
perl -p -e 's/[^[:ascii:]]//g' ~/testfile
```

Add `i` to replace as well in-place
```
perl -pi -e 's/[^[:ascii:]]//g' ~/testfile
```

The following explanation covers every part of the above command assuming the reader is unfamiliar with anything in the solution...

`perl`

run the perl interpreter. Perl is a programming language that is typically available on all unix like systems. This command needs to be run at a shell prompt.

`-p`

The -p flag tells perl to iterate over every line in the input file, run the specified commands (described later) on each line, and then print the result. It is equivalent to wrapping your perl program in while(<>) { /* program... */; } continue { print; }. There's a similar -n flag that does the same but omits the continue { print; } block, so you'd use that if you wanted to do your own printing.

`-i`

The -i flag tells perl that the input file is to be edited in place and output should go back into that file. This is important to actually modify the file. Omitting this flag will write the output to STDOUT which you can then redirect to a new file.

Note that you cannot omit -i and redirect STDOUT to the input file as this will clobber the input file before it has been read. This is just how the shell works and has nothing to do with perl. The  -i flag works around this intelligently.

Perl and the shell allow you to combine multiple single character parameters into one which is why we can use -pi instead of -p -i

The -i flag takes a single argument, which is a file extension to use if you want to make a backup of the original file, so if you used -i.bak, then perl would copy the input file to filename.bak before making changes. In this example I've omitted creating a backup because I expect you'll be using version control anyway :)

`-e`

The -e flag tells perl that the next argument is a complete perl program encapsulated in a string. This is not always a good idea if you have a very long program as that can get unreadable, but with a single command program as we have here, its terseness can improve legibility.

Note that we cannot combine the -e flag with the -i flag as both of them take in a single argument, and perl would assume that the second flag is the argument, so, for example, if we used -ie <program> <filename>, perl would assume <program> and <filename> are both input files and try to create <program>e and <filename>e assuming that e is the extension you want to use for the backup. This will fail as <program> is not really a file. The other way around (-ei) would also not work as perl would try to execute i as a program, which would fail compilation.

`s/.../.../`

This is perl's regex based substitution operator. It takes in four arguments. The first comes before the operator, and if not specified, uses the default of $_. The second and third are between the / symbols. The fourth is after the final / and is g in this case.
$_ In our code, the first argument is $_ which is the default loop variable in perl. As mentioned above, the -p flag wraps our program in while(<>), which creates a while loop that reads one line at a time (<>) from the input. It implicitly assigns this line to $_, and all commands that take in a single argument will use this if not specified (eg: just calling print; will actually translate to print $_;). So, in our code, the s/.../.../ operator operates once on each line of the input file.
[^[:ascii:]] The second argument is the pattern to search for in the input string. This pattern is a regular expression, so anything enclosed within [] is a bracket expression. This section is probably the most complex part of this example, so we will discuss it in detail at the end.
<empty string> The third argument is the replacement string, which in our case is the empty string since we want to remove all non-ascii characters.
g The fourth argument is a modifier flag for the substitution operator. The g flag specifies that the substitution should be global across all matches in the input. Without this flag, only the first instance will be replaced. Other possible flags are i for case insensitive matches, s and m which are only relevant for multi-line strings (we have single line strings here), o which specifies that the pattern should be precompiled (which could be useful here for long files), and x which specifies that the pattern could include whitespace and comments to make it more readable (but we should not write our program on a single line if that is the case).
filename

This is the input file that contains non-ascii characters that we'd like to strip out.
[^[:ascii:]]

So now let's discuss [^[:ascii:]] in more detail.

As mentioned above, [] in a regular expression specifies a bracket expression, which tells the regex engine to match a single character in the input that matches any one of the characters in the set of characters inside the expression. So, for example, [abc] will match either an a, or a b or a c, and it will match only a single character. Using ^ as the first character inverts the match, so [^abc] will match any one character that is not an a, b, or c.

But what about [:ascii:] inside the bracket expression?

If you have a unix based system available, run man 7 re_format at the command line to read the man page. If not, read the online version

[:ascii:] is a character class that represents the entire set of ascii characters, but this kind of a character class may only be used inside a bracket expression. The correct way to use this is [[:ascii:]] and it may be negated as with the abc case above or combined within a bracket expression with other characters, so, for example, [éç[:ascii:]] will match all ascii characters and also é and ç which are not ascii, and [^éç[:ascii:]] will match all characters that are not ascii and also not é or ç.

Source: https://stackoverflow.com/questions/3264915/remove-non-ascii-characters-in-a-file
