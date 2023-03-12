const monkey0 = {
    items: [56, 56, 92, 65, 71, 61, 79],
    operation: 'n = n * 7',
    testDivisor: 3,
    trueDestination: 3,
    falseDestination: 7,
    inspections: 0
};

const monkey1 = {
    items: [61, 85],
    operation: 'n = n + 5',
    testDivisor: 11,
    trueDestination: 6,
    falseDestination: 4,
    inspections: 0
};

const monkey2 = {
    items: [54, 96, 82, 78, 69],
    operation: 'n = n * n',
    testDivisor: 7,
    trueDestination: 0,
    falseDestination: 7,
    inspections: 0
};

const monkey3 = {
    items: [57, 59, 65, 95],
    operation: 'n = n + 4',
    testDivisor: 2,
    trueDestination: 5,
    falseDestination: 1,
    inspections: 0
};

const monkey4 = {
    items: [62, 67, 80],
    operation: 'n = n * 17',
    testDivisor: 19,
    trueDestination: 2,
    falseDestination: 6,
    inspections: 0
};

const monkey5 = {
    items: [91],
    operation: 'n = n + 7',
    testDivisor: 5,
    trueDestination: 1,
    falseDestination: 4,
    inspections: 0
};

const monkey6 = {
    items: [79, 83, 64, 52, 77, 56, 63, 92],
    operation: 'n = n + 6',
    testDivisor: 17,
    trueDestination: 2,
    falseDestination: 0,
    inspections: 0
};

const monkey7 = {
    items: [50, 97, 76, 96, 80, 56],
    operation: 'n = n + 3',
    testDivisor: 13,
    trueDestination: 3,
    falseDestination: 5,
    inspections: 0
};

const monkeys = [monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7]

// part one
// const rounds = 20;
// end part one

//part two
const rounds = 10000;
const productOfDivisors = monkeys.reduce((acc, curr) => acc * curr.testDivisor, 1);
// end part two


for (let i = 0; i < rounds; i++) {
    for (let m = 0; m < monkeys.length; m++) {
        const monkey = monkeys[m];
        const items = monkey.items;
        while (items.length) {
            // inspection
            let n = items.shift();
            eval(monkey.operation);

            // part one
            // n = Math.floor(n / 3);
            // end part one
            
            // part two
            // since we know all the divisors being tested are pairwise coprime
            // instead of knowing the worry level of the item, we only need to know its remainder mod (product of all divisors)
            // and we would know the remainder mod (any listed divisor)
            n = n % productOfDivisors;
            // end part two

            // throw
            if (n % monkey.testDivisor === 0) {
                monkeys[monkey.trueDestination].items.push(n);
            } else {
                monkeys[monkey.falseDestination].items.push(n);
            }
            monkey.inspections++;
        }
    }
}

let sortedInspections = monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(monkeys[0].inspections * monkeys[1].inspections);
