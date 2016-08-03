<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
  - [Delete Nth line(s) after match](#delete-nth-lines-after-match)
  - [delete n lines after match not including](#delete-n-lines-after-match-not-including)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Tips and tricks to remove lines, using `sed`

## Delete Nth line(s) after match

```
sed -e '/pattern/,+1d' file.txt
```

## delete n lines after match not including
```
sed -i '/match1/,+2d' filex
```
