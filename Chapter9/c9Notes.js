// Eloquent Javascript Chapter 9 Notes

// Regular Expressions:

// Two ways to create a regular expression:
let re1 = new RegExp("abc");
let re2 = /abc/;

// Special characters in regular expressions:
let aPlus = /A\+/;

// Testing for matches:

// .test Method:
console.log(/abc/.test("abcde")); // -> true
console.log(/abc/.test("abxde")); // -> false

// Sets of Characters:

console.log(/[0123456789]/.test("in 1992")); // -> true
console.log(/[0-9]/.test("in 1992")); // -> also true

// Shortcuts for common character sets:

/*
  \d - Any digit character
  \w - An alphanumeric character ("word character")
  \s - Any whitespace character (space, tab, newline, etc.)
  \D - A character that is not a digit
  \W - A nonalphanumeric character
  \S - A nonwhitespace character
  . - Any character except for newline
*/

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20")); // -> true
console.log(dateTime.test("30-jan-2003 15:20")); // -> false

// Inverting a set of characters:
let nonBinary = /[^01]/;
console.log(nonBinary.test("1100100010100110")); // -> false
console.log(nonBinary.test("1100100010200110")); // -> true

// International Characters:

/*
  \p{L} - Any Unicode letter
  \p{N} - Any Unicode digit character
  \p{P} - Any Unicode punctuation character
  \P{L} - Any Non-Letter (uppercase P inverts)
  \p{Script=Hangul} Any character from the given script (Hangul is a Korean script)
*/

console.log(/\p{L}/u.test("α")); // → true
console.log(/\p{L}/u.test("!")); // → false
console.log(/\p{Script=Greek}/u.test("α")); // → true
console.log(/\p{Script=Arabic}/u.test("α")); // → false

// Repeating parts of a pattern:

// Using + and \d to match a sequence of one or more digits:

console.log(/'\d+'/.test("'123'")); // -> true
console.log(/'\d+'/.test("''")); // -> false

// Using * and \d to match a sequence of zero or more digits:
console.log(/'\d*'/.test("'123'")); // -> true
console.log(/'\d*'/.test("''")); // -> true

// Using the ? character to indicate that a pattern is optional:

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour")); // -> true
console.log(neighbor.test("neighbor")); // -> also true

// Using {} with a number inserted to indicate a specific number of repetitions:

let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test("1-30-2003 8:45")); // -> true
// If you insert two numbers separated by a comma, the first number is the minimum number of repetitions and the second number is the maximum number of repetitions.

// You can make it open-ended by omitting the second number: {5,} means five or more repetitions.

// Grouping Subexpressions:

// This means that boo and hoo can be repeated one or more times in the string AND that boohoo can be repeated one or more times in the string. i is used to make the expression case-insensitive.
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo")); // -> true

// Matches and Groups:

//Regex exec method returns null if no match is found and an object with information about the match if a match is found.

// index returns the position of the match in the string

let match = /\d+/.exec("one two 100");
console.log(match); // -> ["100"]
console.log(match.index); // -> 8

//NOTE: Strings have a match method that behaves similarly to the above code:
console.log("one two 100".match(/\d+/)); // -> ["100"]

// The output also includes the input string and the groups that were matched.

// Subexpressions print seperate text in the same array:
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // -> ["'hello'", "hello"]

// The first element in the array is the whole match and the second element is the first group that was matched.

// The exec method will return null if no match is found.

console.log(/bad(ly)?/.exec("bad")); // -> ["bad", undefined]
console.log(/(\d)+/.exec("123")); // -> ["123", "3"]

// Allow the program to only print one match for two matching expressions:

console.log(/(?:na)+/.exec("banana")); // -> ["nana"]

//The Date Class:

console.log(new Date()); // -> current date and time

console.log(new Date(2009, 11, 9)); // -> December 9, 2009
console.log(new Date(2009, 11, 9, 12, 59, 59, 999)); // -> December 9, 2009, 12:59:59.999

console.log(new Date(2013, 11, 19).getTime()); // -> 1387407600000
console.log(new Date(1387407600000)); // -> December 19, 2013

let timeNow = new Date().getTime();
console.log("Current Milliseconds: " + timeNow);
// or
console.log("Current Milliseconds: " + Date.now());

// Date objects provide methods to extract their components:
/*
  1. getFullYear - returns the year
  2. getMonth - returns the month (0-11)
  3. getDate - returns the day of the month (1-31)
  4. getDay - returns the day of the week (0-6)
  5. getHours - returns the hour (0-23)
  6. getMinutes - returns the minutes (0-59)
  7. getSeconds - returns the seconds (0-59)
*/

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}

console.log(getDate("1-30-2003")); // -> Thu Jan 30 2003 00:00:00 GMT+0100

// Boundaries and Look-Ahead:

