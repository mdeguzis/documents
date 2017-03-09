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
