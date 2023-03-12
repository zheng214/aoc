const fs = require('fs');
const data = fs.readFileSync('./2a.txt', 'utf8');

//part 1

function computeRoundScore(opponentMove, myMove) {
    if (opponentMove === 'A') { // rock
        if (myMove === 'rock') return 4
        if (myMove === 'paper') return 8
        return 3
    } else if (opponentMove === 'B') { // paper
        if (myMove === 'rock') return 1
        if (myMove === 'paper') return 5
        return 9
    } else if (opponentMove === 'C') { // scissors
        if (myMove === 'rock') return 7
        if (myMove === 'paper') return 2
        return 6
    }
    return 0;
}

function decryptSimple(inputLetter) {
    if (inputLetter === 'X') return 'rock';
    if (inputLetter === 'Y') return 'paper';
    if (inputLetter === 'Z') return 'scissors';
}

const rounds = data.split('\n');

const roundsScores = rounds.map((line) => {
    const moves = line.split(' ');
    const opponentMove = moves[0];
    const myMove = moves[1];
    return computeRoundScore(opponentMove, decryptSimple(myMove))
});

console.log(roundsScores.reduce((prev, curr) => prev + curr, 0))

// part 2
function computeRoundScore2(opponentMove, desiredResult) {
    // X: lose, Y: draw, Z: win 
    if (opponentMove === 'A') { // rock
        if (desiredResult === 'X') return 3
        if (desiredResult === 'Y') return 4
        return 8
    } else if (opponentMove === 'B') { // paper
        if (desiredResult === 'X') return 1
        if (desiredResult === 'Y') return 5
        return 9
    } else if (opponentMove === 'C') { // scissors
        if (desiredResult === 'X') return 2
        if (desiredResult === 'Y') return 6
        return 7
    }
    return 0;
}

const roundsScores2 = rounds.map((line) => {
    const moves = line.split(' ');
    const opponentMove = moves[0];
    const myMove = moves[1];
    return computeRoundScore2(opponentMove, myMove);
});

console.log(roundsScores2.reduce((prev, curr) => prev + curr, 0))