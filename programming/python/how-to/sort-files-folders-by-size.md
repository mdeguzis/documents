# Method 1

A directory contains files of many sizes. Which are the smallest and largest files? With the "os" module, we can list the files and get their sizes with getsize. We use a list of tuples.

Listdir:
The program uses the listdir method, part of the "os" module. The file names include no directories.

Path

Join:
It next uses the join method. This method combines the directory with the file name.
Getsize:
It finally uses the getsize method. This returns the size. It adds a new tuple to the pairs list.

```
import os

# The folder containing files.
directory = "C:\\programs\\"

# Get all files.
list = os.listdir(directory)

# Loop and add files to list.
pairs = []
for file in list:

    # Use join to get full file path.
    location = os.path.join(directory, file)

    # Get size and add to list of tuples.
    size = os.path.getsize(location)
    pairs.append((size, file))

# Sort list of tuples by the first element, size.
pairs.sort(key=lambda s: s[0])

# Display pairs.
for pair in pairs:
    print(pair)

Output

(184, 'file.pl')
(235, 'file.php')
(369, 'file.rb')
(611, 'file.py')
```

Source: https://www.dotnetperls.com/sort-file-size-python
