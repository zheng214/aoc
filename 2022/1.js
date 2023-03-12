const fs = require('fs');
const data = fs.readFileSync('./1a.txt', 'utf8');

//part 1

const calorieGroups = data.split('\n\n');
const calorieTotals = calorieGroups.map((group) => {
    const calories = group.split('\n');
    return calories.reduce((prev, curr) => prev + +curr, 0);
})

console.log(Math.max(...calorieTotals))

//part 2

const sortedTotals = [...calorieTotals].sort((a,b) => b - a);
console.log(sortedTotals[0] + sortedTotals[1] + sortedTotals[2])
