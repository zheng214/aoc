function computeSumOfDivisors(number) {
    const root = Math.sqrt(number);
    let sum = 0;
    let divisor = Math.floor(root);
    if (divisor === root) {
        sum += root;
        divisor--;
    }
    while (divisor > 0) {
        const quotient = number / divisor;
        if (Number.isInteger(quotient)) {
            sum += divisor;
            sum += quotient;
        }
        divisor--;
    }
    return sum;
}

for (let i = 0; i < 1000000; i++) {
    const sumDivisors = computeSumOfDivisors(i);
    if (sumDivisors >= 2900000) {
        console.log(i)
        break;
    }
}

// part two

const houses = {};

for (let i = 1; i <= 1000000; i++) {
    for (let j = 1; j <= 50; j++) {
        if (houses[i*j]) {
            houses[i*j] += 11 * i;
        } else {
            houses[i*j] = 11 * i;
        }
    }
}

for (let h of Object.keys(houses)) {
    if (houses[h] >= 29000000) {
        console.log(h)
        break;
    }
}