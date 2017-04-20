<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Editing](#editing)
  - [Indenting a block of text](#indenting-a-block-of-text)
- [Movement](#movement)
  - [Panes](#panes)
- [Tips and tricks](#tips-and-tricks)
  - [Clipboard support](#clipboard-support)
  - [Editing](#editing-1)
  - [Maps](#maps)
  - [Clearning settings](#clearning-settings)
  - [Searching](#searching)
- [Distro specific](#distro-specific)
  - [Arch Linux](#arch-linux)
- [Key links](#key-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful notes on VIM

# Editing

## Indenting a block of text

In normal mode, type `>>` to indent the current line, or `<<` to unindent. Each command can be used with a count. The operators `> `and `<` do the same for motions, text objects and visual selections. For all commands, pressing . repeats the operation.

For example, typing `5>>`.. shifts five lines to the right, and then repeats the operation twice so that the five lines are shifted three times. 

# Movement

## Panes

* Ctrl-W, s will create a horizontal split.
* Ctrl-W, v will create a vertical split.
* Ctrl-W, direction will allow you to move among the panes.
* :ls will show your open buffers.
:kb <number> will open the specified buffer in the current pane.. 

':q' to exit help.

# Tips and tricks

## Clipboard support

If your copy of vim was not compiled with fancy features, such as clipboard support, try gvim. You can then read about accessing the [system registers](http://vimcasts.org/episodes/accessing-the-system-clipboard-from-vim/) to use copy/paste between windows.


The following will work only if vim --version indicates that you have +xterm_clipboard feature. If not, you will have to install extra packages or recompile vim with that feature added.

There are actually two options for this:

`"+y`  
copies to the "usual" clipboard buffer (so you can paste using Ctrl+V, right click and select "Paste" etc), while

`"*y`  
copies to the X11 selection - you can paste from this buffer using middle click.

Note that "* and "+ work both ways. So if you have selected some text in another application, you can paste it into vim using "*p and if you have copied some text (using, say, Ctrl-C) then you can paste it into vim using "+p.

## Editing

`Vp`  
Select line and paste overtop of tline with what is in buffer from yank.

## Maps

Check the current maps (command mode)
```
maps
```

## Clearning settings

* unset settings with `<command> :no<setting>`

## Searching

To turn off highlighting until the next search:
```
:noh
```

Or turn off highlighting completely:
```
set nohlsearch
```

Or, to toggle it:
```
set hlsearch!
```

## json

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

See: http://visibletrap.blogspot.com/2010/05/vim-how-to-format-and-syntax-highlight.html
See: http://dustinmartin.net/format-json-in-vim/

# Distro specific

## Arch Linux

* `/etc/vimrc` loads  a default settings template from `/usr/share/vim/vimfiles/archlinux.vim` using the `runtime! archlinux.vim` parameter.

# Key links

* [vimrc guide](https://dougblack.io/words/a-good-vimrc.html)
* [Notes on folder](http://vim.wikia.com/wiki/Folding)
* [Things About Vim I Wish I Knew Earlier](http://blog.petrzemek.net/2016/04/06/things-about-vim-i-wish-i-knew-earlier/)
* [Vim cheat-sheet](http://vim.rtorr.com/)
* [Vim anti-patterns](https://sanctum.geek.nz/arabesque/vim-anti-patterns/)
* [Vim modes](https://en.wikibooks.org/wiki/Learning_the_vi_Editor/Vim/Modes)
