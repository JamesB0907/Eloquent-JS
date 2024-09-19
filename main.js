
//#region Chapter 4: Data Structures: Objects and Arrays

//#endregion
/* 
  Chapter 5: Higher-Order Functions
*/
//#region Chapter 5: Higher-Order Functions
// SCRIPTS = scripts.js: https://eloquentjavascript.net/code/scripts.js
let SCRIPTS = require("./scripts.js");
// .filter array method:

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    // test is a passed function that returns a boolean value
    if (test(element)) {
      // If this condition is true, the element is pushed to the passed array
      passed.push(element);
    }
  }
  return passed;
}
// This log returns too much data to leave uncommented
// console.log(filter(SCRIPTS, script => script.living));
// -> [{name: "Adlam", ...}, ...]

// .map array method:

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    // For each element in the array, a function is called that returns a new value
    mapped.push(transform(element));
  }
  return mapped;
}
// This log returns too much data to leave uncommented
let rtlScripts = SCRIPTS.filter((s) => s.direction == "rtl");
// console.log(map(rtlScripts, s => s.name));
// -> ["Adlam", "Arabic", "Imperial Aramaic", ...]

// .reduce array method:

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    // Each time the for loop reads an element, the combine function that is passed in alters the current value using other values in the array
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// -> 10
// 1 + 2 + 3 + 4 = 10

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
);
// -> {name: "Han", ...}

// Getting the average year of dead and living scripts:

function average(array) {
  // We add up all the elements that get passed in as an array and then divide by the length of the array to get the average
  return array.reduce((a, b) => a + b) / array.length;
}

// We filter by whether they are living or dead and then map the years of the scripts to get the average year. The result is an array that gets averaged by the average function.
console.log(
  Math.round(average(SCRIPTS.filter((s) => s.living).map((s) => s.year)))
);

console.log(
  Math.round(average(SCRIPTS.filter((s) => !s.living).map((s) => s.year)))
);

// Written as one big loop:

let total = 0,
  count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
// console.log(Math.round(total / count));
// -> 1165

// The above code is written in such a way that it is less reusable and harder to extract a function like average from it. The average function is more reusable and can be used in other parts of the code. HOWEVER, the speed of the loop is faster than using the average function.

// .some array method:
// These array method are used to find out if a certain condition is true for at least one element in the array or range
function some(array, test) {
  for (let element of array) {
    if (test(element)) {
      return true;
    }
  }
  return false;
}

// This function is used to determine if a script has a certain character code in its ranges+
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// -> {name: "Latin", ...}

// .find array method:

function find(array, test) {
  for (let element of array) {
    if (test(element)) {
      return element;
    }
  }
  return null;
}

// .countBy function:
// This function expects a collection and will return an array of objects that each contain a name and a count property. The name property is the result of the groupName function and the count property is the number of elements that return the same name.
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));
// -> [{name: false, count: 2}, {name: true, count: 3}]

// Implementing the countBy function:

function textScripts(text) {
  // This function is used to determine the script of a character by its code point and then return the name of the script or "none" if it is not found
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");
  // This is the total number of scripts found
  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";
  // This returns the percentage of each script found in the text and the name of the script in a string by using the map method
  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(", "); // This joins the strings together with a comma
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// -> 61% Han, 22% Latin, 17% Cyrillic

// .concat array method:

function concat(...arrays) {
  let result = [];
  for (let array of arrays) {
    for (let element of array) {
      result.push(element);
    }
  }
  return result;
}

// Exercises from Chapter 5:

// Flatten

const arrayOfArrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrayOfArrays.reduce((a, b) => a.concat(b)));

// OR

console.log(arrayOfArrays.flat());

// Your Own Loop

// This function is a for loop that takes a value, a test function, an update function, and a body function. The loop will run as long as the test function returns true. The update function is called each time the loop runs and the body function is called each time the loop runs.
const loop = (value, test, update, body) => {
  for (let i = value; test(i); i = update(i)) {
    body(i);
    if (i === 1) {
      return 0;
    }
  }
};

// Why does this return 3 2 1 11?
// I've added a return 0 to the loop function to stop the loop when it reaches 1. This is why the loop stops at 1 and returns 0.
console.log(
  loop(
    3,
    (n) => n > 0,
    (n) => n - 1,
    console.log
  )
);

// Everything

