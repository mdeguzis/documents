<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Issues with Python Interactive Mode](#issues-with-python-interactive-mode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Issues with Python Interactive Mode
Things like `getpass` may fail under mingw64.

`.bashrc` workaround:
```
function maybe_py() {
    if [ $# -eq 0 ]; then
        /c/Windows/py.exe -i
    else
       /c/Windows/py.exe $@
    fi
}

alias python=maybe_py
```

See: https://superuser.com/questions/965532/cant-use-python-in-interactive-mode-on-new-msys-git-terminal/965537#965537
