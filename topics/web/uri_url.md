<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The Difference Between URLs and URIs](#the-difference-between-urls-and-uris)
- [In summary](#in-summary)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# The Difference Between URLs and URIs

![Alt text](https://github.com/mdeguzis/documents/blob/master/images/URI-vs.-URL-e1464829000786.png?raw=true "Optional Title")

There are many classic tech debates, and the question of what to formally call web addresses is one of the most nuanced. The way this normally manifests is someone asks for the “URL” to put into his or her browser, and someone perks up with,

Actually, that’s called a URI, not a URL…

The response to this correction can range from quietly thinking this person needs to get out more, to agreeing indifferently via shoulder shrug, to removing the safety clasp on a Katana. This page hopes to serve as a simple, one page summary for navigating the subtleties of this debate.

URI, URL, URN

As the image above indicates, there are three distinct components at play here. It’s usually best to go to the source when discussing matters like these, so here’s an exerpt from Tim Berners-Lee, et. al. in RFC 

* A Uniform Resource Identifier (URI) is a compact sequence of characters that identifies an abstract or physical resource.
* A URI can be further classified as a locator, a name, or both. The term “Uniform Resource Locator” (URL) refers to the subset of URIs that, in addition to identifying a resource, provide a means of locating the resource by describing its primary access mechanism (e.g., its network “location”).
* One can classify URIs as locators (URLs), or as names (URNs), or as both. A Uniform Resource Name (URN) functions like a person’s name, while a Uniform Resource Locator (URL) resembles that person’s street address. In other words: the URN defines an item’s identity, while the URL provides a method for finding it.

# In summary

* First of all (as we see in the diagram as well) a URL is a type of URI. So if someone tells you that a URL is not a URI, he’s wrong. But that doesn’t mean all URIs are URLs. All butterflies fly, but not everything that flies is a butterfly.
* The part that makes a URI a URL is the inclusion of the “access mechanism”, or “network location”, e.g. http:// or ftp://.
* The URN is the “globally unique” part of the identification; it’s a unique name.

If you go to http://files.hp.com you could conceivably get completely different content than if you go to ftp://files.hp.com. And this type of thing is only getting more common. Think of all the different services that live on the various Google domains.

So, if you use URI you’ll always be technically correct, and if you use URL you might not be.

* URIs are identifiers, and that can mean name, location, or both.
* All URNs and URLs are URIs, but the opposite is not true.
* The part that makes something a URL is the combination of the name and an access method, such as https://, or mailto:.
* All these bits are URIs, so saying that is always technically accurate, but if you are discussing something that’s both a full URL and a URI (which all URLs are), it’s best to call it a “URL” because it’s more specific.

# Examples

So let’s look at some examples of URIs—again from the RFC:

* ftp://ftp.is.co.za/rfc/rfc1808.txt (also a URL because of the protocol)
* http://www.ietf.org/rfc/rfc2396.txt (also a URL because of the protocol)
* ldap://[2001:db8::7]/c=GB?objectClass?one (also a URL because of the protocol)
* mailto:John.Doe@example.com (also a URL because of the protocol)
* news:comp.infosystems.www.servers.unix (also a URL because of the protocol)
* tel:+1-816-555-1212
* telnet://192.0.2.16:80/ (also a URL because of the protocol)
* urn:oasis:names:specification:docbook:dtd:xml:4.1.2

Those are all URIs, and some of them are URLs. Which are URLs? The ones that show you how to get to them. Again, the name vs. address analogy serves well.

Source https://danielmiessler.com/study/url-uri/#gs.erS6pMg
