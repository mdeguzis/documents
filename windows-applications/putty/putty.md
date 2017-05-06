<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Full screen mode](#full-screen-mode)
- [4.9.7 ‘Full screen on Alt-Enter’](#497-full-screen-on-alt-enter)
- [Letters showing up when typing on the numpad](#letters-showing-up-when-typing-on-the-numpad)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Full screen mode

If you find the title bar on a maximised window to be ugly or distracting, you can select Full Screen mode to maximise PuTTY ‘even more’. When you select this, PuTTY will expand to fill the whole screen and its borders, title bar and scrollbar will disappear. (You can configure the scrollbar not to disappear in full-screen mode if you want to keep it; see section 4.7.3.)

When you are in full-screen mode, you can still access the system menu if you click the left mouse button in the extreme top left corner of the screen.
It seems you have found yet another way by Ctrl+right click.

And regarding the key combo to enter/leave full screen, there is at least a configuration option to use Alt+Enter. I don't have access to PuTTY right now to test, but I believe that this used to be enabled by default. Once again from the manual:

# 4.9.7 ‘Full screen on Alt-Enter’

If this option is enabled, then pressing Alt-Enter will cause the PuTTY window to become full-screen. Pressing Alt-Enter again will restore the previous window size.

The full-screen feature is also available from the System menu, even when it is configured not to be available on the Alt-Enter key. See section 3.1.3.7.

# Letters showing up when typing on the numpad

Why do letters show up when I try to enter numbers from the keypad? Why doesn't the numpad work as expected? Why does the NumLock key bring up help.txt?

These confusing things happen when PuTTY is in "application keypad mode".

PuTTY can be configured so that keys on the numeric keypad (including NumLock) will send an escape sequence ("application keypad mode"), or will behave as a standard number pad (when NumLock is on, send the characters  [0-9/*-+.]; otherwise, send the codes for the cursor movement keys).

For use in Vim, you want to disable application keypad mode:

* Run PuTTY Configuration.
* In the left pane, select Terminal, Features.
* Put a check mark next to "Disable application keypad mode".
* In the left pane, select Session.
* Save the settings.

Now the NumLock key and the numbers on the numpad should work in Vim, as expected.

See: http://vim.wikia.com/wiki/PuTTY_numeric_keypad_mappings
