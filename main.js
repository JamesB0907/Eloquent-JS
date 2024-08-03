/* 
    Chapter 2: Program Structure
*/

for (let i = "#"; i.length < 8; i += "#") {
  console.log(i);
}

const fizzBuzz = () => {
  for (let i = 1; i < 101; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
};

fizzBuzz();

// Specifically for only 8x8 grid

for (i = 0; i < 9; i++) {
  if (i % 2 === 0) {
    console.log("# # # # ");
  } else {
    console.log(" # # # #");
  }
}

// Generalized for any size grid
let size = 15;
let board = "";
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if ((x + y) % 2 == 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}
console.log(board);

/* 
    Chapter 3: Functions
*/

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

// The function below is recursive, meaning it calls itself.
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

// Exercises from Chapter 3:

function min(a, b) {
  return a < b ? a : b;
}

console.log(min(0, 10));

function isEven(N) {
  if (N === 0) {
    return true;
  } else if (N === 1) {
    return false;
  } else {
    return isEven(N - 2);
  }
}

console.log(isEven(50));

const countBs = (string) => {
  let bCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "b" || string[i] === "B") {
      bCount++;
    }
  }
  return bCount;
};

console.log(countBs("Bubblebath"));

const countChar = (string, char) => {
  let charCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char || string[i] === char.toUpperCase()) {
      charCount++;
    }
  }
  return charCount;
};

console.log(countChar("Calculate", "c"));

/*
    Chapter 4: Data Structures: Objects and Arrays
*/

// Note: explore phi and correlation later to get a better understanding

// Exercises from Chapter 4
const range = (start, end, step) => {
  let arr = [];
  if (step > 0) {
    for (i = start; i <= end; i += step) {
      arr.push(i);
    }
  } else {
    for (i = start; i <= end; i++) {
      arr.push(i);
    }
  }
  return arr;
};

// Make sure to add the brackets around the numbers array in the sum function
// (Also: this probably does not require a spread operator...)
const sum = ([...numbers]) => {
  let total = 0;
  for (let number of numbers) {
    total += number;
  }
  return total;
};

console.log(range(1, 10, 2));
console.log(sum(range(1, 10, 2)));

const reverseArray = ([...array]) => {
  newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(array[array.length - 1 - i]);
  }
  return newArray;
}

console.log(reverseArray([1, 2, 3, 4, 5]));

const reverseArrayInPlace = (array) => {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7, 8, 9]))

const arrayToList = (array) => {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

console.log(arrayToList([1, 2, 3]))

const listToArray = (list) => {
  array = [];
  if (list.rest === null) {
    array.push(list.value);
  } else {
    // It's important to use a while loop because we don't know how many elements are in the list
    while (list.rest !== null) {
      array.push(list.value);
      // This is how we move to the next element in the list
      list = list.rest;
    }
    // This is how we add the last element to the array
    array.push(list.value);
  }
  return array;
}

console.log(listToArray({
  value: 1,
   rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
}))

const prepend = (element, list) => {
  return {value: element, rest: list}
}

// Why does this no work after the third value?
console.log(prepend(1, arrayToList([2, 3])))

const nth = (list, n) => {
  if (n === 0) {
    return list.value;
  } else {
    return nth(list.rest, n - 1);
  }
}

console.log(nth(arrayToList([1, 2, 3]), 2))

//I'm not sure this one is fully correct. Refer to chapter solution
const deepEqual = (first, second) => {
  if (first !== second) return false;
  else if (Object.keys(first) !== Object.keys(second)) return false;
  else if (Object.keys(first).length !== Object.keys(second).length) return false;
  else if (typeof first === typeof second && first === second) return true;
}

/* 
  Chapter 5: Higher-Order Functions
*/

// SCRIPTS = scripts.js: https://eloquentjavascript.net/code/scripts.js
let SCRIPTS = require("./scripts.js");
// .filter array method:

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    // test is a passed function that returns a boolean value
    if (test(element)) {
      // If this condition is true, the element is pushed to the passed array
      passed.push(element)
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
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
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

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// -> {name: "Han", ...}

// Getting the average year of dead and living scripts:

function average(array) {
  // We add up all the elements that get passed in as an array and then divide by the length of the array to get the average
  return array.reduce((a, b) => a + b) / array.length;
}

// We filter by whether they are living or dead and then map the years of the scripts to get the average year. The result is an array that gets averaged by the average function.
console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))));

console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));

// Written as one big loop:

let total = 0, count =0;
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
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
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
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// -> [{name: false, count: 2}, {name: true, count: 3}]

// Implementing the countBy function:

function textScripts(text) {
  // This function is used to determine the script of a character by its code point and then return the name of the script or "none" if it is not found
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");
// This is the total number of scripts found
  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";
// This returns the percentage of each script found in the text and the name of the script in a string by using the map method
  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", "); // This joins the strings together with a comma
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
}

// Why does this return 3 2 1 11?
// I've added a return 0 to the loop function to stop the loop when it reaches 1. This is why the loop stops at 1 and returns 0.
console.log(loop(3, n => n > 0, n => n - 1, console.log));

// Everything

function every (array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

function everyUsingSome (array, test) {
  return !array.some(element => !test(element));
}

console.log(every([1, 3, 5], n => n < 10));
// -> true
console.log(everyUsingSome([2, 4, 16], n => n < 10));
// -> false

// Dominant Writing Direction

function dominantDirection(text) {
  let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  if (counted.length === 0) return "ltr";
  return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!"));

/*
  The Secret Life of Objects
*/

// Methods:

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

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
    return array.some(v => v == this.value);
  },
  value: 5
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
  }
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
ArchaicRabbit.prototype.speak = function(line) {
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

let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// -> hello

// Private class properties:

class SecretiveObject {
  #getSecret() {
    return "I ate all the plums"
  }
  interrograte() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}

// I don't understand this, but come back to it:

class RandomSource {
  #max
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
console.log((new Rabbit("basic")).teeth);
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
  Julia: 62
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

console.log(Object.hasOwn({x: 1}, "x"));
// -> true
console.log(Object.hasOwn({x: 1}, "toString"));
// -> false

// Polymorphism:

// String function:
//(overriding the toString method)
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// -> a black rabbit

// Array-like objects:

Array.prototype.forEach.call({
  length: 2,
  0: "a",
  1: "b"
}, elt => console.log(elt));
// -> a
// -> b

// Getters, setters, and statics:

// Getters:

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
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

console.log([1, 2].length)
// -> 2
console.log([1, 2][length]);
// -> 0

let myTrip = {
  length: 2,
  0: "Lankwitz",
  1: "Babelsberg",
  [length]: 21500
};
console.log(myTrip[length], myTrip.length)
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
      return {done: true}
    }
    let value = this.list.value
  }
}

List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
}

let list = List.fromArray([1, 2, 3]);
for (let element of list) {
  console.log(element);
}
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
console.log( new List(3, null) instanceof LengthList);
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
    this.#members = this.#members.filter(v => v !== value);
  }

  has(value) {
    return this.#members.includes(value);
  }

  static from(array) {
    let group = new Group;
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
      return {done: true};
    } else {
      let result = {value: this.#members[this.#position], done: false};
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

