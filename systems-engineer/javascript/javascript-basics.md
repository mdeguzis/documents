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

# Loops

Be very careful here or you will lock your browser session with an infinite loop!

**Simple**
```
a = 7;

while ( a < 10 ) {
  alert("A is: " + a);
  alert("Incrementing a and looping again..");
  a++;
}
```

**Using an index**
```
var amount = 0;

// create index
var i = 0;

// check condition
while ( i < 10 ) {
  amount = amount += 100;
  i++;
}

alert("The value of amount is: " + amount);
```

**for loop**
```
var amount = 0;

// Combines the above while loop into one
for ( var i =  0;  i < 10; i++ ) {
  amount = amount += 100;
}

alert("The value of amount is: " + amount);
```

**do while**
```
var a = 1;

do {
  // code here
  // This block is always* run at least once!
  a++;
} while ( a < 10 );

// This then should resolve to 10
alert("The value of a is: " + a);
```

# Methods 

type a period after a var and a method or property

```
var string = "This is a sentence";
alert(string.toUpperCase());
```

**comparison**
```
var str1 = "hello";
var str2 = "HELLO";

if ( str1.toLowerCase() == str2.toLowerCase() ) {
  alert("Yes they are the same");
} else {
  alert("They are not the same");
}
```

**searching srings**
```
var phrase = "The best OS is Linux!";
var position = phrase.indexOf("Linux"); // 15

// Return -1 if the term is not found
// Try windows instead below :P
if ( phrase.indexOf("Linux") == -1 ) {
  alert("The phrase Linux is not found :(")
} else {
  alert("Linux is found! " + "Position: " + position)
}
```

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

