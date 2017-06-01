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

# Unpacking files

## Unpack a jar / war file

```
jar xf /path/to/jarfile.jar
```

## Unpacking class / binary files

There are a few different appraoches to this:

You can get this info using [BCEL](http://jakarta.apache.org/bcel/)

```
The Byte Code Engineering Library is intended to give users a convenient possibility to analyze, create, and manipulate (binary) Java class files (those ending with .class). Classes are represented by objects which contain all the symbolic information of the given class: methods, fields and byte code instructions, in particular.
```

Or You can also Use {Reflection API](http://download.oracle.com/javase/tutorial/reflect/index.html) to get info from class file. However Reflection does not get info from the class file but from the class object

You can try to use java decompile,e.g jad,jadclipse 

http://docs.oracle.com/javase/7/docs/technotes/tools/windows/javap.html
http://www.redhat.itopstube.com/2012/02/protect-your-java-code-from-reverse.html

```
javap -c Function.class
```

http://www.javadecompilers.com/

A cloud based JAD: 

RHEL:

http://archive.download.redhat.com/pub/redhat/linux/7.2/en/doc/HOWTOS/Java-Decompiler-HOWTO
