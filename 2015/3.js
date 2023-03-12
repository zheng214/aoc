const fs = require('fs');
const data = fs.readFileSync('./3.txt', 'utf8');

const instructions = data.split('');

let visited = { '0,0': 1 };

let x = 0;
let y = 0;
for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i]) {
        case '<':
            x--;
            break;
        case '^':
            y++;
            break;
        case '>':
            x++;
            break;
        case 'v':
            y--;
            break;
    }
    visited[`${x},${y}`] = 1;
}

console.log(Object.keys(visited).length)

// part two

visited = { '0,0': 1 };
const instructions1 = instructions.filter((x, i) => (i % 2 === 0));
const instructions2 = instructions.filter((x, i) => (i % 2 === 1));

let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;

for (let i = 0; i < instructions1.length; i++) {
    switch (instructions1[i]) {
        case '<':
            x1--;
            break;
        case '^':
            y1++;
            break;
        case '>':
            x1++;
            break;
        case 'v':
            y1--;
            break;
    }
    visited[`${x1},${y1}`] = 1;
}

for (let i = 0; i < instructions2.length; i++) {
    switch (instructions2[i]) {
        case '<':
            x2--;
            break;
        case '^':
            y2++;
            break;
        case '>':
            x2++;
            break;
        case 'v':
            y2--;
            break;
    }
    visited[`${x2},${y2}`] = 1;
}

console.log(Object.keys(visited).length)