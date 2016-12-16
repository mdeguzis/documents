<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [Match on only first occurence](#match-on-only-first-occurence)
  - [Delete Nth line(s) after match](#delete-nth-lines-after-match)
  - [delete n lines after match not including](#delete-n-lines-after-match-not-including)
- [Replacing "|" pipe](#replacing--pipe)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Match on only first occurence

```
sed '0,/Matched Keyword/s//Matched Keyword\nNew Inserted Line/' myfile.txt
```

## Delete Nth line(s) after match

```
sed -e '/pattern/,+1d' file.txt
```

## delete n lines after match not including
```
sed -i '/match1/,+2d' filex
```

# Replacing "|" pipe

Escape pipes with two slashes, `\\`

Original text
```
text with | command_here
```

command to replace "|" with this
```
sed "s|text with \\| command_here|text with this command_here|g"
```
