<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [brackets vs. parenthesis](#brackets-vs-parenthesis)
- [Example with floating decimals](#example-with-floating-decimals)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Comparing numbers in Bash

# brackets vs. parenthesis

Inside [[...]] < is for string comparison.

So [[ 3.56 < 2.90 ]] or [[ (3.56 < 2.90) ]] or [[ ((3.56 < 2.90)) ]] or [[ (((3.56 < 2.90))) ]]... is just comparing the 3.56 string with the 2.90 string.

For integer comparison, it's [[ 3 -lt 2 ]] or (( 3 < 2 )). If you want floating point comparison, you need ksh93 or zsh; bash can't do it.

# Example with floating decimals

```
#!/bin/bash
PHP_FPM_VER=$(/opt/rh/rh-php71/root/usr/sbin/php-fpm --version | head -n 1 | awk '{print $2}')
if (( $(echo "$PHP_FPM_VER < 5.6" | bc -l) )); then
        echo "php is too low"
else
        echo "PHP FPM version: $PHP_FPM_VER"
fi
```
