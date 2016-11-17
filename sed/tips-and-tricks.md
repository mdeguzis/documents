# About

One liners and examples that I have found useful

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tips and Tricks](#tips-and-tricks)
  - [Pass results of find to command](#pass-results-of-find-to-command)
  - [Replace line with contents of file](#replace-line-with-contents-of-file)
  - [Replace line with block of text in file (perl)](#replace-line-with-block-of-text-in-file-perl)
- [Delete 'n' lines after match (including match)](#delete-n-lines-after-match-including-match)
- [Delete 'n' lines after match (excluding match). Increase 'd' for each line after N (the line not to delete)](#delete-n-lines-after-match-excluding-match-increase-d-for-each-line-after-n-the-line-not-to-delete)
- [Delete between two patterns](#delete-between-two-patterns)
- [Replace entire line with block of text, from script.](#replace-entire-line-with-block-of-text-from-script)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Commenting a line matching/not matching a specific string AND that is not already commented out

Lines matching string
```
sudo sed -i.bak '/steamos/ s/^#*/#/!' "/etc/apt/sources.list"
```

Lines not matching string:
```
sudo sed -i.bak '/steamos/! s/^#*/#/!' "/etc/apt/sources.list"
```

Note: the `-i` usually replaces "in place," but adding `.bak` will backup the original file with said extension.

Source: [StackOverflow](http://stackoverflow.com/questions/17998763/sed-commenting-a-line-matching-a-specific-string-and-that-is-not-already-comme)



# Pass results of find to command
Note: It is probably better to use `find PATH -name STRING -exec COMMAND \;` here, but the following should work fine.

```
find . -name "SEARCHSTRING" -print0 | xargs -0 COMMAND
```

# Replace line with contents of file

```
perl -pe 's/install_prereqs/`cat temp`/e'
```

# Replace line with block of text in file (perl)

```
# Test
perl -pe 's|OLD|`cat blockoftext`|e' 

# Replace in-place (e.g. sed -i)
perl -pe 's|OLD|`cat blockoftext`|e' -i
```

# Delete 'n' lines after match (including match)
```
sed -e '/pattern/,+5d' file.txt
```

# Delete 'n' lines after match (excluding match). Increase 'd' for each line after N (the line not to delete)

```
sed -e '/pattern here/ { N; d; }'
```

For every line that matches pattern here, the code in the {} gets executed. N takes the next line into the pattern space as well, and then d deletes the whole thing before moving on to the next line. This works in any POSIX-compatible sed.

# Delete between two patterns

Example
```
sed -i '/##### DEBIAN PACKAGING SETUP #####/,/##### END DEBIAN PACKAGING SETUP #####/d' "${HOME}/.bashrc"
```


# Replace entire line with block of text, from script.

Consider temp.sh:

```
# replacing block of text for user host params, since digital ocean droplet is up and running
# delete this file when confirmed working

# Keep << vs <<- (latter ignores tabs), since we want to keep the code indented
# The caveat then, is the here-doc needs to not be indented.
# If you use 'cat <<- EOF > test.txt' with indents, your code will not contain tabs

cat << EOF > newtext.txt

# Check if USER/HOST is setup under ~/.bashrc, set to default if blank
# This keeps the IP of the remote VPS out of the build script

if [[ "\${REMOTE_USER}" == "" || "\${REMOTE_HOST}" == "" ]]; then

	# fallback to local repo pool target(s)
	REMOTE_USER="mikeyd"
	REMOTE_HOST="archboxmtd"

fi

EOF

# Add new block of cheese, errrrr....text...
find . -name "build*.sh" -print0 | xargs -0 perl -pe 's/.*repo destination.*/`cat newtext.txt`/e'

# Replace final text in build script
find . -name "build*.sh" -print0 | xargs -0 sed 's/${USER}@${HOST}/${REMOTE_USER}@${REMOTE_HOST}/g'

# cleanup 
rm newtext.txt
```

Note the \ symbol to escape the quotes on the vars so they are no substitued during this process. In this example, we cat output to a temporary file (note use of `<< EOF` vs `<<- EOF`), and replace a line in all of our build scripts. Dangerous, right!? Even if you test concretely first, it is still risky. "But, I am a risktaker, ass kicker, kung-foo master, you say?" Go ahead and add change `sed` to `sed -i` and add `-i` to the end _very end_ of the `perl ....cat newtext.txt...' line` to do an "in-place" swap. 

```
# Add new block of cheese, errrrr....text...
find . -name "build*.sh" -print0 | xargs -0 perl -pe 's/.*repo destination.*/`cat newtext.txt`/e' -i

# Replace final text in build script
find . -name "build*.sh" -print0 | xargs -0 sed -i 's/${USER}@${HOST}/${REMOTE_USER}@${REMOTE_HOST}/g'
```