function every(array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

function everyUsingSome(array, test) {
  return !array.some((element) => !test(element));
}

console.log(every([1, 3, 5], (n) => n < 10));
// -> true
console.log(everyUsingSome([2, 4, 16], (n) => n < 10));
// -> false

// Dominant Writing Direction

function dominantDirection(text) {
  let counted = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({ name }) => name != "none");
  if (counted.length === 0) return "ltr";
  return counted.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

console.log(dominantDirection("Hello!"));
//#endregion
/*
  Chapter 6: The Secret Life of Objects
*/
//#region Chapter 6: The Secret Life of Objects
// Methods:

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
// -> The white rabbit says ' Oh my fur and whiskers'
hungryRabbit.speak("Got any carrots?");
// -> The hungry rabbit says 'Got any carrots?'

// The call method:
speak.call(whiteRabbit, "Hurry!");
// -> The white rabbit says 'Hurry!'

// 'this' binding applied to an arrow function:
let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  value: 5,
};
console.log(finder.find([4, 5]));

// Prototypes:

let empty = {};
console.log(empty.toString);
// -> function toString() {...}
console.log(empty.toString());
// -> [object Object]
// Important to note: When you receive the response from the console object Object it is similar to getting an undefined variable. The console is not able to display the object in a way that is useful to the user.

//toString is a method stored in Object.prototype. This is why all objects have access to it even if they are empty.

console.log(Object.getPrototypeOf({}) == Object.prototype);
// -> true
console.log(Object.getPrototypeOf(Object.prototype));
// -> null

console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// -> true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// -> true

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");
// -> The black rabbit says 'I am fear and darkness'

// Classes:

// Constructor functions:

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

// This creates a new object with the protoRabbit prototype and then assigns the type property to the object. This is a way to create a new object with a prototype and properties.

// Alternatively, classes can be used to create objects:

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

// Before 2015 class update:

function ArchaicRabbit(type) {
  this.type = type;
}
ArchaicRabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// -> true
// console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);
// -> true

// Per-instance properties added to the prototype:

class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
}

// Class used in an expression:

let object = new (class {
  getWord() {
    return "hello";
  }
})();
console.log(object.getWord());
// -> hello

// Private class properties:

class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrograte() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}

// I don't understand this, but come back to it:

class RandomSource {
  #max;
  constructor(max) {
    this.#max = max;
  }
  getNumber() {
    return Math.floor(Math.random() * this.#max);
  }
}

// Overriding derived properties:

// You can override the property on a prototype by adding a property to an object with the same name and giving it a new value

Rabbit.prototype.teeth = "small";
// console.log(killerRabbit.teeth);
// -> small
// killerRabbit.teeth = "long, sharp, and bloody";
// console.log(killerRabbit.teeth);
// -> long, sharp, and bloody
console.log(new Rabbit("basic").teeth);
// -> small
console.log(Rabbit.prototype.teeth);
// -> small

// Above we see that the any new instance of the Rabbit class will follow the prototype property, but for objects where the property is changed, the new value will be used.

// More practical application:

console.log(Array.prototype.toString == Object.prototype.toString);
// -> false
console.log([1, 2].toString());
// -> 1,2
console.log(Object.prototype.toString.call([1, 2]));
// -> [object Array]

// Maps:

// A data map is different than the .map array method. It is more similar to a dictionary in C# or Python. It is a collection of keys and values where you can obtain a reference value by its key.
let ages;
ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62,
};

console.log(`Julia is ${ages["Julia"]}`);
// -> Julia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// -> Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// -> Is toString's age known? true

// toString is not a listed name, but since it is a property of the Object prototype, it is still considered a key in the ages object and will return true when prompted.

// For this reason, using plain objects as maps is not recommended. Using Object.create(null) will create an object with no prototype, which is a better option.

console.log("toString" in Object.create(null));
// -> false

// The Map class

ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(`Julia is ${ages.get("Julia")}`);
// -> Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// -> Is Jack's age known? false
console.log(ages.has("toString"));
// -> false

// hasOwn method:

console.log(Object.hasOwn({ x: 1 }, "x"));
// -> true
console.log(Object.hasOwn({ x: 1 }, "toString"));
// -> false

// Polymorphism:

// String function:
//(overriding the toString method)
Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// -> a black rabbit

// Array-like objects:

Array.prototype.forEach.call(
  {
    length: 2,
    0: "a",
    1: "b",
  },
  (elt) => console.log(elt)
);
// -> a
// -> b

// Getters, setters, and statics:

// Getters:

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

console.log(varyingSize.size);
// -> 73
console.log(varyingSize.size);
// -> 49

// Setters:

