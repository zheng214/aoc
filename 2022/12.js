const fs = require('fs');
const data = fs.readFileSync('./12a.txt', 'utf8');
// const data = fs.readFileSync('./12b.txt', 'utf8');
const grid = data.split('\n').map(row => row.split(''));
const gridLength = grid.length;
const gridWidth = grid[0].length;

// we use dijkstra to find path from S to E

const NODES = [];
let markedNodes = [];
let startNodeId = '';
let endNodeId = '';

// initialize nodes, mark starting node
let nodeId = 0;
for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const node = {
            x: j,
            y: i,
            id: nodeId,
            dist: Infinity,
            elevation: grid[i][j],
        };
        if (grid[i][j] === 'S') {
            node.dist = 0;
            node.elevation = 'a';
            startNodeId = node.id;
            markedNodes.push(node);
        }
        if (grid[i][j] === 'E') {
            node.elevation = 'z';
            endNodeId = node.id;
        }
        NODES.push(node)
        nodeId++
    }
}

while (markedNodes.length) {
    // in the list of marked nodes, find closest node from origin to visit
    const closestNode = markedNodes.reduce((acc, curr) => curr.dist < acc.dist ? curr : acc, { dist: Infinity });

    // remove that node from the list
    markedNodes = markedNodes.filter(marked => marked.id !== closestNode.id);

    // mark that node's neighbors
    // up
    if (closestNode.y > 0) {
        mark(NODES[closestNode.id - gridWidth], closestNode);
    }
    // down
    if (closestNode.y < gridLength - 1) {
        mark(NODES[closestNode.id + gridWidth], closestNode);
    }
    // left
    if (closestNode.x > 0) {
        mark(NODES[closestNode.id - 1], closestNode);
    } 
    // right
    if (closestNode.x < gridWidth - 1) {
        mark(NODES[closestNode.id + 1], closestNode);
    } 
}

function mark(neighborNode, currentNode) {
    if (neighborNode.elevation.charCodeAt(0) - currentNode.elevation.charCodeAt(0) > 1) {
        return null;
    }
    if (neighborNode.dist === Infinity) {
        neighborNode.dist = currentNode.dist + 1;
        markedNodes.push(neighborNode);
    } else {
        const newDistance = currentNode.dist + 1;
        if (newDistance < neighborNode.dist) {
            neighborNode.dist = newDistance;
        }
    }
}

const endNode = NODES.find((node) => node.id === endNodeId);
console.log(endNode)

// part two
// we use dijkstra but start from E
// at the end of the algorithm we select from every marked node with elevation a the one with the smallest distance

// reset nodes
markedNodes = [];
for (let i = 0; i < NODES.length; i++) {
    NODES[i].dist = Infinity;
    if (NODES[i].id === endNodeId) {
        NODES[i].dist = 0;
        markedNodes.push(NODES[i]);
    }
}

while (markedNodes.length) {
    // in the list of marked nodes, find closest node from origin to visit
    const closestNode = markedNodes.reduce((acc, curr) => curr.dist < acc.dist ? curr : acc, { dist: Infinity });

    // remove that node from the list
    markedNodes = markedNodes.filter(marked => marked.id !== closestNode.id);

    // mark that node's neighbors
    // up
    if (closestNode.y > 0) {
        markReverse(NODES[closestNode.id - gridWidth], closestNode);
    }
    // down
    if (closestNode.y < gridLength - 1) {
        markReverse(NODES[closestNode.id + gridWidth], closestNode);
    }
    // left
    if (closestNode.x > 0) {
        markReverse(NODES[closestNode.id - 1], closestNode);
    } 
    // right
    if (closestNode.x < gridWidth - 1) {
        markReverse(NODES[closestNode.id + 1], closestNode);
    } 
}

function markReverse(neighborNode, currentNode) {
    if (currentNode.elevation.charCodeAt(0) - neighborNode.elevation.charCodeAt(0) > 1) {
        return null;
    }
    if (neighborNode.dist === Infinity) {
        neighborNode.dist = currentNode.dist + 1;
        markedNodes.push(neighborNode);
    } else {
        const newDistance = currentNode.dist + 1;
        if (newDistance < neighborNode.dist) {
            neighborNode.dist = newDistance;
        }
    }
}

console.log(NODES.filter(n => n.elevation == 'a').sort((a, b) => a.dist - b.dist)[0])
