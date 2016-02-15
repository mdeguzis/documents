# No submodule found in .gitmodules for path

Source: http://stackoverflow.com/questions/4161022/git-how-to-track-untracked-content/4162672#4162672

You have added vendor/plugins/open_flash_chart_2 as “gitlink” entry, but never defined it as a submodule. Effectively you are using the internal feature that git submodule uses (gitlink entries) but you are not using the submodule feature itself.

You probably did something like this:

git clone git://github.com/korin/open_flash_chart_2_plugin.git vendor/plugins/open_flash_chart_2
git add vendor/plugins/open_flash_chart_2
This last command is the problem. The directory vendor/plugins/open_flash_chart_2 starts out as an independent Git repository. Usually such sub-repositories are ignored, but if you tell git add to explicitly add it, then it will create an gitlink entry that points to the sub-repository’s HEAD commit instead of adding the contents of the directory. It might be nice if git add would refuse to create such “semi-submodules”.

Normal directories are represented as tree objects in Git; tree objects give names, and permissions to the objects they contain (usually other tree and blob objects—directories and files, respectively). Submodules are represented as “gitlink” entries; gitlink entries only contain the object name (hash) of the HEAD commit of the submodule. The “source repository” for a gitlink’s commit is specified in the .gitmodules file (and the .git/config file once the submodule has been initialized).

What you have is an entry that points to a particular commit, without recording the source repository for that commit. You can fix this by either making your gitlink into a proper submodule, or by removing the gitlink and replacing it with “normal” content (plain files and directories).

Turn It into a Proper Submodule
The only bit you are missing to properly define vendor/plugins/open_flash_chart_2 as a submodule is a .gitmodules file. Normally (if you had not already added it as bare gitlink entry), you would just use git submodule add:

git submodule add git://github.com/korin/open_flash_chart_2_plugin.git vendor/plugins/open_flash_chart_2
As you found, this will not work if the path already exists in the index. The solution is to temporarily remove the gitlink entry from the index and then add the submodule:

git rm --cached vendor/plugins/open_flash_chart_2
git submodule add git://github.com/korin/open_flash_chart_2_plugin.git vendor/plugins/open_flash_chart_2
This will use your existing sub-repository (i.e. it will not re-clone the source repository) and stage a .gitmodules file that looks like this:

[submodule "vendor/plugins/open_flash_chart_2"]
    path = vendor/plugins/open_flash_chart_2
    url = git://github.com/korin/open_flash_chart_2_plugin.git vendor/plugins/open_flash_chart_2
It will also make a similar entry in your main repository’s .git/config (without the path setting).

Commit that and you will have a proper submodule. When you clone the repository (or push to GitHub and clone from there), you should be able to re-initialize the submodule via git submodule update --init.

Replace It with Plain Content
The next step assumes that your sub-repository in vendor/plugins/open_flash_chart_2 does not have any local history that you want to preserve (i.e. all you care about is the current working tree of the sub-repository, not the history).

If you have local history in the sub-repository that you care about, then you should backup the sub-repository’s .git directory before deleting it in the second command below. (Also consider the git subtree example below that preserves the history of the sub-repository’s HEAD).

git rm --cached vendor/plugins/open_flash_chart_2
rm -rf vendor/plugins/open_flash_chart_2/.git # BACK THIS UP FIRST unless you are sure you have no local changes in it
git add vendor/plugins/open_flash_chart_2
This time when adding the directory, it is not a sub-repository, so the files will be added normally. Unfortunately, since we deleted the .git directory there is no super-easy way to keep things up-to-date with the source repository.

You might consider using a subtree merge instead. Doing so will let you easily pull in changes from the source repository while keeping the files “flat” in your repository (no submodules). The third-party git subtree command is a nice wrapper around the subtree merge functionality.

git rm --cached vendor/plugins/open_flash_chart_2
git commit -m'converting to subtree; please stand by'
mv vendor/plugins/open_flash_chart_2 ../ofc2.local
git subtree add --prefix=vendor/plugins/open_flash_chart_2 ../ofc2.local HEAD
#rm -rf ../ofc2.local # if HEAD was the only tip with local history
Later:

git remote add ofc2 git://github.com/korin/open_flash_chart_2_plugin.git
git subtree pull --prefix=vendor/plugins/open_flash_chart_2 ofc2 master

git subtree push --prefix=vendor/plugins/open_flash_chart_2 git@github.com:me/my_ofc2_fork.git changes_for_pull_request
git subtree also has a --squash option that lets you avoid incorporating the source repository’s history into your history but still lets you pull in upstream changes.
