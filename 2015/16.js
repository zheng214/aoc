const fs = require('fs');
const data = fs.readFileSync('./16.txt', 'utf8');
const sues = data.split('\n').filter(n => !!n);

const realSue = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1,
}

for (let i = 0; i < sues.length; i++) {
    const sue = sues[i];
    const itemList = sue.split(/Sue \d+: /)[1]
    const items = itemList.split(', ');
    const isRealSue = items.every((item) => {
        const itemName = item.split(': ')[0]
        const itemCount = +item.split(': ')[1]
        return realSue[itemName] === itemCount;
    });
    if (isRealSue) {
        console.log(i + 1)
    }
}

// part two

for (let i = 0; i < sues.length; i++) {
    const sue = sues[i];
    const itemList = sue.split(/Sue \d+: /)[1]
    const items = itemList.split(', ');
    const isRealSue = items.every((item) => {
        const itemName = item.split(': ')[0]
        const itemCount = +item.split(': ')[1]
        if (itemName === 'cats' || itemName === 'trees') {
            return realSue[itemName] < itemCount;
        }
        if (itemName === 'goldfish' || itemName === 'pomeranians') {
            return realSue[itemName] > itemCount;
        }
        return realSue[itemName] === itemCount;
    });
    if (isRealSue) {
        console.log(i + 1)
    }
}