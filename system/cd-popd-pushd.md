# cd somedir

* change directory to somedir
* save the original directory in OLDPWD
* set PWD="somedir"
* replace top element of the directory stack (as shown by dirs) with somedir (the number of elements on the stack does not change).

#cd -:

* change directory to $OLDPWD
* swap values of PWD and OLDPWD
* modify the top element of the directory stack to reflect (the new) PWD

#pushd somedir:

* change directory to somedir
* save original directory in OLDPWD
* set PWD="somedir"
* push somedir onto the directory stack (extending it by one element)

#popd:

* save original directory in OLDPWD
* remove first element of the directory stack
* change directory to the new top element of the directory stack
* set PWD to the new top element of the directory stack

Note: Whether the present working directory is considered an element of the directory stack differs between zsh and bash. I used bash as reference for the above lists.

Source: [StackOverflow](http://unix.stackexchange.com/a/273088)
