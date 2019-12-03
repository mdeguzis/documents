<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [grp](#grp)
- [Example](#example)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# grp

This module provides access to the Unix group database. It is available on all Unix versions.
Group database entries are reported as a tuple-like object, whose attributes correspond to the 
members of the group structure.

# Example

**grp.getgrnam(args.group).gr_mem**

>module.return_group_database(the_parser_arg_given).return_all_usernames_in_group"

```
if args.group is not None:
	userlist = grp.getgrnam(args.group).gr_mem
	for user in userlist:
		# call function to process user, pass 'user'
		process_users(user)
```

# Links

* [grp (python 2)](https://docs.python.org/2/library/grp.html)
