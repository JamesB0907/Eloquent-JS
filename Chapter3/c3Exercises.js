// Eloquent Javascript Chapter 3 Exercises

// Recursion:
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
  

// Bean Counting:
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