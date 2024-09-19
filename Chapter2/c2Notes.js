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

// Return Values:

console.log(Math.max(2, 4));
// 4
console.log(Math.min(2, 4) + 100);
// 102

// A return value is what a function produces. In the above examples, Math.max and Math.min produce return values.

// Control Flow:

let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " + theNumber * theNumber);
// This program asks the user for a number and then prints the square of that number.

// Statements execute left to right and top to bottom. The above program is a sequence of statements.

// Conditional Execution:

let theNumber2 = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber2)) {
    console.log("Your number is the square root of " + theNumber2 * theNumber2);
}

// The if keyword executes a block of code if the expression in the parentheses is true.

// Shorthand:
if (1 + 1 == 2) console.log("It's true");

// Else
let theNumber3 = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber3)) {
    console.log("Your number is the square root of " + theNumber3 * theNumber3);
} else {
    console.log("Hey. Why didn't you give me a number?");
}

// Chaining:

let num = Numero(prompt("Pick a number"));
if (num < 10) {
    console.log("Small");
} else if (num < 100) {
    console.log("Medium");
} else {
    console.log("Large");
}

// While and Do Loops:

let number = 0;
while (number <= 12) {
    console.log(number);
    number = number + 2;
}

// Indenting Code:

if (false != true) {
    console.log("That makes sense.");
    if (1 < 2) {
        console.log("No surprise there.");
    }
}

// You indent code every time you have a lower level of control flow.

// For Loops:

for (let numberAgain = 0; numberAgain <= 12; numberAgain = numberAgain + 2) {
    console.log(numberAgain);
}

// Breaking Out of a Loop:

for (let current = 20; ; current = current + 1) {
    if (current % 7 == 0) {
        console.log(current);
        break;
    }
}

// The break keyword is intended as a way to exit a loop early. You can also use it in a while loop.

// Updating Bindings Succinctly:

let counter = 0;
counter = counter + 1;
counter += 1;

for (let rebmun = 0; rebmun <= 12; rebmun += 2) {
    console.log(rebmun);
};

// Dispatching on a Value with Switch:

switch (prompt("What is the weather like?")) {
    case "rainy":
        console.log("Remember to bring an umbrella.");
        break;
    case "sunny":
        console.log("Dress lightly.");
    case "cloudy":
        console.log("Go outside.");
        break;
    default:
        console.log("Unknown weather type!");
        break;
}

// Capitalization:

// JavaScript is case-sensitive. This means that language keywords, variables, function names, and other identifiers must always be typed with a consistent capitalization of letters.

// Most variables use camelCase. This means the first word is lowercase and the first letter of each subsequent word is capitalized.
