//Strict mode:

function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++) {
      console.log("Happy happy");
    }
  }
  
  // canYouSpotTheProblem(); <- This will throw an error because counter is not declared
  ("use strict"); // <- This actually still allows the code to run without throwing an error. May be a bug in the book.
  function Person(name) {
    this.name = name;
  }
  let ferdinand = Person("Ferdinand");
  console.log(name);
  
  // Example Test:
  
  function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
  }
  
  test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
  });
  
  test("convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
  });
  
  test("don't convert case-less characters", () => {
    return "مرحبا".toUpperCase() == "مرحبا";
  });
  
  function numberToString(n, base = 10) {
    let result = "",
      sign = "";
    if (n < 0) {
      sign = "-";
      n = -n;
    }
    do {
      result = String(n % base) + result;
      // n /= base; <-- This does not produce a whole number
      // Instead we should use:
      n = Math.floor(n / base);
    } while (n > 0);
    return sign + result;
  }
  
  console.log(numberToString(13, 10));
  console.log(typeof numberToString(13, 10));
  // Expected output: 13
  // Actual output: 1.5e-3231.3e-3221.3e etc...
  
  // User input errors:
  
  function promptNumber(question) {
    // prompt is not defined. Was this intended by the book?
    let result = Number(prompt(question));
    if (Number.isNaN(result)) return null;
    else return result;
  }
  
  // Commenting out until I can understand why prompt is not defined
  // console.log(promptNumber("How many trees do you see?"));
  
  // Wrapping the return in an object:
  
  function lastElement(array) {
    if (array.length == 0) {
      return { failed: true };
    } else {
      return { element: array[array.length - 1] };
    }
  }
  
  // Stack traces:
  
  function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new Error("Invalid direction: " + result);
  }
  
  function look() {
    if (promptDirection("Which way?") == "L") {
      return "a house";
    } else {
      return "two angry bears";
    }
  }
  
  try {
    console.log("You see", look());
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
  
  // Cleaning up after exceptions
  
  // This is a bad example of cleaning up after an exception. It is better to use a finally block to ensure that the resource is closed properly.
  const accounts = {
    a: 100,
    b: 0,
    c: 20,
  };
  
  function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!Object.hasOwn(accounts, accountName)) {
      throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
  }
  
  function transfer(from, amount) {
    if (accounts[from] < amount) return;
    accounts[from] - +amount;
    accounts[getAccount()] += amount;
  }
  
  // A finally block tell the program to run the code in the block no matter the conditions of the try and catch blocks.
  
  function transfer(from, amount) {
    if (accounts[from] < amount) return;
    let progress = 0;
    try {
      accounts[from] -= amount;
      progress = 1;
      accounts[getAccount()] += amount;
      progress = 2;
    } finally {
      if (progress == 1) {
        accounts[from] += amount;
      }
    }
  }
  
  // In the above example we track the progress of the transaction and if the transaction fails, we can use the finally block to ensure that the account is returned to its original state.
  
  // Selective catching:
  
  /*
  for (;;) {
    try {
      let dir = promptDirection("Where?");
      console.log("You chose", dir);
      break;
    } catch (e) {
      console.log("Not a valid direction. Try again.")
    }
  }
  */
  
  // instanceof operator:
  
  class InputError extends Error {}
  
  function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
  }
  
  // Same loop using instanceof:
  
  /*
  for (;;) {
    try {
      let dir = promptDirection("Where?");
      console.log("You chose", dir);
      break;
    } catch (e) {
      if (e instanceof InputError) {
        console.log("Not a valid direction. Try again.");
      } else {
        throw e;
      }
    }
  }
  */
  
  // Assertions:
  
  function firstElement(array) {
    if (array.length == 0) {
      throw new Error("firstElement called with []");
    }
    return array[0];
  }