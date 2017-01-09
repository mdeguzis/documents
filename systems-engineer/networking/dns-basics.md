# About

Some DNS basics

# Definitions

* **FQDN** - a domain name that specifies its exact location in the tree hierarchy of the Domain Name System (DNS). It specifies all domain levels, including the top-level domain and the root zone.[2] A fully qualified domain name is distinguished by its lack of ambiguity: it can be interpreted only in one way.
* **Namespace** - In computing, a namespace is a set of symbols that are used to organize objects of various kinds, so that these objects may be referred to by name. Prominent examples include:
* **Nameserver** - A name server is a computer Hardware or software server that implements a network service for providing responses to queries against a directory service. It translates an often humanly-meaningful, text-based identifier to a system-internal, often numeric identification or addressing component. This service is performed by the server in response to a service protocol request.
* **TLD** - Top level domain. This is similar to the root directory on a typical workstation, where all other directories (or folders) originate.


# Client and Service Principal Names

When you are using the Kerberos service, DNS must be enabled on all hosts. With DNS, the principal should contain the Fully Qualified Domain Name (FQDN) of each host. For example, if the host name is boston, the DNS domain name is example.com, and the realm name is EXAMPLE.COM, then the principal name for the host should be host/boston.example.com@EXAMPLE.COM. The examples in this book require that DNS is configured and use the FQDN for each host.

The Kerberos service canonicalizes host alias names through DNS, and uses the canonicalized form (cname) when constructing the service principal for the associated service. Therefore when creating a service principal, the host name component of service principal names should be the canonical form of the host name of the system hosting the service.

The following is an example of how the Kerberos service canonicalizes host name. If a user runs the command “ssh alpha.example.com” where alpha.example.com is a DNS host alias for the cname beta.example.com. When ssh calls Kerberos and requests a host service ticket for alpha.example.com, the Kerberos service canonicalizes alpha.example.com to beta.example.com and requests a ticket for the service principal “host/beta.example.com” from the KDC.

For the principal names that include the FQDN of a host, it is important to match the string that describes the DNS domain name in the /etc/resolv.conf file. The Kerberos service requires that the DNS domain name be in lowercase letters when you are specifying the FQDN for a principal. The DNS domain name can include uppercase and lowercase letters, but only use lowercase letters when you are creating a host principal. For example, it doesn't matter if the DNS domain name is example.com, Example.COM, or any other variation. The principal name for the host would still be host/boston.example.com@EXAMPLE.COM.

In addition, the Service Management Facility has been configured so that many of the daemons or commands do not start if the DNS client service is not running. The kdb5_util, kadmind, and kpropd daemons, as well as the kprop command all are configured to depend on the DNS service. To fully utilize the features available using the Kerberos service and SMF, you must enable the DNS client service on all hosts.

# Tables

Type    | Example             | Breakdown
--------|---------------------|------------------------
FQDN | mymail.somecollege.edu | subdomain.domain.TLD

# Links

* [Anatomy of a URL](https://doepud.co.uk/blog/anatomy-of-a-url)
* [FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)
* [Namespace](https://en.wikipedia.org/wiki/Namespace)
