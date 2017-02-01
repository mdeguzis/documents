Think of a scenario where you create a Linux directory that can be used by all the users of the Linux system for creating files. Users can create, delete or rename files according to their convenience in this directory. For all those who think that why would such a directory be created? There exists, for example, /tmp directory in the Linux system that can be used by different Linux users to create temporary files.

Now, what if an user accidentally or deliberately deletes (or rename) a file created by some other user in this directory?

Well, to avoid these kind of issues, the concept of sticky bit is used.

A Sticky bit is a permission bit that is set on a file or a directory that lets only the owner of the file/directory or the root user to delete or rename the file. No other user is given privileges to delete the file created by some other user.
