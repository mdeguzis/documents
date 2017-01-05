# About

List of default keybindings for tmux. Take not that to initiate a key sequence you must start with the <prefix>, which is `CTRL+B` by default, or `C-b` in "tmux-speak".

# Client

```
bind-key          C-b send-prefix
bind-key          C-z suspend-client
bind-key          r refresh-client
bind-key          : command-prompt
bind-key          # list-buffers
bind-key          = choose-buffer
bind-key          - delete-buffer
bind-key          $ command-prompt -I #S "rename-session '%%'"
bind-key          ? list-keys
bind-key          ( switch-client -p
bind-key          ) switch-client -n
bind-key          D choose-client
bind-key          L switch-client -l
bind-key          d detach-client
bind-key          s choose-tree
bind-key          t clock-mode
bind-key          i display-message
```

# Editing

```
bind-key          PPage copy-mode -u
bind-key          [ copy-mode
bind-key          ] paste-buffer
```

# Windows

````
bind-key          c new-window
bind-key          l last-window
bind-key          n next-window
bind-key          p previous-window
bind-key          w choose-window
bind-key          f command-prompt "find-window '%%'"
bind-key          C-o rotate-window
bind-key          M-n next-window -a
bind-key          M-o rotate-window -D
bind-key          M-p previous-window -a
bind-key          " split-window
bind-key          & confirm-before -p "kill-window #W? (y/n)" kill-window
bind-key          ' command-prompt -p index "select-window -t ':%%'"
bind-key          . command-prompt "move-window -t '%%'"
bind-key          , command-prompt -I #W "rename-window '%%'"
bind-key          0 select-window -t :0
bind-key          1 select-window -t :1
bind-key          2 select-window -t :2
bind-key          3 select-window -t :3
bind-key          4 select-window -t :4
bind-key          5 select-window -t :5
bind-key          6 select-window -t :6
bind-key          7 select-window -t :7
bind-key          8 select-window -t :8
bind-key          9 select-window -t :9
```

# Panes

```
bind-key          ; last-pane
bind-key          o select-pane -t :.+
bind-key          q display-panes
bind-key          x confirm-before -p "kill-pane #P? (y/n)" kill-pane
bind-key          z resize-pane -Z
bind-key          { swap-pane -U
bind-key          } swap-pane -D
bind-key          ! break-pane
bind-key          ~ show-messages
bind-key -r       Up select-pane -U
bind-key -r       Down select-pane -D
bind-key -r       Left select-pane -L
bind-key -r       Right select-pane -R
bind-key -r       M-Up resize-pane -U 5
bind-key -r       M-Down resize-pane -D 5
bind-key -r       M-Left resize-pane -L 5
bind-key -r       M-Right resize-pane -R 5
bind-key -r       C-Up resize-pane -U
bind-key -r       C-Down resize-pane -D
bind-key -r       C-Left resize-pane -L
bind-key -r       C-Right resize-pane -R
```

# Layout

```
bind-key         Space next-layout
bind-key         M-1 select-layout even-horizontal
bind-key         M-2 select-layout even-vertical
bind-key         M-3 select-layout main-horizontal
bind-key         M-4 select-layout main-vertical
bind-key         M-5 select-layout tiled
```
