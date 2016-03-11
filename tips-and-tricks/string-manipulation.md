# Tips and Tricks

## Pass results of find to command
Note: It is probably better to use `find PATH -name STRING -exec COMMAND \;` here, but the following should work fine.

```
find . -name "SEARCHSTRING" -print0 | xargs -0 COMMAND
```

## Replace line with contents of file

```
perl -pe 's/install_prereqs/`cat temp`/e'
```

## Replace line with block of text in file (perl)

```
# Test
perl -pe 's|OLD|`cat blockoftext`|e' 

# Replace in-place (e.g. sed -i)
perl -pe 's|OLD|`cat blockoftext`|e' -i
```

# Delete 'n' lines after match
```
sed -e '/pattern/,+5d' file.txt
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

In this example, we cat output to a temporary file (note use of `<< EOF` vs `<<- EOF`), and replace a line in all of our build scripts. Dangerous, right!? Even if you test concretely first, it is still risky. "But, I am a risktaker, ass kicker, kung-foo master, you say?" Go ahead and add change `sed` to `sed -i` and add `-i` to the end _very end_ of the `perl ....cat newtext.txt...' line` to do an "in-pace" swap. 

```
# Add new block of cheese, errrrr....text...
find . -name "build*.sh" -print0 | xargs -0 perl -pe 's/.*repo destination.*/`cat newtext.txt`/e' -i

# Replace final text in build script
find . -name "build*.sh" -print0 | xargs -0 sed -i 's/${USER}@${HOST}/${REMOTE_USER}@${REMOTE_HOST}/g'
```
