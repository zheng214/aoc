const fs = require('fs');
const data = fs.readFileSync('./17.txt', 'utf8');
const containers = data.split('\n').filter(n => !!n);

const ways = {};

for (let i = 0; i < 2**20; i++) {
    const binary = i.toString(2);
    const formatted = binary.padStart(20, 0);
    const selection = formatted.split('').map(x => !!+x)
    const totalContainerSize = containers.reduce((acc, curr, index) => {
        if (selection[index]) {
            return acc + +curr;
        }
        return acc;
    }, 0);
    const numOfContainers = selection.filter(x => !!x).length
    if (totalContainerSize === 150) {
        ways[numOfContainers] = ways[numOfContainers] ? ways[numOfContainers] + 1 : 1;
    }
}

console.log(Object.values(ways).reduce((acc, curr) => acc + curr, 0))

console.log(ways)