# Clean up output


```
cat MY_FILE | perl -pe 's/\e([^\[\]]|\[.*?[a-zA-Z]|\].*?\a)//g' | col -b > OUTPUT_FILE
```
See: 
* http://www.commandlinefu.com/commands/view/2318/fix-a-typescript-file-created-by-the-script-program-to-remove-control-characters
* https://unix.stackexchange.com/questions/86901/script-command-without-junk-character
