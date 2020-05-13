# About
https://docs.python.org/3.8/library/xml.etree.elementtree.html

# Namespaces
## Discovery
The namespace should be in Element.tag right before the "actual" tag:

```
>>> root = tree.getroot()
>>> root.tag
'{http://maven.apache.org/POM/4.0.0}project'
```
In this case, the namespace is the text `http://maven.apache.org/POM/4.0.0`

In an Element tree, qualified names are stored as universal names in Clark’s notation, 
which combines the URI and the local part into a single string, given as “{uri}local”.

See also: http://effbot.org/zone/element-namespaces.htm

> If you load an existing XML file into a tree, the prefixes are 
> discarded by the parser, and are not present in the tree. 

# Reusing namespaces for write/modifiation
https://python-forum.io/Thread-Reusing-same-namespace-name-when-writing-back-XML-with-xml-etree-ElementTree

In short, this just requires proper use of `ET.register_namespace(prefix,namespace)`
