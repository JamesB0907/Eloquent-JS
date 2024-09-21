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