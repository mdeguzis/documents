If you mess up your fstab, this may help to recover things:

When booting, press e at the grub OS selection prompt

add init=/bin/bash to the end of the kernel command line and press enter. Example:
```
/boot/vmlinuz-<verson> root=UID=<SOME_UID> ro quiet splash init=/bin/bash
```
The system will boot to a prompt like 'bash-3.2#' enter the following commands at the prompt

```
mount -o remount,rw /
vim /etc/fstab
```
edit the fstab file commenting the errors by adding a # at the begining of each problematic line, save the file

reboot by pressing CTRL+ALT+DE
