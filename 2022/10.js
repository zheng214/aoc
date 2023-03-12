const fs = require('fs');
const data = fs.readFileSync('./10a.txt', 'utf8');
const instructions = data.split('\n');

// we iterate through the instructions and insert a noop-like instruction before each addx, and treat addx as 1 cycle
let X = 1;
const synchronizedInstructions = [];
for (let i = 0; i < instructions.length; i++){
    if (instructions[i].substring(0, 4) === 'addx') {
        synchronizedInstructions.push('adding');
    } 
    synchronizedInstructions.push(instructions[i]);
}

const signalStrengths = [];
for (let cycle = 1; cycle <= synchronizedInstructions.length; cycle++) {
    signalStrengths.push(cycle * X);
    const currentInstruction = synchronizedInstructions[cycle - 1];
    if (currentInstruction.substring(0, 4) === 'addx') {
        X += +currentInstruction.split(' ')[1];
    }
}

console.log(signalStrengths[19] + signalStrengths[59] + signalStrengths[99] + signalStrengths[139] + signalStrengths[179] + signalStrengths[219]);

// part 2
const CRTline1 = [];
const CRTline2 = [];
const CRTline3 = [];
const CRTline4 = [];
const CRTline5 = [];
const CRTline6 = [];
const CRT = [CRTline1, CRTline2, CRTline3, CRTline4, CRTline5, CRTline6];
X = 1;

for (let cycle = 1; cycle <= synchronizedInstructions.length; cycle++) {
    // draw
    const spritePositions = [X - 1, X, X + 1];
    const drawingPosition = cycle % 40 - 1;
    const currentInstruction = synchronizedInstructions[cycle - 1];
    if (spritePositions.includes(drawingPosition)) {
        CRT[Math.floor((cycle - 1) / 40)].push('#');
    } else {
        CRT[Math.floor((cycle - 1) / 40)].push('.');
    }
    // addx
    if (currentInstruction.substring(0, 4) === 'addx') {
        X += +currentInstruction.split(' ')[1];
    }
}

console.log(CRT.map(line => line.join('')).join('\n'))

