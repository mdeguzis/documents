<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Configuring sendmail/mail](#configuring-sendmailmail)
- [Using sendmail](#using-sendmail)
  - [Modules](#modules)
  - [Basic email](#basic-email)
  - [Using attachments](#using-attachments)
  - [Using attachments (advanced)](#using-attachments-advanced)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Configuring sendmail/mail

TODO

# Using sendmail

## Modules

```
import subprocess
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
```

## Basic email

```
from email.mime.text import MIMEText
from subprocess import Popen, PIPE

msg = MIMEText("Here is the body of my message")
msg["From"] = "me@example.com"
msg["To"] = "you@example.com"
msg["Subject"] = "This is the subject."
p = subprocess.Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=subprocess.PIPE)
p.communicate(msg.as_string())
```

**Example:**

```
print "\n== Sending audit email ==\n"
date_stamp = str(time.strftime("%c"))
msg = MIMEText("This user is in the list of system users, but not AD/LDAP: \n\n" + str(invalid_system_users) +
"\n\nThese users were manually filterd out: \n\n" + user_skip_list)
msg["From"] = "email@domain.com"
msg["To"] = "email@domain.com"
msg["Subject"] = "User Audit for: " + date_stamp
                                      
p = subprocess.Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=subprocess.PIPE)
p.communicate(msg.as_string())
```

## Using attachments

This took a bit to figure out with sendmail. Another alternative is 'mailx'. Other methods are more lengthly in their implementation, but the below accomplishes what I set out to do.


```
       # Send email out if list that holds invalid users is not None
        if invalid_system_users:
            print "\n== Sending audit email ==\n"
            date_stamp = str(time.strftime("%c"))
            divider = str('-' * 80 + "\n")

            # create msg
            msg = MIMEMultipart()
            msg["From"] = "email@domain.com"
            msg["To"] = "email@domain.com"
            msg["Subject"] = "System User Audit for: " + date_stamp
            msg.attach(MIMEText(divider + "Processed AD Groups: \n" + divider + str(processed_ad_groups) +
            "\n\n" + divider + "Processed LDAP Groups: \n" + divider + str(processed_ldap_groups) +
            "\n\n" + divider + "These users are in the list of system users, but not AD/LDAP: \n" + divider + str(invalid_system_users) +
            "\n\n" + divider + "These users were manually filterd out: \n" + divider + str(user_skip_list) +
            "\n\nA copy of the complete audit actions is attached\n"))

            # add attachment
            f = file("/tmp/system-user-log.txt")
            attachment = MIMEText(f.read())
            attachment.add_header('Content-Disposition', 'attachment', filename='system-user-log.txt')
            msg.attach(attachment)

            # Send email
            p = subprocess.Popen(["/usr/sbin/sendmail", "-t", "-oi"], stdin=subprocess.PIPE)
            p.communicate(msg.as_string()) 
    else:
        print "Failed due to " + r.reason
```

## Using attachments (advanced)

For more advanced dynamic checks, see the "Python email examples" in the links below.

## If a process fails and you want to be notified

```
if ! some_command; then
        echo "Subject: analyze failed" | sendmail -v user@email.com
fi
```

# Links

* [Python email examples (docs.python.org)](https://docs.python.org/3/library/email-examples.html)
* [Logging library](https://docs.python.org/2/howto/logging.html)
* [Stack Overflow example 1](http://stackoverflow.com/questions/27621041/sending-email-attachment-txt-file-using-python-2-7-smtplib)
* [Sample sendmail documentation (jpsoft)](https://jpsoft.com/help/sendmail.htm)
* [Python email message module](https://docs.python.org/2/library/email.message.html#module-email.message)
