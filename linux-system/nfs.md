<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Logs and Stats](#logs-and-stats)
- [How to](#how-to)
- [IMPORTANT](#important)
- [The exportfs Command](#the-exportfs-command)
- [Using exportfs with NFSv4](#using-exportfs-with-nfsv4)
- [Troubleshooting](#troubleshooting)
  - [Startup failures](#startup-failures)
  - [Owner/group shows as 'nobody'](#ownergroup-shows-as-nobody)
  - [These commands are what I did on CentOS Linux release 7.2.1511 (Core)](#these-commands-are-what-i-did-on-centos-linux-release-721511-core)
- [Discovering NFS exports](#discovering-nfs-exports)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Creating and utilizing NFS in Red Hat / Centos / Fedora

# Logs and Stats

```
mount -l
```

```
cat /proc/self/mountstats | less
```

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

**This is only needed if modifying/changing the top level folder, not subdirs**

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

## Startup failures
If NFS fails to start, check /var/log/messages. Commonly, NFS fails to start if you specify a port number that is already in use. After editing /etc/sysconfig/nfs, you need to restart the nfs-config service for the new values to take effect in Red Hat Enterprise Linux 7.2 and prior by running:

```
# systemctl restart nfs-config
```

Then, restart the NFS server:
```
# systemctl restart nfs-server
```

Run `rpcinfo -p` to confirm the changes have taken effect.

## Owner/group shows as 'nobody'


Issue:
-   On Red Hat Enterprise Linux a NFS mounted share shows "nobody" as the owner and groupowner of all the files and directory.

Resolution:
1.  Create the same user on the Server and Client
2.  Use a centralized namespace like LDAP domain, NIS, Active Directory etc

Root Cause:
The observed behavior is an expected and intended behavior and is not related to RHEL5 or RHEL6 but instead it is related to NFSv3 and NFSv4.

In NFSv3 the username and groupname is mapped from the UID/GID value, the UID/GID of the user creating the resource is saved on the server, When the clients access it , the `/etc/passwd` and `/etc/gpasswd` file will be checked to see if the `id` exists and for which user it will be mapped to , If there is a user with the same uid and gid, then it will be mapped to that user , else the numeric value will be shown.

In NFSv4 the concept is `user@domainname`, if there is no centralized usermapping, then the user will be mapped to the default user nobody or whatever user has been configured in `/etc/idmapd.conf`.

Check for mis-configuration of the /etc/imapd.conf file. If you make changes to the idmapd.conf file, on RHEL 6.5 and newer the command to clear out the old mappings is:

`# nfsidmap -c`

NFSv4 mount incorrectly shows all files with ownership as nobody:nobody

From the client, the mounted NFSv4 share has ownership for all files and directories listed as nobody:nobody instead of the actual user that owns them on the NFSv4 server, or who created the new file and directory.\
Seeing nobody:nobody permissions on nfsv4 shares on the nfs client. Also seeing the following error in /var/log/messages:nss_getpwnam: name 'root@example.com' does not map into domain 'localdomain'\
Resolution\
Modify the /etc/idmapd.conf with the proper domain (FQDN), on both the client and server. In this example, the proper domain is "example.com" so the "Domain =" directive within /etc/idmapd.conf should be modified to read:

Domain = example.com\
Note:\
If using a NetApp Filer, the NFS.V4.ID.DOMAIN parameter must be set to match the "Domain =" parameter on the client.\
If using a Solaris machine as the NFS server, the NFSMAPID_DOMAIN value in /etc/default/nfs must match the RHEL clients Domain.\

To put the changes into effect restart the rpcidmapd service and remount the NFSv4 filesystem:

```
service rpcidmapd restart
mount -o remount /nfs/mnt/point
```

Note: It is only necessary to restart rpc.idmapd service on systems where rpc.idmapd is actually performing the id mapping. On RHEL 6.3 and newer NFS CLIENTS, the maps are stored in the kernel keyring and the id mapping itself is performed by the /sbin/nfsidmap program. On older NFS CLIENTS (RHEL 6.2 and older) as well as on all NFS SERVERS running RHEL, the id mapping is performed by rpc.idmapd.\

Ensure the client and server have matching UID's and GID's. It is a common misconception that the UID's and GID's can differ when using NFSv4. The sole purpose of id mapping is to map an id to a name and vice-versa. ID mapping is not intended as some sort of replacement for managing id's.\

On Red Hat Enterprise Linux 6, if the above settings have been applied and UID/GID's are matched on server and client and users are still being mapped to nobody:nobody than a clearing of the idmapd cache may be required:

```
nfsidmap -c
```

Note: The above command is only necessary on systems that use the keyring-based id mapper, i.e. NFS CLIENTS running RHEL 6.3 and higher. On RHEL 6.2 and older NFS CLIENTS as well as all NFS SERVERS running RHEL, the cache should be cleared out when rpc.idmapd is restarted.
Another check, see if the passwd:, shadow: and group: settings are set correctly in the /etc/nsswitch.conf file on both Server and Client.
Disabling idmapping
By default, RHEL6.3 and newer NFS clients and servers disable idmapping when utilizing the AUTH_SYS/UNIX authentication flavor by enabling the following booleans:

NFS client
```
echo 'Y' > /sys/module/nfs/parameters/nfs4_disable_idmapping
```

NFS server
```
echo 'Y' > /sys/module/nfsd/parameters/nfs4_disable_idmapping
```

If using a NetApp filer, the options nfs.v4.id.allow_numerics on command can be used to disable idmapping. More information can be found here.

With this boolean enabled, NFS clients will instead send numeric UID/GID numbers in outgoing attribute calls and NFS servers will send numeric UID/GID numbers in outgoing attribute replies.

If NFS clients sending numeric UID/GID values in a SETATTR call receive an NFS4ERR_BADOWNER reply from the NFS server clients will re-enable idmapping and send user@domain strings for that specific mount from that point forward.\
Note: This option can only be used with AUTH_SYS/UNIX authentication flavors, if you wish to use something like Kerberos, idmapping must be used.

Root Cause
NFSv4 utilizes ID mapping to ensure permissions are set properly on exported shares, if the domains of the client and server do not match then the permissions are mapped to nobody:nobody.

Diagnostic Steps
Debugging/verbosity can be enabled by editing /etc/sysconfig/nfs:

RPCIDMAPDARGS="-vvv"\
The following output is shown in /var/log/messages when the mount has been completed and the system shows nobody:nobody as user and group permissions on directories and files:

```
Jun 3 20:22:08 node1 rpc.idmapd[1874]: nss_getpwnam: name 'root@example.com' does not map into domain 'localdomain'
Jun 3 20:25:44 node1 rpc.idmapd[1874]: nss_getpwnam: name 'root@example.com' does not map into domain 'localdomain'
```

Collect a tcpdump of the mount attempt:

```
tcpdump -s0 -i {INTERFACE} host {NFS.SERVER.IP} -w /tmp/{casenumber}-$(hostname)-$(date +"%Y-%m-%d-%H-%M-%S").pcap &
```

If a TCP packet capture has been obtained, check for a nfs.nfsstat4 packet that has returned a non-zero response equivalent to 10039 (NFSV4ERR_BADOWNER).
From the NFSv4 RFC:

```
NFS4ERR_BADOWNER = 10039,/* owner translation bad */
NFS4ERR_BADOWNER An owner, owner_group, or ACL attribute value
```
can not be translated to local representation.

These commands are what I did on CentOS Linux release 7.2.1511 (Core)
---------------------------------------------------------------------

Install nfs-utils
```
yum install -y nfs-utils
```

Append text to `/etc/fstab`
```
192.168.1.100:/mnt/nfs-server /mnt/nfs-client nfs defaults,nofail,x-systemd.automount 0 0
```

Some articles said `noauto,x-systemd.automount` is better, but it worked without `noauto` for me.

Check whether mount works
```
systemctl start rpcbind
systemctl enable rpcbind
mount -a
```

Fix the problem CentOS 7 won't auto-mount NFS on boot

Append text to the end of /usr/lib/systemd/system/nfs-idmap.service

```
[Install]
WantedBy=multi-user.target
```

Append text to the end of /usr/lib/systemd/system/nfs-lock.service

```
[Install]
WantedBy=nfs.target
```

Enable related services

```
systemctl enable nfs-idmapd.service
systemctl enable rpc-statd.service
systemctl enable rpcbind.socket

systemctl status nfs-idmapd.service -l
systemctl status rpc-statd.service --l
```

Then restarted the OS, I got it.

```
shutdown -r now
```

# Discovering NFS exports

There are two ways to discover which file systems an NFS server exports. First, on any server that supports NFSv2 or NFSv3, use the showmount command:

```
$ showmount -e myserver
Export list for mysever
/exports/foo
/exports/bar
```

Second, on any server that supports NFSv4, mount / and look around.
```
# mount myserver:/ /mnt/
#cd /mnt/
exports
# ls exports
foo
bar
```

# Links

* [Source: NFS server configuration](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/nfs-serverconfig.html)
