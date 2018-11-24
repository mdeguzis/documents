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

# Creating a basic GPG key

```
gpg --gen-key
```

# Creating a master key and subkeys

If a thief gets ahold of the laptop with your private key on it, it’s pretty much game over. The thief can not only decrypt messages intended for you, they can also impersonate you by signing messages with your private key. Your only recourse would be to revoke your key, but that would mean losing years of signatures on that key and basically creating a massive inconvenience for yourself.

Part of the answer to this problem is the concept of subkeys. Subkeys can’t prevent a thief from decrypting messages intended for your private key. But they can help mitigate the damage to your identity should your key be lost or stolen.

The concept behind this technique is as follows:

1. Create a regular GPG keypair. By default GPG creates one signing subkey (your identity) and one encryption subkey (how you receive messages intended for you).

2. Use GPG to add an additional signing subkey to your keypair. This new subkey is linked to the first signing key. Now we have three subkeys.

3. This keypair is your master keypair. Store it in a protected place like your house or a safe-deposit box. Your master keypair is the one whose loss would be truly catastrophic.

4. Copy your master keypair to your laptop. Then use GPG to remove the original signing subkey, leaving only the new signing subkey and the encryption subkey. This transforms your master keypair into your laptop keypair.

First, create the key if you have not already:
```
gpg --gen-key
```

Next, add the subkey:
```
gpg --list-keys
gpg --edit-key <KEY_ID>
```

At the gpg> prompt, enter the command addkey. Select RSA (sign only) and 4096 for the keysize. Don’t forget to save at the last gpg> prompt.

```
gpg> save
```

Source: https://alexcabal.com/creating-the-perfect-gpg-keypair

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

# Renewing an Expired Key You OWn

First, if you need to, find the key in question:
```
W: GPG error: http://packages.libregeek.org brewmaster InRelease: The following signatures were invalid: KEYEXPIRED 1542673611 KEYEXPIRED 1542673611 KEYEXPIRED 1542673611
```

On Debian-based systems you can use `apt-key` here:
```
desktop@steamos:~/steamos-tools$ sudo apt-key list | grep -A 1 -B 2 "expired: "
/etc/apt/trusted.gpg.d/libregeek-archive-keyring.gpg
----------------------------------------------------
pub   4096R/7113232D 2016-11-23 [expired: 2018-11-20]
uid                  Michael DeGuzis <mdeguzis@gmail.com>

pub   4096R/34C589A7 2015-09-17 [expired: 2018-11-20]
uid                  SteamOS-Tools Signing Key (SteamOS-Tools repository signing key) <mdeguzis@gmail.com>

pub   4096R/57655DD5 2016-11-04 [expired: 2018-11-20]
uid                  LibreGeek Signing Key <mdeguzis@gmail.com>
```

On the original machine that hosts your public and private key, confirm it's existance:
```
[mikeyd@archboxmtd: ~]$ gpg --list-keys 7113232D
pub   rsa4096 2016-11-23 [SC] [expired: 2018-11-20]
      786FACA94AF4CD9E43AA3CC705ACDA747113232D
uid           [ expired] Michael DeGuzis <mdeguzis@gmail.com>
```

Edit the key, list the indexs, and choose the primary key/index 0. Adjust if necessary. 
```
gpg --edit-key <KEY_ID>
gpg> list
gpg> key 0
gpg> expire
```

If you receive this message, ensure your subkey (ssb when using `list` above) is also changed:
```
gpg: WARNING: Your encryption subkey expires soon.
gpg: You may want to change its expiration date too.
gpg> 
```

Sync you keys (see public syncing below).

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
[mikeyd@archboxmtd: ~]$ gpg --keyserver pgp.mit.edu --recv-key 7113232D
gpg: key 05ACDA747113232D: "Michael DeGuzis <mdeguzis@gmail.com>" 1 new signature
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   5  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 5u
gpg: next trustdb check due at 2023-11-23
gpg: Total number processed: 1
gpg:         new signatures: 1
```

Visit the keyserver to confirm your key has been updated (may take some time). Per the above example, search for `05ACDA747113232D`. You may have to prepend the key search, such as `0x05acda747113232d`.

Remeber!: https://lists.gnupg.org/pipermail/gnupg-users/2004-February/021832.html
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
