// Note: explore phi and correlation later to get a better understanding

const range = (start, end, step) => {
    let arr = [];
    if (step > 0) {
      for (i = start; i <= end; i += step) {
        arr.push(i);
      }
    } else {
      for (i = start; i <= end; i++) {
        arr.push(i);
      }
    }
    return arr;
  };
  
  // Make sure to add the brackets around the numbers array in the sum function
  // (Also: this probably does not require a spread operator...)
  const sum = ([...numbers]) => {
    let total = 0;
    for (let number of numbers) {
      total += number;
    }
    return total;
  };
  
  console.log(range(1, 10, 2));
  console.log(sum(range(1, 10, 2)));
  
  const reverseArray = ([...array]) => {
    newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[array.length - 1 - i]);
    }
    return newArray;
  };
  
  console.log(reverseArray([1, 2, 3, 4, 5]));
  
  const reverseArrayInPlace = (array) => {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      let old = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = old;
    }
    return array;
  };
  
  console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  
  const arrayToList = (array) => {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
      list = { value: array[i], rest: list };
    }
    return list;
  };
  
  console.log(arrayToList([1, 2, 3]));
  
  const listToArray = (list) => {
    array = [];
    if (list.rest === null) {
      array.push(list.value);
    } else {
      // It's important to use a while loop because we don't know how many elements are in the list
      while (list.rest !== null) {
        array.push(list.value);
        // This is how we move to the next element in the list
        list = list.rest;
      }
      // This is how we add the last element to the array
      array.push(list.value);
    }
    return array;
  };
  
  console.log(
    listToArray({
      value: 1,
      rest: {
        value: 2,
        rest: {
          value: 3,
          rest: null,
        },
      },
    })
  );
  
  const prepend = (element, list) => {
    return { value: element, rest: list };
  };
  
  // Why does this no work after the third value?
  console.log(prepend(1, arrayToList([2, 3])));
  
  const nth = (list, n) => {
    if (n === 0) {
      return list.value;
    } else {
      return nth(list.rest, n - 1);
    }
  };
  
  console.log(nth(arrayToList([1, 2, 3]), 2));
  
  //I'm not sure this one is fully correct. Refer to chapter solution
  const deepEqual = (first, second) => {
    if (first !== second) return false;
    else if (Object.keys(first) !== Object.keys(second)) return false;
    else if (Object.keys(first).length !== Object.keys(second).length)
      return false;
    else if (typeof first === typeof second && first === second) return true;
  };