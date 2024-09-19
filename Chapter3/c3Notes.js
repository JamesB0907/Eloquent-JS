// Eloquent Javascript Chapter 3 Notes

// Functions:

// Defining a Function:

const square = function (x) {
  return x * x;
};

console.log(square(12));

// A function is a piece of program wrapped in a value. Such values can be applied in order to run the wrapped program. In the above example, the function square is defined and then called with the argument 12.

// Bindings and Scopes:

let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
}

const halve = function (n) {
  return n / 2;
};

let n = 10;
console.log(halve(100));
console.log(n);

// The bindings y and z are inside the block, while x is outside the block. The function halve is defined outside the block, but it can access the binding n inside the block. The bindings inside a block are not visible from outside the block.

// Nested Scope:

const hummus = function (factor) {
  const ingredient = function (amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};

// You can construct a function within a function. The inner function can access the outer function's bindings. The outer function cannot access the inner function's bindings.

// Functions as Values:

let launchMissiles = function () {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function () {
    /* do nothing */
  };
}

// Like variables you can change the value or body of a function. In the above example, the function launchMissiles is defined and then redefined if safeMode is true.

// Declaration Notation:

function square2(x) {
  return x * x;
}

// This is another way to define a function. The function keyword is followed by the name of the function and the parameters in parentheses. The body of the function is in curly braces.

// Standard function
function funcName() {
  // code here
}

// Arrow function
const funcName2 = () => {
  // code here
};

// Anonymous function
const funcName3 = function () {
  // code here
};

// The Call Stack:

function greet(who) {
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");

// The call stack is a structure that keeps track of the functions that are currently running. In the above example, the function greet is called with the argument "Harry" and then the string "Bye" is logged to the console.

// Warning: infinite loop:

/*
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
*/

// This program will run forever. The function chicken calls egg, which calls chicken, which calls egg, and so on.

// Optional Arguments:

function square3(x) {
  return x * x;
}
console.log(square3(4, true, "hedgehog"));

// The program will ignore the extra arguments and return 16.

// This can be tedious as you can pass the wrong number of arguments and not get an error. You can use the rest parameter to get all the arguments in an array.

function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}

console.log(minus(10));
console.log(minus(10, 5));

// Closure:

function wrapValue(n) {
  let local = n;
  return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1

// The function wrapValue returns a function that returns the value of local. The local variable is "closed" over by the returned function. The value of local is remembered by the function.

// Said more simply, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

function multiplier(factor) {
  return (number) => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// → 10

// Here the function multiplier returns a function that multiplies its argument by factor. The returned function is stored in the variable twice.

// Recursion:

function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

console.log(power(2, 3));
// → 8

// Recursion is when a function calls itself. In the above example, the function power calls itself until the exponent is 0.

// It is used to find what combination of 5 and 3 will equal the target number.
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        find(current + 5, `( ${history} + 5) `) ??
        find(current * 3, `( ${history} * 3) `)
      );
    }
  }
  return find(1, "1");
}

console.log(findSolution(24)); // → ((( 1 * 3) + 5) * 3)

// Growing Functions:

function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }
  console.log(`${cowString} Cows`);
  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }
  console.log(`${chickenString} Chickens`);
}
printFarmInventory(7, 11);

// The above function is not ideal as it is repetitive. You can refactor it to be more concise.

function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = "0" + numberString;
  }
  console.log(`${numberString} ${label}`);
}

function printFarmInventory2(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory2(7, 11, 3);

// The above function is also not ideal as it is repetitive. You can refactor it to be more concise.

function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function printFarmInventory3(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory3(7, 16, 3);

// Functions and Side Effects:

// Side effects are changes in the world that a function makes. A function that only returns a value is called a pure function. A function that changes the world is called an impure function.

