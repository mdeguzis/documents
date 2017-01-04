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

# Useful links

* [Screen and tmux commands comparison](http://hyperpolyglot.org/multiplexers)
