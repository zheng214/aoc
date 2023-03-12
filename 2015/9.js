const fs = require('fs');
const data = fs.readFileSync('./9.txt', 'utf8');

const distances = data.split('\n').filter(n => !!n);
const distMatrix = {};

for (let i = 0; i < distances.length; i++) {
    const [locations, distance] = distances[i].split(' = ');
    const [location1, location2] = locations.split(' to ');
    if (!distMatrix[location1]) distMatrix[location1] = {};
    if (!distMatrix[location2]) distMatrix[location2] = {};
    distMatrix[location1][location2] = +distance;
    distMatrix[location2][location1] = +distance;
}

function shortestPath(visited, unvisited, distanceTravelled) {
    if (!unvisited.length) {
        return distanceTravelled;
    }

    const lastVisited = visited[visited.length - 1];
    const possiblePaths = [];
    for (let i = 0; i < unvisited.length; i++) {
        const nextNode = unvisited[i];
        if (!lastVisited) {
            possiblePaths.push(
                shortestPath(
                    [nextNode],
                    unvisited.filter(x => x !== nextNode),
                    0
                )
            );
        } else {
            possiblePaths.push(
                shortestPath(
                    [...visited, nextNode],
                    unvisited.filter(x => x !== nextNode),
                    distanceTravelled + distMatrix[lastVisited][nextNode]
                )
            );
        }
    }
    // return Math.min(...possiblePaths) // part one
    return Math.max(...possiblePaths) // part two
}


console.log(shortestPath([], Object.keys(distMatrix), 0))