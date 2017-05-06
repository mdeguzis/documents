<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Checking](#checking)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Working with java keystores

# Checking

Check a stand-alone certificate
```
keytool -printcert -v -file mydomain.crt
```

Check which certificates are in a Java keystore
```
keytool -list -v -keystore keystore.jks
```

Check a particular keystore entry using an alias
```
keytool -list -v -keystore keystore.jks -alias mydomain
```

# Links

* https://www.sslshopper.com/article-most-common-java-keytool-keystore-commands.html
