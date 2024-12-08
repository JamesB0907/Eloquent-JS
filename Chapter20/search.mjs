// Search Tool

// 'grep' is a command-line utility for searching plain-text data sets for lines that match a regular expression. It is a powerful tool for quickly finding information in files and directories. In this exercise, you will implement a simplified version of 'grep' in JavaScript.

// run the following command in the terminal to test the search tool:
// node search.mjs searchFile('file.txt', 'Node')

// The search tool should take two command-line arguments: a file name and a regular expression. It should read the file and print all lines that match the regular expression.

import {readFile} from 'fs/promises';

function searchFile(fileName, regex) {
    // Read the file
    let file = readFile(fileName, 'utf8');
    let lines = file.split('\n');

    // Print lines that match the regular expression
    let re = new RegExp(regex);
    for (let line of lines) {
        if (re.test(line)) {
            console.log(line);
        }
    }
}