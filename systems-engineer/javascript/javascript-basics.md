# About

Simple notes on Java script. 

# Web IDE

Example worksheets are stored by username on https://repl.it/ (Web-based IDE).

# Coding style

* Curly brackets are commonly at the end of the keyword
* Use multiple files vs long-winded single files by utilizing `<script>` tags
* 

# Behavior

* Javascript will auto create variables, but it is good practice to use the var prefix `var MYVAR = VALUE`
* Javascript does not care about white space
* Weak typing language (generic variables)
  * Variables start off undefined and are not beholden to a type
  * The content of the variable is what matters (such as string, boolean, numbers etc.)
  * No guarantee the variable contains the type of data you expect it you
  * Numbers are reprsented as-is, and positive by default, sans quotes.

# Variables

* variables are represented literal, i.e. `value`, not `$value` or `"value"`

# Statements

You can combine statements on line with a comma

# Functions

* Functions can be added in any order (the interpreter scans for them first)
* Variables declared inside functions are referred to as "local variables".
* To make results visible, they must use `return` or declare the variable outside the function

# Keywords

**alert: **
```
alert("Hello world");
```

# Simple math

# Scripts

* Use scripts to seperate files.
* Order of execution below is very important.

```
<html>
	<head>
		<title>Simple page</title>
	</head>
	<body>
		<p>This is a very simple HTML page </p>
		<script>script1.js</script>
  <script>script2.js</script>
	<body>

</html>
```

