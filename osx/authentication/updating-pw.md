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