// The Temperature class allows you to read and write the temperature in either celcius or fahrenheit but only stores the temperature in celcius.
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  // The get keyword is used to define a getter method that allows you to read the value of the temperature in fahrenheit
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  // The set keyword is used to define a setter method that allows you to set the value of the temperature in fahrenheit
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  // The static keyword is used to define a static method that is called on the class itself and not on an instance of the class
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// -> 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// -> 30

//using the static method:

let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);
// -> 100

// Symbols:

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// -> false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// actually returns undefined, but the book says it returns 55

// Accessing the length method instead of the length symbol:

const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1, 2].length);
// -> 2
console.log([1, 2][length]);
// -> 0

let myTrip = {
  length: 2,
  0: "Lankwitz",
  1: "Babelsberg",
  [length]: 21500,
};
console.log(myTrip[length], myTrip.length);
// -> 21500 2

//This is similiar to using aliases in SQL. It allows you to use a different name for a property or method.

// The Iterator Interface:

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// -> {value: "O", done: false}
console.log(okIterator.next());
// -> {value: "K", done: false}
console.log(okIterator.next());
// -> {value: undefined, done: true}

class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }

  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }

  static fromArray(array) {
    let result = null;
    for (let i = array.length - 1; i >= 0; i--) {
      result = new this(array[i], result);
    }
    return result;
  }
}

class ListIterator {
  constructor(list) {
    this.list = list;
  }

  next() {
    if (this.list == null) {
      return { done: true };
    }
    let value = this.list.value;
  }
}

// List.prototype[Symbol.iterator] = function() {
//   return new ListIterator(this);
// }

// let list = List.fromArray([1, 2, 3]);
// for (let element of list) {
//   console.log(element);
// }
// -> 1
// -> 2
// -> 3

// TypeError: Iterator result undefined is not an object line 848

// Inheritance:

// List in this context represents a superclass and the class LengthList represents a subclass. The subclass inherits the properties and methods of the superclass.
class LengthList extends List {
  // The list's length is stored in a private property
  #length;
  // The constructor then stores the list's length in the private property
  // The super keyword is used to call the constructor of the superclass
  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }
  // The length method is used to return the length of the list
  get length() {
    return this.#length;
  }
}
console.log(LengthList.fromArray([1, 2, 3]).length);
// -> 3

// The instanceof operator:

console.log(new LengthList(1, null) instanceof List);
// -> true
console.log(new LengthList(2, null) instanceof List);
// -> true
console.log(new List(3, null) instanceof LengthList);
// -> false
console.log([1] instanceof Array);
// -> true

// Definitions from Chapter 6:

// Prototypes: When an object is created, it is given a prototype. This prototype is a reference to another object. If a property is not found in the object, the prototype is checked for the property. This process continues until the property is found or the prototype is null.

// Classes: Classes are a way to create objects with similar properties and methods. They are a blueprint for creating objects. Classes can be used to create objects with the same properties and methods.

// Methods: Methods are functions that are stored in an object. They can be called on the object and can access the object's properties.

// Maps: Maps are a collection of key-value pairs. They are similar to dictionaries in other programming languages. Maps are a better option than using plain objects as maps because they do not have the prototype property.

// Polymorphism: Polymorphism is the ability to use the same method on different objects. It allows objects of different classes to be treated as objects of the same class.

// Getters, setters, and statics: Getters are used to get the value of a property. Setters are used to set the value of a property. Statics are used to define methods that are called on the class itself and not on an instance of the class.

// Symbols: Symbols are a new primitive type in JavaScript. They are used to create unique identifiers for object properties. Symbols are used to create private properties and methods.

// Constructors: Constructors are functions that are used to create objects. They are called when a new object is created. Constructors are used to set the initial state of an object.

// Inheritance: Inheritance is the ability of a class to inherit properties and methods from another class. It allows classes to share common properties and methods. Inheritance is used to create subclasses that have the same properties and methods as the superclass.

// Private Properties: Private properties are properties that are only accessible within the class that defines them. They are used to store data that should not be accessed or modified from outside the class.

// Excerises from Chapter 6:

// A Vector Type:

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// -> Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// -> Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// -> 5

// Groups:

class Group {
  #members = [];

  add(value) {
    if (!this.has(value)) {
      this.#members.push(value);
    }
  }

  delete(value) {
    this.#members = this.#members.filter((v) => v !== value);
  }

  has(value) {
    return this.#members.includes(value);
  }

