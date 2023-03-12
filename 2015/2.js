const fs = require('fs');
const data = fs.readFileSync('./2.txt', 'utf8');
const dimensions = data.split('\n').filter(n => !!n);

let paperNeeded = 0;
for (let i = 0; i < dimensions.length; i++) {
    const sides = dimensions[i].split('x');
    const area1 = sides[0] * sides[1];
    const area2 = sides[1] * sides[2];
    const area3 = sides[2] * sides[0];
    const wrapArea = 2 * (area1 + area2 + area3);
    const slack = Math.min(area1, area2, area3)
    const total = wrapArea + slack;
    paperNeeded += total;
}

console.log(paperNeeded);

// part two
let ribbonNeeded   = 0;
for (let i = 0; i < dimensions.length; i++) {
    const sides = dimensions[i].split('x').map(n => +n).sort((a, b) => a - b);
    const smallestPerimeter = sides[0] * 2  + sides[1] * 2;
    const bow = sides[0] * sides[1] * sides[2];
    const total = smallestPerimeter + bow;
    ribbonNeeded += total;
}

console.log(ribbonNeeded);
