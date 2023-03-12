const fs = require('fs');
const data = fs.readFileSync('./7.txt', 'utf8');
const operations = data.split('\n').filter(n => !!n);

const gates = {};
let propagated = {};

// gates {
//     ab: {
//         value: undefined,
//         cd: {
//             operator: AND, 
//             operand: gh, // ab AND gh -> cd
//         },
//         ef: {
//             operator: OR,
//             operand: ij, // ab OR ij -> ef
//         },
//         kl: {
//             operator: NOT,
//             operand: null, // NOT ab -> kl
//         },
//         mn: {
//             operator: AND,
//             operand: 1, // ab AND 1 -> mn
//         },
//     }
// }

function setupGates() {
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const outputGate = operation.split(' -> ')[1];
        if (operation.includes('NOT')) {
            let input = operation.split(' -> ')[0].split(' ')[1];
            if (gates[input]) {
                gates[input][outputGate] = {
                    operator: 'NOT',
                }
            } else {
                gates[input] = {
                    [outputGate]: {
                        operator: 'NOT'
                    }
                }
            }
        } else if (operation.includes('AND')) {
            let input1 = operation.split(' AND ')[0];
            let input2 = operation.split(' AND ')[1].split(' ')[0];
            if (!input1.match(/\d+/)) {
                if (gates[input1]) {
                    gates[input1][outputGate] = {
                        operator: 'AND',
                        operand: input2,
                    }
                } else {
                    gates[input1] = {
                        [outputGate]: {
                            operator: 'AND',
                            operand: input2,
                        }
                    }
                }
            }
            if (!input2.match(/\d+/)) {
                if (gates[input2]) {
                    gates[input2][outputGate] = {
                        operator: 'AND',
                        operand: input1,
                    }
                } else {
                    gates[input2] = {
                        [outputGate]: {
                            operator: 'AND',
                            operand: input1,
                        }
                    }
                }
            }
        } else if (operation.includes('OR')) {
            let input1 = operation.split(' OR ')[0];
            let input2 = operation.split(' OR ')[1].split(' ')[0];
            if (!input1.match(/\d+/)) {
                if (gates[input1]) {
                    gates[input1][outputGate] = {
                        operator: 'OR',
                        operand: input2,
                    }
                } else {
                    gates[input1] = {
                        [outputGate]: {
                            operator: 'OR',
                            operand: input2,
                        }
                    }
                }
            }
            if (!input2.match(/\d+/)) {
                if (gates[input2]) {
                    gates[input2][outputGate] = {
                        operator: 'OR',
                        operand: input1,
                    }
                } else {
                    gates[input2] = {
                        [outputGate]: {
                            operator: 'OR',
                            operand: input1,
                        }
                    }
                }
            }
        } else if (operation.includes('LSHIFT')) {
            let input1 = operation.split(' LSHIFT ')[0];
            let input2 = operation.split(' LSHIFT ')[1].split(' ')[0];
            if (gates[input1]) {
                gates[input1][outputGate] = {
                    operator: 'LSHIFT',
                    operand: +input2
                }
            } else {
                gates[input1] = {
                    [outputGate]: {
                        operator: 'LSHIFT',
                        operand: +input2
                    }
                }
            }
        } else if (operation.includes('RSHIFT')) {
            let input1 = operation.split(' RSHIFT ')[0];
            let input2 = operation.split(' RSHIFT ')[1].split(' ')[0];
            if (gates[input1]) {
                gates[input1][outputGate] = {
                    operator: 'RSHIFT',
                    operand: +input2
                }
            } else {
                gates[input1] = {
                    [outputGate]: {
                        operator: 'RSHIFT',
                        operand: +input2
                    }
                }
            }
        } else {
            const input = operation.split(' -> ')[0];
            const outputGate = operation.split(' -> ')[1];
            if (!input.match(/\d+/)) {
                if (gates[input]) {
                    gates[input][outputGate] = {
                        operator: null,
                    }
                } else {
                    gates[input] = {
                        [outputGate]: {
                            operator: null,
                        }
                    }
                }
            } else {
                if (gates[outputGate]) {
                    gates[outputGate].value = gates[outputGate].value || +input;
                } else {
                    gates[outputGate] = { value: +input }
                }
                // propagate
                propagateResult(outputGate);
            }
        }
    }
}

setupGates();

function propagateResult(gate) {
    const root = gates[gate];
    if (root.value === undefined || propagated[gate]) {
        return null;
    }

    const outgoingGates = Object.keys(root).filter(n => n !== 'value');
    for (let i = 0; i < outgoingGates.length; i++) {
        const outGate = outgoingGates[i];
        const operator = root[outGate].operator
        const operand = root[outGate].operand

        if (!gates[outGate]) {
            gates[outGate] = {}; 
        }
        if (operator === 'AND') {
            if ((operand.match(/\d+/))) {
                gates[outGate].value = +operand & root.value;
            } else if (gates[operand] && gates[operand].value !== undefined) {
                gates[outGate].value = gates[operand].value & root.value;
            }
        }
        if (operator === 'OR') {
            if ((operand.match(/\d+/))) {
                gates[outGate].value = +operand & root.value;
            } else if (gates[operand] && gates[operand].value !== undefined) {
                gates[outGate].value = gates[operand].value | root.value;
            }
        }
        if (operator === 'LSHIFT') {
            gates[outGate].value = root.value << +operand;
        }
        if (operator === 'RSHIFT') {
            gates[outGate].value = root.value >> +operand;
        }
        if (operator === 'NOT') {
            gates[outGate].value = ~root.value & 0xffff >>> 0;
        }
        if (operator === null) {
            gates[outGate].value = root.value;
        }
        propagated[gate] = 1;
        propagateResult(outGate)
    }
}

let gateNames = Object.keys(gates)

for (let i = 0 ; i < gateNames.length; i++) {
    propagateResult(gateNames[i])
}

console.log(gates.a.value)

// part 2

propagated = {};
gateNames = Object.keys(gates)
gates.b.value = gates.a.value

for (let i = 0 ; i < gateNames.length; i++) {
    if (gateNames[i] !== 'b') {
        gates[gateNames[i]].value = undefined;
    }
}

setupGates();

for (let i = 0 ; i < gateNames.length; i++) {
    propagateResult(gateNames[i])
}

console.log(gates.a.value)

