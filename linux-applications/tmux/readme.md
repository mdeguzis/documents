<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Tips and tricks](#tips-and-tricks)
  - [Reloading config](#reloading-config)
  - [Tmux window is small when resuming session](#tmux-window-is-small-when-resuming-session)
- [Useful links](#useful-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes regarding tmux, a terminal mulitplexer

# Tips and tricks

## Reloading config

This can be done either from within tmux, by pressing Ctrl+B and then : to bring up a command prompt, and typing:

```
:source-file ~/.tmux.conf
```

Or simply from a shell:

```
$ tmux source-file ~/.tmux.conf
```

## Tmux window is small when resuming session

```
tmux attach -d
```

## Swap window positions

"Prefix :" (that is "Ctrl-B :" by default) brings you to the tmux-command prompt. There you enter:
```
swap-window -s 3 -t 1
```

# Useful links

* [Screen and tmux commands comparison](http://hyperpolyglot.org/multiplexers)
