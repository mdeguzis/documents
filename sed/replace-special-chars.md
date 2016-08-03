<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Replacing "|" pipe](#replacing-%7C-pipe)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
