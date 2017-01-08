<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful commands](#useful-commands)
  - [Listing all jobs for all users](#listing-all-jobs-for-all-users)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for cron (automation).

# Useful commands

## Listing all jobs for all users

```
for user in $(cut -f1 -d: /etc/passwd); do sudo crontab -u $user -l; done
```
