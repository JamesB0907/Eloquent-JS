// Eloquent JavaScript Chapter 4 Notes

// The Weresquirrel

// Datasets:

let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3

// Bracket notation can be used to access the elements of an array. The number in the brackets is called an index. The index of the first element is 0, the index of the second element is 1, and so on.

// Properties:

// .length is a property that can be used to find the number of elements in an array.

// null.length will return an error because null does not have a length property.

// Methods:

// toUpperCase is a method that can be used to convert a string to uppercase.
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH

// Methods are functions that are stored in properties and are called by adding parentheses to the property name.

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]

// Objects:

let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"],
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false

// Objects are values that can hold other values. They are stored in curly braces. The values inside the object are called properties. Properties can be accessed using dot notation.

// list of properties:

let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree",
};

// touched tree is in quotes because it has a space in it. It may look like a normal string, but it is a property name since it has a colon with a value.

// delete is a method that can be used to remove a property from an object.

let anObject = { left: 1, right: 2 };
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true

// The in operator can be used to check if a property is in an object.

// Object.keys is a method that can be used to find the properties of an object.

console.log(Object.keys({ x: 0, y: 0, z: 2 }));
// → ["x", "y", "z"]

// Object.assign is a method that can be used to copy the properties of an object to another object.

let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);
// → {a: 1, b: 3, c: 4}

// Arrays:

// Arrays are objects that have a length property and properties that are numbers. The length property is always one more than the highest index.

// If you use typeof on [] it will return object.

let journal = [
  {
    events: ["work", "touched tree", "pizza", "running", "television"],
    squirrel: false,
  },
  {
    events: [
      "work",
      "ice cream",
      "cauliflower",
      "lasagna",
      "touched tree",
      "brushed teeth",
    ],
    squirrel: false,
  },
  {
    events: ["weekend", "cycling", "break", "peanuts", "beer"],
    squirrel: true,
  },
];

// Mutability:

// Objects and arrays are mutable. This means that you can change their properties after they are created.

let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };
console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false
object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10

// object1 and object2 are the same object. object3 is a different object.

// The object1.value = 15 line changes the value of object1 and object2 because they are the same object.

const score = { visitors: 0, home: 0 };
score.visitors = 1;
// → 1
score = { visitors: 1, home: 1 };
// → Error

// The score object is constant, but the properties of the object are mutable.

// The Lycanthrope's log:

let journal2 = [];

function addEntry(events, squirrel) {
  journal2.push({ events, squirrel });
}

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(
  [
    "work",
    "ice cream",
    "cauliflower",
    "lasagna",
    "touched tree",
    "brushed teeth",
  ],
  false
);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);

// The addEntry function adds an entry to the journal2 array. The entry is an object with the events and squirrel properties.

// Correlation:
// The correlation coefficient is a measure of how much two variables change together. It ranges from -1 to 1. A correlation of 1 means that the variables change together perfectly. A correlation of -1 means that the variables change together perfectly, but in opposite directions. A correlation of 0 means that the variables do not change together.

// The phi coefficient is a measure of the correlation between two binary variables. It ranges from -1 to 1. A phi coefficient of 1 means that the variables change together perfectly. A phi coefficient of -1 means that the variables change together perfectly, but in opposite directions. A phi coefficient of 0 means that the variables do not change together.

// In the weresquirrel example, the phi coefficient is used to measure the correlation between the events and the squirrel transformation.

// NOTE TO SELF: Learn more math to understand this better.

// Computing Correlation:

// First we need to create a table that shows how many times each combination of events occurred.
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}
console.log(phi([76, 9, 4, 1]));
// → 0.068599434

// The phi function takes a table as an argument and returns the phi coefficient.
function tableFor(event, journal2) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal2.length; i++) {
    let entry = journal2[i],
      index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", journal2));

// The tableFor function takes an event and the journal2 array as arguments and returns a table that shows how many times each combination of events occurred.

// Here is how the table is structured:
// 00: no event, no squirrel
// 01: no event, squirrel
// 10: event, no squirrel
// 11: event, squirrel

// When these function run, they will return the number of times each combination of events occurred.

// The final step is to find the correlation between each event and the squirrel transformation.

// Array Loops:

for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}

