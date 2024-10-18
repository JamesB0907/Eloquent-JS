// Eloquent Javascript Chapter 10 Notes

// Modules:

// Modules are an essential part of any programming language. They allow us to split our program into separate files, making it easier to manage and maintain. In JavaScript, modules are files. Each file is a module, and each module can export values or functions that other modules can use.

// Modular Programs:

// A modular program is a program that is divided into separate parts, each of which is a module. Each module is a file that contains a piece of the program. Modules can depend on other modules, and they can export values or functions that other modules can use.

// ES Modules:

// Scripts vs. Modules:

// Scripts execute in the global scope, which means that they can access and modify global variables. Modules, on the other hand, have their own scope, which means that they cannot access or modify global variables. This makes modules more secure and easier to manage.

// Modules are loaded asynchronously, which means that they are loaded in parallel with other scripts and modules. This can improve the performance of your program, especially if you have a lot of modules.

const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function dayName(number) {
    return names[number];
}
export function dayNumber(name) {
    return names.indexOf(name);
}

// Supposing we have another file here:

import {dayName} from "./dayname.js";
let now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
// → Today is Friday

// In the above illustration we have two modules: dayname.js and today.js. The dayname.js module exports two functions: dayName and dayNumber. The today.js module imports the dayName function from the dayname.js module and uses it to display the name of the current day.

// You can alias a module by using the as keyword:

import {dayName as nomDeJeur} from "./dayname.js";
console.log(nomDeJeur(3));
// → Wednesday

// You can also use the keyword export default to export a single value or function from a module:

export default ["Winter", "Spring", "Summer", "Autumn"];

// When you import this type of export to another module, you omit the curly braces:

import seasonNames from "./seasonname.js";

// You can also import all the exports from a module using the * as keyword:

import * as days from "./dayname.js";
console.log(dayName.dayName(3))

// Packages:

// NPM and Node.js are the keystones to accessing useful packages. NPM is a package manager for Node.js that allows you to install, update, and manage packages. Node.js is a JavaScript runtime that allows you to run JavaScript on the server side.

// Instead of writing our own INI parser from scratch we can actually import a preexisting package that does this for us:

import {parse} from "ini";

console.log(parse("x = 10\ny = 20"));
// → {x: "10", y: "20"}

// CommonJS Modules:

// The old way to do things involved using CommonJS modules. CommonJS modules are synchronous, which means that they are loaded one after the other. This can slow down the loading time of your program, especially if you have a lot of modules.

const weekDay = function() {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        name(number) { return names[number]; },
        number(name) { return names.indexOf(name); }
    };
}(); // This syntax immediately invokes the function

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday

// The above code is an example of a CommonJS module. It exports an object that contains two functions: name and number. The object is immediately invoked, which means that it is executed as soon as it is defined.

// Ordinal is a CommonJS module that exports a function that converts numbers to strings:

const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];
    });
}

// When this module is imported into another module, it can be used to format dates:

const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2017, 9, 13), "dddd the Do")); // → Friday the 13th

// require statements are used to import modules in CommonJS. The require statement is followed by the name of the module that you want to import. The module is then assigned to a variable, which can be used to access its exports.

// require is actually a function that takes a single argument: the name of the module that you want to import. The module is then loaded

function require(name) {
    if (!(name in require.cache)) {
        // readFile does not exist in this context
        let code = readFile(name);
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}
require.cache = Object.create(null);

// ES file 'imports' run before the rest of the code in the file and CommonJS 'require' files and run inside the function that 'require' is called in.

// Building and Bundling:

// Building is the process of converting your source code into a format that can be run by a browser or server. This usually involves compiling your code, minifying it, and bundling it into a single file.

// Bundling is the process of combining multiple files into a single file. This can improve the performance of your program, especially if you have a lot of modules.

// Module Design:

// When designing modules, it is important to keep the following principles in mind:
// - Cohesion: Modules should contain related functionality.
// - Encapsulation: Modules should hide their internal state and expose a public interface.
// - Reusability: Modules should be easy to reuse in other programs.
// - Testability: Modules should be easy to test and debug.

// Stateful vs Stateless Modules:

// Stateful modules are modules that have internal state, which means that they can change their behavior based on their state. Stateless modules, on the other hand, are modules that do not have internal state, which means that they always behave the same way.

// Stateful modules are harder to test and debug than stateless modules. This is because stateful modules can have side effects, which can make it difficult to predict their behavior.

// Similar to the Chapter 7 graph, many packages include pathfinding behavior, but the include weight to the edges of the graph. This is useful for finding the shortest path between two points in a graph. Weight is the cost of moving from one node to another. The weight can be distance, time, or any other measure of cost. These are dynamic values that can change over time.

// An example is the dijkstras package that can be used to find the shortest path between two points in a graph. The package includes a function called dijkstra that takes a graph and two nodes as arguments and returns the shortest path between the two nodes.

const {find_path} = require("dijkstrajs");

let graph = {};
for (let node of Object.keys(roadGraph)) {
    let edges = graph[node] = {};
    for (let dest of roadGraph[node]) {
        edges[dest] = 1;
    }
}

console.log(find_path(graph, "Post Office", "Cabin"));
// → ["Post Office", "Alice's House", "Cabin"]

// In this example we are able to use the package to find the shortest path between the Post Office and the Cabin. The package uses the weight of the edges to determine the shortest path. The weight of the edges is 1, which means that the cost of moving from one node to another is 1.

// Summary:

// Modules are an essential part of any programming language. They allow us to split our program into separate files, making it easier to manage and maintain. In JavaScript, modules are files. Each file is a module, and each module can export values or functions that other modules can use.

// ES modules are the new way to do things. They are asynchronous, which means that they are loaded in parallel with other scripts and modules. This can improve the performance of your program, especially if you have a lot of modules.

// CommonJS modules are the old way to do things. They are synchronous, which means that they are loaded one after the other. This can slow down the loading time of your program, especially if you have a lot of modules.

// Building is the process of converting your source code into a format that can be run by a browser or server. This usually involves compiling your code, minifying it, and bundling it into a single file.
