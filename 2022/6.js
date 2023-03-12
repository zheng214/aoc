const fs = require('fs');
const data = fs.readFileSync('./6a.txt', 'utf8');
const characters = data.split('');

//part one

function checkDuplicate(arr) {
    const memoized = {};
    for (let i = 0; i < arr.length; i++) {
        if (!memoized[arr[i]]) {
            memoized[arr[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

const recentHistory = ['g', 'r', 'v', 'r'];

for (let i = 4; i < characters.length; i++) {
    if (!checkDuplicate(recentHistory)) {
        console.log(i);
        break;
    } else {
        recentHistory.shift();
        recentHistory.push(characters[i]);
    }

}

//part two
const recentHistory14 = ['g', 'r', 'v', 'r', 'n', 'v', 'r', 'n', 'n', 'j', 'l', 'j', 'b', 'j'];
for (let i = 4; i < characters.length; i++) {
    if (!checkDuplicate(recentHistory14)) {
        console.log(i);
        break;
    } else {
        recentHistory14.shift();
        recentHistory14.push(characters[i]);
    }

}

