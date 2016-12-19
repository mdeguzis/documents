///////////////////////////////////////////////////////
// NOT DONE YET! Updated: 20161219
// Stop on "Creating a for loop
// Link: https://www.lynda.com/Programming-Foundations-tutorials/Creating-loop/83603/90460-4.html
///////////////////////////////////////////////////////

// Remove the beginning */ and endin /* to active the code block

// ------ BEGINNING OF BLOCK QUOTE ------ //
/*

// -----------------------------------------------------
//   strings
// -----------------------------------------------------

var myname = prompt("what is your name?");
alert ("Hello, " + myname);

// quotes
var quote_inside_quotes = '"This is in quotes"';
alert(quote_inside_quotes);

// lenth
alert("The length is: " + quote_inside_quotes.length);

// add line break
line_break = "line1 \nline2";
alert(line_break);

// -----------------------------------------------------
//   Math
// -----------------------------------------------------

var a = 5;
var b = 10;
var result = a * b;
alert("5 * 10 is: " + result);
var add_one = result + 1;
alert("Adding 1 to that result gives us: " + add_one );
var increment_one = add_one + 1;
alert("Incrementing one more gives us: " + increment_one);

// All three of these add 1 to a (default: 1)
// If you do not reset the value, you will increment
a = 1;
alert ("default value of a: " + a);

// using + <value>
a = a + 1;
alert("Adding one more: " + a);

// using +=
a += 1;
alert("Adding one more: " + a);

// Using ++
a++;
alert("Adding one more: " + a);


// -----------------------------------------------------
//  Conditionals
// -----------------------------------------------------

// -----------------------
// simple
// -----------------------

a = 2;

if ( a > 1 ) {

  alert("Statement is true (more than 1)" + "\nA value: " + a);

}

// -----------------------
// if then else
// -----------------------

// Be careful of nesting too many if staements
var balance = 15000;

if ( balance > 0 ) {
  alert("The balance is positive");
  if ( balance > 10000 ) {
    alert("The balance is over 10000");
  }
} else {
  alert ("The balance is negative");
}


// -----------------------------------------------------
//  Equality
// -----------------------------------------------------


// = assignment
// == Equality
// === strit equality
// ! not 

var a = 5;
var b = 10;

if ( a == b ) {
  alert("a equals b");
} else {
  alert("a is not equal to b");
}

// -----------------------
// Strick equality check
// -----------------------
// Normally, with '==' this would be true

var a = 5;
var b = "5";

if ( a == b ) {
  alert("Loosely speaking, a equals b");
} 

var a = 5;
var b = "5";

if ( a === b ) {
  alert("Strickly speaking, a DOES equal b");
} else {
  alert("Strickly speaking, a does NOT equal b");
} 

// -----------------------
// Combining Conditionals
// -----------------------

// && AND
// ||  OR

var a = 5;
var b = 5;
var c = 5;

if ( a === b && a == c) {
  alert("a is qual to b and c");
} else {
  alert("a is not qual to a and c");
} 

// -----------------------------
// Switch/Select/case Statement
// -----------------------------

var grade = prompt("Enter gase type regular,premium, or diesel: ");

switch ( grade ) {
  case "regular":
    alert("This is regular");
    break;
  case "premium":
    alert("This is Premium");
    break;
  case "diesel":
    alert("This is Diesal");
    break;
  default:
    alert("This is not a valid grade of gas");
    break;
}


//------------------------------------------------------
//  Functions
// -----------------------------------------------------

// -----------------------
// basic
// -----------------------

function myFunction() {
  var a = 5;
  var b = 10;
  var c = a + b;
  alert("Value of c is: " + c)
}

myFunction();

// -----------------------
// returning a value
// -----------------------

function myFunction(a,b) {
  result = a + b;
  return result;
}

myFunction(1,2);
alert("Result is: " + result);

// This is a global var
var c = 3;

function myFunction(a,b) {
  // this is a local var
  var d = 10;
  result = a + b + c;
  return result;
}

// -----------------------
// Simply call function
// -----------------------

myFunction(1,2);
alert("Result is: " + result);

// -----------------------------------
// Assign function result to a new var
// -----------------------------------

var do_math = myFunction(1,2);
alert("Result is: " + do_math);

// This will generate an error or not appear, as d is local
// Uncomment to test
// Adding 'var x;' after 'var c = 3;' above will allow This
// to be used
//alert(d);

//------------------------------------------------------
//  loops
//------------------------------------------------------

// Be very careful here or you will lock your
// browser session with an infinite loop!

a = 7;

while ( a < 10 ) {
  alert("A is: " + a);
  alert("Incrementing a and looping again..");
  a++;
}

// -----------------
// Using an index
// -----------------

var amount = 0;

// create index
var i = 0;

// check condition
while ( i < 10 ) {
  amount = amount += 100;
  i++;
}

alert("The value of amount is: " + amount);


// -----------------------
// For loop
// -----------------------

var amount = 0;

// Combines the above while loop into one
for ( var i =  0;  i < 10; i++ ) {
  amount = amount += 100;
}

alert("The value of amount is: " + amount);


// ------ END OF BLOCK QUOTE ------ //
*/

//---------------------------
//  block quotes
// --------------------------

/* 
This is a 
block quote
*/
