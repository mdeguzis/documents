# Using sendmail

```
from email.mime.text import MIMEText
from subprocess import Popen, PIPE

msg = MIMEText("Here is the body of my message")
msg["From"] = "me@example.com"
msg["To"] = "you@example.com"
msg["Subject"] = "This is the subject."
p = Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=PIPE)
p.communicate(msg.as_string())
```

**Example:**

```
print "\n== Sending audit email ==\n"
date_stamp = str(time.strftime("%c"))
msg = MIMEText("This user is in the list of ranger users, but not AD/LDAP: \n\n" + str(invalid_ranger_users) +
"\n\nThese users were manually filterd out: \n\n" + user_skip_list)
msg["From"] = "email@domain.com"
msg["To"] = "email@domain.com"
msg["Subject"] = "User Audit for: " + date_stamp
                                      
p = Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=PIPE)
p.communicate(msg.as_string())  
```
