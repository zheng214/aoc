const fs = require('fs');
const data = fs.readFileSync('./14.txt', 'utf8');
const reindeerStats = data.split('\n').filter(n => !!n);

const reindeers = {};

for (let i = 0; i < reindeerStats.length; i++) {
    const reindeer = reindeerStats[i];
    const name = reindeer.match(/^([a-zA-Z]+)\s/)[1];
    const speed = +reindeer.match(/(\d+) km\/s/)[1];
    const flightTime = +reindeer.match(/(\d+) seconds,/)[1];
    const restTime = +reindeer.match(/(\d+) seconds\./)[1];
    reindeers[name] = { speed, flightTime, restTime };
}

for (let name in reindeers) {
    const reindeer = reindeers[name];
    const cycles = Math.floor((2503/(reindeer.flightTime + reindeer.restTime)));
    const extraTime = 2503 % (reindeer.flightTime + reindeer.restTime);
    const extraTimeInFlight = extraTime >= reindeer.flightTime ? reindeer.flightTime : extraTime;
    const distanceFlown = cycles * reindeer.speed * reindeer.flightTime + extraTimeInFlight * reindeer.speed;
    reindeers[name].distance2503 = distanceFlown;
}

console.log(Math.max(...Object.values(reindeers).map(x => x.distance2503)))

// part two

for (let name in reindeers) {
    reindeers[name].points = 0;
}

for (let i = 1; i <= 2503; i++) {
    const distances = {};
    let furthestDistanceFlown = 0;
    for (let name in reindeers) {
        const reindeer = reindeers[name];
        const cycles = Math.floor((i/(reindeer.flightTime + reindeer.restTime)));
        const extraTime = i % (reindeer.flightTime + reindeer.restTime);
        const extraTimeInFlight = extraTime >= reindeer.flightTime ? reindeer.flightTime : extraTime;
        const distanceFlown = cycles * reindeer.speed * reindeer.flightTime + extraTimeInFlight * reindeer.speed;
        if (distanceFlown > furthestDistanceFlown) {
            furthestDistanceFlown = distanceFlown;
        }
        distances[name] = distanceFlown;
    }
    for (let name in distances) {
        if (distances[name] === furthestDistanceFlown) {
            reindeers[name].points++;
        }
    }
}

console.log(Math.max(...Object.values(reindeers).map(x => x.points)))
