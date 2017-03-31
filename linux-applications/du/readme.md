<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Show top level sizes](#show-top-level-sizes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes for using `du`

# Show top level sizes

```
# Using --max-depth
sudo du -h /var/* --max-depth=0 | sort -h

# Using wildcard expansion
sudo du -hs /var/* | sort -h
```
