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
