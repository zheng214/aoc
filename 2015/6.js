const fs = require('fs');
const data = fs.readFileSync('./6.txt', 'utf8');

const instructions = data.split('\n').filter(n => !!n);

const lights = {};

for (let i = 0; i < instructions.length; i++) {
    const [start, end] = instructions[i].split(' through');
    const startCoord = start.split(' ')[start.split(' ').length - 1];
    const endCoord = end.split(' ')[end.split(' ').length - 1];
    const [startX, startY] = startCoord.split(',').map(n => +n);
    const [endX, endY] = endCoord.split(',').map(n => +n);

    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (instructions[i].substring(0, 6) === 'toggle') {
                // lights[`${x},${y}`] = !lights[`${x},${y}`]; // part one
                lights[`${x},${y}`] = lights[`${x},${y}`] ? lights[`${x},${y}`] + 2 : 2; // part two
            }
        
            if (instructions[i].substring(0, 7) === 'turn on') {
                // lights[`${x},${y}`] = true; // part one
                lights[`${x},${y}`] = lights[`${x},${y}`] ? lights[`${x},${y}`] + 1 : 1; // part two
            }
        
            if (instructions[i].substring(0, 8) === 'turn off') {
                // lights[`${x},${y}`] = false; // part one
                lights[`${x},${y}`] = lights[`${x},${y}`] > 1 ? lights[`${x},${y}`] - 1 : 0; // part two
            }
        }
    }
}

console.log(Object.keys(lights).filter(x => lights[x] === true).length)

// part two

const brightness = Object.keys(lights).reduce((acc, curr) => {
    acc += lights[curr];
    return acc
}, 0)

console.log(brightness)