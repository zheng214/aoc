const fs = require('fs');
const data = fs.readFileSync('./8.txt', 'utf8');
const strings = data.split('\n').filter(n => !!n);

const diff = strings.reduce((acc, curr) => {
    return acc + curr.length - eval(curr).length
}, 0)

console.log(diff)

let a = "\"aaa\"aaa\""
let b = `"${a}"`
console.log(b, b.length)
// part two
const newDiff = strings.reduce((acc, curr) => {
    const doubleQuotes = curr.split('').filter(x => x === "\"").length;
    const backslashes = curr.split('').filter(x => x === "\\").length;
    return acc + 2 + doubleQuotes + backslashes;
}, 0)

console.log(newDiff)
