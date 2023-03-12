const fs = require('fs');
const data = fs.readFileSync('./19.txt', 'utf8');
const replacements = data.split('\n').filter(n => n.includes('=>'));
let medecine = `CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF`;

const distinctMolecules = new Set();

for (let i = 0; i < replacements.length; i++) {
    const [initial, replaced] = replacements[i].split(' => ');
    for (let j = 0; j < medecine.length; j++) {
        if (initial.length === 1 && medecine.charAt(j) === initial) {
            
            distinctMolecules.add(`${medecine.substring(0, j)}${replaced}${medecine.substring(j+1, medecine.length)}`)
        }
        if (initial.length === 2 && medecine.substring(j, j+2) === initial) {
            distinctMolecules.add(`${medecine.substring(0, j)}${replaced}${medecine.substring(j+2, medecine.length)}`)
        }
    }
}

console.log(distinctMolecules.size)

// part two

let steps = 0
replacements.sort((a, b) => {
    const [initialA, replacedA] = a.split(' => ');
    const [initialB, replacedB] = b.split(' => ');
    return replacedB.length - replacedA.length;
})

while (medecine !== 'e') {
    for (let i = 0; i < replacements.length; i++) {
        const [initial, replaced] = replacements[i].split(' => ');
        for (let j = 0; j < medecine.length; j++) {
            if (medecine.indexOf(replaced) === j) {
                medecine = `${medecine.substring(0, j)}${initial}${medecine.substring(j + replaced.length, medecine.length)}`;
                steps++;
                break;
            }
        }
    }
}

console.log(steps)