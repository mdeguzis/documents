<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [File types](#file-types)
  - [jar vs war](#jar-vs-war)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful notes for Java

# File types

## jar vs war

These files are simply zipped files using java jar tool. These files are created for different purposes. Here is the description of these files:

* `.jar` files: These files are with the .jar extension. The .jar files contain the libraries, resources and accessories files like property files.
* `.war` files: These files are with the .war extension. The war file contains the web application that can be deployed on the any servlet/jsp container. The .war file contains jsp, html, javascript and other files for necessary for the development of web applications.
* `.ear` files: The .ear file contains the EJB modules of the applications.

# Unpack a jar / war file

```
jar xf /path/to/jarfile.jar
```
