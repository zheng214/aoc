const fs = require('fs');
const data = fs.readFileSync('./14a.txt', 'utf8');
const caveLines = data.split('\n');

const rocks = {};
const sands = {}; // resting sand
let deepestRock = 0;

for (let i = 0; i < caveLines.length; i++) {
    const rockLines = caveLines[i].split(' -> ');
    for (let j = 0; j < rockLines.length - 1; j++) {
        const [currentX, currentY] = rockLines[j].split(',')
        const [nextX, nextY] = rockLines[j + 1].split(',')
        if (+currentY > deepestRock) { deepestRock = +nextY }
        if (+nextY > deepestRock) { deepestRock = +nextY }
        if (currentX === nextX) {
            if (nextY > currentY) {
                for (let y = currentY; y <= nextY; y++) {
                    rocks[`${currentX}-${y}`] = 1;
                }
            }
            if (nextY < currentY) {
                for (let y = currentY; y >= nextY; y--) {
                    rocks[`${currentX}-${y}`] = 1;
                }
            }
        }
        if (currentY === nextY) {
            if (nextX > currentX) {
                for (let x = currentX; x <= nextX; x++) {
                    rocks[`${x}-${currentY}`] = 1;
                }
            }
            if (nextX < currentX) {
                for (let x = currentX; x >= nextX; x--) {
                    rocks[`${x}-${currentY}`] = 1;
                }
            }
        }
    }
}



let voidReached = false;
while (!voidReached) {
    const sand = { x: 500, y: 0, falling: true }
    while (sand.falling) {
        if (!rocks[`${sand.x}-${sand.y + 1}`] && !sands[`${sand.x}-${sand.y + 1}`]) {
            sand.y++;
        } else if (!rocks[`${sand.x - 1}-${sand.y + 1}`] && !sands[`${sand.x - 1}-${sand.y + 1}`]) {
            sand.x--;
            sand.y++;
        } else if (!rocks[`${sand.x + 1}-${sand.y + 1}`] && !sands[`${sand.x + 1}-${sand.y + 1}`]) {
            sand.x++;
            sand.y++;
        } else {
            sands[`${sand.x}-${sand.y}`] = 1;
            sand.falling = false;
        }
        if (sand.y > deepestRock) {
            voidReached = true;
            sand.falling = false;
        }
    }
}

console.log(Object.keys(sands).length)

//part two
let sourceBlocked = false;
while (!sourceBlocked) {
    const sand = { x: 500, y: 0, falling: true }
    while (sand.falling) {
        if (sand.y === deepestRock + 1) {
            sands[`${sand.x}-${sand.y}`] = 1;
            sand.falling = false;
        } else if (!rocks[`${sand.x}-${sand.y + 1}`] && !sands[`${sand.x}-${sand.y + 1}`]) {
            sand.y++;
        } else if (!rocks[`${sand.x - 1}-${sand.y + 1}`] && !sands[`${sand.x - 1}-${sand.y + 1}`]) {
            sand.x--;
            sand.y++;
        } else if (!rocks[`${sand.x + 1}-${sand.y + 1}`] && !sands[`${sand.x + 1}-${sand.y + 1}`]) {
            sand.x++;
            sand.y++;
        } else {
            sands[`${sand.x}-${sand.y}`] = 1;
            sand.falling = false;
        }
    }
    if (sands['500-0'] === 1) {
        sourceBlocked = true;
    }
}

console.log(Object.keys(sands).length)