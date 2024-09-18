// Eloquent Javascript Chapter 2 Notes

// Expressions and Statements:

// Simplest Expression:
1;
!false;
// This is a useless program as it does nothing. It is just an expression that produces a value.

// Bindings:

let caught = 5 * 5;
// let is a keyword that defines a binding. Bindings are also called variables. The = operator assigns a value to the binding.

var name = "Ayda";
const greeting = "Hello";
console.log(greeting + name)
// var and const are also used to define bindings. var is an older way of defining bindings. const is used to define bindings that should not be changed.

// Binding Names:

// list of reserved binding keywords:

/*
    break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import interface in instanceof let new package private protected public return static super switch this throw true try typeof var void while with yield
*/

// The Environment:

// Functions:

// prompt does not work unless you are using a browser. It is a function that asks the user for input, but if you serve the module you can use the browser console to execute prompt.
// prompt("Enter passcode");

// The console.log Function

let x = 30;
console.log("the value of x is", x);
// the value of x is 30