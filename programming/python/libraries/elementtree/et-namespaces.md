# ElementTree: Working with Namespaces and Qualified Names

Fredrik Lundh | August 2007

The XML Namespace specification adds _qualified names_ to XML.  A qualified name is a tag or attribute name that is associated with a given namespace.  A namespace usually represents some kind of application domain, such as hypertext, graphics, resource descriptions, or type information.  The Namespace specification allows a single XML document to contain tags and attributes from any number of namespaces, without conflicts.

Conceptually, a qualified name is represented as a (_namespace URI_, _local part_) pair.  The local part is the actual tag or attribute name, while the URI identifies the namespace that the name belongs to.  This is similar to variables and modules in Python; the local part is the variable name, while the namespace is the module that the variable lives in.  The same local name may appear in multiple namespaces in the same document, possibly with radically different semantics:

```
("http://www.w3.org/1999/xhtml", "a")
("http://effbot.org/namespace/letters", "a")
("http://schema.irs.gov/income-tax-form/field", "a")
```

Note that the use of an HTTP URI for the namespace makes it easy to allocate new namespaces without having to use a central registry.  It also offers a convenient location for keeping information about the namespace, but that's not required by the specification.  Some applications use custom URI schemas instead; for example, the WebDAV protocol uses the "DAV:" scheme, mostly for historical reasons.  From a data modelling perspective, the namespace URI should be treated as an opaque string of characters.

## XML Serialization [#](http://effbot.org/zone/element-namespaces.htm#xml-serialization "bookmark!")

The XML Namespace specification uses a simple encoding scheme to store qualified names in XML in an efficient way.  The scheme is designed to be compatible with tools that don't use XML namespaces, and is also reasonably easy to use for human authors.

To understand the encoding model, let's look at a simple XHTML anchor element.  In standard HTML, a single anchor instance can look something like this:

```
<a href="uri">link text</a>
```

In XHTML, the "a" element lives in the "http://www.w3.org/1999/xhtml" namespace, so the full name we need to encode in the file consists of the pair `("http://www.w3.org/1999/xhtml", "a")`.

We could simply store the namespace URI together with the local part in the serialized XML document, using some suitable separator to tell the pieces apart:

```
<http://www.w3.org/1999/xhtml#a href="uri">
link text</http://www.w3.org/1999/xhtml#a>
```

This is of course rather unwieldy, and is very verbose; we'll end up repeating the URI over and over again.  To save space, we could use some kind of "macro facility", and define shorter aliases for the namespaces we're using in the document.  Here's a C-like approach:

```
<#define html "http://www.w3.org/1999/xhtml">

<html:a href="uri">link text</html:a>
```

A parser that understands this (hypothetical) format would first parse the <#define> sections, and then use the aliases defined there to expand the element and attribute names in the rest of the document.

The approach used by XML Namespaces is similar, but instead of separate syntax for namespace declarations, it uses special **xmlns** attributes embedded in the XML document itself.  The line

```
<#define html "http://www.w3.org/1999/xhtml">
```

is turned into an attribute

```
xmlns:html="http://www.w3.org/1999/xhtml"
```

where the **html** part is known as a _prefix_.  The **xmlns** attribute is then added to the element:

```
<html:a href="uri"
xmlns:html="http://www.w3.org/1999/xhtml">
link text</html:a>
```

This tells a namespace-aware parser that the **a** element belongs to the "http://www.w3.org/1999/xhtml" namespace, and the element's qualified name is thus set to the pair `("http://www.w3.org/1999/xhtml", "a")`.  The **xmlns** attribute and the prefix are discarded by the parser; they are part of the serialization, not the data model.

The declarations apply not only to the element they appear in, but also to all child elements.  This lets you add new elements to the document, without having to repeat the **xmlns** attribute for each new element.  In the following example, the anchor is put inside an XHTML paragraph element:

```
<html:p xmlns:html="http://www.w3.org/1999/xhtml">
This is a paragraph, with some <html:a href="uri">
link text</html:a>.</html:p>
```

To keep documents small and tidy, the namespace declarations are often added to the root element (e.g. the **html** element in an XHTML document).

Note that declarations may be overridden by **xmlns** attributes in child elements, and the same prefix may refer to different namespaces in different parts of the document.

