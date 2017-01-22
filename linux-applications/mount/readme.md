# Mount USB as rw

```
# one way
 mount -t vfat  /dev/sda2 /media/bigdrive -o rw,umask=000
 
 # another way
 mount -o umask=0,uid=nobody,gid=nobody /dev/something /mnt/somewhere
 ```
