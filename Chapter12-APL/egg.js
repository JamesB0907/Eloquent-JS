// Chapter 12 Notes

// Parsing:

// A parser is a program that reads a piece of text and produces a data structure that reflects the structure of the program contained in that text. If the text does not form a valid program, the parser should point out the error.

// In the context of our programming language 'Egg' we will have uniform syntax. 'Everything in Egg' is an expression, meaning it can be the name of a binding, a number, a string, or an application. Applications are used for function calls, and are written as a pair of parentheses, with the function expression coming first, and the argument expression coming second.

// Egg applications will be written the way that they are in JavaScript, by putting parentheses after an expression and listing any arguments inside those parentheses. For example, the following is a valid Egg program:

// do(define(x, 10), // do(2 functions if(3 more functions))
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

// Explanations: the 'program' parameter represents a string that contains the program to be parsed. The 'parseExpression' function is used to parse the program string and return an expression object. The 'parseApply' function is used to parse an application expression. The 'skipSpace' function is used to remove leading whitespace from the program string.

// When indexing the string, the 'program[0]' syntax is used to access the first character of the string. The 'program.slice(1)' method is used to return the remaining part of the string after the first character. The 'match' variable is used to store the result of a regular expression match.

// The 'expr' variable is used to store the expression object that is being parsed. The 'expr' object has a 'type' property that indicates the type of the expression, such as "value" or "word". The 'expr' object may also have other properties, such as 'value' or 'name', depending on the type of the expression.

