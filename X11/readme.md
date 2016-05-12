# Sudo with X11 (GUI)

To run a GUI command from a normal login prompt with elevated or different privileges, use the following (changing root here to the desired user):

```
sudo -u root env DISPLAY="$DISPLAY" XAUTHORITY="${XAUTHORITY-$HOME/.Xauthority}" <graphical command, sudo controlled>
```
