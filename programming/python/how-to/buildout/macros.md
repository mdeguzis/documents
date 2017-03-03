# About

Reuse sections of buildout

# Examples

## Pulling a config value from the same section

```
[part1]
recipe = collective.recipe.template
output = ${buildout:parts-directory}/paster/paster.ini
host = 3333
input = inline:
  [DEFAULT}
  debug = true
  
  [app:main]
  use = egg:plonego#app
  reload_templates = true
  
  [server:main]
  use = egg:Paste#http
  host = 0.0.0.0
  parts = ${:host}
```


## Pulling values from another section

Consider:
```
[part1]
recipe = z3c.recipe.scripts
dependent-scripts = true
eggs = 
  polonego
```

We can reuse this without code duplication as so:

```
[part2]
<= part1
output = ${buildout:parts-directory}/part2/part2.ini
```
