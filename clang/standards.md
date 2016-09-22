# About

Some notes on standards aroudn clang/llvm.

# `libstdc++` vs `-stdlib=libc++`

>The libstdc++ std::string is a different data structure than the libc++ std::string. The former is a reference counted design, whereas the latter is not. Although they are API compatible, they are not ABI compatible. That means that if you construct a std::string with libstdc++, and then pass it to other code that is linked against libc++, the receiving code would think it has a libc++ std::string. I.e. the receiver would not have a clue that it should be incrementing or decrementing reference counts.

>Without inline namespaces, the result would be a run time error. The best you could hope for is a crash. With inline namespaces this run time error is translated into a link time error.

>To you the programmer the libstdc++ std::string and the libc++ std::string look like the same type. But to the linker, they look like completely different types (the clue is the std::__1 namespace). And the linker's view is correct. They are completely different types.

>So yes, you could manipulate some preprocessor flags to get things to link. But then you would have a devil of a time debugging the resultant run time bugs.

>The only way to do what you want to is to make the interfaces between these dylibs not involve std::types such as string. For example you could pass arrays of char instead. You can even transfer memory ownership from libstdc++-linked code to libc++-linked code and vice-versa (they will both drop through to the same malloc pool).
