// Exercises from Chapter 9:

// Regexp Golf:

// car and cat:
console.log(/ca[rt]/.test("cat")); // -> true
console.log(/ca[rt]/.test("car")); // -> true
// pop and prop:
console.log(/pr?op/.test("pop")); // -> true
console.log(/pr?op/.test("prop")); // -> true
// ferret, ferry, and ferrari:
console.log(/ferr(et|y|ari)/.test("ferret")); // -> true
console.log(/ferr(et|y|ari)/.test("ferry")); // -> true
console.log(/ferr(et|y|ari)/.test("ferrari")); // -> true
// Any word ending in ious:
console.log(/ious$/.test("conscious")); // -> true
console.log(/ious$/.test("ambitious")); // -> true
console.log(/ious$/.test("vicious")); // -> true
// A whitespace character followed by a period, comma, colon, or semicolon:
console.log(/\s[.,:;]/.test(" .")); // -> true
console.log(/\s[.,:;]/.test(" ,")); // -> true
console.log(/\s[.,:;]/.test(" :")); // -> true
// A word longer than six letters:
console.log(/[a-zA-Z]{7,}/.test("seventh")); // -> true
console.log(/[a-zA-Z]{7,}/.test("sixth")); // -> false
// A word without the letter e:
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("hello")); // -> false
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("world")); // -> true
console.log(/(^|\P{L})[^\P{L}e]+($|\P{L})/ui.test("elephant")); // -> false

// Quoting Style:

let textSample = "'I'm the cook,' he said, 'it's my job.'";

console.log(textSample.replace(/(^|\P{L})'|'(\P{L}|$)/gu, '$1"$2'));

// Numbers Again:

let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;