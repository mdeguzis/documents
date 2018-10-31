<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Tips and tricks](#tips-and-tricks)
  - [Reloading config](#reloading-config)
  - [Tmux window is small when resuming session](#tmux-window-is-small-when-resuming-session)
  - [Swap window positions](#swap-window-positions)
- [Useful links](#useful-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Notes regarding tmux, a terminal mulitplexer

# Sharing a tmux session

Sharing between two different accounts with tmux
For different users, you have to set the permissions on the tmux socket so that both users can read and write it. There is only one prerequiste, that there be a group in common between the two users. If such a group does not exist it will be necessary to create one.

In the first terminal, start tmux where shared is the session name and shareds is the name of the socket:
```
tmux -S /tmp/shareds new -s shared
```

Then chgrp the socket to a group that both users share in common. In this example, joint is the group that both users share. If there are other users in the group, then they also have access. So it might be recommended that the group have only the two members.

```
chgrp joint /tmp/shareds
```

In the second terminal attach using that socket and session.

```
tmux -S /tmp/shareds attach -t shared
```

That's it. The session can be made read-only for the second user, but only on a voluntary basis. The decision to work read-only is made when the second user attaches to the session.

tmux -S /tmp/shareds attach -t shared -r

See: https://www.howtoforge.com/sharing-terminal-sessions-with-tmux-and-screen

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
