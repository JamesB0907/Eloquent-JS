// Eloquent JavaScript Chapter 2 Exercises

// Looping a Triangle

for (let i = "#"; i.length < 8; i += "#") {
    console.log(i);
  }
  
// The Classic FizzBuzz
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
  
  // Chessboard
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