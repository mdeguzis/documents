# Case example
Consider the following

```
rsync -arv --filter="merge ${HOME}/.config/SteamOS-Tools/repo-filter.txt" ${build_dir}/ ${USER}@${HOST}:${REPO_FOLDER}
```

* `--filter` notes to filter the exchange of files
* `merge ${HOME}/.config/SteamOS-Tools/repo-filter.txt` tells the filter to merge the contents of the file into it's internal filter
* Directory `, `${build_dir}/` _must_ include the slash to denote the files inside the specified folder

# The filtering file
In the below filtering text file (see [man rsync](http://linux.die.net/man/1/rsync) under Filter RUles), we denote + or - to include or exclude what we want. Start by saying what we want to include, then exclude everything else. Don't forget the prefex `/` to note files inside the `${build_dir}/` target

```
+ /*.dsc
+ /*.deb
+ /*.changes
+ /*.tar.gz
+ /*.tar.xz
- /*
```
