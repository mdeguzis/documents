<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Tips and tricks](#tips-and-tricks)
  - [Clearning settings](#clearning-settings)
  - [Searching](#searching)
- [Distro specific](#distro-specific)
  - [Arch Linux](#arch-linux)
- [Key links](#key-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful notes on VIM

# Tips and tricks

## Clipboard support

If your copy of vim was not compiled with fancy features, such as clipboard support, try gvim. You can then read about accessing the [system registers](http://vimcasts.org/episodes/accessing-the-system-clipboard-from-vim/) to use copy/paste between windows.

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

# Distro specific

## Arch Linux

* `/etc/vimrc` loads  a default settings template from `/usr/share/vim/vimfiles/archlinux.vim` using the `runtime! archlinux.vim` parameter.

# Key links

* [vimrc guide](https://dougblack.io/words/a-good-vimrc.html)
* [Notes on folder](http://vim.wikia.com/wiki/Folding)
* [Things About Vim I Wish I Knew Earlier](http://blog.petrzemek.net/2016/04/06/things-about-vim-i-wish-i-knew-earlier/)
* [VIM cheat-sheet](http://vim.rtorr.com/)
* [VIM anti-patterns](https://sanctum.geek.nz/arabesque/vim-anti-patterns/)
