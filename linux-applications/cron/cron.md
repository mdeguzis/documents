# About

Useful info for cron (automation).

# Useful commands

## Listing all jobs for all users

```
for user in $(cut -f1 -d: /etc/passwd); do sudo crontab -u $user -l; done
```
