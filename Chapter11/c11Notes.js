// Eloquent Javascript Chapter 11 Notes

// Asynchronous Programming:

// Asynchronous programming is a way of writing code that allows it to run in parallel with other code. This can improve the performance of your program, especially if you have a lot of I/O operations or long-running tasks.

// Asychronicity:

// Asynchronicity is the ability of a program to perform multiple tasks at the same time. This can be achieved by using callbacks, promises, or async/await.

// In synchronous programming, tasks are executed at the same time. In asynchronous programming, tasks are executed one after the other.

// For example if we have a program that makes two requests over a network, a synchorous model of execution would make both requests at the same time. If we give the program an asynchronous model of execution, we can have one request await the other's completion.

// Callbacks:

// Callbacks are functions that are passed as arguments to other functions. They are used to handle asynchronous operations in JavaScript.

setTimeout(() => console.log("Tick"), 500);
// When ran, this code will print "Tick" after 500 milliseconds.

// In this example 'readTextFile' is assumed to exist and 'shopping_list.txt' is a readable file
readTextFile("shopping_list.txt", (content) => {
  console.log(`Shopping List:\n${content}`);
});
// -> Shopping List:
// -> Milk
// -> Eggs
// -> Ect...

// The above callback can require you to pass a lot of functions as arguments, which can make the code hard to read and maintain.

// The code below has multiple nested callbacks, which can make the code hard to read and maintain.
function compareFiles(file1, file2, callback) {
  readTextFile(file1, (content1) => {
    readTextFile(file2, (content2) => {
      callback(content1 == content2);
    });
  });
}

// Promises:

// Promises are like receipts representing the result of an asynchronous operation. They can be in one of three states: pending, fulfilled, or rejected.

// Promise holds the function 'resolved' as a property which can be used to resolve the promise once the asynchronous operation is complete.

let fifteen = Promise.resolve(15);
fifteen.then((value) => console.log(`Got ${value}`));
// -> Got 15

// In a more practical example, we can use promises to read a file asynchronously.

function readFile(file) {
  return new Promise((resolve) => {
    readTextFile(file, (content) => resolve(content));
  });
}
textFile("plans.txt").then(console.log);

// The 'then' method is used to handle the result of the promise. It takes a function as an argument that will be called when the promise is resolved.

function randomFile(listFile) {
  return textFile(listFile)
    .then((content) => content.trim().split("\n"))
    .then((ls) => ls[Math.floor(Math.random() * ls.length)])
    .then((filename) => textFile(filename));
}


// This function stops the execution of the code until the promise is resolved. This can be useful if you need to wait for the result of an asynchronous operation before continuing.

// In the above example the 'then' method is used to chain multiple promises together. This can make the code easier to read and maintain.

// .then() can also be used to receive some synchonous data and produce a processed version of it:

function jsonFile(file) {
  return textFile(file).then(JOSN.parse);
}

jsonFile("package.json").then(console.log);

// Failure:

// Promises can also fail. If a promise is rejected, the 'catch' method is called. This method takes a function as an argument that will be called when the promise is rejected.

// One method in handling errors is to simply use a condtional on the first argument.

someAsyncFunction((error, value) => {
  if (error) handleError(error);
  else processValue(value);
});

// The above code can be rewritten using promises:

function textFileNewName(filename) {
  return new Promise((resolve, reject) => {
    readTextFile(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}
// The chains of promise values form a pipelione through which the asynchoronous values or failures will flow. This can be useful for error handling.

// Create a new promise that immediately rejects with an error
new Promise((_, reject) => reject(new Error("Fail")))
  // This 'then' handler will be skipped because the promise was rejected
  .then((value) => console.log("Handler 1:", value))
  // The 'catch' handler will catch the rejection and log the error
  .catch((reason) => {
    console.log("Caught failure: " + reason);
    // Return a value to continue the promise chain
    return "nothing";
  })
  // This 'then' handler will receive the value returned from the 'catch' handler
  .then((value) => console.log("Handler 2:", value));
// -> Caught failure: Error: Fail
// -> Handler 2: nothing

// The 'catch' method is used to handle errors in promises. It takes a function as an argument that will be called when the promise is rejected.

// '_' is used as a placeholder for the value that is not used. It is a common convention in JavaScript to use '_' as a placeholder for unused values.

// Carla the crow breaking into the wifi:

function withTimeout(promise, time) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(() => reject("Timed out"), time);
  });
}

// Since a promise can only be resolved or rejected once this function is exploited by Carla to break into the wifi.

// In order to get the entire passcode the program must repeatedly try the next digit until it gets the entire passcode.

function crackPassword(networkID) {
  function nextDigit(code, digit) {
    let newCode = code + digit;
    return withTimeout(joinWifi(networkID, newCode), 50)
      .then(() => newCode)
      .catch((failure) => {
        if (failure == "Timed out") {
          return nextDigit(newCode, 0);
        } else if (digit < 9) {
          return nextDigit(code, digit + 1);
        } else {
          throw failure;
        }
      });
  }
  return nextDigit("", 0);
}

// To access the wifi Carla adds a timeout at 50 milliseconds, since the access point responds to bad requests in about 20 milliseconds.

crackPassword("HANGAR 2").then(console.log); // -> 555555

// Async functions:

// Using the async keyword we can reduce the amount of boilerplate code needed to work with promises. We can rewrite out crackPasscode function like so:

