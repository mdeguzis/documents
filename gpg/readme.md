<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Tips](#tips)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful information about GPG / GNUPG

# Distributing keys

```
gpg --gen-key
gpg --armour --export uid > my_pubkey.asc
```

# Rovoking Keys

```
gpg --output revoke.asc --gen-revoke <mkeyid>
```

# Tips

* use `gpg --export-options export-minimal` to avoid carrying information that quickly will be outdated or anyway it's not that useful

# Links

* [Exchanging keys](https://www.gnupg.org/gph/en/manual/x56.html)
* [GPG Cheat Sheet](http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/gpg-cs.html)
* [Instant GPG How-To](http://homepages.inf.ed.ac.uk/da/id/gpg-howto.shtml)
* [Revoking Keys](https://www.hackdiary.com/2004/01/18/revoking-a-gpg-key/)
* [Revoking Keys (GNUGPG](https://www.gnupg.org/gph/en/manual/c14.html)
