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
Soure: https://rmohan.com/?p=6400

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
