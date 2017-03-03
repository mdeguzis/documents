# About

Reuse sections of buildout

# Example

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