console.log(/a(?=e)/.exec("braeburn")); // -> ["a", index: 3, input: "braeburn"]
console.log(/a(?! )/.exec("a b")); // -> null

// Choice Patterns:

// Using OR (represented by a '|') to match a choice of patterns:

let animalCount = /\d+ (pig|cow|chicken)s?/;
console.log(animalCount.test("15 pigs")); // -> true
console.log(animalCount.test("15 pugs")); // -> false

// The Replace Method:

console.log("papa".replace("p", "m")); // -> mapa

// In a regular expression:

console.log("Borobudur".replace(/[ou]/, "a")); // → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar

console.log(
  "Liskov, Barbara\nMcCarthy, John\nMilner, Robin".replace(
    /(\p{L}+), (\p{L}+)/gu,
    "$2 $1"
  )
); // → Barbara Liskov // John McCarthy // Robin Milner

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne)); // → no lemon, 1 cabbage, and 100 eggs

// Greed:

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3")); // → 1 + 3
console.log(stripComments("x = 10; // ten!")); // → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1")); // → 1 1

// The Last one does not work as intended and actually removes the + sign. This is because the * operator is greedy and will match as much as possible. To fix this, we can use the ? operator to make the * operator non-greedy.

function fixedStripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1")); // This actually does not work as intended. The book is wrong.

// Dynamically Creating RegExp Objects:

let exampleName = "harry";
let regexp = new RegExp("(^|\\ s)" + exampleName + "($|\\s)", "gi");
console.log(regexp.test("Harry is a dodgy character."));

let screenName = "dea+hl[]rd";
let escaped = screenName.replace(/[\\[. +*?(){|^$]/g, "\\ $&");
let regexp2 = new RegExp("( ^ |\\ s)" + escaped + "( $ |\\ s)", "gi");
let text = "This dea+hl[]rd guy is super annoying.";
console.log(regexp2.test( text));

// The Search Method:

console.log("  word".search(/\S/)); // → 2
console.log("    ".search(/\S/)); // → -1

// The LastIndex Property:

let pattern = /y/g;
pattern.lastIndex = 3;
let match2 = pattern.exec("xyzzy");
console.log(match2.index); // → 4
console.log(pattern.lastIndex); // → 5


// Global search and match:
let global = /abc/g;
console.log(global.exec("xyz abc")); // → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc")); // → null

let digit = /\d/g;
console.log(digit.exec("here it is: 1")); // → ["1"]
console.log(digit.exec("and now: 1")); // → null

console.log("Banana".match(/an/g)); // → ["an", "an"]

let input = "A string with 3 numbers in it... 42 and 88.";
let matches = input.matchAll(/\d+/g);
for (let singleMatch of matches) {
  console.log("Found", match[0], "at", match.index);
}
// → Found 3 at 14
// → Found 42 at 33
// → Found 88 at 38

// Parsing an INI file:

function parseINI(string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match3;
    if ((match3 = line.match(/^(\w+)=(.*)$/))) {
      section[match3[1]] = match[2];
    } else if ((match3 = line.match(/^\[(.*)\]$/))) {
      section = result[match3[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error(`Line '${line}' is not valid.`);
    }
  });
  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

// Code Units and Characters:

console.log(/🍎{ 3}/. test("🍎🍎🍎")); // → false
console.log(/<.>/. test(" < 🌹 >")); // → false 
console.log(/<.>/u.test(" < 🌹 >")); // → true

console.log(/🍎{3}/u.test("🍎🍎🍎")); // → true

// List of regex definitions:

  // /abc/ - A sequence of characters
  // /[abc]/ - Any character from a set of characters
  // /[^abc]/ - Any character not in a set of characters
  // /[0-9]/ - Any character in a range of characters
  // /x+/ - One or more occurrences of the pattern x
  // /x+?/ - One or more occurrences of the pattern x, nongreedy
  // /x*/ - Zero or more occurrences of the pattern x
  // /x?/ - Zero or one occurrence of the pattern x
  // /x{2,4}/ - Two to four occurrences of the pattern x
  // /(abc)/ - A group
  // /a|b|c/ - Any one of several patterns
  // /\d/ - Any digit character
  // /\w/ - An alphanumeric character ("word character")
  // /\s/ - Any whitespace character
  // /./ - Any character except for newline
  // /\p{L}/u - Any letter character in any language
  // /^/ - Start of input
  // /$/ - End of input
  // /(?=a)/ - A look-ahead test that matches a pattern only if it is followed by a specific pattern

// Regex has custom methods and properties:

  // .test() - Returns a boolean indicating whether the pattern is found in the string
  // .exec() - Returns an array containing the matched text and groups
  //.index - The position of the start of the match

// Regex has options:

// Global = /g - Find all matches
// Case-insensitive = /i - Ignore case
// Sticky = /y - Match only from the lastIndex position
// Unicode = /u - Match characters in the Unicode standard
// Multiline = /m - Match multiple lines