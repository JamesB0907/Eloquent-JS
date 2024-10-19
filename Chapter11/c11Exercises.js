// Eloquent JavaScript Chapter 11 Exercises

// Quiet Times:

async function activityTable(day) {
  let table = [];
  // Initialize the table with 24 zeros, one for each hour of the day
  for (let i = 0; i < 24; i++) table[i] = 0;

  // Read the list of log file names from "camera_logs.txt"
  let logFileList = await textFile("camera_logs.txt");
  for (let filename of logFileList.split("\n")) {
    // Read each log file
    let log = await textFile(filename);
    for (let timestamp of log.split("\n")) {
      // Convert the timestamp to a Date object
      let date = new Date(Number(timestamp));
      // If the log entry is from the specified day, increment the corresponding hour in the table
      if (date.getDay() == day) {
        table[date.getHours()]++;
      }
    }
  }

  return table;
}

// Call the function for day 1 (Monday) and log the resulting activity table
activityTable(1).then((table) => console.log(activityGraph(table)));

// Real Promises:

function syncedActivityTable(day) {
  // Read the list of log file names from "camera_logs.txt"
  return textFile("camera_logs.txt").then((logFileList) => {
    let table = [];
    // Initialize the table with 24 zeros, one for each hour of the day
    for (let i = 0; i < 24; i++) table[i] = 0;
    // Process each log file
    return Promise.all(
      logFileList.split("\n").map((filename) =>
        // Read each log file
        textFile(filename).then((log) => {
          for (let timestamp of log.split("\n")) {
            // Convert the timestamp to a Date object
            let date = new Date(Number(timestamp));
            // If the log entry is from the specified day, increment the corresponding hour in the table
            if (date.getDay() == day) {
              table[date.getHours()]++;
            }
          }
        })
      )
    ).then(() => table); // Return the completed table after all promises resolve
  });
}

// Building Promise.All:

function Promise_all(promises) {
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Array to store the results of each promise
    let results = [];
    // Counter to keep track of how many promises are still pending
    let pending = promises.length;

    // Loop through each promise in the input array
    for (let i = 0; i < promises.length; i++) {
      // For each promise, attach a 'then' handler
      promises[i]
        .then((result) => {
          // Store the result at the corresponding index
          results[i] = result;
          // Decrement the pending counter
          pending--;
          // If all promises are resolved, resolve the main promise with the results array
          if (pending == 0) resolve(results);
        })
        .catch(reject); // If any promise is rejected, reject the main promise
    }

    // If the input array is empty, resolve immediately with an empty array
    if (promises.length == 0) resolve(results);
  });
}

// Test code
Promise_all([]).then((array) => {
  console.log("This should be []:", array); // Should log: This should be []: []
});

function soon(val) {
  // Return a promise that resolves with the given value after a random delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1, 2, 3]:", array); // Should log: This should be [1, 2, 3]: [1, 2, 3]
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here"); // This line should not execute
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error); // Log unexpected errors
    }
  });
