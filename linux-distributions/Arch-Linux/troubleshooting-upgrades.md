<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Corrupted package(s)](#corrupted-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Details some issues i've faced when upgrading. Always check Arch Linux news before attempting anything here.

# Corrupted package(s)

```
Packages (2) confuse-3.1-1  libftdi-1.3-4

Total Installed Size:  0.74 MiB
Net Upgrade Size:      0.14 MiB

:: Proceed with installation? [Y/n] y
(2/2) checking keys in keyring                                                            [----------------------------------------------------] 100%
(2/2) checking package integrity                                                          [----------------------------------------------------] 100%
error: confuse: signature from "Baptiste Jonglez <baptiste@bitsofnetworks.org>" is marginal trust
:: File /var/cache/pacman/pkg/confuse-3.1-1-x86_64.pkg.tar.xz is corrupted (invalid or corrupted package (PGP signature)).
Do you want to delete it? [Y/n] 
error: libftdi: signature from "Baptiste Jonglez <baptiste@bitsofnetworks.org>" is marginal trust
:: File /var/cache/pacman/pkg/libftdi-1.3-4-x86_64.pkg.tar.xz is corrupted (invalid or corrupted package (PGP signature)).
Do you want to delete it? [Y/n] 
error: failed to commit transaction (invalid or corrupted package (PGP signature))
Errors occurred, no packages were upgraded.
```

Ensure the keyring is populated and correct
```
[mikeyd@archboxmtd backup_drive]$ sudo pacman-key --init
[mikeyd@archboxmtd backup_drive]$ sudo pacman-key --populate archlinux
==> ERROR: The keyring file /usr/local/share/pacman/keyrings/archlinux.gpg does not exist.
```

An issue was discovered then in a local copy of `pacman-key`. Also check for any other items in  `/usr/local/bin`. After the local copy was removed:


```
pacman -Syu haveged
systemctl start haveged
systemctl enable haveged

rm -fr /etc/pacman.d/gnupg
pacman-key --init
pacman-key --populate archlinux
```

From: https://www.archlinux.org/news/gnupg-21-and-the-pacman-keyring/
