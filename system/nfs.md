# About 

Creating and utilizing NFS in Red Hat / Centos / Fedora

# How to

There are two ways to configure exports on an NFS server:

* Manually editing the NFS configuration file, that is, `/etc/exports`
* Through the command line, that is, by using the command `exportfs`

The /etc/exports file controls which file systems are exported to remote hosts and specifies options. It follows the following syntax rules:

* Blank lines are ignored.
* To add a comment, start a line with the hash mark (#).
* You can wrap long lines with a backslash (\).
* Each exported file system should be on its own individual line.
* Any lists of authorized hosts placed after an exported file system must be separated by space characters.
* Options for each of the hosts must be placed in parentheses directly after the host identifier, without any spaces separating the host and the first parenthesis.

Each entry for an exported file system has the following structure:
```
export host(options)
```

The aforementioned structure uses the following variables:
**export:**  
  The directory being exported
**host**  
  The host or network to which the export is being shared
**options**  
  The options to be used for host

It is possible to specify multiple hosts, along with specific options for each host. To do so, list them on the same line as a space-delimited list, with each hostname followed by its respective options (in parentheses), as in:

```
export host1(options1) host2(options2) host3(options3)
```

In its simplest form, the /etc/exports file only specifies the exported directory and the hosts permitted to access it, as in the following example:
⁠
```
/exported/directory bob.example.com
```

The default settings are:

**ro**  
The exported file system is read-only. Remote hosts cannot change the data shared on the file system. To allow hosts to make changes to the file system (that is, read/write), specify the rw option.

**sync**  
The NFS server will not reply to requests before changes made by previous requests are written to disk. To enable asynchronous writes instead, specify the option async.

**wdelay**  
The NFS server will delay writing to the disk if it suspects another write request is imminent. This can improve performance as it reduces the number of times the disk must be accesses by separate write commands, thereby reducing write overhead. To disable this, specify the no_wdelay. no_wdelay is only available if the default sync option is also specified.

**root_squash**  
This prevents root users connected remotely (as opposed to locally) from having root privileges; instead, the NFS server will assign them the user ID nfsnobody. This effectively "squashes" the power of the remote root user to the lowest local user, preventing possible unauthorized writes on the remote server. To disable root squashing, specify no_root_squash.

# IMPORTANT

The format of the /etc/exports file is very precise, particularly in regards to use of the space character. Remember to always separate exported file systems from hosts and hosts from one another with a space character. However, there should be no other space characters in the file except on comment lines.

For example, the following two lines do not mean the same thing:

```
/home bob.example.com(rw) 
/home bob.example.com (rw)
```

The first line allows only users from bob.example.com read/write access to the /home directory. The second line allows users from bob.example.com to mount the directory as read-only (the default), while the rest of the world can mount it read/write.

#  The exportfs Command

Every file system being exported to remote users with NFS, as well as the access level for those file systems, are listed in the /etc/exports file. When the nfs service starts, the /usr/sbin/exportfs command launches and reads this file, passes control to rpc.mountd (if NFSv2 or NFSv3) for the actual mounting process, then to rpc.nfsd where the file systems are then available to remote users.

When issued manually, the /usr/sbin/exportfs command allows the root user to selectively export or unexport directories without restarting the NFS service. When given the proper options, the /usr/sbin/exportfs command writes the exported file systems to /var/lib/nfs/xtab. Since rpc.mountd refers to the xtab file when deciding access privileges to a file system, changes to the list of exported file systems take effect immediately.

The following is a list of commonly-used options available for /usr/sbin/exportfs:

**-r**  
Causes all directories listed in /etc/exports to be exported by constructing a new export list in /etc/lib/nfs/xtab. This option effectively refreshes the export list with any changes made to /etc/exports.

**-a**  
Causes all directories to be exported or unexported, depending on what other options are passed to /usr/sbin/exportfs. If no other options are specified, /usr/sbin/exportfs exports all file systems specified in /etc/exports.

**-o file-systems**  
Specifies directories to be exported that are not listed in /etc/exports. Replace file-systems with additional file systems to be exported. These file systems must be formatted in the same way they are specified in /etc/exports. This option is often used to test an exported file system before adding it permanently to the list of file systems to be exported. Refer to Section 8.7.1, “The /etc/exports Configuration File” for more information on /etc/exports syntax.

**-i**  
Ignores /etc/exports; only options given from the command line are used to define exported file systems.

**-u**  
Unexports all shared directories. The command /usr/sbin/exportfs -ua suspends NFS file sharing while keeping all NFS daemons up. To re-enable NFS sharing, use exportfs -r.

**-v**  
Verbose operation, where the file systems being exported or unexported are displayed in greater detail when the exportfs command is executed.

If no options are passed to the exportfs command, it displays a list of currently exported file systems. For more information about the exportfs command, refer to man exportfs.

# Using exportfs with NFSv4

In Red Hat Enterprise Linux 7, no extra steps are required to configure NFSv4 exports as any filesystems mentioned are automatically available to NFSv3 and NFSv4 clients using the same path. This was not the case in previous versions.
To prevent clients from using NFSv4, turn it off by setting RPCNFSDARGS= -N 4 in /etc/sysconfig/nfs.

# Troubleshooting

f NFS fails to start, check /var/log/messages. Commonly, NFS fails to start if you specify a port number that is already in use. After editing /etc/sysconfig/nfs, you need to restart the nfs-config service for the new values to take effect in Red Hat Enterprise Linux 7.2 and prior by running:

```
# systemctl restart nfs-config
```

Then, restart the NFS server:
```
# systemctl restart nfs-server
```

Run `rpcinfo -p` to confirm the changes have taken effect.

# Discovering NFS exports

There are two ways to discover which file systems an NFS server exports. First, on any server that supports NFSv2 or NFSv3, use the showmount command:

```
$ showmount -e myserver
Export list for mysever
/exports/foo
/exports/bar
```

Second, on any server that supports NFSv4, mount / and look around.
``
# mount myserver:/ /mnt/
#cd /mnt/
exports
# ls exports
foo
bar
```

# Links

* [Source: NFS server configuration](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/nfs-serverconfig.html)
