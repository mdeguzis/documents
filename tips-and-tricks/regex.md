<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Groups](#groups)
- [Rename](#rename)
- [Pattern matching examples](#pattern-matching-examples)
  - [Non-Capturing Group](#non-capturing-group)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Helpfull tips and tricks about regex (sed, perl, etc.)

# Groups

Well, groups serve many purposes. They can help you to extract exact information from a bigger match (which can also be named), 
they let you rematch a previous matched group, and can be used for substitutions. Let's try some examples, shall we?

Ok, imagine you have some kind of XML or HTML (be aware that regex may not be the best tool for the job, but it is nice as an example). 
You want to parse the tags, so you could do something like this (I have added spaces to make it easier to understand):

```
\<(?<TAG>.+?)\> [^<]*? \</\k<TAG>\>
```
or
```
\<(.+?)\> [^<]*? \</\1\>
```

The first regex has a named group (TAG), while the second one uses a common group. Both regexes do the same thing: they 
use the value from the first group (the name of the tag) to match the closing that. The difference is that the first one 
uses the name to use the value, and the second one uses the group index (which starts at 1).

Let's try some substitutions now. Consider the following text:

>Lorem ipsum dolor sit amet consectetuer feugiat fames malesuada pretium egestas.

Now, let's use the this dumb regex over it:

```
\b(\S)(\S)(\S)(\S*)\b
```

This regex matches words with at least 3 characters, and uses groups to separate the first three letters. The result is this:

```
Match "Lorem"
     Group 1: "L"
     Group 2: "o"
     Group 3: "r"
     Group 4: "em"
Match "ipsum"
     Group 1: "i"
     Group 2: "p"
     Group 3: "s"
     Group 4: "um"
```

And ...
```
Match "consectetuer"
     Group 1: "c"
     Group 2: "o"
     Group 3: "n"
     Group 4: "sectetuer"
```

So, if we apply the substitution string...

```
$1_$3$2_$4
```

... over it, we are trying to use the first group, add an underscore, use the third group, then the second group, 
add another underscore, and then the fourth group. The resulting string would be like the one below.

```
L_ro_em i_sp_um d_lo_or s_ti_ a_em_t c_no_sectetuer f_ue_giat f_ma_es m_la_esuada p_er_tium e_eg_stas.
```

You can use named groups for substitutions too, using ${name}.

To play around with regexes, I recommend http://regex101.com/, which offers a good amount of details on how the regex works; 
it also offers a few regex engines to choose from.

Source: [StackOverflow](http://stackoverflow.com/a/3513858/2187024)

# Rename

The default utils-linux rename is very basic. It cannot handle regex expressions. On Debian systems, rename, by default, is the perl-based versoin. 
On other systems, you may need to specifically replace/install the perl-based version. On Arch Linux, this would be the package `perl-reanem`

Example: say we want to turn `steamos-tools-beta-repo_1.0.1-1_all.deb` into `steamos-tools-beta-repo.deb` so the file can always be referenced with a raw link.

Debian
```
rename 's/_1(.*)0(.*)1(-*)1_all//g'
```

Arch Linux
```
perl-rename 's/_1(.*)0(.*)1(-*)1_all//g'
```

The parenthesis are called "groups." You can find more about them in the additional links below.

# Pattern matching examples

## Non-Capturing Group

Consider the following text:
```
http://stackoverflow.com/
http://stackoverflow.com/questions/tagged/regex
```

Now, if I apply the regex below over it...
```
(http|ftp)://([^/\r\n]+)(/[^\r\n]*)?
```

I would get the following result:

```
Match "http://stackoverflow.com/"
     Group 1: "http"
     Group 2: "stackoverflow.com"
     Group 3: "/"
```

```
Match "http://stackoverflow.com/questions/tagged/regex"
     Group 1: "http"
     Group 2: "stackoverflow.com"
     Group 3: "/questions/tagged/regex"
```

# Links

* [Regex 101](https://regex101.com/)
* [Regular-Expressions.info](www.regular-expressions.info)
* [Group matching (Regular-Expressions.info)](http://www.regular-expressions.info/refcapture.html)