// The simpler way to write this loop is to use the for/of loop.

for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}

// The Final Analysis:

function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]

// The journalEvents function takes the journal array as an argument and returns an array of all the events that occurred in the journal.

// The includes method can be used to check if an array includes a certain element.

// The final step is to find the correlation between each event and the squirrel transformation.

for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
// → carrot: 0.014097096210292798
// → exercise: 0.06859943405700354
// → weekend: 0.13719886811400708
// → bread: -0.07575540199888367
// → pudding: -0.06482037235521614
// → …

// The for/of loop is used to loop through the events and find the correlation between each event and the squirrel transformation.

// Most transformations have a correlation close to 0, which means that they do not have a strong correlation with the squirrel transformation. But weekend has a correlation of 0.137, which means that it has a moderate correlation with the squirrel transformation.

// We can use the filter method to find the events that have a correlation greater than 0.1.

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// → weekend: 0.13719886811400708
// → brushed teeth: -0.38052119530505415
// → candy: 0.12964074471043288
// → work: -0.13719886811400708
// → spaghetti: 0.24253562503633297
// → reading: 0.11068280542756724
// → peanuts: 0.5902679811684209

// There are two factors with a correlation clearly stronger than the others. Eating peanuts has a strong positive effect on the chance of turning into a squirrel, whereas brushing teeth has a significant negative effect.

// Now we creat function to compare events that correspond to both peanuts and NOT brushing teeth.

for (let entry of JOURNAL) {
  if (
    entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")
  ) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));

// There is a correlation of 1 between eating peanuts and not brushing teeth.

// Further Arrayology:

// shift and unshift can be used to add and remove elements from the beginning of an array.

let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}

// The todoList array is used to store tasks. The remember function adds a task to the end of the array. The getTask function removes a task from the beginning of the array. The rememberUrgently function adds a task to the beginning of the array.

// indexOf can be used to find the index of an element in an array.

console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3

// slice can be used to create a new array that is a subset of an existing array.

console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]

// concat can be used to concatenate two arrays.

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]

// The remove function takes an array and an index as arguments and returns a new array with the element at the index removed.

// Strings and their Properties:

// Strings have properties and methods just like arrays.

let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined

// You cannot add properties to a string.

// You can use methods like slice and indexOf on strings.

console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5

// You can use the trim method to remove whitespace from the beginning and end of a string.

console.log("  okay \n".trim());

// The padStart and padEnd methods can be used to add padding to a string.

console.log(String(6).padStart(3, "0"));
// → 006

// The split method can be used to split a string into an array.

let sentence = "Secretarybirds specialize in stomping";

let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]

// The join method can be used to join an array into a string.

console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping

// Rest Parameters:

// The rest parameter can be used to get all the arguments in an array.

function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}

console.log(max(4, 1, 9, -2));
// → 9

// The max function takes any number of arguments and returns the largest one.

let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

// The spread operator can be used to spread an array into separate arguments.

// Math Object:

// The Math object has properties and methods for mathematical constants and functions.

console.log(Math.random());
// → 0.36993729369714856

console.log(Math.floor(Math.random() * 10));
// → 7

// Destructuring:

// Destructuring can be used to extract values from arrays and objects.

let [x, y] = [1, 2];
console.log(x);
// → 1

let { name } = { name: "Faraji", age: 23 };
console.log(name);
// → Faraji

// The destructuring assignment can be used to assign values to variables.

// Optional Property Access:

function city(object) {
    return object?.address?.city;
}
console.log(city({ address: { city: "New York" } }));
// → New York
console.log(city({}));
// → undefined

// The ? operator can be used to access properties of an object that may not exist.

// JSON:

// JSON is a format for storing and exchanging data.

let string = JSON.stringify({ squirrel: false, events: ["weekend"] });
console.log(string);
// → {"squirrel":false,"events":["weekend"]}

console.log(JSON.parse(string).events);
// → ["weekend"]

// The JSON.stringify method can be used to convert an object to a JSON string. The JSON.parse method can be used to convert a JSON string to an object.



