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