<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [GPG status flags](#gpg-status-flags)
- [Distributing keys](#distributing-keys)
- [Adjusting key expiration and trust](#adjusting-key-expiration-and-trust)
- [Transitioning to a new key](#transitioning-to-a-new-key)
- [Rovoking Keys](#rovoking-keys)
- [Tips](#tips)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful information about GPG / GNUPG

# GPG status flags

Upon inspection of the GPG source code, these appear to be the available status flags:

```
sec => 'SECret key'
ssb => 'Secret SuBkey'
pub => 'PUBlic key'
sub => 'public SUBkey'
```

```
Constant              Character
───────────────────────────────
PUBKEY_USAGE_SIG      S
PUBKEY_USAGE_CERT     C
PUBKEY_USAGE_ENC      E
PUBKEY_USAGE_AUTH     A
```

# Distributing keys

```
gpg --gen-key
gpg --armour --export uid > my_pubkey.asc
```

# Adjusting key expiration and trust

Edit the key, list the indexs, and choose the primary key/index 0. Adjust if necessary. You can also edit the trust with the command of the same name.
```
gpg --edit-key <KEY_ID>
gpg> list
gpg> key 0
gpg> trust
```

Source [g-loaded.eu](https://www.g-loaded.eu/2010/11/01/change-expiration-date-gpg-key/)

See [this page](https://www.g-loaded.eu/2010/11/01/change-expiration-date-gpg-key/) for more.

# Transitioning to a new key

1. Generate New Key
2. Open Interative Edit `gpg --edit <KEY>`
3. Trust The new Key with the command`trust`

Source: [Apache.org](https://www.apache.org/dev/key-transition.html)

# Rovoking Keys

Using revoke generation:
```
gpg --output revoke.asc --gen-revoke <mkeyid>
```

Using an existing certificate
```
# If the key is not on the host machine already
gpg --recv-keys [key-id]

# Now import the key :
gpg --import [revocation-certificate-file]

# After doing so, send the keys back to the key servers again:
gpg --send-keys [key-id]

```

When a key is generated using GPG 2.x+, you should see the revocation certificates in `$HOME/.gnupg/openpgp-revocs.d`


# Tips

* use `gpg --export-options export-minimal` to avoid carrying information that quickly will be outdated or anyway it's not that useful

# Links

* [Exchanging keys](https://www.gnupg.org/gph/en/manual/x56.html)
* [GPG Cheat Sheet](http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/gpg-cs.html)
* [GPG documentation](https://www.gnupg.org/documentation/manpage.html)
* [pinentry info page](https://gist.github.com/ProfessorKaos64/05d1f284f931223624834788da045c65)
* [Instant GPG How-To](http://homepages.inf.ed.ac.uk/da/id/gpg-howto.shtml)
* [Revoking Keys](https://www.hackdiary.com/2004/01/18/revoking-a-gpg-key/)
* [Revoking Keys (GNUGPG](https://www.gnupg.org/gph/en/manual/c14.html)
