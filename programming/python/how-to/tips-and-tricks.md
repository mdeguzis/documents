<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Fix tab indents from pastes](#fix-tab-indents-from-pastes)
  - [Using vim](#using-vim)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Small tips and tricks for Python

# Fix tab indents from pastes

## Using vim

You may want to

```
:se et  " shorthand for :set expandtab
```

Retab:
```
:retab
```

**More advanced usage**

 convert all existing tabs to spaces. You can do both in one command:
```
:set et|retab
```

You can also convert spaces to tabs:
```
:set noet|retab!
```

# Links

* [Super retab](http://vim.wikia.com/wiki/Super_retab)
