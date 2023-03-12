const fs = require('fs');
const data = fs.readFileSync('./12.txt', 'utf8');

const numbers = data.match(/[-]?\d+/g).map(x => +x)

console.log(numbers.reduce((acc, curr) => acc + curr, 0))

// part two

function isObj(input) {
    return typeof input === 'object' && !Array.isArray(input) && input != null;
}

const parsed = JSON.parse(data, (key, value) => { // JSON reviver
    if (isObj(value) && Object.values(value).includes('red')) {
        return null;
    }
    return value;
});

const newString = JSON.stringify(parsed)
const numbers2 = newString.match(/[-]?\d+/g).map(x => +x)
console.log(numbers2.reduce((acc, curr) => acc + curr, 0))
