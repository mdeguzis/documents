# Case example
Consider the following

```
rsync -arv --filter="merge $HOME/repo-filter.txt" ${FROM_DIR}/ ${USER}@${HOST}:${TO_DIR}
```

* `--filter` notes to filter the exchange of files
* `merge ${HOME}/repo-filter.txt` tells the filter to merge the contents of the file into it's internal filter
* Directory `, `${build_dir}/` _must_ include the slash to denote the files inside the specified folder

# The filtering file

In the below filtering text file (see [man rsync](http://linux.die.net/man/1/rsync) under Filter RUles), we denote + or - to include or exclude what we want. Start by saying what we want to include, then exclude everything else. Don't forget the prefex `/` to note files inside the `${FROM_DIR}/` target. Think of it as the same way you would specify a file inside the current directory with `./file.txt`. This syntax seems to be required and should be noted.

```
+ /*.dsc
+ /*.deb
+ /*.changes
+ /*.tar.gz
+ /*.tar.xz
- /*
```

# The alternative
The alternative, is to specify _both_ include and exclude:

Using files for include and exclude
```
rsync -arv --include-from="${HOME}/repo-include.txt" --exclude-from="${HOME}/repo-exclude.txt" ${build_dir}/ ${USER}@${HOST}:${REPO_FOLDER}
```

Specify include, exclude * (all the rest)
```
rsync -arv --include-from="${HOME}/repo-include.txt" --exclude='*' ${build_dir}/ ${USER}@${HOST}:${REPO_FOLDER}
```
