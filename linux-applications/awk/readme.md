# About

Useful notes and command examples for awk.

Short for "Aho, Weinberger, and Kernighan," AWK is an interpreted programming language which focuses on processing text.
AWK was developed in the 1970s at Bell Labs by Alfred Aho, Peter Weinberger, and Brian Kernighan. It was designed to execute complex pattern-matching operations on streams of textual data. It makes heavy use of strings, associative arrays, and regular expressions, and is immensely useful for parsing system data and generating automatic reports.

AWK is a direct predecessor of Perl, and is still very useful in modern systems. The GNU free software project distributes an open-source version of AWK called gawk.

# Syntax and usage

```
awk [ -F fs ] [ -v var=value ] [ 'prog' | -f progfile ] [ file ... ]
```

# Arguments

Argument | Description
---------|------------------------------
-F fs | Sets the input field separator to the regular expression fs.
-v var=value |Assigns the value value to the variable var before executing the awk program.
'prog' | An awk program.
-f progfile | Specify a file, progfile, which contains the awk program to be executed.
file ...| A file to be processed by the specified awk program.

# Overview

Awk scans each input file for lines that match any of a set of patterns specified literally in prog or in one or more files specified as -f progfile. With each pattern there can be an associated action that will be performed when a line of a file matches the pattern. Each line is matched against the pattern portion of every pattern-action statement; the associated action is performed for each matched pattern. The file name "-" (a dash) instructs awk to read from the standard input. The option -v followed by var=value is an assignment to be done before prog is executed; any number of -v options may be present. The -F fs option defines the input field separator to be the regular expression fs.

An input line is normally made up of fields separated by white space, or by regular expression fs. The fields are denoted $1, $2, ..., while $0 refers to the entire line. If fs is null, the input line is split into one field per character.

A pattern-action statement has the form

```
pattern { action } 
```

A missing { action } means print the line; if no pattern is specified, it will always match. Pattern-action statements are separated by newlines or semicolons.

An action is a sequence of statements. A statement can be one of the following:

```
If( expression ) statement [ else statement ]
while( expression ) statement
for( expression ; expression ; expression ) statement
for( var in array ) statement
do statement while( expression )
break
continue
{ [ statement ... ] }
expression
print [ expression-list ] [ > expression ]
printf format [ , expression-list ] [ > expression ]
return [ expression ]
```

skips remaining patterns on this input line
```
next
```

skips rest of this file, open next, start at top
```
nextfile
```

deletes an array element
```
delete array[ expression ]
```

deletes all elements of array
```
delete array
```

exits immediately; exit status is the evaluation of expression
```
exit [ expression ]
```

Statements are terminated by semicolons, newlines or right braces. An empty expression-list stands for $0. String constants are quoted " ", with the usual C escapes recognized within. Expressions take on string or numeric values as appropriate, and are built using the operators +, -, *, /, %, ^ (exponentiation), and concatenation (indicated by white space).

operators !, ++, --, +=, -=, *=, /=, %=, ^=, >, >=, <, <=, ==, !=, and ?: are also available in expressions. Variables may be scalars, array elements (denoted x[i]) or fields. Variables are initialized to the null string. Array subscripts may be any string, not necessarily numeric; this allows for a form of associative memory. Multiple subscripts such as [i,j,k] are permitted; the constituents are concatenated, separated by the value of SUBSEP.

The print statement prints its arguments on the standard output (or on a file if >file or >>file is present or on a pipe if |cmd is present), separated by the current output field separator, and terminated by the output record separator. file and cmd may be literal names or parenthesized expressions; identical string values in different statements denote the same open file. The printf statement formats its expression list according to the format (see printf). The built-in function close(expr) closes the file or pipe expr. The built-in function fflush(expr) flushes any buffered output for the file or pipe expr.

The mathematical functions exp, log, sqrt, sin, cos, and atan2 are built in. Other built-in functions:

