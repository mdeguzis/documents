# Loop over multiple globs

```
from glob import glob

files = glob('*.gif')
files.extend(glob('*.png'))
files.extend(glob('*.jpg'))

print(files)
```

If you need to specify a path, loop over match patterns and keep the join inside the loop for simplicity:
```
from os.path import join
from glob import glob

files = []
for ext in ('*.gif', '*.png', '*.jpg'):
   files.extend(glob(join("path/to/dir", ext)))

print(files)
```
Source: https://stackoverflow.com/questions/4568580/python-glob-multiple-filetypes/26403164#26403164