function parseExpression(program) {
    // Remove leading whitespace from the program string
    program = skipSpace(program);
    let match, expr;

    // Check if the program starts with a double-quoted string
    if (match = /^"([^"]*)"/.exec(program)) {
        // If it does, create an expression object with type "value" and the string as its value
        expr = {type: "value", value: match[1]}; // "value"
    } 
    // Check if the program starts with a number
    else if (match = /^\d+\b/.exec(program)) {
        // If it does, create an expression object with type "value" and the number as its value
        expr = {type: "value", value: Number(match[0])}; // 123
    } 
    // Check if the program starts with a word (sequence of non-whitespace, non-special characters)
    else if (match = /^[^\s(),#"]+/.exec(program)) {
        // If it does, create an expression object with type "word" and the word as its name
        expr = {type: "word", name: match[0]}; // word
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
    // let first = string.search(/\S/);
    let skippable = string.match(/^(\s|#.*)*/);
    // If there are no non-whitespace characters, return an empty string
    // if (first == -1) return "";
    // Otherwise, return the string starting from the first non-whitespace character
    // return string.slice(first);
    return string.slice(skippable[0].length);
}

// Parse an application expression
function parseApply(expr, program) {
    // Remove leading whitespace from the program string
    program = skipSpace(program);
    // Check if the program does not start with an opening parenthesis
    if (program[0] != "(") {
        // If the program does not start with an opening parenthesis, return the expression
        return {expr: expr, rest: program};
    }
    // Otherwise, skip the opening parenthesis
    program = skipSpace(program.slice(1)); 
    // Create an empty expression object with type "apply"
    expr = {type: "apply", operator: expr, args: []};
    // Continue parsing the arguments of the application
    while (program[0] != ")") {
        // Parse the next expression and add it to the arguments array
        let arg = parseExpression(program);
        expr.args.push(arg.expr); // [] + {type: "value", value: 10} = [{type: "value", value: 10}, ...]
        // Update the program string to the remaining part after the parsed expression
        program = skipSpace(arg.rest); 
        // If the program continues with a comma, skip it and continue parsing arguments
        if (program[0] == ",") {
            // Skip the comma and any leading whitespace
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            // If the program does not continue with a comma or closing parenthesis, throw a syntax error
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    // Skip the closing parenthesis and return the expression
    return parseApply(expr, program.slice(1));
}

// Parse a program string and return the expression object

function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

console.log(parse("+(a, 10)"));

// The Evaluator:

// The evaluator is a program that takes a syntax tree and evaluates it. The evaluator will be a function that takes an expression object and an environment object as arguments, and returns the value of the expression.

const specialForms = Object.create(null);

function evaluate(expr, scope) {
    // Check if the expression is an application
    if (expr.type == "value") {
        return expr.value;
    // Check if the expression is a word
    } else if (expr.type == "word") {
        // If the word is a binding in the scope, return its value
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    // Check if the expression is an application
    } else if (expr.type == "apply") {
        // The below syntax is used to access the operator and arguments of the application
        let {operator, args} = expr;
        // Check if the operator is a word in the specialForms object
        if (operator.type == "word" && operator.name in specialForms) {
            // If the operator is a special form, evaluate it with the arguments and scope
            // This will be list of reserved words that have special meaning in the language
            return specialForms[operator.name](expr.args, scope);
        } else {
            // Otherwise, evaluate the operator and arguments and call the operator as a function
            let op = evaluate(operator, scope);
            // Check if the operator is a function
            if (typeof op == "function") {
                // Call the operator with the arguments and scope
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                // If the operator is not a function, throw a type error
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

// The evaluator allows literal value to be returned, as well as the values of bindings in the scope. It also allows for the evaluation of applications, which can be either special forms or regular functions.

// The specialForms object is used to define special forms in the language. Special forms are expressions that do not evaluate their arguments before calling the function. Instead, they evaluate the arguments in a special way, depending on the form.

// Special Forms:

specialForms.if = (args, scope) => {
    // Check if the number of arguments is not equal to 3
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of arguments to if");
    }
    // Evaluate the condition expression and return the appropriate expression based on the result
    if (evaluate(args[0], scope) !== false) {
        // If the condition is true, evaluate and return the first expression
        return evaluate(args[1], scope);
    } else {
        // If the condition is false, evaluate and return the second expression
        return evaluate(args[2], scope);
    }
}

// The 'if' special form takes three arguments: a condition expression, a true expression, and a false expression. It evaluates the condition expression and returns the true expression if the condition is true, and the false expression if the condition is false.

// The 'if' special form is defined as a function that takes the arguments and scope as parameters. It checks if the number of arguments is equal to 3, and evaluates the condition expression. If the condition is true, it evaluates and returns the true expression. If the condition is false, it evaluates and returns the false expression.

// In the example at the beginning of the chapter, the 'if' special form shortens the syntax of JavaScript's if else statement. Instead of writing an if statement with two branches, we can write a single 'if' and feed it a conditional in the form of two comparison expressions (argument 0), an action if true (argument 1), and an action if false (argument 2).

// While:

specialForms.while = (args, scope) => {
    // Check if the number of arguments is not equal to 2
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of arguments to while");
    }
    // Evaluate the condition expression
    while (evaluate(args[0], scope) !== false) {
        // Evaluate the body expression
        evaluate(args[1], scope);
    }
    // Return false
    return false;
}

// The 'while' special form takes two arguments: a condition expression and a body expression. It evaluates the condition expression and executes the body expression repeatedly as long as the condition is true.

// Do:

specialForms.do = (args, scope) => {
    // Evaluate each argument in the scope
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
}

// The 'do' special form takes any number of arguments and evaluates them in order, returning the value of the last expression.

// Define:

specialForms.define = (args, scope) => {
    // Check if the number of arguments is not equal to 2
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    // Evaluate the value expression
    let value = evaluate(args[1], scope);
    // Add the binding to the scope
    scope[args[0].name] = value;
    return value;
};

// The 'define' special form takes two arguments: a word and an expression. It evaluates the expression and binds the result to the word in the scope.

// The Environment:

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

// The topScope object is used to store the global bindings in the environment. It contains the true and false bindings, which are used to represent boolean values in the language.
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));

// For basic arithmetic operations, we can add the following bindings to the topScope object:
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

// We can make an output value creating print and setting it to call console.log
topScope.print = value => {
    console.log(value);
    return value;
};

// The 'run' function is used to parse and evaluate a program string in the global scope.

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

// The 'run' function takes a program string as input, parses it, and evaluates it in a new scope object created from the topScope object. This allows us to run programs in a clean environment without modifying the global scope.

// With all of that together, we can now run the following program:

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`);

function exampleEggProgram() {
    let total = 0;
    let count = 1;
    while (count < 11) {
        total += count
        count = count + 1;
    }
    console.log(total);
} // 55


// Functions:

// Functions in Egg are defined using the 'fun' special form, which takes two arguments: a list of parameter names and a body expression. The body expression is evaluated in a new scope that includes the parameter bindings.

specialForms.fun = (args, scope) => {
    // Check if the number of arguments is not equal to 2
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    // Create a function that takes the arguments and scope
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });
    return function() {
        // Check if the number of arguments is not equal to the number of parameters
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        // Create a new scope with the parameter bindings
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        // Evaluate the body expression in the new scope
        return evaluate(body, localScope);
    };
};

//making a function in javacript

function exampleJSFunctionThatDoesNothing () {
    //local scope
    return;
}


// The 'fun' special form takes a list of parameter names and a body expression. It creates a function that takes the arguments and scope, creates a new scope with the parameter bindings, and evaluates the body expression in the new scope.

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`); // 11

//Rewritten in JavaScript
const plusOne = (a) => {
    return a + 1;
};

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`); // 1024

// Rewritten in JavaScript
const pow = (base, exp) => {
    if (exp === 0) {
        return 1;
    } else {
        return base * pow(base, exp - 1);
    }
};

pow(2, 10); // 1024

// Compilation:

// The evaluator we have built so far is an interpreter, which directly evaluates the syntax tree of a program. An alternative approach is to compile the program into a lower-level language, such as JavaScript, and then run the compiled code.

// Compilation is the process of adding another step between parsing and evaluation, where the syntax tree is transformed into a different representation that can be executed more efficiently.

// Normally we would compile by converting the code into machine code, but that is outside the scope of this book.

// Cheating:

// When we define 'if' and 'while' they are just wrappers around already existing JavaScript constructs. Likewise, the values are just JavaScript values, and the functions are just JavaScript functions.

// Exercises:

// Arrays:

topScope.array = (...values) => values;
topScope.length = array => array.length;
topScope.element = (array, i) => array[i];

run(`
do(define(sum, fun(array,
        do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
            do(define(sum, +(sum, element(array, i))),
                define(i, +(i, 1)))),
        sum))),
    print(sum(array(1, 2, 3))))
`);
// → 6

// Closure:

// A closure is a function that captures the scope in which it was created. This allows the function to access variables from that scope even after the scope is no longer active.

// The 'fun' special form we defined earlier creates closures by creating a new scope for each function call. This allows the function to access the parameter bindings from the scope in which it was defined.

// Comments:

// See skipSpace function for altered code.

// Fixing Scope:

// The 'evaluate' function currently creates a new scope object for each function call. This means that each function call has its own scope, and changes made to the scope in one function call do not affect the scope in another function call.

specialForms.set = (args, env) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of set");
    }
    let varName = args[0].name;
    let value = evaluate(args[1], env);

    for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
        if (Object.prototype.hasOwnProperty.call(scope, varName)) {
            scope[varName] = value;
            return value;
        }
    }
    throw new ReferenceError(`Setting undefined variable ${varName}`);
};
//#endregion The Egg Language End

