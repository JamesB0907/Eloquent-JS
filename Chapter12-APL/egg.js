// Chapter 12 Notes

// Parsing:

// A parser is a program that reads a piece of text and produces a data structure that reflects the structure of the program contained in that text. If the text does not form a valid program, the parser should point out the error.

// In the context of our programming language 'Egg' we will have uniform syntax. Everything in Egg is an expression, meaning it can be the name of a binding, a number, a string, or an application.. Applications are used for function calls, and are written as a pair of parentheses, with the function expression coming first, and the argument expression coming second.

// In Egg applications will be written the way that they are in JavaScript, by putting parentheses after an expression and listing any arguments inside those parentheses. For example, the following is a valid Egg program:

// do(define(x, 10),
//    if(>(x, 5),
//       print("large"),
//       print("small")))

// This program will define a binding x, give it the value 10, and then print "large" if x is greater than 5, and "small" if x is less than or equal to 5.

// >(x, 5) from this example could be represented like this:
/*
    {
    type: "apply",
    operator: {type: "word", name: ">"},
    args: [
        {type: "word", name: "x"},
        {type: "value", value: 5}
        ]
    }
*/

// This is an example of a syntax tree. It is a nested structure that represents the structure of the program. The tree for the previous example would look like this:

/*
do
-> define
    -> x
    -> 10
-> if
    -> >
        -> x
        -> 5
    -> print
        -> "large"
    -> print
        -> "small"
*/

//#region The Egg Language Start

function parseExpression(program) {
    // Remove leading whitespace from the program string
    program = skipSpace(program);
    let match, expr;

    // Check if the program starts with a double-quoted string
    if (match = /^"([^"]*)"/.exec(program)) {
        // If it does, create an expression object with type "value" and the string as its value
        expr = {type: "value", value: match[1]};
    } 
    // Check if the program starts with a number
    else if (match = /^\d+\b/.exec(program)) {
        // If it does, create an expression object with type "value" and the number as its value
        expr = {type: "value", value: Number(match[0])};
    } 
    // Check if the program starts with a word (sequence of non-whitespace, non-special characters)
    else if (match = /^[^\s(),#"]+/.exec(program)) {
        // If it does, create an expression object with type "word" and the word as its name
        expr = {type: "word", name: match[0]};
    } 
    // If none of the above conditions are met, throw a syntax error
    else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    // Continue parsing the rest of the program after the matched part
    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    // Find the first non-whitespace character in the string
    let first = string.search(/\S/);
    // If there are no non-whitespace characters, return an empty string
    if (first == -1) return "";
    // Otherwise, return the string starting from the first non-whitespace character
    return string.slice(first);
}

//#endregion The Egg Language End

