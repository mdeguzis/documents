The manual page does include information about exclude files under “FILTER RULES”. Man pages shouldn’t be read in haste. If you don’t read the ENTIRE man page, you will miss numerous references to some very clearly stated information.

```
–exclude=PATTERN
This option is a simplified form of the –filter option that defaults to an exclude rule and does not allow the full rule-parsing syntax of normal filter rules.See the FILTER RULES section for detailed information on this option.
```

FILTER RULES
The filter rules allow for flexible selection of which files to trans-
fer (include) and which files to skip (exclude). The rules either
directly specify include/exclude patterns or they specify a way to
acquire more include/exclude patterns (e.g. to read them from a file).

As the list of files/directories to transfer is built, rsync checks
each name to be transferred against the list of include/exclude pat-
terns in turn, and the first matching pattern is acted on: if it is an
exclude pattern, then that file is skipped; if it is an include pattern
then that filename is not skipped; if no matching pattern is found,
then the filename is not skipped.

Rsync builds an ordered list of filter rules as specified on the com-
mand-line. Filter rules have the following syntax:

RULE [PATTERN_OR_FILENAME]
RULE,MODIFIERS [PATTERN_OR_FILENAME]

You have your choice of using either short or long RULE names, as
described below. If you use a short-named rule, the ‘,’ separating the
RULE from the MODIFIERS is optional. The PATTERN or FILENAME that fol-
lows (when present) must come after either a single space or an under-
score (_). Here are the available rule prefixes:

exclude, – specifies an exclude pattern.  
include, + specifies an include pattern.  
merge, . specifies a merge-file to read for more rules.  
dir-merge, : specifies a per-directory merge-file.  
hide, H specifies a pattern for hiding files from the transfer.  
show, S files that match the pattern are not hidden.  
protect, P specifies a pattern for protecting files from dele-  
tion.  
risk, R files that match the pattern are not protected.  
clear, ! clears the current include/exclude list (takes no arg)  

When rules are being read from a file, empty lines are ignored, as are
comment lines that start with a “#”.

Note that the –include/–exclude command-line options do not allow the
full range of rule parsing as described above — they only allow the
specification of include/exclude patterns plus a “!” token to clear the
list (and the normal comment parsing when rules are read from a file).
If a pattern does not begin with “- ” (dash, space) or “+ ” (plus,
space), then the rule will be interpreted as if “+ ” (for an include
option) or “- ” (for an exclude option) were prefixed to the string. A
–filter option, on the other hand, must always contain either a short
or long rule name at the start of the rule.

Note also that the –filter, –include, and –exclude options take one
rule/pattern each. To add multiple ones, you can repeat the options on
the command-line, use the merge-file syntax of the –filter option, or
the –include-from/–exclude-from options.
[/snip]
