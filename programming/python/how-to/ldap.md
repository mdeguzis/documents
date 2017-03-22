# About

Notes regarding using LDAP in python

# Basic connection

```
import ldap

# set AD and LDAP (cut either if you don't have it) hosts
adldapuri = "ldaps://host.doman.com"
ldapuri = "ldaps://host.doman.com"

# turn off referrals
ldap.set_option(ldap.OPT_REFERRALS, 0)

# create ldap object
ad_ldap_connection = ldap.initialize(adldapuri) 
ldap_connection = ldap.initialize(ldapuri) 

# Bind ldap with user/password
ad_ldap_connection.simple_bind_s( username + '@host.com', password)
ldap_connection.simple_bind_s( 'uid=' + username + ',ou=people,dc=host,dc=com', password)
```

# Searching LDAP/AD

## Get AD groupmembers from CN

```

def get_ad_groupmembers(group):
    """Fetch AD group members"""

    result = ad_ldap_connection.search(group, ldap.SCOPE_BASE, attrlist=["member"])
    try:
        result_type, result_data = ad_ldap_connection.result(result, 0)
        result_set = []
        if (result_data == []):
            result_set = None
        else:
            if result_type == ldap.RES_SEARCH_ENTRY:
                for dn, entry in result_data:
                    result_set.append(result_data)
        # Return just the member list
        return result_set[0][0][1]['member']
    except ldap.NO_SUCH_OBJECT:
        logging.error("AD Group " + group + " does not exist")
        return None
```

## Get AD user attributes

```
def get_ad_user_attrib(user):
    """fetches user attributes for AD user"""

    # Use as minimal a basedn as possible. Further restiction may limit results
    # Time to return the result is quick anyway
    basedn = "DC=host,DC=com"
    # SCOPE_SUBTREE to search the object and all its descendants
    search_scope = ldap.SCOPE_SUBTREE
    search_filter = "(&(objectCategory=person)(objectClass=user)(sAMAccountName=" + user +"))"
    ldif_writer = ldif.LDIFWriter(sys.stdout)

    # Get all attributes (use 'None' to get all of them)
    retrieve_attributes =   ['name', 'userPrincipalName', 'distinguishedName', 'title',
                             'department', 'description', 'directReports', 'telephoneNumber',
                             'userAccountControl'
                            ]

    result = ad_ldap_connection.search(basedn, search_scope, search_filter, retrieve_attributes)

    try:
        result_type, result_data = ad_ldap_connection.result(result, 0)
        result_set = []
        if (result_data == []):
            logging.error("No result for: " + user)
            result_set = None
        else:
            if result_type == ldap.RES_SEARCH_ENTRY:
                for dn, entry in result_data:
                    #ldif_writer.unparse(dn, entry)
                    name = ''.join(entry['name'])
                    email = ''.join(entry['userPrincipalName'])
                    dn = ''.join(entry['distinguishedName'])
                    title = ''.join(entry['title'])
                    dept = ''.join(entry['department'])
                    desc = ''.join(entry['description'])
                    office_num = ''.join(entry['telephoneNumber'])
                    uac = ''.join(entry['userAccountControl'])

                    # For a list of User Account control flags, see:
                    # https://support.microsoft.com/en-us/help/305144/how-to-use-the-useraccountcontrol-flags-to-manipulate-user-account-properties
                    # Each statement below is checked for true, i.e. boolean check
                    # To check manually, for example, try 'bool(514 & 2)' which evals to True
                    if (int(uac) & 2):
                        user_status = "disabled account"
                        logging.warning("User account '" + user + "' is disabled in Active Directory")
                    elif (int(uac) & 16):
                        user_status = "account locked out"
                        logging.warning("User account '" + user + "' is locked out in Active Directory")
                    elif (int(uac) & 512):
                        user_status = 'normal account'
                    elif (int(uac) & 8388608):
                        user_status = 'password expired'
                    elif (int(uac) & 65536):
                        user_status = 'password does not expire'
                    else:
                        user_status = "unknown"

                    result_set.append(result_data)

        # return result set in entirety for now + user status
        return result_set, user_status

    except ldap.NO_SUCH_OBJECT:
        logging.error("AD user " + user + " does not exist.")
        return None
```

## Get LDAP group members

```
def get_ldap_groupmembers(group):
    """Fetch LDAP group members"""

    result = ldap_connection.search(group, ldap.SCOPE_BASE, attrlist=["memberUid"])

    try:
        result_type, result_data = ldap_connection.result(result, 0)
        result_set = []
        if (result_data == []):
            result_set = None
        else:
            if result_type == ldap.RES_SEARCH_ENTRY:
                for dn, entry in result_data:
                    result_set.append(result_data)
        # Return just the member list
        return result_set[0][0][1]['memberUid']
    except ldap.NO_SUCH_OBJECT:
        logging.error("LDAP Group " + group + " does not exist.")
        return None
```

## Get LDAP user attributes

```
def get_ldap_user_attrib(user):
    """fetches user attributes for ldap user"""

    # Use as minimal a basedn as possible. Further restiction may limit results
    # Time to return the result is quick anyway
    basedn = "DC=host,DC=com"
    # SCOPE_SUBTREE to search the object and all its descendants
    search_scope = ldap.SCOPE_SUBTREE
    search_filter = "uid=" + user
    # Get all attributes
    retrieve_attributes = None

    result = ldap_connection.search(basedn, search_scope, search_filter, retrieve_attributes)

    try:
        result_type, result_data = ldap_connection.result(result, 0)
        result_set = []
        if (result_data == []):
            logging.error("No result for: " + user)
            result_set = None
        else:
            if result_type == ldap.RES_SEARCH_ENTRY:
                for dn, entry in result_data:
                    result_set.append(result_data)
        # return all for now (TODO)
        return result_set

    except ldap.NO_SUCH_OBJECT:
        logging.error("LDAP user " + user + " does not exist.")
        return None
```

## Get SAM account name

```
def get_ad_sam_acctname(userdn):
    """Get SAM account name"""

    result = ad_ldap_connection.search(userdn, ldap.SCOPE_BASE, attrlist=["sAMAccountName"])
    try:
        result_type, result_data = ad_ldap_connection.result(result, 0)
        result_set = []
        if (result_data == []):
            result_set = None
        else:
            if result_type == ldap.RES_SEARCH_ENTRY:
                for dn, entry in result_data:
                    result_set.append(result_data)
        # Return just the samaccountname in lowercase
        return str(result_set[0][0][1]['sAMAccountName'][0]).lower()
    except ldap.NO_SUCH_OBJECT:
        logging.error("AD User " + userdn + " does not exist.")
        return None
```

# Searching on the command line

```
$ ldapsearch -H ldaps://adldapserver -D user@host.com -W "(sAMAccountName=bsmith)" employeeNumber employeeID | grep "\(dn\|employee\)"
Enter LDAP Password:
# requesting: employeeNumber employeeID
dn: CN=Bob\, Smith,OU=Non-Employee,OU=Managed Users,DC=geisinger,DC=edu
employeeNumber: 00111000 
```

# See also

* [LDAP Syntax filters (TechNet)](https://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx#Filter_on_objectCategory_and_objectClass)
* [ldif](https://www.python-ldap.org/doc/html/ldif.html)