  static from(array) {
    let group = new Group();
    for (let value of array) {
      group.add(value);
    }
    return group;
  }

  // Iterable Groups:
  [Symbol.iterator]() {
    return new GroupIterator(this.#members);
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// -> true
console.log(group.has(30));
// -> false
group.add(10);
group.delete(10);
console.log(group.has(10));
// -> false

// The above code was copied from the book. I'll have to come back to this later for a better understanding.

class GroupIterator {
  #members;
  #position;

  constructor(members) {
    this.#members = members;
    this.#position = 0;
  }

  next() {
    if (this.#position >= this.#members.length) {
      return { done: true };
    } else {
      let result = { value: this.#members[this.#position], done: false };
      this.#position++;
      return result;
    }
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// -> a
// -> b
// -> c
//#endregion
/*
  Chapter 7: Project: A Robot: SEE '\Eloquent-JS\Robot'
*/
/*
  Chapter 8: Bugs and Errors
*/
//#region Chapter 8: Bugs and Errors

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

// Exercises from Chapter 8:

// Retry:

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure(
      "Whoops! " + a * b + " is not a valid number for this function"
    );
  }
}

function looperFunction() {
  for (;;) {
    try {
      return primitiveMultiply(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      );
      break;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log(e);
      } else {
        throw e;
      }
    }
  }
}

// console.log(looperFunction());

// The Locked Box:

const box = new (class {
  locked = true;
  #content = [];

  unlock() {
    this.locked = false;
  }
  lock() {
    this.locked = true;
  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
})();

// My solution:

/*
function withBoxUnlocked(value) {
  if (box.locked) box.unlock();
  try {
    return value();
  } finally {
    if (box.locked) {
      box.lock();
    }
  }
}

function contentAdd (value) {
  box.content.push(value);
}

withBoxUnlocked(contentAdd("Treasure"));
console.log(box.content[0])
*/

// Solution from the book:

/*
function withBoxUnlocked(body) {
  let locked = box.locked;
  if (locked) box.unlock();
  try {
    return body();
  } finally {
    if (locked) box.lock();
  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked);
*/

//#endregion

/*
  Chapter 9: Regular Expressions
*/
//#region Chapter 9: Regular Expressions

// Two ways to create a regular expression:
let re1 = new RegExp("abc");
let re2 = /abc/;

// Special characters in regular expressions:
let aPlus = /A\+/;

// Testing for matches:

// .test Method:
console.log(/abc/.test("abcde")); // -> true
console.log(/abc/.test("abxde")); // -> false

// Sets of Characters:

console.log(/[0123456789]/.test("in 1992")); // -> true
console.log(/[0-9]/.test("in 1992")); // -> also true

// Shortcuts for common character sets:

/*
  \d - Any digit character
  \w - An alphanumeric character ("word character")
  \s - Any whitespace character (space, tab, newline, etc.)
  \D - A character that is not a digit
  \W - A nonalphanumeric character
  \S - A nonwhitespace character
  . - Any character except for newline
*/

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20")); // -> true
console.log(dateTime.test("30-jan-2003 15:20")); // -> false

// Inverting a set of characters:
let nonBinary = /[^01]/;
console.log(nonBinary.test("1100100010100110")); // -> false
console.log(nonBinary.test("1100100010200110")); // -> true

// International Characters:

/*
  \p{L} - Any Unicode letter
  \p{N} - Any Unicode digit character
  \p{P} - Any Unicode punctuation character
  \P{L} - Any Non-Letter (uppercase P inverts)
  \p{Script=Hangul} Any character from the given script (Hangul is a Korean script)
*/

console.log(/\p{L}/u.test("α")); // → true
console.log(/\p{L}/u.test("!")); // → false
console.log(/\p{Script=Greek}/u.test("α")); // → true
console.log(/\p{Script=Arabic}/u.test("α")); // → false

// Repeating parts of a pattern:

// Using + and \d to match a sequence of one or more digits:

console.log(/'\d+'/.test("'123'")); // -> true
console.log(/'\d+'/.test("''")); // -> false

// Using * and \d to match a sequence of zero or more digits:
console.log(/'\d*'/.test("'123'")); // -> true
console.log(/'\d*'/.test("''")); // -> true

// Using the ? character to indicate that a pattern is optional:

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour")); // -> true
console.log(neighbor.test("neighbor")); // -> also true

// Using {} with a number inserted to indicate a specific number of repetitions:

let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test("1-30-2003 8:45")); // -> true
// If you insert two numbers separated by a comma, the first number is the minimum number of repetitions and the second number is the maximum number of repetitions.

// You can make it open-ended by omitting the second number: {5,} means five or more repetitions.

// Grouping Subexpressions:

// This means that boo and hoo can be repeated one or more times in the string AND that boohoo can be repeated one or more times in the string. i is used to make the expression case-insensitive.
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo")); // -> true

// Matches and Groups:

//Regex exec method returns null if no match is found and an object with information about the match if a match is found.

// index returns the position of the match in the string

let match = /\d+/.exec("one two 100");
console.log(match); // -> ["100"]
console.log(match.index); // -> 8

//NOTE: Strings have a match method that behaves similarly to the above code:
console.log("one two 100".match(/\d+/)); // -> ["100"]

// The output also includes the input string and the groups that were matched.

// Subexpressions print seperate text in the same array:
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // -> ["'hello'", "hello"]

// The first element in the array is the whole match and the second element is the first group that was matched.

// The exec method will return null if no match is found.

console.log(/bad(ly)?/.exec("bad")); // -> ["bad", undefined]
console.log(/(\d)+/.exec("123")); // -> ["123", "3"]

// Allow the program to only print one match for two matching expressions:

console.log(/(?:na)+/.exec("banana")); // -> ["nana"]

//The Date Class:

console.log(new Date()); // -> current date and time

console.log(new Date(2009, 11, 9)); // -> December 9, 2009
console.log(new Date(2009, 11, 9, 12, 59, 59, 999)); // -> December 9, 2009, 12:59:59.999

console.log(new Date(2013, 11, 19).getTime()); // -> 1387407600000
console.log(new Date(1387407600000)); // -> December 19, 2013

let timeNow = new Date().getTime();
console.log("Current Milliseconds: " + timeNow);
// or
console.log("Current Milliseconds: " + Date.now());

// Date objects provide methods to extract their components:
/*
  1. getFullYear - returns the year
  2. getMonth - returns the month (0-11)
  3. getDate - returns the day of the month (1-31)
  4. getDay - returns the day of the week (0-6)
  5. getHours - returns the hour (0-23)
  6. getMinutes - returns the minutes (0-59)
  7. getSeconds - returns the seconds (0-59)
*/

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}

console.log(getDate("1-30-2003")); // -> Thu Jan 30 2003 00:00:00 GMT+0100

// Boundaries and Look-Ahead:

console.log(/a(?=e)/.exec("braeburn")); // -> ["a", index: 3, input: "braeburn"]
console.log(/a(?! )/.exec("a b")); // -> null

// Choice Patterns:

// Using OR (represented by a '|') to match a choice of patterns:

let animalCount = /\d+ (pig|cow|chicken)s?/;
console.log(animalCount.test("15 pigs")); // -> true
console.log(animalCount.test("15 pugs")); // -> false

// The Replace Method:

console.log("papa".replace("p", "m")); // -> mapa

// In a regular expression:

console.log("Borobudur".replace(/[ou]/, "a")); // → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar

console.log(
  "Liskov, Barbara\nMcCarthy, John\nMilner, Robin".replace(
    /(\p{L}+), (\p{L}+)/gu,
    "$2 $1"
  )
); // → Barbara Liskov // John McCarthy // Robin Milner

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne)); // → no lemon, 1 cabbage, and 100 eggs

