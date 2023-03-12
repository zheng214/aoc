const fs = require('fs');
const data = fs.readFileSync('./5a.txt', 'utf8');

const stack1 = 'BZT'.split('');
const stack2 = 'VHTDN'.split('');
const stack3 = 'BFMD'.split('');
const stack4 = 'TJGWVQL'.split('');
const stack5 = 'WDGPVFQM'.split('');
const stack6 = 'VZQGHFS'.split('');
const stack7 = 'ZSNRLTCW'.split('');
const stack8 = 'ZHWDJRNM'.split('');
const stack9 = 'MQLFDS'.split('');
const stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];

//part a

function executeMove(amount, from, to) {
    while (amount > 0) {
        const moving = stacks[from - 1].pop();
        stacks[to - 1].push(moving);
        amount--;
    }
}

const moveInstructions = data.split('\n\n')[1].split('\n');

moveInstructions.forEach((instruction) => {
    const amount = instruction.split('move ')[1].charAt(0) + instruction.split('move ')[1].charAt(1);
    const from = instruction.split('from ')[1].charAt(0);
    const to = instruction.split('to ')[1].charAt(0);
    // executeMove(amount, from, to);
    executeMove9001(amount, from, to);
});

const result = stacks.reduce((acc, curr) => {
    return acc + curr[curr.length - 1];
}, '');

console.log(result)

//part 2
function executeMove9001(amount, from, to) {
    const temp = [];
    while (amount > 0) {
        const moving = stacks[from - 1].pop();
        temp.push(moving);
        amount--;
    }
    while (temp.length) {
        const moving = temp.pop();
        stacks[to - 1].push(moving);
    }
}