<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Basic usage](#basic-usage)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

 # About
 
 How to use pyhive
 
 # Basic usage
 
 ```
conn = hive.Connection(host=HOST, port=PORT, auth="KERBEROS", \
database=DATABASE,kerberos_service_name="hive")
```

It's a good idea to use a limit catch here if the result is too big to handle:
```
# Make connection with supplied information
try:
    queryresults = cursor.fetchall()
except:
    sys.exit("ERROR: Your query result is likley too large. Please try using LIMIT.")
```

Page results
```
# Cursor is a dataset parser
for result in queryresults:
    # u' characters are normaly python seperator for binary data

    # (OPTIONAL)Format the output
    # map( lambda x: (x[0].encode("utf-8"),)+x[1:], result)
    # encoded = [s.encode('utf8') for s in result]
    # print ', '.join(encoded)

    print result
```

Close connection
```
# Close connection
conn.close()
```

# result meta data
This requires an asynchronous DB connection
```
cursor.execute(sql, async=True)

status = cursor.poll()

while status.operationState not in [
    hive.ttypes.TOperationState.FINISHED_STATE,
    hive.ttypes.TOperationState.CANCELED_STATE,
    hive.ttypes.TOperationState.CLOSED_STATE,
    hive.ttypes.TOperationState.ERROR_STATE,
]):

    progress = status.progressUpdateResponse.progressedPercentage
    # Do whatever you need with this progress info

    status = cursor.poll()
```

# Links

* http://pythonhosted.org/PyHive/
* https://github.com/dropbox/PyHive
* https://www.python.org/dev/peps/pep-0249/
