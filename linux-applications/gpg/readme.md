<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Encrypt and DeCrypt a file](#encrypt-and-decrypt-a-file)
  - [When you are sharing documents](#when-you-are-sharing-documents)
  - [When communicating the key to others is not needed](#when-communicating-the-key-to-others-is-not-needed)
- [GPG status flags](#gpg-status-flags)
- [Distributing keys](#distributing-keys)
- [Adjusting key expiration and trust](#adjusting-key-expiration-and-trust)
- [Transitioning to a new key](#transitioning-to-a-new-key)
- [Rovoking Keys](#rovoking-keys)
- [Sync keys to a public server](#sync-keys-to-a-public-server)
- [Tips](#tips)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
Useful information about GPG / GNUPG

# Encrypt and DeCrypt a file

Note regarding symetric ciphers:
> Documents may also be encrypted without using public-key cryptography. Instead, only a symmetric cipher is used to encrypt the document. The key used to drive the symmetric cipher is derived from a passphrase supplied when the document is encrypted, and for good security, it should not be the same passphrase that you use to protect your private key. Symmetric encryption is useful for securing documents when the passphrase does not need to be communicated to others. A document can be encrypted with a symmetric cipher by using the --symmetric option.

## When you are sharing documents

encrypt
```
alice% gpg --output doc.gpg --encrypt --recipient blake@cyb.org doc
```

decrypt
```
blake% gpg --output doc --decrypt doc.gpg
```

## When communicating the key to others is not needed 
This is useful for simple passworded documents

Encrypt
```
# Default
gpg -c important.docx

# Strong AES-256 cipher
gpg -c --cipher-algo AES256 important.docx
```

DeCrypt
```
gpg important.dox.gpg
```

Source: https://www.gnupg.org/gph/en/manual/x110.html

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
gpg --armour --export PUBKEY_ID > my_pubkey.asc
```

# Adjusting key expiration and trust

Edit the key, list the indexs, and choose the primary key/index 0. Adjust if necessary. 
```
gpg --edit-key <KEY_ID>
gpg> list
gpg> key 0
gpg> expire
```

You can also edit the trust with the command of the same name.
```
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

# Sync keys to a public server

```
alice% gpg --keyserver pgp.mit.edu --recv-key 0xBB7576AC
gpg: requesting key BB7576AC from pgp.mit.edu ...
gpg: key BB7576AC: 1 new signature

gpg: Total number processed: 1
gpg:         new signatures: 1
alice% gpg --keyserver pgp.mit.edu --send-key blake@cyb.org
gpg: success sending to 'pgp.mit.edu' (status=200)
```

See: https://www.gnupg.org/gph/en/manual/x457.html

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
