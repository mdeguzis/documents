<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Editing](#editing)
  - [Show everything that isn't whitespace](#show-everything-that-isnt-whitespace)
  - [Show line  breaks](#show-line--breaks)
  - [Indenting a block of text](#indenting-a-block-of-text)
- [Movement](#movement)
  - [Panes](#panes)
- [Security](#security)
  - [Password protect a file](#password-protect-a-file)
- [Tips and tricks](#tips-and-tricks)
  - [Clipboard support](#clipboard-support)
  - [Colors](#colors)
    - [Override colorscheme](#override-colorscheme)
  - [Editing](#editing-1)
  - [folding](#folding)
  - [Maps](#maps)
  - [Clearning settings](#clearning-settings)
  - [Searching](#searching)
    - [To turn off highlighting until the next search](#to-turn-off-highlighting-until-the-next-search)
    - [Searching multiple words](#searching-multiple-words)
  - [Tables](#tables)
  - [Setting up Tabular Editing in Vim](#setting-up-tabular-editing-in-vim)
- [Distro specific](#distro-specific)
  - [Arch Linux](#arch-linux)
- [Key links](#key-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful notes on VIM

# Editing

## Show everything that isn't whitespace
Useful for revealing hidden chars
```
:set listchars=eol:$,tab:>-,trail:~,extends:>,precedes:<
:set list
```
https://askubuntu.com/questions/74485/how-to-display-hidden-characters-in-vim

## Show line  breaks

:set list in Vim will show whitespace. End of lines show as '$' and carriage returns usually show as '^M'.
```
:set list
```

## Commenting out a block of text

Sometimes I'm shelled into a remote box where my plugins and .vimrc cannot help me, or sometimes NerdCommenter gets it wrong (eg JavaScript embedded inside HTML).

In these cases a low-tech alternative is the built-in norm command, which just runs any arbitrary vim commands at each line in your specified range. For example:

Commenting with #:

1. visually select the text rows (using V as usual)
2. `:norm i#`
This inserts `#` at the start of each line. Note that when you type `:` the range will be filled in, so it will really look like `:'<,'>norm i#`

Uncommenting #:

1. visually select the text as before (or type gv to re-select the previous selection)
2. :norm x
This deletes the first character of each line. If I had used a 2-char comment such as // then I'd simply do :norm xx to delete both chars.

If the comments are indented as in the OP's question, then you can anchor your deletion like this:

```
:norm ^x
```

which means "go to the first non-space character, then delete one character". Note that unlike block selection, this technique works even if the comments have uneven indentation!

Note: Since norm is literally just executing regular vim commands, you're not limited to comments, you could also do some complex editing to each line. If you need the escape character as part of your command sequence, type ctrl-v then hit the escape key (or even easier, just record a quick macro and then use norm to execute that macro on each line).

Note 2: You could of course also add a mapping if you find yourself using norm a lot. Eg putting the following line in `~/.vimrc` lets you type ctrl-n instead of :norm after making your visual selection

```
vnoremap <C-n> :norm
```

Note 3: Bare-bones vim sometimes doesn't have the norm command compiled into it, so be sure to use the beefed up version, ie typically /usr/bin/vim, not /bin/vi


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

# Security

## Password protect a file

Default encryption (weak)
```
:X
```

Stronger encryption
```
# Check existin encryption in vim
:setlocal cm?

# To set a encryption method
# The “blowfish2” encryption is best for security.
:setlocal cm=blowfish2
:setlocal cm=blowfish
:setlocal cm=zip


```

Source: [howtogeek](https://www.howtogeek.com/299546/how-to-password-protect-text-files-using-vim-on-linux-or-macos/)  
See also: http://vim.wikia.com/wiki/Encryption

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

## Colors

### Override colorscheme

 I want transparent background instead of the black background from the theme, while simply overriding the color after the colorscheme statement in .vimrc doesn't work and installing a plugin just for that is weird. Here is what I did:

```
autocmd ColorScheme * highlight Normal ctermbg=None
autocmd ColorScheme * highlight NonText ctermbg=None
autocmd ColorScheme * highlight Search cterm=NONE ctermfg=darkblue ctermbg=darkgreen
```

Why does it work? I guess that vim does something besides just read your colorscheme statement and load the statement and then read your highlight statement and change the color. Anyway it seems like vim only change the color scheme after reading the config files. So I provide a hook, that will change the colors every time the color scheme is changed. A nice side effect is, this works even if you switch your color scheme (you could do an if block if you want to).

Source: https://stackoverflow.com/a/7383051

## Editing

`Vp`  
Select line and paste overtop of tline with what is in buffer from yank.

`:-3,.d`  
If you want to delete 3 lines above and the current line (command only). You can also easily do this via visual mode `v` and then issued `dd`.

`%s/\s\+$//e`  
Remove trailing whitespace

## folding

If you put the lines:

```
set foldmethod=indent   
set foldnestmax=10
set nofoldenable
set foldlevel=2
```

as indicated in the link you gave, in your ~/.vimrc, you don't have to type them every time you want to use folding in a file. The set nofoldenable makes sure that when opening, files are "normal", i.e. not folded.

If you have trouble with indent, use:
```
set foldmethod=syntax
```

shareimprove this answer

Source: https://unix.stackexchange.com/questions/141097/how-to-enable-and-use-code-folding-in-vim

## Maps

Check the current maps (command mode)
```
maps
```

## Clearning settings

* unset settings with `<command> :no<setting>`

## Searching

### To turn off highlighting until the next search
```
:noh
```


Or turn off highlighting completely:
```
set nohlsearch
```

### Searching multiple words

There are two simple ways to highlight multiple words in vim editor.

* Go to search mode i.e. type `/` and then type `\v` followed by the words you want to search separated by `|` (pipe).
```
/\vword1|word2|word3
```
* Go to search mode and type the words you want to search separated by `\|.`
```
/word1\|word2\|word3earch!
```

## Tables

## Setting up Tabular Editing in Vim

Adjust your tab settings so you're editing with hard tabs:
```
:setlocal noexpandtab
```

Now, widen the columns enough so they're aligned:
```
:setlocal shiftwidth=20
:setlocal softtabstop=20
:setlocal tabstop=20
```

If you want to change this bahavior while in the editor:
```
set tabstop=4 softtabstop=0 expandtab shiftwidth=2 smarttab
```

To save this, make a session:
```
:mks /path/to/sess.vim (:mks! to overwrite if it exists)
```

Then to restore
```
:source /path/to/sess.vim
```

http://alangrow.com/blog/turn-vim-into-excel-tips-for-tabular-data-editing

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
