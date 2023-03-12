const fs = require('fs');
const data = fs.readFileSync('./7a.txt', 'utf8');
const commands = data.split('$ ');

const directories = {
    '/': { size: 0, unresolved: [] },
};

const pathStack = [];
// first loop explores and stores information about directory relations in the directories object
for (let i = 0; i < commands.length; i++) {
    const lines = commands[i].split('\n'); // !!!
    const input = lines[0];
    const cmd = input.substring(0, 2);
    if (cmd === 'cd') {
        const arg = input.split(' ')[1];
        if (arg === '..') {
            pathStack.pop();
        } else {
            pathStack.push(arg);
        }
    } else { // ls
        for (let j = 1; j < lines.length; j++) {
            const pathFromRoot = '/' + pathStack.slice(1, pathStack.length).join('/');
            const output = lines[j];
            const propertySize = output.split(' ')[0];
            const name = output.split(' ')[1];
            if (propertySize === 'dir') {
                const newDirectoryPath = pathFromRoot === '/' ? pathFromRoot + name : pathFromRoot + '/' + name;
                directories[newDirectoryPath] = { size: 0, unresolved: [] };
                directories[pathFromRoot].unresolved.push(name);
            } else {
                directories[pathFromRoot].size += +propertySize;
            }
        }
    }
}

// recursively computes and updates all directory sizes based on information from the directories object, uses depth first
function computeDirectorySize (directoryPath) {
    const directory = directories[directoryPath];
    if (directory.unresolved.length === 0) {
        return directory.size;
    }
    let unresolvedSize = 0;
    for (let i = 0; i < directory.unresolved.length; i++) {
        const subPath = directoryPath === '/'
            ? directoryPath + directory.unresolved[i]
            : directoryPath + '/' + directory.unresolved[i];
        unresolvedSize += computeDirectorySize(subPath)
    }
    directory.unresolved = [];
    directory.size += unresolvedSize;
    return directory.size;
}
computeDirectorySize('/');

// every directory now has correct size attached to it in directories object
const allDirectoryPaths = Object.keys(directories);
let result = 0;
for (let i = 0; i < allDirectoryPaths.length; i++) {
    if (directories[allDirectoryPaths[i]].size <= 100000) {
        result += directories[allDirectoryPaths[i]].size;
    }
}

console.log({ result })

// part two
const totalSpace = 70000000;
const freeSpaceNeeded = 30000000;
const spaceOccupied = directories['/'].size;
const freeSpaceAvailable = totalSpace - spaceOccupied;
const spaceToFreeUp = freeSpaceNeeded - freeSpaceAvailable;


let idealDeletionSize = 999999999999;
// loop through the directories object to find the ideal directory size
for (let i = 0; i < allDirectoryPaths.length; i++) {
    const currentDirectorySize = directories[allDirectoryPaths[i]].size
    if (currentDirectorySize >= spaceToFreeUp && currentDirectorySize <= idealDeletionSize) {
        idealDeletionSize = currentDirectorySize;
    }
}

console.log({ idealDeletionSize })