async function asyncCrackPasscode(networkID) {
  // Infinite loop to keep trying until the passcode is found
  for (let code = ""; ; ) {
    // Loop through each digit from 0 to 9
    for (let digit = 0; ; digit++) {
      let newCode = code + digit;
      try {
        // Await the promise with a timeout of 50 milliseconds
        await withTimeout(joinWifi(networkID, newCode), 50);
        // If successful, return the newCode
        return newCode;
      } catch (failure) {
        if (failure == "Timed out") {
          // If timed out, update the code and break to try the next digit
          code = newCode;
          break;
        } else if (digit == 9) {
          // If all digits (0-9) fail, throw the failure
          throw failure;
        }
      }
    }
  }
}

// Generators:

// function* is used to define a generator function. This function can be paused and resumed at any time.

function* powers(n) {
  for (let current = n; ; current *= n) {
    // yield is a keyword that is used to pause the generator function and return a value. When the generator function is resumed, it will continue from the point where it was paused.
    yield current;
  }
}

for (let power of powers(3)) {
  if (power > 50) break;
  console.log(power);
}
// -> 3
// -> 9
// -> 27

// Iterator for Group class:

Group.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this.members.length; i++) {
    yield this.members[i];
  }
};

// A Corvid Art Project

// Loop through IP addresses from 10.0.0.1 to 10.0.0.255
for (let addr = 1; addr < 256; addr++) {
  // Create an array to hold the data to be sent
  let data = [];
  // Fill the data array with 1500 elements
  for (let n = 0; n < 1500; n++) {
    // If n is less than the current address, push 3, otherwise push 0
    data.push(n < addr ? 3 : 0);
  }
  // Construct the IP address
  let ip = `10.0.0.${addr}`;
  // Send a request to the IP address with the command "display" and the data array
  request(ip, { command: "display", data })
    // If the request is successful, log the IP address
    .then(() => console.log(`Request to ${ip} accepted`))
    // If the request fails, do nothing
    .catch(() => {});
}

// The code above sends a request to each IP address in the range

const screenAddresses = [
  "10.0.0.44",
  "10.0.0.45",
  "10.0.0.41",
  "10.0.0.31",
  "10.0.0.40",
  "10.0.0.42",
  "10.0.0.48",
  "10.0.0.47",
  "10.0.0.46",
];

function displayFrame(frame) {
  // The function displayFrame takes an array called 'frame' as an argument.

  // Promise.all is used to run multiple asynchronous operations in parallel.
  return Promise.all(
    // The map function is used to iterate over each element in the 'frame' array.
    frame.map((data, i) => {
      // For each element in the 'frame' array, a request is made to a screen address.
      // 'screenAddresses[i]' gets the corresponding screen address for the current index 'i'.
      // The request function sends a command "display" along with the data to the screen address.
      return request(screenAddresses[i], {
        command: "display",
        data,
      });
    })
  );
  // Promise.all ensures that the function returns a single promise that resolves when all the requests are complete.
}

// Function to create a promise that resolves after a specified time
function wait(time) {
  return new Promise((accept) => setTimeout(accept, time));
}

// Class representing a video player
class VideoPlayer {
  constructor(frames, frameTime) {
    this.frames = frames; // Array of frames to display
    this.frameTime = frameTime; // Time to display each frame
    this.stopped = true; // Flag to control playback
  }

  // Method to start playing the video
  async play() {
    this.stopped = false; // Set stopped flag to false
    for (let i = 0; !this.stopped; i++) {
      let nextFrame = wait(this.frameTime); // Wait for the frame time
      await displayFrame(this.frames[i % this.frames.length]); // Display the current frame
      await nextFrame; // Wait for the next frame
    }
  }

  // Method to stop playing the video
  stop() {
    this.stopped = true; // Set stopped flag to true
  }
}

// The wait function wraps setTimeout in a promise, allowing it to be used with async/await.

let video = new VideoPlayer(clipImages, 100);
video.play().catch((e) => {
  console.log("Playback failed: " + e);
});
setTimeout(() => video.stop(), 15000);

// The code above creates a video player that displays frames from an array of images at a specified frame rate.

// The play method uses a for loop to iterate over the frames array and display each frame using the displayFrame function.

// The stop method sets the stopped flag to true, which stops the playback loop.

// The video player is started by calling the play method and stopped after 15 seconds using setTimeout.

// The Event Loop:

// The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations. It is responsible for handling asynchronous events and executing callback functions.

// The event loop works by continuously checking the event queue for new events. When an event is found, the event loop will execute the associated callback function.

try {
  setTimeout(() => {
    throw new Error("Woosh");
  }, 20);
} catch (e) {
  // This will not run
  console.log("Caught: " + e);
}

// The code above will not catch the error because the try-catch block is synchronous and the error is thrown asynchronously.

// The event loop is responsible for handling asynchronous events and executing callback functions.

// But if a timeout is set to 20 milliseconds, the error will be caught:

let start = Date.now();
setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start);
}, 20);
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);
// -> Wasted time until 50
// -> Timeout ran at 50

// Asynchronous Bugs:

// Asynchronous programming can introduce bugs that are difficult to debug. These bugs can occur when code relies on the order of asynchronous operations.

async function fileSizes(files) {
  let list = "";
  await Promise.all(
    files.map(async (file) => {
      list += fileName + ": " + (await file.size()) + "\n";
    })
  );
  return list;
}

// The code above uses async/await to get the size of each file in the files array. The fileSizes function returns a list of file names and sizes.

// The code has a bug because the list variable is modified inside the map function, which is an asynchronous operation. This can cause the list variable to be modified out of order.

fileSizes(["file1", "file2", "file3"]).then(console.log);

// To fix the bug, the list variable should be an array that is joined at the end of the function:

async function fileSizes(files) {
  let lines = files.map(async (fileName) => {
    return fileName + ": " + (await textFile(fileName)).length;
  });
  return (await Promise.all(lines)).join("\n");
}


