<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About
This page provides some high-level oveview material of Java. Specific topics will be split into additional pages.

# Overview

* Java is an object oriented and interpreted language that procues portable applications between platofrms
* Java != Javascript (JavaScript is an interpreted language that's used in web browsers and other dynamic environments).

## Java vs C++

C++                     |      Java             
------------------------|------------------------
Compatible with C | Not compatible with previous languages 
Compiled to native machine language | Compiled to bytecode 
Allows direct calls to native system libraries | Calls to native functions go through JNI 
Write once, compile anywhere | Write once, run anywhere 
Exposes low-level system functions | Runs in a protected virtual machine (JVM) 
Explicit memory management and pointers | Managed memory access 
Multiple inheritance  | Limited to single inheritance 

# Definitions

* Encapsultation - Packaging complex functionality for ease of programming and hiding complex functionality in methods

# Classes

* Static - A member of this class can be called fromthe class itself, vs an instance of it.
* A package is a globally unique string that typically starts with your domain name in reverse domain order. So if my domain is david.com, I would start my package string with com.david to ensure globally unique identifiers

## Simple Java class

```
package com.example;

public class Main {
  public static void main(String[] args_ {
    System.out.println("Hello World");
  }
}
```

# Data types

## Primitive

all lowercase, numbers/characters/booleans, and stored in the fastest available memory

# Keywords

* Extends - Create a subclass of a super class

# Objects

* An object is an instance of a class
* They can have multiple references
* Non-primitive varibales are reference to objects