## Element Tree Representation [#](http://effbot.org/zone/element-namespaces.htm#element-tree-representation "bookmark!")

In an Element tree, qualified names are stored as _universal names_ in Clark's notation, which combines the URI and the local part into a single string, given as "{uri}local".

```
"{http://www.w3.org/1999/xhtml}a"
"{http://effbot.org/namespace/letters}a"
```

If you load an existing XML file into a tree, the prefixes are discarded by the parser, and are not present in the tree.  For example, if you run:

```
tree = ET.parse(file)

for elem in tree.getiterator():
    print elem.tag, elem.attrib
```

on the XHTML example above, you'll get:

```
{http://www.w3.org/1999/xhtml}p {}
{http://www.w3.org/1999/xhtml}a {'href': 'uri'}
```

When you save an Element tree to XML, the standard Element serializer generates unique prefixes for all URI:s that appear in the tree.  The prefixes usually have the form "ns" followed by a number.  For example, the above elements might be serialized with the prefix **ns0** for "http://www.w3.org/1999/xhtml" and **ns1** for "http://effbot.org/namespace/letters".

If you want to use specific prefixes, you can add prefix/uri mappings to a global table in the ElementTree module.  In 1.3 and later, you do this by calling the **register_namespace** function.  In earlier versions, you can access the internal table directly:

```
# ElementTree 1.3
ET.register_namespace(prefix, uri)

# ElementTree 1.2 (Python 2.5)
ET._namespace_map[uri] = prefix
```

Note the argument order; the function takes the prefix first, while the raw dictionary maps from URI:s to prefixes.

For portability with older versions, you can use a helper function:

```
try:
    register_namespace = ET.register_namespace
except AttributeError:
    def register_namespace(prefix, uri):
        ET._namespace_map[uri] = prefix

register_namespace(prefix, uri)
```

Adding global namespaces for older versions of cElementTree is a bit tricker; that library uses the ElementTree library for serialization, so you have to import the corresponding ElementTree version and modify its _namespace_map instead.  cElementTree 1.0.6 and later provides a **register_namespace** function that does the right thing.

The namespace map is preloaded with standard prefixes for some commonly used namespaces, including XHTML, RDF, and WSDL.

### Namespace Ambiguity [#](http://effbot.org/zone/element-namespaces.htm#namespace-ambiguity "bookmark!")

The XML Namespaces specification doesn't explicitly state how an application should treat the (URI, local part) pair.  While most applications treat them as two distinct components, some applications expect you to combine them in different ways.  For example, earlier versions of the WebDAV protocol (RFC 2518) state that:

> WebDAV compliant XML processors MUST interpret a qualified name as a URI constructed by appending the LocalPart to the namespace name URI.

which means that you're supposed to treat e.g. "{http://effbot.org/}sometag" and "{http://effbot.org/some}tag" as the same qualified name.  You can use a helper function to normalize the names, as needed:

```
def normalize(name):
    if name[0] == "{":
        uri, tag = name[1:].split("}")
        return uri + tag
    else:
        return name
```

## Parsing With Prefixes [#](http://effbot.org/zone/element-namespaces.htm#parsing-with-prefixes "bookmark!")

As explained earlier, the standard parser throws away the prefixes.  This is usually not much of a problem, but there are cases where the prefix mapping is important also after the parser's finished.  The most common is file formats that use qualified names in contexts not supported by the namespace specification, such as attribute values or even character data. A common case is formats based on XML Schema, which uses attribute values to specify the type of element contents.

Here's an excerpt from a SOAP response, which uses the **xsi** and **xsd** prefixes (the corresponding **xmlns** declarations are not shown here):

```
<detail>
    <argument xsi:type='xsd:integer'>200</argument>
    <version xsi:type='xsd:string'>2.0 beta 1</version>
</detail>
```

The **xsi** attribute name is handled by the parser, but the parser doesn't know that the attribute happens to contain a qualified name as well, so it leaves it as is.  To be able to handle such a format, you can use a custom parser that knows how to handle certain attributes and elements, or keep track of the prefix mapping for each element.

To do the latter, you can use the **iterparse** parser, and ask it to report "start-ns" and "end-ns" events.  The following snippet adds an **ns_map** attribute to each element
which contains the prefix/URI mapping that applies to that specific element:

