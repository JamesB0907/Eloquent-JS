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
    events: ["work", "touched tree", "pizza", "running"]
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
    "touched tree": "Touched a tree"
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
    { events: ["work", "touched tree", "pizza", "running", "television"], squirrel: false },
    { events: ["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], squirrel: false },
    { events: ["weekend", "cycling", "break", "peanuts", "beer"], squirrel: true },
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




