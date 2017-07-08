# About

Below is a handy method for paging stdout / output from a python program. It's great for lengthy output that scrolls by too fast.

# python 2

```
class Less(object):
    def __init__(self, num_lines):
        self.num_lines = num_lines
    def __ror__(self, other):
        s = str(other).split("\n")
        for i in range(0, len(s), self.num_lines):
            print "\n".join(s[i: i + self.num_lines])
            raw_input("Press <Enter> for more")

less = Less(num_lines=30)  
"\n".join(map(str, range(100))) | less
```

# Python 3

```
class Less(object):
    def __init__(self, num_lines):
        self.num_lines = num_lines
    def __ror__(self, other):
        s = str(other).split("\n")
        for i in range(0, len(s), self.num_lines):
            print(*s[i: i + self.num_lines], sep="\n")
            input("Press <Enter> for more")

less = Less(num_lines=30)  
"\n".join(map(str, range(100))) | less
```

As seen above, you would just pipe you comand to less. Adjust values as necessary in the class itself.

Source: [StackOverflow](https://stackoverflow.com/a/3306399)
