# Performance Impact of Using dict() Instead of {} 

With CPython 2.7, using dict() to create dictionaries takes up to 6 times longer and involves more memory allocation operations than the literal syntax. Use {} to create dictionaries, especially if you are pre-populating them, unless the literal syntax does not work for your case.

**In summary:**  

Calling dict() requires these steps:

* Find the object associated with the name “dict” and push it onto the stack.
*  Push the key/value pairs onto the stack as constant values.
* Get the key/value pairs off of the stack and create a dictionary to hold the keyword arguments to the function.
* Call the constructor for dict to make a new object.
* Initialize the new object by passing the keyword arguments to its initialization method.
* Resize the new dict and copy the key/value pairs into it from the keyword arguments.

Whereas using {} to create a dictionary uses only these steps:

* Create an empty but pre-allocated dictionary instance.
* Push the key/value pairs onto the stack as constant values.
* Store each key/value pair in the dictionary.

# Links

* [Performance Impact of Using dict() Instead of {} (doughellmann)](https://doughellmann.com/blog/2012/11/12/the-performance-impact-of-using-dict-instead-of-in-cpython-2-7-2/)
