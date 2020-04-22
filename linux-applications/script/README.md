<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Clean up output](#clean-up-output)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Clean up output


```
cat MY_FILE | perl -pe 's/\e([^\[\]]|\[.*?[a-zA-Z]|\].*?\a)//g' | col -b > OUTPUT_FILE
```
See: 
* http://www.commandlinefu.com/commands/view/2318/fix-a-typescript-file-created-by-the-script-program-to-remove-control-characters
* https://unix.stackexchange.com/questions/86901/script-command-without-junk-character
