# Table Of Content
Skip to the relevant sections if needed.
* [2-min tutorial to do it the quick-and-dirty-way](http://www.git-tower.com/learn/git/ebook/command-line/advanced-topics/merge-conflicts)
* [Concepts for resolving `Git conflicts`](#concepts-for-resolving-git-conflicts)
* [Setting up different editors / tool for using `git mergetool`](#setting-up-different-editors--tool-for-using-git-mergetool)
    * [Finding out what `mergetool` editors are supported](#finding-out-what-mergetool-editors-are-supported)
* [`mergetool` simple code example for `vimdiff`](#mergetool-simple-code-example)   
   * [Resolving conflict from a `Git pull`](#resolving-conflict-from-a-git-pull)
* [Other great references and tutorials](#other-great-references-and-tutorials)

# Concepts for resolving `Git conflicts`
For using `mergetool` in `git`,  we need to understand the following terminology to understand what is being merged:

* `LOCAL` - the `head` for the file(s) from the current branch on the machine that you are using.
* `REMOTE` - the `head` for files(s) from a remote location that you are trying to merge into your `LOCAL` branch.
* `BASE` - the common ancestor(s) of `LOCAL` and `REMOTE`.
* `MERGED` - the tag / `HEAD` object after the merge - this is saved as a new commit.

Common `mergetool` from editors will display both `LOCAL` and `REMOTE`  so you can decide which changes to keep.
Please read [this tutorial explaining the HEAD objects](http://www.sbf5.com/~cduan/technical/git/git-1.shtml) if you do not know what it is. It will help your understanding of Git tremendously.


# Setting up different editors / tool for using `git mergetool`
We have to change the `git config` to set a default mergetool.
In this example, we will use `vimdiff`:
```Bash
$ git config merge.tool vimdiff      
```
We can also set the editor to display the common ancestor `BASE` while we examine what changes are in `LOCAL` and `REMOTE` with the following setting:
```
$ git config merge.conflictstyle diff3  
```

[back to top](#table-of-content)

## Finding out what `mergetool` editors are supported
```
$ git mergetool --tool-help
```
And we list a few of them:
### Command line `mergetool` editors
* `Emacs` based diff tools: `emerge`, or  [`Ediff`](https://whatworks4me.wordpress.com/2011/04/13/view-git-diffs-in-emacs-using-ediff/)
* `Vim` based diff tool: [`vimdiff`](http://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/)

### GUI `mergetool` editors
* `gvimdiff` - almost identical to `vimdiff` but uses the Linux GUI for `Vim`, please refer to `vimdiff` if you still use the keyboard commands for `GVim`.
* [`kdiff3`](http://kdiff3.sourceforge.net/) 
* [`meld`](http://blog.deadlypenguin.com/blog/2011/05/03/using-meld-with-git-diff/)
* [`tortoisemerge`](http://tortoisesvn.net/docs/nightly/TortoiseMerge_en/tmerge-dug.html)

Or consult the community of your favorite editor to see how to do the equivalent operations for your editor.

## Other useful `mergetool` settings 
Do not prompt before launching the merge resolution tool
```
$ git config mergetool.prompt false
```
[back to top](#table-of-content)

# `mergetool` simple code example
[Ref1 for the example](http://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/)   
[Ref2](http://flaviusim.com/blog/how-to-do-a-git-merge-with-vim/)

## creating the git repo 
```Bash
$ mkdir galaxyZoo
$ cd galaxyZoo
$ git init
$ vim astrophy_obj.txt
```
Add some galaxy types into `astrophy_obj.txt` then save the file.
```
# content of astrophy_obj.txt
spiral
elliptical
bar 
irregular
```
save then commit the file.

```
$ git add astrophy_obj.txt
$ git commit -m 'Initial commit'
$ git branch astrophy_objects   # create a new branch
$ git checkout astrophy_objects # change to new branch
$ vim astrophy_obj.txt          # make changes to file 
```
Change `bar` to `barred` in the file.
```
$ git commit -am 'changed bar to barred'
$ git checkout master   # change back to master branch
$ vim astrophy_obj.txt  
# add the word `galaxy` to the end of each line using Vim REGEX 
# type `:%s/$/ galaxy/g` in Vim then press enter and save `:wq`

$ git commit -am 'added galaxy to each line'
# merge from the astrophy_objects branch to current branch, i.e. master
$ git merge astrophy_objects  
```
Then you will see some error messages:
```
Auto-merging astrophy_obj.txt
CONFLICT (content): Merge conflict in astrophy_obj.txt
Automatic merge failed; fix conflicts and then commit the result.
```
We can bring up the `mergetool`:
```
$ git mergetool
```
Then it will bring up the different versions of the file in different `Vim splits` panels.
```
+--------------------------------+
| LOCAL  |     BASE     | REMOTE |
+--------------------------------+
|             MERGED             |
+--------------------------------+
```
The top left split panel is the `LOCAL`, top middle split is `BASE` and top right split is `REMOTE`.
The bottom split refers to the `MERGED` version.
You can find this info in the bottom bar of each split (I have put 3 yellow rectangles to highlight that info).

As you can see form the below image, my `Vim` has highlighted the differences in red for me.
![Vim mergetool image](https://app.box.com/representation/file_version_37661948594/image_2048/1.png?shared_name=ws92iu1ftjib8pcmq0b8hly0hwwnb1jh)

Now if your terminal has any GUI capability and you have compiled `Vim` correctly with GUI support, you can use your mouse to click on the bottom split to edit it.
Or if you are a `Vim` ninja, you can use the keyboard shortcut to move to different splits.
```
Ctrl w + h   # move to the split on the left 
Ctrl w + j   # move to the split below
Ctrl w + k   # move to the split on top
Ctrl w + l   # move to the split on the right
```
You can either incorporate the changes by manually editing the `MERGED` split, 
or use `Vim` shortcuts pull from one of the `LOCAL`, `BASE` ad `REMOTE` versions.

```
:diffg RE  # get from REMOTE
:diffg BA  # get from BASE
:diffg LO  # get from LOCAL
```
save the changes then quit with `:wqa` to close all the splits.
Remember to commit the merge.
```
$ git commit -am 'merged from several branches'
```
## Resolving conflict from a `git pull` 

If you were trying to do a `git pull` when you ran into `merge` conflicts, 
follow all steps in the previous section for using the `mergetool`, then do:
```
$ git rebase –continue
```
This command will 
> Forward-port local commits to the updated upstream HEAD.

according to the documentation, meaning your local commits will be pushed to the `upstream remote branch` 
as a new forward commit that doesn't interfere with previous commits.
Hooray now you can claim that you can collaborate with others with Git without messing up with your collaborators' commits.

[back to top](#table-of-content)

## Other `vimdiff` keyboard shortcuts
```
]c - Jump to the next change.
[c - Jump to the previous change.
```
[ref](http://amjith.blogspot.com/2008/08/quick-and-dirty-vimdiff-tutorial.html)

# Other great references and tutorials
* [Git mergetool documentation on git-scm.com](http://git-scm.com/docs/git-mergetool)   
* [Must-read tutorial: the concepts of branching and merging from Charles Duan](http://www.sbf5.com/~cduan/technical/git/git-3.shtml)       
* [Improving Vimdiff as a Git mergetool](http://vim.wikia.com/wiki/A_better_Vimdiff_Git_mergetool)


[back to top](#table-of-content)

# Additional Resources

* https://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/ 

