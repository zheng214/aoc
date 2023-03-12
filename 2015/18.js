const fs = require('fs');
const data = fs.readFileSync('./18.txt', 'utf8');
let lightGrid = data.split('\n').filter(n => !!n).map(x => x.split(''));

function countNeighbor(x, y, grid) {
    let lightsOn = 0;
    if (grid[x - 1]) {
        lightsOn += (grid[x-1][y-1] === '#' ? 1 : 0);
        lightsOn += (grid[x-1][y] === '#' ? 1 : 0);
        lightsOn += (grid[x-1][y+1] === '#' ? 1 : 0);
    }
    lightsOn += (grid[x][y-1] === '#' ? 1 : 0);
    lightsOn += (grid[x][y+1] === '#' ? 1 : 0);
    if (grid[x + 1]) {
        lightsOn += (grid[x+1][y-1] === '#' ? 1 : 0);
        lightsOn += (grid[x+1][y] === '#' ? 1 : 0);
        lightsOn += (grid[x+1][y+1] === '#' ? 1 : 0);
    }
    return lightsOn;
}

for (let i = 0; i < 100; i++) {
    let newLightGrid = JSON.parse(JSON.stringify(lightGrid));
    for (let j = 0; j < 100; j++) {
        for (let k = 0; k < 100; k++) {
            if (lightGrid[j][k] === '#') {
                if (countNeighbor(j, k, lightGrid) !== 2 && countNeighbor(j, k, lightGrid) !== 3) {
                    newLightGrid[j][k] = '.';
                }
            } else {
                if (countNeighbor(j, k, lightGrid) === 3) {
                    newLightGrid[j][k] = '#';
                }
            }
        }
    }
    lightGrid = newLightGrid;
}

console.log(lightGrid.reduce((acc, curr) => acc + curr.filter(x => x === '#').length, 0))

// part two

lightGrid = data.split('\n').filter(n => !!n).map(x => x.split(''));
lightGrid[0][99] = '#';
lightGrid[99][99] = '#';
lightGrid[99][0] = '#';
lightGrid[0][0] = '#';

for (let i = 0; i < 100; i++) {
    let newLightGrid = JSON.parse(JSON.stringify(lightGrid));
    for (let j = 0; j < 100; j++) {
        for (let k = 0; k < 100; k++) {
            if (lightGrid[j][k] === '#') {
                if (countNeighbor(j, k, lightGrid) !== 2 && countNeighbor(j, k, lightGrid) !== 3) {
                    newLightGrid[j][k] = '.';
                }
            } else {
                if (countNeighbor(j, k, lightGrid) === 3) {
                    newLightGrid[j][k] = '#';
                }
            }
        }
    }
    lightGrid = newLightGrid;
    lightGrid[0][99] = '#';
    lightGrid[99][99] = '#';
    lightGrid[99][0] = '#';
    lightGrid[0][0] = '#';
}

console.log(lightGrid.reduce((acc, curr) => acc + curr.filter(x => x === '#').length, 0))
