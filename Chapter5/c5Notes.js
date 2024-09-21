// Eloquent Javascript Chapter 5 Notes

// // Higher-Order Functions:

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
