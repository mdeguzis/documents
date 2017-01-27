# LDAP Directory structure

* CN = Common Name
* OU = Organizational Unit
* DC = Domain Component

These are all parts of the X.500 Directory Specification, which defines nodes in a LDAP directory. You read it from right to left, the right-most component is the root of the tree, and the left most component is the node (or leaf) you want to reach.

## Components

From [RFC2253 (UTF-8 String Representation of Distinguished Names)](http://www.ietf.org/rfc/rfc2253.txt)

String   X.500 | AttributeType
---------------|---------------
CN  |    commonName
L    |   localityName
ST   |   stateOrProvinceName
O     |  organizationName
OU   |  organizationalUnitName
C    |   countryName
STREET  | streetAddress
DC   |   domainComponent
UID  |   userid

## Example

```
("CN=Dev-India,OU=Distribution Groups,DC=gp,DC=gl,DC=google,DC=com");
```

The string ("CN=Dev-India,OU=Distribution Groups,DC=gp,DC=gl,DC=google,DC=com") is a path from an hierarchical structure (DIT = Directory Information Tree) and should be read from right (root) to left (leaf).

It is a DN (Distinguished Name) (a series of comma-separated key/value pairs used to identify entries uniquely in the directory hierarchy). The DN is actually the entry's fully qualified name.

Here you can see an example where I added some more possible entries.
The actual path is represented using green.


<p align=center><a href="https://github.com/mdeguzis/documents/blob/master/system/diagrams/ldap-hierarch-example.png"><img src="https://github.com/mdeguzis/documents/blob/master/system/diagrams/ldap-hierarch-example.png" title="ldap-hierarch-example" width="466" height="222" /></p></a>

# Links

* [Understanding X.500 (Kent University Australia)](http://sec.cs.kent.ac.uk/x500book/)
* [ Using Domains in LDAP/X.500 Distinguished Names](https://tools.ietf.org/html/rfc2247)
