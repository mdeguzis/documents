# About

General troublehooting tips for disks

# Startup Failures

## Failed to start file system check on /dev/disk/by-uuid

Seen a lot on startup on systems using systemd


```
-- Reboot --
Apr 03 19:33:17 archboxmtd systemd[1]: Starting File System Check on /dev/disk/by-uuid/efb0f972-eaca-4eee-98df-2c9b69b8a5d3...
Apr 03 19:33:18 archboxmtd systemd-fsck[452]: home contains a file system with errors, check forced.
Apr 03 19:33:18 archboxmtd systemd-fsck[452]: home: Inodes that were part of a corrupted orphan linked list found.
Apr 03 19:33:18 archboxmtd systemd-fsck[452]: home: UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY.
Apr 03 19:33:18 archboxmtd systemd-fsck[452]:         (i.e., without -a or -p options)
Apr 03 19:33:18 archboxmtd systemd-fsck[452]: fsck failed with exit status 4.
Apr 03 19:33:18 archboxmtd systemd-fsck[452]: Running request emergency.target/start/replace
Apr 03 19:33:18 archboxmtd systemd[1]: systemd-fsck@dev-disk-by\x2duuid-efb0f972\x2deaca\x2d4eee\x2d98df\x2d2c9b69b8a5d3.service: Main process exited,>
Apr 03 19:33:18 archboxmtd systemd[1]: systemd-fsck@dev-disk-by\x2duuid-efb0f972\x2deaca\x2d4eee\x2d98df\x2d2c9b69b8a5d3.service: Failed with result '>
Apr 03 19:33:18 archboxmtd systemd[1]: Failed to start File System Check on /dev/disk/by-uuid/efb0f972-eaca-4eee-98df-2c9b69b8a5d3.
Apr 03 19:36:28 archboxmtd systemd[1]: Starting File System Check on /dev/disk/by-uuid/efb0f972-eaca-4eee-98df-2c9b69b8a5d3...
Apr 03 19:36:28 archboxmtd systemd-fsck[524]: home: clean, 887476/7585792 files, 23842615/30331647 blocks
Apr 03 19:36:28 archboxmtd systemd[1]: Started File System Check on /dev/disk/by-uuid/efb0f972-eaca-4eee-98df-2c9b69b8a5d3.
Apr 03 19:36:36 archboxmtd systemd[1]: Stopped File System Check on /dev/disk/by-uuid/efb0f972-eaca-4eee-98df-2c9b69b8a5d3.
```

From:
```
sudo journalctl -u "systemd-fsck@dev-disk-by\\x2duuid-efb0f972\\x2deaca\\x2d4eee\\x2d98df\\x2d2c9b69b8a5d3.service
```

Run fsck on the drive and review the output.

Source: https://bbs.archlinux.org/viewtopic.php?id=53732
