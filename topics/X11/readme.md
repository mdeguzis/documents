<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Sudo with X11 (GUI)](#sudo-with-x11-gui)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Sudo with X11 (GUI)

To run a GUI command from a normal login prompt with elevated or different privileges, use the following (changing root here to the desired user):

```
sudo -u root env DISPLAY="$DISPLAY" XAUTHORITY="${XAUTHORITY-$HOME/.Xauthority}" <graphical command, sudo controlled>
```
