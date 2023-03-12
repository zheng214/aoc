const fs = require('fs');
const data = fs.readFileSync('./15a.txt', 'utf8');
const sensorLines = data.split('\n');

const beaconFreeIntervals = []; // y = 2000000

for (let i = 0; i < sensorLines.length; i++) {
    const [sensorX, beaconX] = sensorLines[i].match(/x=[\d\-]+,/g).map(s => +s.substring(2, s.length - 1));
    const [sensorY, beaconY] = sensorLines[i].match(/y=[\d\-]+/g).map(s => +s.substring(2, s.length));
    const distanceToBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    const distanceYToLine = Math.abs(sensorY - 2000000);
    // console.log({ sensorX, sensorY, beaconX, beaconY })
    // console.log({ distanceToBeacon, distanceYToLine })
    
    if (distanceToBeacon > distanceYToLine) {
        const lineCoverage = distanceToBeacon - distanceYToLine;
        beaconFreeIntervals.push([sensorX - lineCoverage, sensorX + lineCoverage]);
    }

}


beaconFreeIntervals.sort((a, b) => {
    return a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]
});
// console.log(beaconFreeIntervals)

// intervals are sorted by their left end, we now join overlapping intervals
const consolidatedIntervals = [beaconFreeIntervals[0]];

for (let i = 1; i < beaconFreeIntervals.length; i++) {
    // console.log({ consolidatedIntervals })
    const prevInterval = consolidatedIntervals.pop();
    const nextInterval = beaconFreeIntervals[i];
    // console.log({ prevInterval, nextInterval })
    if (prevInterval[1] >= nextInterval[0]) {
        // console.log('overlap')
        if (nextInterval[1] > prevInterval[1]) {
            // console.log('replacing right')
            consolidatedIntervals.push([prevInterval[0], nextInterval[1]])
        } else {
            // console.log('keeping right')
            consolidatedIntervals.push(prevInterval)
        }
    } else {
        // console.log('no overlap')
        consolidatedIntervals.push(...[prevInterval, nextInterval])
    }
}

console.log(consolidatedIntervals.reduce((acc, curr) => acc + Math.abs(curr[0] - curr[1]), 0))

// part two
// since there is only one location for the beacon
// there must exist at least 2 pairs of beacons, such that in each pair, the distance between the sensors is exactly
// 2 + sum of distances between the sensors and their respective beacons (ie the coverage between the sensors is almost adjacent)
// we find those 2 pairs and derive the point at which their adjacent lines intersect

const lineEquations = [];

for (let i = 0; i < sensorLines.length - 1; i++) {
    for (let j = i + 1; j < sensorLines.length; j++) {
        const [sensor1X, beacon1X] = sensorLines[i].match(/x=[\d\-]+,/g).map(s => +s.substring(2, s.length - 1));
        const [sensor1Y, beacon1Y] = sensorLines[i].match(/y=[\d\-]+/g).map(s => +s.substring(2, s.length));
        const [sensor2X, beacon2X] = sensorLines[j].match(/x=[\d\-]+,/g).map(s => +s.substring(2, s.length - 1));
        const [sensor2Y, beacon2Y] = sensorLines[j].match(/y=[\d\-]+/g).map(s => +s.substring(2, s.length));
        const sensorToBeacon1 = Math.abs(sensor1X - beacon1X) + Math.abs(sensor1Y - beacon1Y);
        const sensorToBeacon2 = Math.abs(sensor2X - beacon2X) + Math.abs(sensor2Y - beacon2Y);
        const sensorToSensor = Math.abs(sensor1X - sensor2X) + Math.abs(sensor1Y - sensor2Y);;
        if (sensorToBeacon1 + sensorToBeacon2 + 2 === sensorToSensor) {
            // pair found, need to determine at which side are the sensors almost touching
            // luckily no sensors share the same x or y coords, if they did, we have to consider 2 sides instead of 1
            let side; // on which side of sensor 2 can we find sensor 1?
            // side determine the slope of the line in which we find our point
            let lineEquation;
            if (sensor1X < sensor2X && sensor1Y < sensor2Y) {
                side = 'bottom-left'
                const sensor2LeftPoint = [sensor2X - sensorToBeacon2, sensor2Y];
                const b = sensor2LeftPoint[0] + sensor2LeftPoint[1] - 1; // y = mx+b, m = -1
                lineEquation = `-x+${b}`
            }
            if (sensor1X < sensor2X && sensor1Y > sensor2Y) {
                side = 'top-left'
                const sensor2LeftPoint = [sensor2X - sensorToBeacon2, sensor2Y];
                const b = sensor2LeftPoint[1] - sensor2LeftPoint[0] + 1; // y = mx+b, m = 1
                lineEquation = `x+${b}`
            }
            if (sensor1X > sensor2X && sensor1Y < sensor2Y) {
                side = 'bottom-right'
                const sensor2RightPoint = [sensor2X + sensorToBeacon2, sensor2Y];
                const b = sensor2RightPoint[1] - sensor2RightPoint[0] - 1; // y = mx+b, m = 1
                lineEquation = `x+${b}`
            }
            if (sensor1X > sensor2X && sensor1Y > sensor2Y) {
                side = 'top-right'
                const sensor2RightPoint = [sensor2X + sensorToBeacon2, sensor2Y];
                const b = sensor2LeftPoint[0] + sensor2LeftPoint[1] + 1; // y = mx+b, m = -1
                lineEquation = `-x+${b}`
            }
            lineEquations.push(lineEquation)
        }
    }
}

// solve line equations
const b1 = lineEquations[0].split('+')[1];
const b2 = lineEquations[1].split('+')[1];
const xIntersect = Math.abs(b1 - b2) / 2;
const yIntersect = eval(lineEquations[0].replace('x', xIntersect));

console.log(4000000 * xIntersect + yIntersect);
