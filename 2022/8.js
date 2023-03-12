const fs = require('fs');
const data = fs.readFileSync('./8a.txt', 'utf8');
const rows = data.split('\n');

const TREE_GRID = rows.map((row) => row.split('').map(t => +t))
const length = TREE_GRID.length;
const width = TREE_GRID[0].length;
const edgeTrees = 2 * length + 2 * width - 4;

// look from each side, mark coordinates of visible trees
const memoized = {};

// left
for (let i = 1; i < length - 1; i++) {
    let tallestTreeSeen = TREE_GRID[i][0];
    for (let j = 1; j < width - 1; j++) {
        if (TREE_GRID[i][j] > tallestTreeSeen) {
            tallestTreeSeen = TREE_GRID[i][j];
            memoized[`${i}-${j}`] = 1;
        }
    }
}

// right
for (let i = 1; i < length - 1; i++) {
    let tallestTreeSeen = TREE_GRID[i][width - 1];
    for (let j = width - 2; j > 0; j--) {
        if (TREE_GRID[i][j] > tallestTreeSeen) {
            tallestTreeSeen = TREE_GRID[i][j];
            memoized[`${i}-${j}`] = 1;
        }
    }
}

// top
for (let j = 1; j < width - 1; j++) {
    let tallestTreeSeen = TREE_GRID[0][j];
    for (let i = 1; i < length - 1; i++) {
        if (TREE_GRID[i][j] > tallestTreeSeen) {
            tallestTreeSeen = TREE_GRID[i][j];
            memoized[`${i}-${j}`] = 1;
        }
    }
}

// bottom
for (let j = 1; j < width - 1; j++) {
    let tallestTreeSeen = TREE_GRID[length - 1][j];
    for (let i = length - 2; i > 0; i--) {
        if (TREE_GRID[i][j] > tallestTreeSeen) {
            tallestTreeSeen = TREE_GRID[i][j];
            memoized[`${i}-${j}`] = 1;
        }
    }
}

console.log(Object.keys(memoized).length + edgeTrees);

// part two
// we make the same iteration like in part one
// as we iterate through each tree row/column, we keep a list of the positions of the closest seen tree for any given height for that row/column
// thus, if we encounter a tree of size 5, we look in the list for the closest tree taller than 5, and their distance will be the viewing distance
// we then update the list after that encounter and repeat

const scenicScores = {}; // eg. { '1-3': { left: 2, right: 3, top: 1, bottom: 4 } }

// left
for (let i = 1; i < length - 1; i++) {
    const edgeLeft = TREE_GRID[i][0];
    const lastSeenHeight = {
        edgeLeft: 0,
    };
    for (let j = 1; j < width - 1; j++) {
        const currentTreeHeight = TREE_GRID[i][j];
        // go through the list to find the closest tree that is equal or taller
        let closestTallerTree = 0; // position
        for (let h = currentTreeHeight; h <= 9; h++) {
            if (lastSeenHeight[h] > closestTallerTree) {
                closestTallerTree = lastSeenHeight[h]
            }
        }
        scenicScores[`${i}-${j}`] = { left: j - closestTallerTree, right: 0, top: 0, bottom: 0 };
        lastSeenHeight[currentTreeHeight] = j;
    }
}

// right
for (let i = 1; i < length - 1; i++) {
    const edgeRight = TREE_GRID[i][width - 1];
    const lastSeenHeight = {
        edgeRight: width - 1,
    };
    for (let j = width - 2; j > 0; j--) {
        const currentTreeHeight = TREE_GRID[i][j];
        let closestTallerTree = width - 1;
        for (let h = currentTreeHeight; h <= 9; h++) {
            if (lastSeenHeight[h] < closestTallerTree) {
                closestTallerTree = lastSeenHeight[h]
            }
        }
        scenicScores[`${i}-${j}`].right = closestTallerTree - j;
        lastSeenHeight[currentTreeHeight] = j;
    }
}

// top
for (let j = 1; j < width - 1; j++) {
    const edgeTop = TREE_GRID[0][j];
    const lastSeenHeight = {
        edgeTop: 0,
    };
    for (let i = 1; i < length - 1; i++) {
        const currentTreeHeight = TREE_GRID[i][j];
        let closestTallerTree = 0;
        for (let h = currentTreeHeight; h <= 9; h++) {
            if (lastSeenHeight[h] > closestTallerTree) {
                closestTallerTree = lastSeenHeight[h]
            }
        }
        scenicScores[`${i}-${j}`].top = i - closestTallerTree;
        lastSeenHeight[currentTreeHeight] = i;
    }
}

// bottom
for (let j = 1; j < width - 1; j++) {
    const edgeBottom = TREE_GRID[length - 1][j];
    const lastSeenHeight = {
        edgeBottom: length - 1,
    };
    for (let i = length - 2; i > 0; i--) {
        const currentTreeHeight = TREE_GRID[i][j];
        let closestTallerTree = width - 1;
        for (let h = currentTreeHeight; h <= 9; h++) {
            if (lastSeenHeight[h] < closestTallerTree) {
                closestTallerTree = lastSeenHeight[h]
            }
        }
        scenicScores[`${i}-${j}`].bottom = closestTallerTree - i;
        lastSeenHeight[currentTreeHeight] = i;
    }
}


const trees = Object.keys(scenicScores)
let highestScore = 0;
for (let i = 0; i < trees.length; i++) {
    const { left, right, top, bottom } = scenicScores[trees[i]];
    const scenicScore = left * right * top * bottom;
    if (scenicScore > highestScore) {
        highestScore = scenicScore;
    }
}
console.log(highestScore)