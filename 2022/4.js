const fs = require('fs');
const data = fs.readFileSync('./4a.txt', 'utf8');

//part a
const pairs = data.split('\n');

let fullyContained = 0;
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const assignments = pair.split(',');
    const [assign1, assign2] = [assignments[0], assignments[1]]
    const [assign1low, assign1high] = [+assign1.split('-')[0], +assign1.split('-')[1]]
    const [assign2low, assign2high] = [+assign2.split('-')[0], +assign2.split('-')[1]]

    if (assign1low <= assign2low && assign1high >= assign2high) { //assign 1 contains assign 2
        fullyContained++;
    } else if (assign2low <= assign1low && assign2high >= assign1high) { //assign 2 contains assign 1
        fullyContained++;
    }
}

console.log(fullyContained)

//part b
let overlaps = 0;
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const assignments = pair.split(',');
    const [assign1, assign2] = [assignments[0], assignments[1]]
    const [assign1low, assign1high] = [+assign1.split('-')[0], +assign1.split('-')[1]]
    const [assign2low, assign2high] = [+assign2.split('-')[0], +assign2.split('-')[1]]

    if (assign1low == assign2low || assign1low == assign2high || assign1high == assign2low|| assign1high == assign2high) { 
        // any end of one assignment is equal to the end of the other, then they overlap at that point
        overlaps++;
        continue;
    }
    if (assign1low > assign2high || assign2low > assign1high) { 
        // the low end of one assignment is higher than the high end of the other => no overlap
        continue;
    }
    overlaps++;
}

console.log(overlaps)
