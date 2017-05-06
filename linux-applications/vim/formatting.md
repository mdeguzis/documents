<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [json](#json)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# json

If your script/program dumps valid json, you can tee this to a log and use the `%!python -m json.tool` command to expand the structure into a more readable format.

Just execute the following with the JSON document open.

```
%!python -m json.tool
```

Now if you're like me you won't remember this in an hour so you can add it to your .vimrc file as a custom command like so:

```
command! FormatJSON %!python -m json.tool  
```

You can also do this from piped output:
```
Using json.tool from the shell to validate and pretty-print:

$ echo '{"json":"obj"}' | python -m json.tool
{
    "json": "obj"
}
$ echo '{1.2:3.4}' | python -mjson.tool
Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
```

Let's take a look at what's happening here. We can actually split the command above into the following parts:

`:` - Brings you from Normal Mode into Command-Line Mode. Vim now waits for you to enter a command.

`% `- A symbolic identifier to specify a range. % defines a range from the first to the last line of the current buffer. You could also specify line numbers like 2,5 which defines the range from line 2 to line 5. Another possible way to define a range is to use Visual Mode. Simply select your target lines and type :. This prepares the command line with '<,'>, which is the range definition for "Everything that has been visually selected".

`!` - Starting your command with ! lets you run any shell command from within Vim. Having a range selected before makes the shell using that as standard input stream.

`python -m json.tool` - The actual shell command. Here we run a Python library module json.tool that does the actual work for us. The output of this command is sent back to your Vim buffer once executed.

See: http://visibletrap.blogspot.com/2010/05/vim-how-to-format-and-syntax-highlight.html
See: http://dustinmartin.net/format-json-in-vim/