function | Description
---------|------------------------------
length | the length of its argument taken as a string, or of $0 if no argument.
rand | random number between 0 and 1
srand | sets seed for rand and returns the previous seed.
int | truncates to an integer value
substr(s, m, n) | the n-character substring of s that begins at position m counted from 1.
index(s, t) | the position in s where the string t occurs, or 0 if it does not.
match(s, r) | the position in s where the regular expression r occurs, or 0 if it does not. The variables RSTART and RLENGTH are set to the position and length of the matched string.
split(s, a, fs) | splits the string s into array elements a[1], a[2], ..., a[n], and returns n. The separation is done with the regular expression fs or with the field separator FS if fs is not given. An empty string as field separator splits the string into one array element per character.
sub(r, t, s) | substitutes t for the first occurrence of the regular expression r in the string s. If s is not given, $0 is used.
gsub
same as sub except that all occurrences of the regular expression are replaced; sub and gsub return the number of replacements.
sprintf(fmt, expr, ... ) | the string resulting from formatting expr ... according to the printf format fmt
system(cmd) | executes cmd and returns its exit status
tolower(str) | returns a copy of str with all upper-case characters translated to their corresponding lower-case equivalents.
toupper(str) | returns a copy of str with all lower-case characters translated to their corresponding upper-case equivalents.

The function getline sets $0 to the next input record from the current input file; getline <file sets $0 to the next record from file. getline x sets variable x instead. Finally, cmd | getline pipes the output of cmd into getline; each call of getline returns the next line of output from cmd. In all cases, getline returns 1 for a successful input, 0 for end of file, and -1 for an error.

Patterns are arbitrary Boolean combinations (with ! || &&) of regular expressions and relational expressions. Regular expressions are as defined in re_format. Isolated regular expressions in a pattern apply to the entire line. Regular expressions may also occur in relational expressions, using the operators ~ and !~. /re/ is a constant regular expression; any string (constant or variable) may be used as a regular expression, except in the position of an isolated regular expression in a pattern.

A pattern may consist of two patterns separated by a comma; in this case, the action is performed for all lines from an occurrence of the first pattern though an occurrence of the second.

A relational expression is one of the following:

```
expression matchop regular-expression
expression relop expression
expression in array-name
(expr,expr,...) in array-name
```

....where a relop is any of the six relational operators in C, and a matchop is either ~ (matches) or !~ (does not match). A conditional is an arithmetic expression, a relational expression, or a Boolean combination of these.

The special patterns BEGIN and END may be used to capture control before the first input line is read and after the last. BEGIN and END do not combine with other patterns.

Variable names with special meanings:

Variable | Description
---------|------------------------------
CONVFMT | conversion format used when converting numbers (default: %.6g)
FS | regular expression used to separate fields; also settable by option -Ffs.
NF | number of fields in the current record
NR | ordinal number of the current record
FNR | ordinal number of the current record in the current file
FILENAME | the name of the current input file
RS | input record separator (default: newline)
OFS | output field separator (default: blank)
ORS | output record separator (default: newline)
OFMT | output format for numbers (default: %.6g)
SUBSEP | character to separate multiple subscripts (default: 034, which is the ASCII code for double quotes)
ARGC | argument count, assignable
ARGV | argument array, assignable; non-null members are taken as filenames
ENVIRON | array of environment variables; subscripts are names.

Functions may be defined (at the position of a pattern-action statement) like this:

```
function foo(a, b, c) { ...; return x }
```

Parameters are passed by value (if scalar) or by reference (if array name); functions may be called recursively. Parameters are local to the function; all other variables are global. Thus local variables may be created by providing excess parameters in the function definition.

# awk examples

**Print only lines of the file text.txt that are longer than 72 characters.**
```
awk 'length($0) > 72' text.txt
```

**Print first two fields of data in oppeosite order. For example, if the file data.txt contains the lines:**

red apple blue berry green thumb 
...then the output of the above awk command would be:
apple red berry blue thumb green 

```
awk '{ print $2, $1 }' data.txt
```

Most awk programs are too long to specify on the command line. If the program is saved in the file prog.awk, the command below:
```
awk -f prog.awk file.txt
```

....will execute the awk program in prog.awk to process the contents of file file.txt.

The remainder of the examples are just the awk programs themselves.

This program will add up first column of its input file, and print the sum and average of the values.
```
{ s += $1 }
END { print "sum is", s, " average is", s/NR }
```

This program will print all lines of text found between "start" and "stop".
```
/start/, /stop/
```

This awk program simulates the echo command.
```
BEGIN {
for (i = 1; i < ARGC; i++) printf "%s ", ARGV[i]
printf "\n"
exit }
```


# Links

* [Syntax and how to (computer hope)](http://www.computerhope.com/unix/uawk.htm)
