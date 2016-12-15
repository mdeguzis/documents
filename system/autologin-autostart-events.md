There is no guarantee that the graphical display manager will read the classic startup files. This changes between distributions and between display managers. One of the following should work though.

1. Use your desktop environment's native method to set startup applications. The details will depend on the DE you are using, but you can create a script that runs your command and add it to the list of startup applications. For example, on my system (Cinnamon), you can do this through "System Settings" => "Startup Applications".
2. Use ~/.xprofile, this is sourced by at least the GDM, LDM, LightDM and LXDM login managers.
3. If neither of the above work, try adding the command to ~/.profile : This is the main initialization file for login shells and is also read by some graphical shells on login.
3. You can also use the free desktop standards:

>The Autostart Directories are $XDG_CONFIG_DIRS/autostart as defined in accordance with the "Referencing this specification" section in the "desktop base directory specification".

>If the same filename is located under multiple Autostart Directories only the file under the most important directory should be used.

>Example: If $XDG_CONFIG_HOME is not set the Autostart Directory in the user's home directory is ~/.config/autostart/

>Example: If $XDG_CONFIG_DIRS is not set the system wide Autostart Directory is /etc/xdg/autostart/

>Example: If $XDG_CONFIG_HOME and $XDG_CONFIG_DIRS are not set and the two files /etc/xdg/autostart/foo.desktop and ~/.config/autostart/foo.desktop exist then only the file ~/.config/autostart/foo.desktop will be used because ~/.config/autostart/ is more important than /etc/xdg/autostart/

The `~/.bashrc` is completely irrelevant here, it is only read by interactive non-login shells, so is ignored on login shells, graphical or not.
