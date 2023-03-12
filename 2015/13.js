const fs = require('fs');
const data = fs.readFileSync('./13.txt', 'utf8');
const relationships = data.split('\n').filter(n => !!n);

const happiness = {};

for (let i = 0; i < relationships.length; i++) {
    const relationship = relationships[i];
    const guest1 = relationship.match(/^([a-zA-Z]+)\s/)[1];
    const guest2 = relationship.match(/\s([a-zA-Z]+)\.$/)[1];
    let score = relationship.match(/\d+/)[0]
    const sign = relationship.includes('gain') ? 1 : -1;
    score = sign * score;
    if (!happiness[guest1]) { happiness[guest1] = {} }
    happiness[guest1][guest2] = score;
}

function maximumHappiness(includedGuests, unincludedGuests, currentScore) {
    const lastIncluded = includedGuests[includedGuests.length - 1];
    if (!unincludedGuests.length) {
        return currentScore + happiness[includedGuests[0]][lastIncluded] + happiness[lastIncluded][includedGuests[0]];
    }

    const possiblePaths = [];
    for (let i = 0; i < unincludedGuests.length; i++) {
        const nextGuest = unincludedGuests[i];
        possiblePaths.push(
            maximumHappiness(
                [...includedGuests, nextGuest],
                unincludedGuests.filter(x => x !== nextGuest),
                currentScore + happiness[lastIncluded][nextGuest] + happiness[nextGuest][lastIncluded]
            )
        );
        
    }

    return Math.max(...possiblePaths)
}

console.log(maximumHappiness(['Alice'], [...Object.keys(happiness.Alice)], 0))

// part two

happiness.me = {};
for (let k in happiness) {
    happiness.me[k] = 0;
    happiness[k].me = 0;
}

console.log(maximumHappiness(['Alice'], [...Object.keys(happiness.Alice)], 0))
