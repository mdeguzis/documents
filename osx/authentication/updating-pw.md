<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Regarding secure-boot password](#regarding-secure-boot-password)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Regarding secure-boot password

This mainly is an issue when your user password is out of sync with the secure FileVault due to chaning a password wrong
or doing so without a network connection to your corporate org.

Active Directory password changes maybe not syncing to FileVault on High Sierra

```
sudo sysadminctl interactive -secureTokenStatus username
sudo sysadminctl interactive -secureTokenOn username -password –
sudo diskutil apfs updatePreboot /
```

https://www.jamf.com/jamf-nation/discussions/27675/active-directory-password-changes-maybe-not-syncing-to-filevault-on-high-sierra