```
def parse_map(file):

    events = "start", "start-ns", "end-ns"

    root = None
    ns_map = []

    for event, elem in ET.iterparse(file, events):
        if event == "start-ns":
            ns_map.append(elem)
        elif event == "end-ns":
            ns_map.pop()
        elif event == "start":
            if root is None:
                root = elem
            elem.ns_map = dict(ns_map)

    return ET.ElementTree(root)
```

This only works for Python implementations of ElementTree; the **cElementTree** versions don't allow you to add arbitrary attributes to an Element instance.  To handle that case too, you can store the dictionary in a custom XML attribute instead:

```
NS_MAP = "xmlns:map"

def parse_nsmap(file):

    events = "start", "start-ns", "end-ns"

    root = None
    ns_map = []

    for event, elem in ET.iterparse(file, events):
        if event == "start-ns":
            ns_map.append(elem)
        elif event == "end-ns":
            ns_map.pop()
        elif event == "start":
            if root is None:
                root = elem
            elem.set(NS_MAP, dict(ns_map))

    return ET.ElementTree(root)
```

With this in place, you can check the NS_MAP attribute whenever you need to handle a qualified name in a non-standard context.  Here's an example that deals with XML Schema type specifiers:

```
XSI_TYPE = "{http://www.w3.org/2001/XMLSchema-instance}type"

tree = parse_nsmap(file)

for elem in tree.getiterator():
    value = elem.get(XSI_TYPE)
    if value:
        prefix, tag = value.split(":")
        nsmap = elem.get(NS_MAP)
        print "%s has type {%s}%s" % (
            elem.tag, nsmap[prefix], tag
        )
```

If you run this on the SOAP response shown earlier, it will print something like:

```
argument has type {http://www.w3.org/2001/XMLSchema}integer
version has type {http://www.w3.org/2001/XMLSchema}string
```

Here's a simple helper function that converts a prefix:tag string to a universal name, for a given element context:

```
def make_universal_name(elem, name):
    prefix, tag = name.split(":")
    ns_map = elem.get(NS_MAP) # prefix map
    return "{%s}%s" % (ns_map[prefix], tag)
```

### Saving Annotated Trees [#](http://effbot.org/zone/element-namespaces.htm#saving-annotated-trees "bookmark!")

Note that the standard serializer doesn't know how to save elements with non-standard attributes; if you try to write an annotated tree to disk, you'll get a type error:

```
root.write(file)

TypeError: cannot serialize {'html':
'http://www.w3.org/1999/xhtml'} (type
dict)
```

The solution is to trim away all such custom attributes before saving the tree:

```
for e in root.getiterator():
    if e.get(NS_MAP):
        del e.attrib[NS_MAP]

root.write(file)
```

## Explicitly Setting Namespace Attributes [#](http://effbot.org/zone/element-namespaces.htm#explicitly-setting-namespace-attributes "bookmark!")

If you want full control over the serialized output, you can explicitly set the namespace attributes before saving the document.  The standard serializer only looks for universal names; element and attribute names that already use prefix:tag notation are passed right through.

Here's a simple function that takes a prefix/uri mapping, creates the necessary **xmlns** attributes on the given tree, and changes all universal names to their equivalent prefix:tag form:

```
def set_prefixes(elem, prefix_map):

    # check if this is a tree wrapper
    if not ET.iselement(elem):
        elem = elem.getroot()

    # build uri map and add to root element
    uri_map = {}
    for prefix, uri in prefix_map.items():
        uri_map[uri] = prefix
        elem.set("xmlns:" + prefix, uri)

    # fixup all elements in the tree
    memo = {}
    for elem in elem.getiterator():
        fixup_element_prefixes(elem, uri_map, memo)
```

The **fixup_element_prefixes** function follows.  This checks all universal names against the URI map, for both element and attribute names.

```
def fixup_element_prefixes(elem, uri_map, memo):
    def fixup(name):
        try:
            return memo[name]
        except KeyError:
            if name[0] != "{":
                return
            uri, tag = name[1:].split("}")
            if uri in uri_map:
                new_name = uri_map[uri] + ":" + tag
                memo[name] = new_name
                return new_name
    # fix element name
    name = fixup(elem.tag)
    if name:
        elem.tag = name
    # fix attribute names
    for key, value in elem.items():
        name = fixup(key)
        if name:
            elem.set(name, value)
            del elem.attrib[key]
```

