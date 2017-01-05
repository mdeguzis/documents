<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Checking plugins](#checking-plugins)
- [Overriding plugins](#overriding-plugins)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Checking plugins

Check the status of what set a value with

Example for `formatoptoins`
```
:verbose set formatoptions
Last set from ~/.vim/after/ftplugin/vim.vim
```


# Overriding plugins

If a `ftplugin` tries to set something, I try not to fight it too hard. But that's just personal preference.
If you want to override something that is being set in the default vimruntime files, the after directory would be the place. Briefly put, things in the after directory are run after everything else. So, when the default ftplugin for `.vim` files sets formatoptions, something in the `after/ftplugin` would override that.

Also relevant might be `set formatoptions<`. The `<` on the end removes the local option being set, so that it uses the global option.
See `:h :setlocal` for more on this.

So basically you could make a file at `~/.vim/after/ftplugin/vim.vim` and reset the value there


See: http://peox.net/articles/vimconfig.html
