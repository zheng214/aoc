const weapons = [
    {
        cost: 8,
        damage: 4,
    },{
        cost: 10,
        damage: 5,
    },{
        cost: 25,
        damage: 6,
    },{
        cost: 40,
        damage: 7,
    },{
        cost: 74,
        damage: 8,
    }
];

const armors = [
    {
        cost: 0,
        armor: 0,
    },{
        cost: 13,
        armor: 1,
    },{
        cost: 31,
        armor: 2,
    },{
        cost: 53,
        armor: 3,
    },{
        cost: 75,
        armor: 4,
    },{
        cost: 102,
        armor: 5,
    }
];

const rings = [
    {
        cost: 25,
        damage: 1,
        armor: 0,
    },{
        cost: 50,
        damage: 2,
        armor: 0,
    },{
        cost: 100,
        damage: 3,
        armor: 0,
    },{
        cost: 20,
        damage: 0,
        armor: 1,
    },{
        cost: 40,
        damage: 0,
        armor: 2,
    },{
        cost: 80,
        damage: 0,
        armor: 3,
    }
];

let lowestCost = Infinity;

for (let i = 0; i < weapons.length; i++) {
    for (let j = 0; j < armors.length; j++) {
        for (let k = 0; k < 64; k++) {
            const ringSelection = k.toString(2).padStart(6, '0').split('').map(x => +x);
            if (ringSelection.filter(x => x === 1).length > 2) {
                continue;
            }
            const player = { hp: 100, cost: 0, damage: 0, armor: 0 };
            // equip
            player.damage += weapons[i].damage;
            player.cost += weapons[i].cost;
            player.armor += armors[j].armor;
            player.cost += armors[j].cost;
            for (let r = 0; r < 5; r++) {
                if (ringSelection[r]) {
                    player.damage += rings[r].damage;
                    player.armor += rings[r].armor;
                    player.cost += rings[r].cost;
                }
            }
            const result = simulateBattle(player);
            if (result === 'win' && player.cost < lowestCost) {
                lowestCost = player.cost;
            }
        }
    }
}

function simulateBattle(player) {
    const boss = { hp: 100, damage: 8, armor: 2 };
    const p = { ...player };
    while (p.hp > 0 || boss.hp > 0) {
        boss.hp -= (p.damage - boss.armor);
        if (boss.hp < 1) {
            return 'win';
        }
        player.hp -= (boss.damage - player.armor);
        if (player.hp < 1) {
            return 'loss';
        }
    }
}

console.log(lowestCost)

// part two
let highestCost = 0;
for (let i = 0; i < weapons.length; i++) {
    for (let j = 0; j < armors.length; j++) {
        for (let k = 0; k < 64; k++) {
            const ringSelection = k.toString(2).padStart(6, '0').split('').map(x => +x);
            if (ringSelection.filter(x => x === 1).length > 2) {
                continue;
            }
            const player = { hp: 100, cost: 0, damage: 0, armor: 0 };
            // equip
            player.damage += weapons[i].damage;
            player.cost += weapons[i].cost;
            player.armor += armors[j].armor;
            player.cost += armors[j].cost;
            for (let r = 0; r < 6; r++) {
                if (ringSelection[r]) {
                    player.damage += rings[r].damage;
                    player.armor += rings[r].armor;
                    player.cost += rings[r].cost;
                }
            }
            const result = simulateBattle(player);
            if (result === 'loss' && player.cost > highestCost) {
                highestCost = player.cost;
            }
        }
    }
}

console.log(highestCost)