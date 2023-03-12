const fs = require('fs');
const data = fs.readFileSync('./13a.txt', 'utf8');
const pairs = data.split('\n\n').map(pair => pair.split('\n'));

let indexSum = 0;
let balancedIndices = [];

for (let i = 0; i < pairs.length; i++) {
    const left = eval(pairs[i][0]);
    const right = eval(pairs[i][1]);
    if (isBalanced(left, right)) {
        indexSum += (i + 1);
        balancedIndices.push(i + 1)
    }
}

function isBalanced(left, right) {
    let isElementBalanced = null;
    if (left.length === 0 && right.length > 0) {
        return true;
    }
    if (left.length > 0 && right.length === 0) {
        return false;
    }
    for (let j = 0; j <= left.length; j++) {
        
        const leftElement = left[j];
        const rightElement = right[j];

        if (leftElement === undefined && rightElement !== undefined) {
            isElementBalanced = true;
        }

        if (leftElement !== undefined && rightElement === undefined) {
            isElementBalanced = false;
        }
        
        if (typeof leftElement === 'number' && typeof rightElement === 'number') {
            if (leftElement < rightElement) { isElementBalanced = true }
            if (leftElement > rightElement) { isElementBalanced = false }
        } else if (typeof leftElement === 'number' && typeof rightElement === 'object') {
            isElementBalanced = isBalanced([leftElement], rightElement);
        } else if (typeof leftElement === 'object' && typeof rightElement === 'number') {
            isElementBalanced = isBalanced(leftElement, [rightElement]);
        } else if (typeof leftElement === 'object' && typeof rightElement === 'object') {
            isElementBalanced = isBalanced(leftElement, rightElement);
        }
        if (isElementBalanced === null) {
            continue;
        }
        return isElementBalanced;
    }
    return isElementBalanced;
}

console.log(indexSum)

// part two
const allPackets = [[[2]], [[6]]];
for (let i = 0; i < pairs.length; i++) {
    
    const left = eval(pairs[i][0]);
    const right = eval(pairs[i][1]);
    allPackets.push(left)
    allPackets.push(right)
}

const sortedPackets = allPackets.sort((a, b) => {
    if (isBalanced(a, b)) {
        return -1;
    }
    return 1;
});

let divider2Index = 0;
let divider6Index = 0;
for (let i = 0; i < sortedPackets.length; i++) {
    // [[2]]
    if (sortedPackets[i].length === 1 && JSON.stringify(sortedPackets[i]) === '[[2]]') {
        divider2Index = i + 1;
    }
    if (sortedPackets[i].length === 1 && JSON.stringify(sortedPackets[i]) === '[[6]]') {
        divider6Index = i + 1;
    }
}

console.log(divider2Index * divider6Index)
