const fs = require('fs');
const data = fs.readFileSync('./3a.txt', 'utf8');

//part a

function computePriority(type) {
    // console.log('a'.charCodeAt(0)) 97
    // console.log('z'.charCodeAt(0)) 122
    // console.log('A'.charCodeAt(0)) 65
    // console.log('Z'.charCodeAt(0)) 90
    const charCode = type.charCodeAt(0);
    if (charCode > 96) { // lowercase
        return charCode - 96;
    }
    return charCode - 38; // uppercase
}

const rucksacks = data.split('\n');
// output each priority type per sack
const priorities = rucksacks.map((sack) => {
    const memoized = {}; // mark seen types
    for (let i = 0; i < sack.length / 2; i++) {
        memoized[sack[i]] = 1; // mark type as seen
    }
    for (let i = sack.length / 2; i < sack.length; i++) {
        if (memoized[sack[i]] === 1) { // found common type in other compartment
            return sack[i];
        }
    }
})

console.log(priorities.map(computePriority).reduce((prev, curr) => prev + curr, 0))

//part b

const badges = [];

for (let i = 0; i < rucksacks.length; i += 3) {
    const rucksack1 = rucksacks[i];
    const rucksack2 = rucksacks[i+1];
    const rucksack3 = rucksacks[i+2];
    const memoized = {};
    for (let i = 0; i < rucksack1.length; i++) {
        memoized[rucksack1[i]] = 1; // mark type as seen
    }
    for (let i = 0; i < rucksack2.length; i++) {
        if (memoized[rucksack2[i]] === 1) { // found common type in elf 1's sack
            memoized[rucksack2[i]] = 2; // mark type as seen in 1 and 2's sack
        }
    }
    for (let i = 0; i < rucksack3.length; i++) {
        if (memoized[rucksack3[i]] === 2) { // found common type in elf1 and elf2's sack
            badges.push(rucksack3[i]);
            break;
        }
    }
}

console.log(badges.map(computePriority).reduce((prev, curr) => prev + curr, 0))

