const fs = require('fs');
const data = fs.readFileSync('./5.txt', 'utf8');

const strings = data.split('\n').filter(n => !!n);

let niceStrings = 0;

for (let i = 0; i < strings.length; i++) {
    const string = strings[i];
    const chars = string.split('');
    let vowels = chars.reduce((acc, curr) => ['a', 'e', 'i', 'o', 'u'].includes(curr) ? acc + 1 : acc, 0);
    let consecutiveExist = false;
    let naughty = false;
    for  (let j = 0; j < chars.length - 1; j++) {
        if (chars[j] === chars[j + 1]) {
            consecutiveExist = true;
        }
        if (['ab', 'cd', 'pq', 'xy'].includes(`${chars[j]}${chars[j + 1]}`)) {
            naughty = true;
            break;
        }
    }
    if (vowels > 2 && consecutiveExist && !naughty) {
        niceStrings++;
    }
}

console.log(niceStrings)

//part two
niceStrings = 0;

for (let i = 0; i < strings.length; i++) {
    const string = strings[i];
    const chars = string.split('');
    const letterPairs = {};
    let pairsAppearingTwice = false; // xyxy
    let overlappingPairs = false; // xkx
    for  (let j = 0; j < chars.length - 1; j++) {
        const letter1 = chars[j];
        const letter2 = chars[j + 1];
        const letter3 = chars[j + 2];
        if (letter1 === letter3) overlappingPairs = true;

        if (letterPairs[`${letter1}${letter2}`] === undefined) {
            letterPairs[`${letter1}${letter2}`] = j;
        } else if (letterPairs[`${letter1}${letter2}`] < j - 1) {
            pairsAppearingTwice = true;
        }
    }
    if (pairsAppearingTwice && overlappingPairs) {
        niceStrings++;
    }
}

console.log(niceStrings)