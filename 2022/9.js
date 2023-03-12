const fs = require('fs');
const data = fs.readFileSync('./9a.txt', 'utf8');
const movements = data.split('\n');

const visitedSquares = { '0-0': 1 };
const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

function resolveGap(head, tail) {
    // make the tail catch up with the head, if necessary
    const dx = head.x - tail.x;
    const dy = head.y - tail.y;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2){
        // no update necessary
        return tail;
    }
    if (Math.abs(dx) === 2 && Math.abs(dy) === 2){
        // separated by double diagonal
        if (dx === 2) { tail.x += 1 }
        if (dx === -2) { tail.x -= 1 }
        if (dy === 2) { tail.y += 1 }
        if (dy === -2) { tail.y -= 1 }
    }
    if (Math.abs(dx) === 2 && Math.abs(dy) < 2){
        // separated by 'horizontal' knight move or one space gap horizontally
        if (dx === 2) { tail.x += 1 }
        if (dx === -2) { tail.x -= 1 }
        tail.y = head.y
    }
    if (Math.abs(dx) < 2 && Math.abs(dy) === 2){
        // separated by 'vertical' knights move or one space gap vertically
        if (dy === 2) { tail.y += 1 }
        if (dy === -2) { tail.y -= 1 }
        tail.x = head.x
    }
    return tail;
}

// moves the knot if it is the first knot on the rope, then make second knot catch up
function resolveMovement(direction, head, tail, knotIndex) {
    if (direction === 'L' && knotIndex === 0) { head.x-- }
    if (direction === 'R' && knotIndex === 0) { head.x++ }
    if (direction === 'U' && knotIndex === 0) { head.y++ }
    if (direction === 'D' && knotIndex === 0) { head.y-- }
    resolveGap(head, tail)
}

for (let i = 0; i < movements.length; i++) {
    const direction = movements[i].split(' ')[0];
    let steps = movements[i].split(' ')[1];
    while (steps > 0) {
        resolveMovement(direction, head, tail, 0)
        visitedSquares[`${tail.x}-${tail.y}`] = 1;
        steps--;
    }
}
console.log(Object.keys(visitedSquares).length);

// part 2
const knots = [];
const visitedSquaresTail = { '0-0': 1 };
for (let i = 0; i < 10; i++) {
    knots[i] = { x: 0, y: 0 };
}

for (let i = 0; i < movements.length; i++) {
    const direction = movements[i].split(' ')[0];
    let steps = movements[i].split(' ')[1];
    while (steps > 0) {
        // moves the head, then successively update each tail position
        for (let k = 0; k < knots.length - 1; k++) {
            resolveMovement(direction, knots[k], knots[k+1], k)
        }
        visitedSquaresTail[`${knots[9].x}-${knots[9].y}`] = 1;
        steps--;
    }
}
console.log(Object.keys(visitedSquaresTail).length);