Note the use of a **memo** dictionary to speed things up.

For example, if you want to use the prefix "h" for the XHTML namespaces, you can call **set_prefixes** as follows:

```
set_prefixes(elem, dict(h="http://www.w3.org/1999/xhtml"))
```

and then save the document as usual.  Using the same HTML example as above, this gives you:

```
<h:p xmlns:h="http://www.w3.org/1999/xhtml">
This is a paragraph, with some <h:a href="uri">
link text</h:a>.</h:p>
```

Note that namespace URI:s that are not present in the prefix map are left as universal names.  The serializer will use "ns" prefixes for them, as usual.

You can use **set_prefixes** to explicitly move all **xmlns** attributes to the top-level element.  The following snippet first loops over a tree to extract all URI:s, and then builds a prefix map that is passed to **set_prefixes**

```
# get unique namespace URI:s
uri_set = set()
for elem in tree.getiterator():
    if elem.tag[0] == "{":
        uri, tag = elem.tag[1:].split("}")
        uri_set.add(uri)

# create prefix map
prefix_map = {}
for uri in sorted(uri_set):
    prefix_map["ns%d" % len(prefix_map)] = uri

set_prefixes(tree, prefix_map)
```

## Preserving Existing Namespace Attributes [#](http://effbot.org/zone/element-namespaces.htm#preserving-existing-namespace-attributes "bookmark!")

Here's a variant of the **parse_nsmap** function that explicitly inserts the original **xmlns** attributes, during parsing:

```
def parse_xmlns(file):

    events = "start", "start-ns"

    root = None
    ns_map = []

    for event, elem in ET.iterparse(file, events):

        if event == "start-ns":
            ns_map.append(elem)

        elif event == "start":
            if root is None:
                root = elem
            for prefix, uri in ns_map:
                elem.set("xmlns:" + prefix, uri)
            ns_map = []

    return ET.ElementTree(root)
```

This is similar to **parse_nsmap**, but adds plain attributes instead of a dictionary.  All names are still converted to universal names; if you want to save the tree again, you need to process the tree before saving it:

```
def fixup_xmlns(elem, maps=None):

    if maps is None:
        maps = [{}]

    # check for local overrides
    xmlns = {}
    for key, value in elem.items():
        if key[:6] == "xmlns:":
            xmlns[value] = key[6:]
    if xmlns:
        uri_map = maps[-1].copy()
        uri_map.update(xmlns)
    else:
        uri_map = maps[-1]

    # fixup this element
    fixup_element_prefixes(elem, uri_map, {})

    # process elements
    maps.append(uri_map)
    for elem in elem:
        fixup_xmlns(elem, maps)
    maps.pop()

def write_xmlns(elem, file):

    if not ET.iselement(elem):
        elem = elem.getroot()

    fixup_xmlns(elem)

    ET.ElementTree(elem).write(file)
```

Note that the recursive **fixup** function maintains a stack of namespace maps.  The **fixup_element_prefixes** helper from the earlier example is used to modify the element and attribute names.

* <b>[::: effbot.org](http://effbot.org/ "Go to effbot.org.")</b>
* <b>[::: zone :::](http://effbot.org/zone/ "Go to zone index page.")</b>

* <b>::: contents</b>

*
  - [XML Serialization](http://effbot.org/zone/element-namespaces.htm#xml-serialization)
  - [Element Tree Representation](http://effbot.org/zone/element-namespaces.htm#element-tree-representation)
  -
    + [Namespace Ambiguity](http://effbot.org/zone/element-namespaces.htm#namespace-ambiguity)
  - [Parsing With Prefixes](http://effbot.org/zone/element-namespaces.htm#parsing-with-prefixes)
  -
    + [Saving Annotated Trees](http://effbot.org/zone/element-namespaces.htm#saving-annotated-trees)
  - [Explicitly Setting Namespace Attributes](http://effbot.org/zone/element-namespaces.htm#explicitly-setting-namespace-attributes)
  - [Preserving Existing Namespace Attributes](http://effbot.org/zone/element-namespaces.htm#preserving-existing-namespace-attributes)

rendered by a [django](http://www.djangoproject.com/) application.  hosted by [webfaction](http://www.webfaction.com/shared_hosting?affiliate=slab).

