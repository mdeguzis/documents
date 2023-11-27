"""
Write me a function to copy a specific file to multiple hosts. Each host requres a different version of the file.

Here we are assuming you have an SSH client ready / using Bash (scp/rsync maybe)
"""

import subprocess

def copy_file(host, file, toloc):
    print(f"Copying file from {host} to {toloc}")
    subprocess.run(['scp', file, f"{host}:{toloc}"])

hosts = []
hosts.append({"host": "devbox1", "file": "file1.txt", "end_location": "/tmp"})
hosts.append({"host": "devbox2", "file": "file2.txt", "end_location": "/tmp"})
hosts.append({"host": "devbox3", "file": "file3.txt", "end_location": "/tmp"})
hosts.append({"host": "devbox4", "file": "file4.txt", "end_location": "/tmp"})

for host in hosts:
	print(f"Copying {host['file']} to {host['host']} now..")
	copy_file(host['host'], host['file'], host['end_location'])