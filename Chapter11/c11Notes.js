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
readTextFile("shopping_list.txt", content => {
    console.log(`Shopping List:\n${content}`);
}); 
// -> Shopping List:
// -> Milk
// -> Eggs
// -> Ect...

// The above callback can require you to pass a lot of functions as arguments, which can make the code hard to read and maintain.

// The code below has multiple nested callbacks, which can make the code hard to read and maintain.
function compareFiles(file1, file2, callback) {
    readTextFile(file1, content1 => {
        readTextFile(file2, content2 => {
            callback(content1 == content2);
        });
    });
}

// Promises:

// Promises are like receipts representing the result of an asynchronous operation. They can be in one of three states: pending, fulfilled, or rejected.

// Promise holds the function 'resolved' as a property which can be used to resolve the promise once the asynchronous operation is complete.

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// -> Got 15

// In a more practical example, we can use promises to read a file asynchronously.

function readFile(file) {
    return new Promise(resolve => {
        readTextFile(file, content => resolve(text));
    });
}

textFile("plans.txt").then(console.log);

// The 'then' method is used to handle the result of the promise. It takes a function as an argument that will be called when the promise is resolved.

function randomFile(listFile) {
    return textFile(listFile)
        .then(content => content.trim().split("\n"))
        .then(ls => ls[Math.floor(Math.random() * ls.length)])
        .then(filename => textFile(filename));
}

// This function stops the execution of the code until the promise is resolved. This can be useful if you need to wait for the result of an asynchronous operation before continuing.

// In the above example the 'then' method is used to chain multiple promises together. This can make the code easier to read and maintain.

// .then() can also be used to receive some synchonous data and produce a processed version of it:

function jsonFile(file) {
    return textFile(file).then(JOSN.parse)
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
    .then(value => console.log("Handler 1:", value))
    // The 'catch' handler will catch the rejection and log the error
    .catch(reason => {
        console.log("Caught failure: " + reason);
        // Return a value to continue the promise chain
        return "nothing";
    })
    // This 'then' handler will receive the value returned from the 'catch' handler
    .then(value => console.log("Handler 2:", value));
    // -> Caught failure: Error: Fail
    // -> Handler 2: nothing

// The 'catch' method is used to handle errors in promises. It takes a function as an argument that will be called when the promise is rejected.

// '_' is used as a placeholder for the value that is not used. It is a common convention in JavaScript to use '_' as a placeholder for unused values.

// Carla the crow breaking into the wifi:

function withTimeout(promise, time) {
    return new Promise((resolve, reject) =>{
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
            .catch(failure => {
                if (failure == "Timed out") {
                    return nextDigit(newCode, 0)
                } else if (digit < 9) {
                    return nextDigit(code, digit + 1);
                } else {
                    throw failure
                }
            });
    }
    return nextDigit("", 0);
}


// To access the wifi Carla adds a timeout at 50 milliseconds, since the access point responds to bad requests in about 20 milliseconds.

crackPassword("HANGAR 2").then(console.log); // -> 555555