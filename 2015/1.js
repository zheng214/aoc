const fs = require('fs');
const data = fs.readFileSync('./1.txt', 'utf8');

const instructions = data.split('');

console.log(instructions.reduce((acc, curr) => curr === '(' ? acc + 1 : acc - 1, 0))

// part two
let floor = 0;
for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === '(') {
        floor++;
    } else {
        floor--;
        if (floor === -1) {
            console.log(i + 1)
            break;
        }
    }
}