// Greed:

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3")); // → 1 + 3
console.log(stripComments("x = 10; // ten!")); // → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1")); // → 1 1

// The Last one does not work as intended and actually removes the + sign. This is because the * operator is greedy and will match as much as possible. To fix this, we can use the ? operator to make the * operator non-greedy.

function fixedStripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1")); // This actually does not work as intended. The book is wrong.

// Dynamically Creating RegExp Objects:

let exampleName = "harry";
let regexp = new RegExp("(^|\\ s)" + exampleName + "($|\\s)", "gi");
console.log(regexp.test("Harry is a dodgy character."));

let screenName = "dea+hl[]rd";
let escaped = screenName.replace(/[\\[. +*?(){|^$]/g, "\\ $&");
let regexp2 = new RegExp("( ^ |\\ s)" + escaped + "( $ |\\ s)", "gi");
let text = "This dea+hl[]rd guy is super annoying.";
console.log(regexp2.test( text));

// The Search Method:

console.log("  word".search(/\S/)); // → 2
console.log("    ".search(/\S/)); // → -1

// The LastIndex Property:

let pattern = /y/g;
pattern.lastIndex = 3;
let match2 = pattern.exec("xyzzy");
console.log(match2.index); // → 4
console.log(pattern.lastIndex); // → 5


// Global search and match:
let global = /abc/g;
console.log(global.exec("xyz abc")); // → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc")); // → null

let digit = /\d/g;
console.log(digit.exec("here it is: 1")); // → ["1"]
console.log(digit.exec("and now: 1")); // → null

console.log("Banana".match(/an/g)); // → ["an", "an"]

let input = "A string with 3 numbers in it... 42 and 88.";
let matches = input.matchAll(/\d+/g);
for (let singleMatch of matches) {
  console.log("Found", match[0], "at", match.index);
}
// → Found 3 at 14
// → Found 42 at 33
// → Found 88 at 38

// Parsing an INI file:

function parseINI(string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match3;
    if ((match3 = line.match(/^(\w+)=(.*)$/))) {
      section[match3[1]] = match[2];
    } else if ((match3 = line.match(/^\[(.*)\]$/))) {
      section = result[match3[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error(`Line '${line}' is not valid.`);
    }
  });
  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

// Code Units and Characters:

console.log(/🍎{ 3}/. test("🍎🍎🍎")); // → false
console.log(/<.>/. test(" < 🌹 >")); // → false 
console.log(/<.>/u.test(" < 🌹 >")); // → true

console.log(/🍎{3}/u.test("🍎🍎🍎")); // → true

// List of regex definitions:

  // /abc/ - A sequence of characters
  // /[abc]/ - Any character from a set of characters
  // /[^abc]/ - Any character not in a set of characters
  // /[0-9]/ - Any character in a range of characters
  // /x+/ - One or more occurrences of the pattern x
  // /x+?/ - One or more occurrences of the pattern x, nongreedy
  // /x*/ - Zero or more occurrences of the pattern x
  // /x?/ - Zero or one occurrence of the pattern x
  // /x{2,4}/ - Two to four occurrences of the pattern x
  // /(abc)/ - A group
  // /a|b|c/ - Any one of several patterns
  // /\d/ - Any digit character
  // /\w/ - An alphanumeric character ("word character")
  // /\s/ - Any whitespace character
  // /./ - Any character except for newline
  // /\p{L}/u - Any letter character in any language
  // /^/ - Start of input
  // /$/ - End of input
  // /(?=a)/ - A look-ahead test that matches a pattern only if it is followed by a specific pattern

// Regex has custom methods and properties:

  // .test() - Returns a boolean indicating whether the pattern is found in the string
  // .exec() - Returns an array containing the matched text and groups
  //.index - The position of the start of the match

// Regex has options:

// Global = /g - Find all matches
// Case-insensitive = /i - Ignore case
// Sticky = /y - Match only from the lastIndex position
// Unicode = /u - Match characters in the Unicode standard
// Multiline = /m - Match multiple lines

// Exercises from Chapter 9:

// Regexp Golf:

// car and cat:
console.log(/ca[rt]/.test("cat")); // -> true
console.log(/ca[rt]/.test("car")); // -> true
// pop and prop:
console.log(/pr?op/.test("pop")); // -> true
console.log(/pr?op/.test("prop")); // -> true
// ferret, ferry, and ferrari:
console.log(/ferr(et|y|ari)/.test("ferret")); // -> true
console.log(/ferr(et|y|ari)/.test("ferry")); // -> true
console.log(/ferr(et|y|ari)/.test("ferrari")); // -> true
// Any word ending in ious:
console.log(/ious$/.test("conscious")); // -> true
console.log(/ious$/.test("ambitious")); // -> true
console.log(/ious$/.test("vicious")); // -> true
// A whitespace character followed by a period, comma, colon, or semicolon:
console.log(/\s[.,:;]/.test(" .")); // -> true
console.log(/\s[.,:;]/.test(" ,")); // -> true
console.log(/\s[.,:;]/.test(" :")); // -> true
// A word longer than six letters:
console.log(/[a-zA-Z]{7,}/.test("seventh")); // -> true
console.log(/[a-zA-Z]{7,}/.test("sixth")); // -> false
// A word without the letter e:
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("hello")); // -> false
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("world")); // -> true
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("elephant")); // -> false

// Quoting Style:

let textSample = "'I'm the cook,' he said, 'it's my job.'";

console.log(textSample.replace(/(^|\P{L})'|'(\P{L}|$)/gu, '$1"$2'));

// Numbers Again:

let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

//#endregion
