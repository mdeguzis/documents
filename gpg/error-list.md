<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Line passed to IPC too long](#line-passed-to-ipc-too-long)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Line passed to IPC too long

This may come up with signing with your secret GPG key via pinentry(-curses). 
Check first that your key is not expired or otherwise not functioning by creating a simple file and singing with your gpg key.

Test:

```
touch gpg-test-file
gpg --sign --default-key <GPG_KEY> gpg-test-file
```

It is also likley that the key string you provided is wrong or incorrect.

**Other strange reasons why this happens**

I have also see this happen to me over SSH from my mobile device. I checked https://wiki.archlinux.org/index.php/GnuPG for any hints of why this may be happening. 

GPG_TTY was set to `/dev/pts/0` while logged in via SSH on my Android device. I was checking around the net and did stumble upon [error codes](http://www.gnu-darwin.org/www001/src/ports/security/libgpg-error/work/libgpg-error-1.5/src/err-codes.h.in), noting

    # Error codes pertaining to the Assuan IPC interface
    263	GPG_ERR_ASS_LINE_TOO_LONG	Line passed to IPC too long

Signing works normally with my main personal key:

    gpg --sign test-file

But, a specific key I have used main times in the past gives "gpg: singing failed: Line passed to IPC too long". That error displays twice, which is odd as well. The funnything is, if I sign a test file with another key, it seems to "unlock" things, and I can then sign a new file with the "bad" key. 

Solution: use `/usr/bin/pinentry-tty` instead of `/usr/bin/pinentry-curses`
